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

### Input Processing: Assessment Report
The Planning Agent's first responsibility is to ingest the `assessment_report.md`. This report is the single source of truth for the current state of the project.

- **Data Breakdown and Compartmentalization:** The agent parses the report, breaking down the assessment data into structured, usable components. This includes lists of deprecated APIs, configuration issues, and dependency conflicts.
- **No Hallucination:** The agent operates exclusively on the data provided in the report. It is strictly forbidden from inventing or assuming issues that are not explicitly mentioned. The planning process must be traceable back to the assessment findings.

### Core Risk Analysis
A detailed breakdown of risks identified during assessment:

- **Dependency Conflicts:** Risks associated with third-party libraries that are incompatible with newer Angular versions. This can lead to build failures or runtime errors.
- **Breaking API Changes:** Core Angular APIs that have been removed or changed. Code relying on these APIs will fail until it is refactored.
- **Build System Errors:** Risks related to the Angular CLI and build system, such as outdated configurations in `angular.json` that are no longer supported.
- **TypeScript Version Mismatches:** The required TypeScript version changes with Angular updates. Failure to align this will prevent the project from compiling.
- **Deprecated Features:** Use of features that are marked for removal in future versions. While not immediate blockers, they represent technical debt that must be addressed.

### Phased Migration Strategy

#### Phase 1: Angular Core Updates
- **Objective:** Update all official `@angular/*` packages to the next target version.
- **Tasks:**
    - Run `ng update @angular/core @angular/cli` for the target version.
    - Validate that `package.json` reflects the correct versions.
    - Perform a clean install of `node_modules`.

#### Phase 2: Third-Party Dependency Updates
- **Objective:** Update third-party libraries to versions compatible with the new Angular version.
- **Tasks:**
    - Identify and update libraries with known incompatibilities.
    - Address peer dependency warnings.
    - Test critical functionality involving these libraries.

#### Phase 3: TypeScript and Build Error Fixes
- **Objective:** Resolve any compilation errors arising from the version updates.
- **Tasks:**
    - Fix TypeScript syntax errors and type mismatches.
    - Update `tsconfig.json` as required by the new version.

#### Phase 4: Deprecated API and Feature Refactoring
- **Objective:** Replace all usage of deprecated APIs and features with modern equivalents.
- **Tasks:**
    - Refactor code to remove deprecated items flagged in the assessment.
    - Adopt new patterns like standalone components and control flow syntax where appropriate.

#### Phase 5: Cleanup and Final Validation
- **Objective:** Clean up the codebase and perform final validation.
- **Tasks:**
    - Remove obsolete files and configurations.
    - Run the full test suite to ensure application stability.
    - Perform a final build and serve the application.

### Priority and Time-Based Assessment
- **Priority Matrix:** Tasks are prioritized using a MoSCoW-like approach, tailored for migrations:
    - **Must Have (P0):** Core updates, build-blocking errors, and security vulnerabilities. These are non-negotiable for a version jump.
    - **Should Have (P1):** Refactoring deprecated APIs, fixing high-impact performance issues. Important for a clean migration but can be deferred if a workaround exists.
    - **Could Have (P2):** Adopting new optional features, minor code cleanup. Nice-to-haves that improve the codebase but don't block the migration.
    - **Won't Have (P3):** Out-of-scope changes, major feature rewrites.
- **Time Estimation:** Each task is assigned an estimated time using a t-shirt sizing model (S, M, L, XL) which translates to a rough hour/day estimate. This provides a flexible timeline that accounts for unforeseen complexities. For example:
    - **S:** < 2 hours (e.g., simple config change)
    - **M:** 2-8 hours (e.g., refactoring a single deprecated API across the codebase)
    - **L:** 1-3 days (e.g., a full version core update and fixing resulting build errors)
    - **XL:** > 3 days (e.g., major third-party library migration)

### Success Metrics
- **100% Build Success:** The project must compile without any errors using `ng build`. No warnings related to the migration itself should be present.
- **100% Test Suite Pass Rate:** All unit and end-to-end tests must pass. Test coverage should not decrease.
- **Zero Regression:** All primary features and critical user flows of the application must be fully functional and visually identical to the pre-migration state.
- **100% Component, Module, and Import Migration:** All components, modules, and imports must be fully migrated to the target version's standards. This includes:
    - No more deprecated APIs in use.
    - All components correctly using modern patterns (e.g., standalone components, new control flow syntax).
    - All module imports (`NgModule` and ES6 imports) are correct and optimized.
- **No Console Errors:** The application runs in the browser with a clean console at startup and during interaction with key features.

### Acceptance Criteria
- **Version Alignment:** `package.json` confirms that all `@angular/*` packages and their dependencies are aligned to the exact target version.
- **Clean Installation:** `npm install` completes without any peer dependency errors (unless explicitly accepted as a low-risk item).
- **Successful Application Launch:** The application launches successfully using `ng serve` and is accessible in the browser.
- **Automated Verification:** The entire verification process (build, test, lint) is automated and runs successfully in a CI/CD-like environment.
- **Full Agent Automation:** The entire migration process is executed by an agent with full, autonomous control over the command line, requiring zero human intervention for prompts, decisions, or error handling.

### Migration Experience Learnings
- **Windows Environment:** Be aware of potential file-locking issues with the `node_modules` directory. Plan for a "Clean Sweep" task using `rimraf` as a standard procedure between version jumps to prevent state corruption.
- **Bootstrapping:** The `main.ts` file is a critical point of failure. Ensure the bootstrapping method (`bootstrapModule` vs. `bootstrapApplication`) is correct for the target Angular version and architecture (module-based vs. standalone).
- **Standalone Components:** A common error source is the incorrect declaration of standalone components. They must be in the `imports` array of an `NgModule` or the component they are used in, not `declarations`. Plan for a verification step to check this.
- **Final Report:** The `implementation_log.md` is generated and shows a successful migration.

### Final Report and Execution Plan
The final output is the `migration_plan.md`, which includes:
- **Executive Summary:** A high-level overview of the migration goals and timeline.
- **Phased Execution Plan:** A detailed, ordered list of tasks, grouped by phase, with dependencies and validation criteria for each.

### Rollback Capability
- **Mechanism:** If any phase of the migration fails catastrophically, the agent must have the capability to revert the codebase to its previous state. This is achieved by using Git to reset the changes.
- **Trigger:** A failure is defined as an unresolvable build error or a critical test failure that cannot be fixed within a predefined time limit.
- **Looping for Success:** If a rollback occurs, the process does not terminate. The agent will re-evaluate the failed step, adjust the plan, and re-attempt the migration. This loop continues until the migration for that version is successfully achieved.