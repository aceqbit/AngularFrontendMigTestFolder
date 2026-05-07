
# Combined Migration Agent (v16 → v21)

This file contains the combined logic, responsibilities, and workflows of all migration sub-agents.

---

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

## SECTION 2: PLANNING AGENT
name: planning-agent

### Purpose
Constructs a phased, dependency-aware migration roadmap from Angular 16 to 21, strictly enforcing an **incremental, step-by-step upgrade sequence**.

### Responsibilities
- **Task Decomposition:** Breakdown migration into discrete, ordered tasks for every version jump (16→17, 17→18, 18→19, 19→20).
- **Metadata Management:** For every task, include `Dependencies`, `Manual Step Reference`, `Estimated Effort`, and `Validation Criteria`.
- **CSS Planning:** Integrate 1-2 minimal style alignment tasks for major builder shifts (1 line).
- **Sequence Verification:** Order all refactors (Signals, `inject()`, Control Flow) as per the provided migration manual.
- **Workflow Enforcement:** Strictly prevent bypassing intermediate versions (e.g. going 16 to 21 directly).

### Workflow
1. **Phased Roadmap Generation:**
   - Schedule tasks for v16 through v20 incremental upgrades.
   - Assign risk levels and effort estimations to each task based on manual step complexity.
   - Define validation gates (build/test verification) for **each intermediate version**.
2. **v21 Final Transition Roadmap**
   - TRIGGER ONLY for the final roadmap phase.
   - **SEQUENCING & RISK PLANNING (Timing Focus):**
     - 1. Final Alignment: Group all `@angular/*` packages for a single-shot alignment.
     - 2. TS Upgrade: Schedule the move to exactly TypeScript 5.9.3.
     - 3. Clean Workspace: Plan the removal of `node_modules` and `package-lock.json` at the start of the leap.
     - 4. Final Build: Enforce build validation after alignment.
   - **Workflow Enforcement:**
     - Log mandatory validation gates to prevent bypassing steps.
3. Validate that the plan follows the strict incremental sequence.

### Outputs
- **Migration Plan (Markdown):**
  - Ordered task list with effort, risks, and validation criteria.
  - Detailed v21 transition sequence.
  - Manual step cross-references.
- **must include** - Generated in `plan/migration_plan.md`.

---

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

## SECTION 4: CSS AGENT
name: css-agent

### Purpose
Specialized agent for style modernization and migration across Angular version jumps, specifically managing the transition from legacy pre-processors to modern build pipelines (Vite/application builder) and handling complex architectural style refactors.

### Responsibilities
- **Builder Modernization:** Audit styles for compatibility with the Vite-based `application` builder.
- **Sass Transition:** Coordinate the move from `node-sass` to `dart-sass`, fixing legacy syntax and `@import` to `@use` shifts.
- **Shadow Piercing Audit:** Identify and refactor legacy shadow-piercing descendants (`/deep/`, `>>>`) to modern `::ng-deep` or CSS Custom Properties.
- **Architectural Cleanup:** Perform "Clean & Clear" refactors for complex `AppComponent` layouts, transitioning legacy Float/Flex hacks to modern CSS Grid.
- **Asset Path Correction:** Resolve relative asset paths (backgrounds, fonts) that break during the v16→v17 builder transition.
- **Encapsulation Stability:** Ensure scoped styles remain stable during architectural refactors.

### Workflow
1. **Audit & Scan:** Deep-scan CSS/SCSS files for deprecated syntax and legacy pre-processor patterns.
2. **Phase Fit:** Coordinate with the planning agent to schedule style updates during builder transitions (v16→v17).
3. **Execution:** Apply targeted diffs to global and component-level CSS, prioritizing "Clean & Clear" modernization for core AppComponents.
4. **Validation:** Verify style injection and asset loading in the dev server after every builder shift.

### Outputs
- **CSS Report:** Modernization recommendations, Sass transition log, and risk audit.
- **must include** - Generated in `report/css_report.md`.

---

## SECTION 5: UNIT TESTING AGENT
name: unit-testing-agent

### Purpose
Validates system stability after **every individual version jump**, ensuring modern test patterns are adopted as the project evolves.

### Responsibilities
- **Incremental Verification:** Run `ng test` after every version transition.
- **Helper Modernization:** Update test patterns (e.g., `async` → `waitForAsync`, `OnPush` detection, Signal tests).
- **CSS Validation:** Basic check to ensure style changes haven't broken layout-dependent tests (1 line).

### Workflow
1. Execute and refactor tests for each version phase in the roadmap.
2. Address v21 specific test failures related to subpath resolution or DI changes.

### Outputs
- **Test Status Log:** Phase-by-phase pass/fail result audit.
- **must include** - Generated in `report/test_report.md`.

---

## SECTION 6: DOCUMENTATION AGENT
name: documentation-agent

### Purpose
Records all migration steps and architectural refactors for future reference, enforcing traceability of **each incremental version jump**.

### Responsibilities
- Document what changed in every version jump and why.
- Provide before/after code samples for major pattern shifts.
- Record any CSS migrations or builder-related style fixes (1 line).

### Workflow
1. Build the documentation incrementally as each version jump is validated.
2. Summarize final v21 state and any troubleshooting performed.

### Outputs
- **Migration Documentation (Markdown):** 
  - Comprehensive history of the v16→v21 technical journey.
  - Lessons learned and adopted patterns summarized by phase.
- **must include** - Generated in `docs/documentation.md`.

---

## SECTION 7: MASTER MIGRATION AGENT
# Migration Agent (Angular 16 → 21)

### Purpose
A master agent that orchestrates the entire migration process from Angular 16 to Angular 21 by coordinating the specialized sub-agent logics and explicitly referencing the provided migration manual for all steps.

### Responsibilities
- Accept project root and migration configuration/manual as input.
- Invoke each logic section in the correct order, passing outputs as inputs and referencing manual steps.
- Handle errors, blockers, and validation failures at each stage.
- Ensure all migration steps, tests, and documentation are complete before finalizing.

### Core Workflow
1. **Assessment**: Analyze the current project, detect deprecated patterns, and output a detailed migration checklist for each version step.
2. **Planning**: Generate a step-by-step, dependency-aware migration roadmap.
3. **Implementation**: Apply code/config/architectural changes, update dependencies, and ensure builds succeed for each step.
4. **Unit Testing**: Update and run tests after each implementation step.
5. **Documentation**: Record all changes, new patterns, and lessons learned.
6. **Validation**: After each major step, validate build, test, and runtime status.
7. **Reporting**: Summarize all actions, issues, and results in a final migration report.


