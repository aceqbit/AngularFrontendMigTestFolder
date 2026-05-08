
# Combined Migration Agent (v16 → v21)

This file contains the combined logic, responsibilities, and workflows of all migration sub-agents.


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


