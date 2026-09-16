# ReadyCard — Official Rules and Compliance

**Source:** congressionalappchallenge.us, read September 15, 2026.
Primary sources: the [2026 CAC Rulebook (PDF)](https://www.congressionalappchallenge.us/wp-content/uploads/2026/05/2026-CAC-Rules.pdf),
the [Rules page](https://www.congressionalappchallenge.us/students/rules/),
the [Judging Rubric (PDF)](https://www.congressionalappchallenge.us/wp-content/uploads/2022/09/CAC-Judging-Rubric.pdf),
and the [Congressional FAQ](https://www.congressionalappchallenge.us/congress/frequently-asked-questions/).

This document records what the rules actually say and where our plan needs to change.
Anything here beats anything in the Pitch or the Product Brief.

---

## 1. Five things that change our plan

**1. The deadline is 12:00 pm Eastern — 9:00 am Pacific.**
Not end of day. Our README says "October 26" and every plan we've written assumes a
full day. In California we lose the morning of the 26th. **Treat Friday October 23 as the
real deadline.** The 26th is for disasters only.

**2. Maximum four students on a team. We currently list five people.**
The rulebook: *"Any team with more than four (4) students is not eligible to compete."*
The team is Hrithvik, Manvik, Nayan, and Kushu — four. Santosh is a mentor, not a
teammate, and must be registered as the parent/mentor contact, never as a fifth member.
Getting this wrong is not a deduction; it is disqualification.

**3. Judges score the code from the video, not from the repo.**
Congressional offices give judges the demonstration videos and the written answers.
The repo is not automatically included. Our pitch leans on *"read the code yourself"* —
that card is weaker than we thought. The rubric has a line called CODE worth 5 points,
and the top score reads *"Explanation of code indicates immense understanding."*
**The video has to explain the code out loud.** Our current video plan is the airplane-mode
scan and nothing else. That wins FUNCTION and loses CODE.

**4. A minimal app is scored below a complex one.**
The FUNCTION line tops out at *"App is functional with complex features"* — a merely
working app scores 3 of 5. We cut aggressively to ship, which was right, but we have to
*show* the hard parts: fitting a card into 2,000 characters, working with no network,
self-expiring storage. Cutting features is the right call; letting the video look simple is not.

**5. AI is allowed, and the rule tells us exactly how to use it.**
Full text in Section 4. Short version: permitted, must be fully disclosed, may support
specific parts, may not be the whole technical development, and students must show real
individual contribution and technical understanding. Our two-track plan already fits.

---

## 2. Eligibility — the hard gates

| Rule | Us |
|---|---|
| Enrolled in middle or high school on **October 26, 2026** | Yes — 6th–8th grade counts |
| U.S. residents at submission (citizenship not required) | Confirm for all four |
| District must be hosting a Challenge | **CA-09 (Josh Harder) is participating** ✅ |
| Compete in the district you live in **or** attend school in | Pick one — cannot enter two districts |
| Teams of up to **four** students | Exactly four. See §1. |
| **At least half** of teammates live or attend school in the same district | At least 2 of 4 must be CA-09 |
| One app per student per year, no entering on multiple teams | Confirm nobody is on another team |
| App must be created after **October 30, 2025** | Fine — we start now |

**Action:** confirm in writing which district each of the four is claiming, and that at
least two of them are CA-09. Do this before anyone writes code, not in October.

---

## 3. Registration — what each student needs

One teammate creates the team profile and invites the other three. Each student needs:

- A **personal email address — not a school email**
- Home address with **9-digit ZIP**, plus Congressional District and Member
- School address with **9-digit ZIP**, plus Congressional District and Member
- A parent or guardian's name and email
- Coding teacher or mentor name and email (optional)

There is an eligibility quiz before the full application unlocks.

Register at [congressionalappchallenge.us](https://www.congressionalappchallenge.us/students/student-registration/)
→ the portal is at `webportalapp.com/sp/congressional_app_challenge_2026`.
The official Submission Checklist lives inside that portal, not on the public site —
**someone should register early just to read it.**

**After the deadline, every team member completes the Exit Questionnaire individually.**
Same link, four separate submissions. Don't let this get missed in November.

---

## 4. Originality, libraries, and AI — verbatim

**Originality:**
> "The app must be original and solely created by the contestant. All coding and technical
> development must be done by the student or student team. While participants may use
> open-source libraries, frameworks, and external tools, they must clearly document any
> such usage and ensure their project reflects significant personal effort and technical
> understanding."

**AI usage:**
> "The use of AI tools in app development for the Congressional App Challenge is permitted,
> provided that all AI usage is fully disclosed in the submission materials. AI may only be
> used to support specific aspects of the project and must not constitute the entirety of the
> technical development. Participants are expected to demonstrate significant individual
> contributions and technical understanding of their app."

### What this means for us

**The QR library must be documented.** It is the one piece of third-party code we use.
Name it, link it, say what it does and what we wrote ourselves. Our "no third-party code"
line in the Brief means *no analytics, ads, or trackers* — it has never meant zero libraries,
and we should say it the precise way from now on so nobody catches us on it.

**Our AI position.** We use AI to plan, to explain concepts, to design-prototype, and to
review our work. The four of us write the app's code. We disclose that plainly in the
submission.

**Why the design prototype stays out of the repo.** Not purity — the CODE rubric line.
Each person has to be able to explain their own area on camera well enough that a judge
scores it *"immense understanding."* You cannot do that with code you pasted. The prototype
is a picture of where we're going. The repo is ours.

---

## 5. The judging rubric — 30 points

Officially, offices may score on three criteria: quality of the idea, implementation
(user experience and design), and demonstrated excellence of coding. The published rubric
breaks that into 30 points, and offices choose whether to use it. It is the best signal we have.

### CONCEPT — 15 points

| Line | 1 point | 5 points | Where we stand |
|---|---|---|---|
| **Ideology** | Doesn't address an issue | Issue or need is extremely relevant | **Strong.** Every judge has kids, had kids, or was one. |
| **Impact** | Unoriginal, not impactful | Immense creativity, impact clearly explained | **Strong, if we say it.** The Section 4 field rule is the creative act. Name it out loud. |
| **Structure** | Over time, hard to view | Organized, explains all aspects | Ours to lose. 3 minutes, clean audio, no rambling. |

### TECHNOLOGY — 15 points

| Line | 1 point | 5 points | Where we stand |
|---|---|---|---|
| **Function** | Lacks functionality | Functional **with complex features** | Risk. Must show compression, offline, and expiry — not just one scan. |
| **Code** | Video does not explain code | Explanation indicates immense understanding | **Biggest gap.** Nothing in our video plan explains code yet. |
| **UI** | Rudimentary design | Highly innovative in design and interface | Kushu's area. Forms-based apps lose here by default. |

**The two weakest boxes are Code and Function, and both are fixed in the video, not in the
codebase.** Plan the video in Week 4, not Week 6.

---

## 6. The demonstration video — required contents

Maximum **3 minutes**, minimum 1. Over or under may be penalized. Public on YouTube or Vimeo.

Required by the rules:
- [ ] The name of **each participant**
- [ ] The name of the app
- [ ] The purpose of the app, **in one clear sentence**
- [ ] The target audience
- [ ] The tools and coding languages used
- [ ] A showcase of the app's functionality

Required by the rubric, on top of that:
- [ ] An explanation of the code that shows we understand it

### A three-minute budget

| Time | Content |
|---|---|
| 0:00–0:20 | The silence at practice. The problem. |
| 0:20–0:35 | Four names, app name, one-sentence purpose, who it's for |
| 0:35–1:05 | Parent creates a card, picks an expiry, generates a code |
| 1:05–1:35 | **Airplane mode. Printed sticker. Stranger scans it. Card appears.** |
| 1:35–2:20 | **The code.** URL fragments and why our server never sees the data. Squeezing a card into 2,000 characters. The Section 4 rule enforced in code. Each person speaks to their own part. |
| 2:20–2:45 | Tools and languages. What we're honest about. |
| 2:45–3:00 | Close. |

The airplane-mode scan is still the centerpiece. It is now 30 seconds of a 3-minute video
rather than the whole thing, because 5 of the 30 points are sitting in the segment right after it.

---

## 7. Written submission questions

The portal asks questions like these. Drafting answers in Week 5 is not too early —
three of them are already answered in our documents.

1. **Title of your app** — ReadyCard
2. **Explain the app's purpose** — one sentence, the same one from the video
3. **What inspired you** — the coach asking a question nobody could answer
4. **What technical/coding difficulty did you face, and how did you address it?** —
   *This is our best question.* The 2,000-character limit: short keys, compression,
   measuring a worst-case card. Or the fragment architecture. Pick one and go deep.
5. **What did you learn? Biggest takeaway?** — each person answers honestly
6. **What would you change in a 2.0?** — backup and restore, the emergency kit,
   multi-parent sync, more languages. We already know this list.

---

## 8. Other rules worth knowing

**Judges can demand the source code.**
> "The Judges have the right to request access to the App and source code in person or via
> any reasonable manner… Failure by a Contestant to honor such a request will result in the
> Submission's immediate disqualification."

Our plan to make the repo public already covers this. Keep the commit history honest —
it is the evidence that four students built this over six weeks.

**Content suitability.** Must not violate the privacy rights of third parties. Relevant to us:
**use fake children and fake data in the video and in every screenshot.** No real allergy,
no real phone number, no real address, and no real kid's face on camera without the
parent's written permission.

**Intellectual property.** We keep our rights. Congress and the administrator get a royalty-free
license to post the submission and use it non-commercially. Open-sourcing is compatible.

**Publicity.** Entering means consenting to use of winners' names, likenesses, and hometowns.

**Results are embargoed until January 15, 2027.** Winners are announced by the Member's
office in December.

**Judges are picked by the Member's office** and are only required to have basic familiarity
with programming. Write and speak for a smart person who does not code.

---

## 9. What to do this week

- [ ] Confirm all four are middle/high school students, U.S. residents, and that **at least two are CA-09**
- [ ] Confirm nobody is on another team this year
- [ ] Decide which district each student claims — live-in or attend-school-in
- [ ] Collect four personal (non-school) email addresses and two 9-digit ZIPs per student
- [ ] **One person registers now** and reads the Submission Checklist inside the portal
- [ ] Change every reference to the deadline to read **October 23** internally
- [ ] Add "explain the code" to the video plan and assign each segment to a person
- [ ] Fix the "no third-party code" wording in the Pitch and Brief to "no analytics, ads, or trackers"
