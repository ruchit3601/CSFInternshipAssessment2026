# Internship Assessments

This repository contains two take-home assessment tracks. Complete the track you were assigned by the hiring contact.

| Track | Path | Focus |
|---|---|---|
| Computer Vision | `track1-cv-dogs/` | Build and evaluate a dog re-identification pipeline. |
| Fullstack | `track2-fullstack/` | Audit, fix, and extend the FarmTracker web app. |

Each track includes its own brief with detailed requirements and deliverables. Read the relevant brief before starting work.
## How To Submit
Submit your work by opening a pull request against the `main` branch of this repository.

Your pull request description must include:
- Your full name
- Your email address
- The assessment track you completed
- A concise summary of the work you did
- Setup and run instructions, including any dependencies or environment assumptions
- Test instructions and the test results you observed
- Screenshots, sample output, or result visualisations where relevant
- A short discussion of trade-offs, limitations, and what you would do next with more time

Treat the pull request description as part of the assessment. A reviewer should be able to understand your approach, verify your work, and see your judgment without first reading every line of code.

## Expectations

- Keep your changes scoped to the assigned track unless you were explicitly asked to do otherwise.
- Commit code, documentation, and small fixtures needed to reproduce your work.
- Do not commit secrets, credentials, API keys, private data, virtual environments, dependency folders, or large raw datasets.
- If your solution depends on an external dataset or model artifact, document how to obtain it and include a small reproducible sample or example output when practical.
- Prefer clear, reviewable commits over one large undifferentiated commit.
- Update any README or usage instructions that become outdated because of your changes.
- Utilize agents and AI to do as much as possible. This is becoming the norm.

## Track Details

### Computer Vision Track

Start with [`track1-cv-dogs/BRIEF.md`](track1-cv-dogs/BRIEF.md). The goal is to prototype a pipeline that identifies whether query images contain the same individual dog as a reference image or reference gallery.

Your submission should include a runnable prototype, evaluation results, visualisations of successes and failures, and a short report.

### All Other Tracks

Start with [`track2-fullstack/BRIEF.md`](track2-fullstack/BRIEF.md), then review [`track2-fullstack/TODO.md`](track2-fullstack/TODO.md). The goal is to inherit a small livestock record management app, audit it, fix bugs, implement weight tracking, and explain your decisions.

Your submission should include the required audit, code changes with tests, the feature implementation, any architectural improvement or proposal, and a retrospective.
