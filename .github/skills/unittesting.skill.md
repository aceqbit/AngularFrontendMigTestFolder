---
name: Angular Migration Unit Testing
description: >
  Manages and executes unit tests to ensure the application remains stable throughout the migration process.
  This skill is responsible for updating tests to be compatible with new Angular versions and verifying that all tests pass.

dependencies:
  - `implementation.skill.md`

tasks:
  - task: Update outdated test configurations.
    instructions:
      - Modify `karma.conf.js` and `tsconfig.spec.json` to align with the new Angular version.
      - Update testing libraries like Jasmine and Karma as needed.
    files:
      - `karma.conf.js`
      - `tsconfig.spec.json`
    notes:
      - Prefer minimal test-config changes that keep the suite moving instead of broad rewrites.

  - task: Refactor deprecated testing APIs.
    instructions:
      - Scan all `*.spec.ts` files for deprecated testing utilities and APIs.
      - Refactor tests to use the modern, recommended APIs.
      - When many modules fail together, isolate the first failing spec or the changed feature area before expanding the fix.

  - task: Run the full unit test suite.
    instructions:
      - Execute `ng test` with the `--watch=false` flag to run all tests once after the focused specs pass.
      - If the suite is too heavy or fails across many modules, switch to targeted specs for the changed area first, then retry the full suite.
      - Ensure that the command exits with a zero status code, indicating all tests passed.

  - task: Generate the Test Report.
    instructions:
      - Capture the output of the test run.
      - Summarize the results, including the number of tests passed, failed, and skipped.
      - Save the report to `report/test_report.md`.
      - Include the next recovery step whenever a run fails so the process does not stall or go blank.
    output: `report/test_report.md`
---
