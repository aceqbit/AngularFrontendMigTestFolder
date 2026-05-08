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
