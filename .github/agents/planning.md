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