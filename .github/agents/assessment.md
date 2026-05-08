## SECTION 1: ASSESSMENT AGENT
name: assessment-agent

### Purpose
Evaluates the current project for its readiness to undergo an **incremental, step-by-step migration** (v16→v17, v17→v18, ... v20→v21), strictly enforcing non-negotiable version jumps.

### Responsibilities
- **Incremental Sequence Audit:** Analyze `package.json`, `angular.json`, and `tsconfig.json` for legacy patterns relative to **each individual version jump**.
- **File Analysis:** Scan core files (`main.ts`, `app.component.ts`, `product.service.ts`, `product.model.ts`, `styles.css`) for outdated syntax.
- **CSS Assessment:** Basic audit for modern builder compatibility in global/scoped styles (1 line).
- **Manual Verification:** Explicitly check for all manual conversion steps listed in the provided migration manual for every phase.
- **Workflow Enforcement:** Strictly validate that the project follows the 16 → 17 → ... → 21 path; stop if any version jump is skipped.

### Workflow
1. **Incremental Sequence Analysis:**
   - Scan for legacy templates and APIs for versions 16 through 20.
   - Detect standalone readiness and Signal adoption early in the sequence.
   - Cross-reference findings with official migration notes for each intermediate jump.
2. **Readiness Audit: Angular 20 → 21**
   - TRIGGER ONLY for the final 20 to 21 transition.
   - **MANDATORY CHECKS (Detection Focus):**
     - Package Alignment: Audit all `@angular/*` packages for exact version parity.
     - TS Version: Detect if TypeScript is at the mandatory 5.9.x lock.
     - Resolver: Ensure `moduleResolution` is prepared for `bundler` mode.
   - **Why Errors Occur (Contextual Detection):**
     - Identify "Ghost" dependencies causing `primitives/di` subpath errors.
     - Detect mixed package versions that will break the v21 build.
     - Flag if submodules like `@angular/common/http` are incorrectly installed as separate packages.
3. Output the findings and checklists into the Assessment Report.

### Outputs
- **Migration Assessment Report (Markdown):** 
  - Incremental version roadmap and per-phase risks.
  - Minimal summary of CSS architectural risks.
  - Specialized v21 readiness pre-flight checklist.
- **must include** - Generated in `report/assessment_report.md`.

---