import express from "express";
import path from "path";
import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

// Bypass local TLS certificate verification errors for AI API requests (common on Windows local dev environments)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const aiSystemInstruction =
  "You are Nova AI, a smart, powerful, and friendly personal brain training coach. " +
  "Understand the user's profile, progress, score, and goals, then give concise cognitive training guidance. " +
  "Give text-only responses. If the user's score is zero, acknowledge it correctly. " +
  "Keep your responses VERY SHORT, fast, and to the point (maximum 1-2 sentences). " +
  "If the user asks for a calculation plan, append [CALC_PLAN]. If they ask for a training plan widget, append [VIEW_PLAN].";

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT || 3000);
  const hasRazorpayKeys = Boolean(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET);

  app.use(cors()); // Allow requests from any origin (can be restricted in production)
  app.use(express.json());
  app.set("trust proxy", 1);

  app.get("/healthz", (_req, res) => {
    res.json({ ok: true });
  });

  app.post("/api/ai/chat", async (req, res) => {
    if (!process.env.GEMINI_API_KEY) {
      return res.status(503).json({ error: "Gemini API key is not configured on this deployment" });
    }

    const { message, context, history } = req.body || {};

    if (typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ error: "Message is required" });
    }

    try {
      const { GoogleGenAI } = await import("@google/genai");
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const model = process.env.GEMINI_MODEL || "gemini-2.0-flash";
      const recentHistory = Array.isArray(history)
        ? history
            .slice(-8)
            .map((item) => `${item.role === "model" ? "Nova" : "User"}: ${String(item.text || "").slice(0, 1000)}`)
            .join("\n")
        : "";
      const prompt = [
        recentHistory ? `Recent conversation:\n${recentHistory}` : "",
        typeof context === "string" ? context.slice(0, 4000) : "",
        `User: ${message.trim()}`,
      ]
        .filter(Boolean)
        .join("\n\n");

      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          systemInstruction: aiSystemInstruction,
          maxOutputTokens: 80,
        },
      });

      res.json({ text: response.text || "I could not generate a response right now." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Could not generate AI response" });
    }
  });

  // Secure Game Verification Endpoints
  app.post("/api/games/verify-deduction", (req, res) => {
    const { puzzleId, assignments, timeTaken, hintsUsed } = req.body || {};
    
    // Server-side answer key validation
    const solutions: Record<string, Record<string, string>> = {
      easy_championship: { Alex: '1st', Ben: '2nd', Clara: '3rd', David: '4th' },
      med_safehouse: { 'Agent Fox': 'London', 'Agent Ghost': 'Tokyo', 'Agent Raven': 'Reykjavik', 'Agent Viper': 'Berlin' },
      hard_gallery: { Kaelen: 'Vault', Mira: 'Observatory', Lyra: 'Atrium', Dorian: 'Archive', Soren: 'Armory' },
      expert_quantum: { 'Dr. Aris': '2021', 'Dr. Blair': '2022', 'Dr. Chen': '2023', 'Dr. Diaz': '2024', 'Dr. Evans': '2025' },
      master_embassy: { 'Delegate Ramos': 'Level 1', 'Consul Moreau': 'Level 2', 'Attache Novak': 'Level 3', 'Envoy Chen': 'Level 4', 'Ambassador Thorne': 'Level 5', 'Minister Vance': 'Level 6' }
    };

    const targetSolution = solutions[puzzleId];
    if (!targetSolution) {
      return res.status(404).json({ valid: false, error: "Puzzle not found" });
    }

    let isCorrect = true;
    for (const [char, expected] of Object.entries(targetSolution)) {
      if (assignments?.[char] !== expected) {
        isCorrect = false;
        break;
      }
    }

    if (!isCorrect) {
      return res.json({ valid: false, message: "Deduction contains contradictions" });
    }

    const basePoints: Record<string, number> = {
      easy_championship: 100,
      med_safehouse: 160,
      hard_gallery: 240,
      expert_quantum: 350,
      master_embassy: 500
    };

    const base = basePoints[puzzleId] || 100;
    const timeBonus = Math.max(0, Math.floor((300 - Math.min(300, Number(timeTaken || 100))) * 0.5));
    const hintPenalty = Math.min(base * 0.5, Number(hintsUsed || 0) * 25);
    const verifiedScore = Math.max(50, Math.round(base + timeBonus - hintPenalty));

    return res.json({
      valid: true,
      verifiedScore,
      earnedCoins: Math.max(10, Math.floor(verifiedScore / 5)),
      signature: crypto.createHmac("sha256", "brainova_game_secret").update(`${puzzleId}:${verifiedScore}`).digest("hex")
    });
  });

  app.post("/api/games/verify-truth", (req, res) => {
    const { scenarioId, selectedOption } = req.body || {};
    const truthKey: Record<string, string> = {
      wil_easy: "Marcus",
      wil_med: "Jax & Dane",
      tc_hard: "A: Knight, B: Knave, C: Knight",
      ch_med: "Statement 2 & 4 & 5",
      lv_hard: "Dr. Aris is not a certified neural engineer.",
      mi_expert: "Vance: Truth, Lyra: Lie, Kael: Lie, Mira: Truth, Soren: Lie"
    };

    const expected = truthKey[scenarioId];
    if (!expected) {
      return res.status(404).json({ valid: false, error: "Scenario not found" });
    }

    const valid = selectedOption === expected;
    const score = valid ? 150 : 0;

    return res.json({
      valid,
      verifiedScore: score,
      earnedCoins: valid ? 30 : 0
    });
  });

  const razorpay = hasRazorpayKeys
    ? new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID!,
        key_secret: process.env.RAZORPAY_KEY_SECRET!,
      })
    : null;

  // Create an order
  app.post("/api/razorpay/create-order", async (req, res) => {
    if (!razorpay) {
      return res.status(503).json({ error: "Razorpay is not configured on this deployment" });
    }

    try {
      const { amount, currency = "INR", receipt = "receipt_1" } = req.body;
      const numericAmount = Number(amount);

      if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
        return res.status(400).json({ error: "Invalid amount" });
      }
      
      const options = {
        amount: Math.round(numericAmount * 100),
        currency,
        receipt,
      };

      const order = await razorpay.orders.create(options);
      res.json(order);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Could not create order" });
    }
  });

  // Verify payment signature
  app.post("/api/razorpay/verify-signature", async (req, res) => {
    if (!hasRazorpayKeys) {
      return res.status(503).json({ error: "Razorpay is not configured on this deployment" });
    }

    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

      if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        return res.status(400).json({ error: "Missing payment verification fields" });
      }

      const secret = process.env.RAZORPAY_KEY_SECRET!;

      const shasum = crypto.createHmac("sha256", secret);
      shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
      const digest = shasum.digest("hex");

      if (digest !== razorpay_signature) {
        return res.status(400).json({ msg: "Transaction not legit!" });
      }

      res.json({
        msg: "success",
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Could not verify payment" });
    }
  });

  app.listen(PORT, () => {
    console.log(`Backend Server running on port ${PORT}`);
  });
}

startServer();



