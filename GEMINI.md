# Project Workflow & Branching Guidelines

## 1. Branch Strategy & Rule Enforcement
- **Default Development Branch**: `release`
- **Protected Production Branch**: `main`

### Mandatory Rules
1. **Never Push Directly to `main`**:
   - Direct pushes or commits to `main` are strictly forbidden.
   - A local `.git/hooks/pre-push` hook is installed to block accidental pushes to `main`.
2. **Always Work with `release`**:
   - All development, feature work, bug fixes, and modifications must start on `release` or a dedicated feature branch created from `release`.
   - The active local working branch must always be `release` (or a feature branch branching from `release`).
3. **Always Fetch from Remote**:
   - Before starting new work or switching branches, always run `git fetch origin` to ensure local tracking is up-to-date with GitHub (`https://github.com/Akash-kirar/BRAINOVA.git`).
4. **Testing Gate Before Main**:
   - All changes must be tested, validated, and verified on `release` first.
   - Code can only be integrated into `main` via a Pull Request (PR) or merge from `release` after testing passes and the user explicitly requests/approves the promotion.
5. **Application Stability**:
   - Do not make unsolicited or arbitrary changes to application code.
