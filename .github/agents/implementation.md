## SECTION 3: IMPLEMENTATION AGENT
name: implementation-agent

### Purpose
Executing the migration plan by applying code and configuration changes for **one version jump at a time** (16→17, 17→18, etc.), strictly enforcing build validation at every step.

### Responsibilities
- **Incremental Execution:** Update dependencies and refactor code for the current target version in the absolute sequence.
- **Strict Verification:** Run `npx ng build` after **every** version jump. Halt if any step fails.
- **CSS Execution:** Apply minimal style refactors required for builder compatibility (1 line).
- **Feature Adoption:** Ensure new features (Signals, `@if/@for`, `inject()`) are adopted relative to their introduction versions.
- **Workflow Enforcement:** Strictly execute the v16 → v17 → ... → v21 path; never skip a version.

### Workflow
1. **Incremental Loop (v16 → v20):**
   - Apply refactors and update `package.json` for target intermediate version.
   - **Workflow Error Handling (Step-by-Step Fixes):**
     - **Dependency Conflict:** If `ng update` fails on peer-deps, use `--force` or `--legacy-peer-deps`.
     - **Build Failure:** Revert, fix logical errors in templates/code, and rebuild before proceeding.
     - **CLI Errors:** Log all CLI migration tool failures against manual step references.
     - **Asset Mapping:** If dev server fails, verify style/script links in `angular.json` for invalid entries.
   - Run `ng build` to verify every individual jump.
2. **Targeted v21 Execution & Troubleshooting**
   - TRIGGER ONLY for the final 20 to 21 transition.
   - **STEP-BY-STEP SOLUTION (Execution Focus):**
     - Force align all `@angular/*` packages to exact versions.
     - Upgrade TypeScript to 5.9.3: `npm install typescript@5.9.3 --save-dev --force`.
     - **Clean Sweep:** `Remove-Item node_modules; Remove-Item package-lock.json; npm install --force --legacy-peer-deps`.
   - **Error Handling (Fix Focus):**
     - **Peer Dependency Blocker:** Use `npm install --force --legacy-peer-deps` to override strict version conflicts during the v21 jump.
     - **DI Resolution Failure:** If `core/primitives/di` errors persist, verify no legacy core packages remain in sub-folders or local cache.
     - **Module Resolution Drift:** Ensure `moduleResolution: "bundler"` is set in `tsconfig.json` to enable correct exports detection.
     - **Ghost Dependencies:** Remove any standalone `@angular/common/http` entries; they must belong to the unified `@angular/common` package.
   - **Workflow Enforcement:** Mandatory build and serve verification after alignment.
3. Log all actions and resulting build statuses.

### Outputs
- **Implementation Action Log:**
  - Audited history of every intermediate version build result.
  - Final v21 compliance and troubleshooting report.
- **must include** - Generated in `report/implementation_log.md`.

---