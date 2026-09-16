# Santosh — the adult's guide

The four handouts are written to the kids. This one is written to you: what only
you can do, how to run a Sunday, and how to help without taking the work away.

---

## 1. Do these in week 1. Nobody else can.

- [ ] **Check eligibility.** All four must be in middle or high school on Oct 26.
      At least two of the four must live in or attend school in CA-09. Nobody can
      be on another team this year. CA-09 (Josh Harder) is confirmed as
      participating.
- [ ] **The team is four people.** You are the mentor contact, not a fifth member.
      A team of five is disqualified, not marked down.
- [ ] **Register one student now** so somebody can read the official Submission
      Checklist, which is only visible inside the portal. You need a personal
      (not school) email for each kid, home and school addresses with 9-digit
      ZIPs, and a parent contact for each.
- [ ] **Make the `readycard-app` repository** on GitHub and invite all four. New
      and separate from this one. The repository we submit should contain only
      code the kids wrote.
- [ ] **Turn on GitHub Pages** for it, deploying from `main`. They need a real web
      address by week 3 or the October 4 test cannot happen.
- [ ] **Put October 23 in everyone's calendar as the deadline.** The official one
      is noon Eastern on Oct 26, which is 9am here. Nobody should be relying on
      the morning of the 26th.

Details are in `../docs/ReadyCard-Rules-Compliance.md`.

## 2. Book the real-world test in week 3

Kushu is asked to do this and you will need to make the actual phone call. A
Scout meeting, a practice, a class — anything with real kids and real adults, in
the week of October 19.

It is worth chasing because "we tested it with real families" is a line in the
submission, and a judge can tell the difference between a team that did and a
team that says they will.

## 3. Running a Sunday — about ninety minutes

1. **Two minutes each, in turn.** They show what they built and explain how it
   works. Screen shared. **Record it on a phone, every week.** This is not
   ceremony — the judging rubric scores how well they explain their own code, and
   it is scored from the video. Six rehearsals beats none.
2. **Go round for blockers.** "What stopped you this week?" Anyone who says
   "nothing" and also has nothing to show is stuck and embarrassed. Ask again
   privately.
3. **One decision.** Only one per week. Write it down. The recurring ones are in
   section 6.
4. **Read out what each person is doing next week**, from their sheet.

## 4. How to help without taking it over

This matters more than anything else in this document. The rules require the
students to do the technical work, and the rubric rewards students who can
explain it. **Code you write for them costs points twice** — once because it is
against the spirit of the rules, and once because they cannot explain it on
camera.

So:

- **Ask, do not tell.** "What did you expect that line to do?" "What does the
  console say?" "Which line does the red writing mention?"
- **Make them read the error out loud.** Most of the time they solve it mid-sentence.
- **Type nothing on their keyboard.** If you must demonstrate, do it in a
  different file and make them retype it in their own.
- **Twenty-minute rule.** Genuinely stuck for twenty minutes on the same thing is
  when you step in — earlier teaches them that being stuck is unbearable, much
  later teaches them that it is hopeless.
- **Fix git yourself.** Merge conflicts are not a useful lesson for a 12-year-old
  in week 4. Just sort it out.

### The things that are fair game for you to do

Deployment, GitHub Pages, the service worker in week 5, git disasters,
registration, buying a domain, printing stickers, booking the venue, and driving.
None of that is "coding and technical development" in the sense the rules mean —
and it is most of what actually goes wrong.

## 5. What each person's week 1 should produce

If they bring these to the first Sunday, they are on track.

| Person | Bring this |
|---|---|
| **Hrithvik** | A piece of paper with four numbers on it, and knowing which step saved the most |
| **Nayan** | `form2.html` that builds its boxes from a list — and adding a field live |
| **Manvik** | `hash.html` working, and able to say why the bit after `#` never reaches a website |
| **Kushu** | Six paper sketches, four hex codes, and one screen built in HTML and CSS |

If somebody brings nothing, it is almost always one of three things: they could
not install the software, they did not understand the first instruction, or they
are embarrassed to say they are lost. All three are fixed in ten minutes if you
find out in week 1 and are fatal if you find out in week 4.

## 6. The decisions coming, and roughly when

- **Week 1 — the card's field names.** They are in `setup-everyone.md`. Get all
  four to agree out loud so nobody invents `firstName` later.
- **Week 2 — how big is too big for a QR code.** Hrithvik should answer this by
  printing codes and trying to scan them, not by guessing.
- **Week 3 — stickers.** The measurements say a full card does not fit on a
  1.25-inch sticker. It carries about a name, an allergy and a phone number. Our
  brief says one card per child goes in every code. Both cannot be true. The
  cleanest answer is to say out loud that stickers carry the short version and
  texted codes carry everything — but it is your call and it will come up in the
  video.
- **Week 4 — what gets cut.** See section 8.
- **Week 5 — feature freeze.** Hold this line. Everything after Wednesday of
  week 5 is polish and filming.

## 7. Warning signs, in order of seriousness

1. **October 4 arrives and no phone has scanned another phone.** Stop everything
   else. This is the only real deadline before the real deadline.
2. **Somebody has shown nothing for two Sundays running.** They are lost, not
   lazy. Sit with them one-to-one for an hour and shrink their job.
3. **Nobody has written the video script by the end of week 4.** The video is
   where most of the marks are and it cannot be done in a weekend.
4. **The real-world test has not got a date by October 15.** Drop roster mode and
   test with one family, but test.
5. **Somebody pastes in code they cannot explain.** Catch it kindly at the Sunday
   teach-back — that is partly what the teach-back is for.

## 8. What to cut, in this order

Ten screens is not achievable for four beginners in six weeks. Five is. When time
runs out, drop from the top of this list:

1. Roster mode
2. The printable sticker sheet — the browser's own print does this
3. The active-codes list and resend-all
4. PDF wallet cards
5. Multiple children — one child demonstrates everything

**Never cut:** the Save button, working offline, the field rule in `fields.js`,
and the kid's own note. The first three are the entire engineering argument. The
last one costs a single text box and is the most human thing in the app.

## 9. Disclosing AI, because it will be asked

The rule says AI may be used to support specific parts of the project, must not
be the whole of the technical development, and must be fully disclosed.

What I would say, in the submission and in the video:

> "We used an AI assistant to help plan the project, to check our understanding
> of QR codes, and to build a throwaway prototype we measured against. The four
> of us wrote every line of the app we are submitting."

Then make sure it is true. The prototype in this repository is deliberately in a
different repository from the app for exactly this reason — so that the
submitted repository contains only their work, and the commit history shows four
students building it over six weeks.
