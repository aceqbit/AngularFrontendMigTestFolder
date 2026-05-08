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