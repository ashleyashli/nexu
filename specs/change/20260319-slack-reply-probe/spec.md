---
id: "20260319-slack-reply-probe"
name: "Slack Reply Probe"
status: new
created: "2026-03-19"
---

## Overview

- Add a local `pnpm probe:slack` developer probe that verifies the main Slack reply path is still alive after local runtime or OpenClaw dependency changes.
- Target a single high-signal case: open the Nexu bot DM in Slack Web with a reused logged-in browser profile, send one message, and observe whether Nexu posts a reply back into the same conversation.
- Treat this as a developer environment probe rather than a general-purpose test suite or CI e2e flow. The goal is fast confidence that the real end-to-end path is not broken in local development.
- Background:
  - Existing browser e2e coverage in `apps/web` is outdated for this purpose and only exercises Nexu-owned UI.
  - Sending Slack messages purely through bot-side APIs was already tried and is not feasible.
  - OpenClaw dependency trimming can break the integrated Slack -> API -> Gateway/OpenClaw -> Slack reply chain in ways that unit tests do not catch.
- Success means one command can be run in a prepared local environment to give a clear pass/fail signal on whether the Slack DM reply loop still works.

## Research

<!-- What have we found out? What are the alternatives considered? -->

## Design

<!-- Technical approach, architecture decisions -->

## Plan

<!-- Break down implementation and verification into steps -->

- [ ] Phase 1: Implement the first part of the feature
  - [ ] Task 1
  - [ ] Task 2
  - [ ] Task 3
- [ ] Phase 2: Implement the second part of the feature
  - [ ] Task 1
  - [ ] Task 2
  - [ ] Task 3
- [ ] Phase 3: Test and verify
  - [ ] Test criteria 1
  - [ ] Test criteria 2

## Notes

<!-- Optional: Alternatives considered, open questions, etc. -->
