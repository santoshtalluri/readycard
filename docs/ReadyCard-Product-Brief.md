# ReadyCard — Product Brief
### Congressional App Challenge 2026 | Everything the team needs to know

**Version 2 — updated after the September 13 strategy session.**
This version replaces the first brief. If you read the old one, four things changed:
the PIN is gone, the three sharing levels are gone, the emergency kit is gone,
and we added a rule about which fields are allowed inside a QR code.

---

## Table of contents

1. What we're building
2. The problem
3. Who uses it — the three personas
4. What goes in the code, and what never does
5. What information we store
6. The complete user journeys
7. Every screen in the app
8. Every scenario we designed for
9. What we are NOT building
10. How the technology works
11. Security and privacy
12. Who builds what
13. The 6-week plan
14. How we'll know it worked
15. FAQ

---

# 1. What we're building

**A website where a parent enters important information about their child, turns it into a QR code, and hands that QR code to an adult who will be taking care of that child.**

The adult scans the code with their phone camera and sees a clean emergency card. They don't install anything. They don't sign up for anything.

Everything lives on the phones of the people using it. There is no server, no database, and no company holding anyone's data.

---

# 2. The problem

## The moment

A kid falls at basketball practice and can't answer questions clearly. The coach asks, *"Does anyone know if he's allergic to anything?"*

Nobody answers.

## Three real problems underneath it

**Problem 1 — The information doesn't travel with the kid.**
It lives on a paper form filled out in August, in a text message from three months ago, or in a parent's head. None of those are present when something happens.

**Problem 2 — Kids usually don't have phones.**
Apple and Google both built emergency medical features into phones. Those only help if you own the phone. Most kids under 13 don't, and older kids leave them in backpacks.

**Problem 3 — The information has to reach places the internet doesn't.**
Gym basements. School interiors. Campgrounds. Trailheads. Anything that depends on a signal fails exactly where kids get hurt. This is why we built the whole app to work with no connection at all.

---

# 3. Who uses it — the three personas

A **persona** is just a type of person who uses the app.

## Persona 1 — The Parent (the Owner)

**Who:** A parent or legal guardian of a child 18 or under.

**What they do:**
- Enter and update their child's information
- Preview exactly what a scanner will see
- Generate QR codes with an expiry date
- Keep a private list of who currently has a code
- Show the complete record on screen when someone genuinely needs all of it

**What protects them:** the lock screen already on their phone. See Section 11.

## Persona 2 — The Kid (the Subject)

**Who:** The child the information is about, 18 or under.

**What they do:**
- View their own card, so there are no surprises about what adults see
- Write their own notes in their own words
- Carry a printed sticker or wristband

**What they cannot do:** Change medical information or generate codes. The parent controls those.

## Persona 3 — The Adult in Charge (the Reader)

**Who:** Coach, tutor, Scout leader, host parent, carpool driver, babysitter, grandparent, teacher, camp counselor.

**What they do:**
- Scan a QR code with their normal phone camera
- Read the card
- Tap **Save** to keep it on their phone until it expires
- Scan several kids into a roster

**What they cannot do:** Edit anything, add anything, or share it onward through the app.

**Important:** The Adult in Charge has **no account**. No signup, no login, no password. This is deliberate — see Section 9.

---

# 4. What goes in the code, and what never does

**This is the single most important design rule in the product. Read it twice.**

There is **one card** per child. There are no sharing levels, no tiers, no toggles, and nothing for a parent to decide in the moment. Instead, the app itself decides which fields are allowed to leave the phone.

## The rule

> **A QR code is a piece of paper. Assume anyone can read it and anyone can forward it.**

So the app sorts every field into one of two buckets, and the parent never has to think about it.

### Bucket 1 — Travels in the QR code

The things an adult needs in the first four minutes of a problem:

- First and last name
- Allergies, and how severe
- Medications, and exactly where they're kept
- Medical conditions that matter right now — asthma, epilepsy, diabetes
- Two emergency contacts
- The kid's own notes

### Bucket 2 — Never encoded. Lives only on the parent's phone.

The things that are useful at a hospital desk but dangerous in a group chat:

- Date of birth
- Insurance carrier and member number
- Doctor, dentist, preferred hospital
- Medical history
- Authorized pickup adults
- Home address

When one of these is genuinely needed — an ER admission, a school reunification desk — the parent **unlocks their phone and shows the screen.** That's a thirty-second interaction with someone standing in front of them. It never becomes an image in someone's camera roll.

## Why this is the right call

Anyone can decode a QR code in ten seconds. That is not a flaw we can patch; it is how QR codes work, and every app that uses them has the same property. A password would defeat the point, because the whole promise is that a coach can read it with nothing but a camera.

So we don't pretend the code is private. **We control what exists to leak.**

A code on a helmet holds an allergy and a phone number — less than a school ID badge. A member number and a date of birth, the two things actually useful for identity theft, are never in a code at all, so forwarding one accomplishes nothing.

**Say this in the video.** "We decided what our app is *not allowed* to put in a QR code" is a sentence a non-technical judge understands immediately, and it is a real engineering decision.

---

# 5. What information we store

| Field | In the QR code | On the phone only |
|---|---|---|
| First name | Yes | — |
| Last name | Yes | — |
| Allergies | Yes | — |
| Allergy severity | Yes | — |
| Medications and where they're kept | Yes | — |
| Medical conditions | Yes | — |
| Kid's own notes | Yes | — |
| Emergency contact 1 | Yes | — |
| Emergency contact 2 | Yes | — |
| Photo | — | Yes |
| Date of birth | — | Yes |
| Insurance carrier and member number | — | Yes |
| Doctor name and phone | — | Yes |
| Dentist name and phone | — | Yes |
| Preferred hospital | — | Yes |
| Medical history | — | Yes |
| Tetanus shot date | — | Yes |
| Equipment (glasses, hearing aids) | — | Yes |
| Behavior and sensory notes | — | Yes |
| Authorized pickup adults | — | Yes |
| Home address | — | Yes |
| Home language | — | Yes |

Every field is optional. A parent can fill in three things or twenty.

**Note on photos:** a QR code holds about 2,000 characters and a photo is far larger, so photos cannot be encoded even if we wanted them to be. They display on the parent's phone and on printed cards.

**Note on behavior and sensory notes:** these currently sit in the phone-only bucket. If testing in Week 5 shows that coaches of non-verbal or neurodivergent kids genuinely need them mid-activity, we can move them into the code — they contain no identity information. Decide this with real data, not in a meeting.

---

# 6. The complete user journeys

## JOURNEY A — The Parent

**A1. First visit.** They open the website on their phone. No signup, no PIN, no email. They land on an empty home screen with one button: *Add a child.*

**A2. Add to home screen.** The app offers to install itself as an icon. From then on it opens like a regular app and works offline.

**A3. Add a child.** Enter a name, fill in allergies, medications, and contacts. Skip anything they don't want to enter. Fields that will never be encoded are marked in the form with a small lock icon and the words *stays on this phone*.

**A4. Add more children.** Each child gets their own card. Most families have more than one.

**A5. Hand the phone to the kid.** The kid writes their own note. Small feature, big emotional weight.

**A6. Preview the card.** Before generating anything, the parent taps **Preview** and sees the exact page a coach will see. We call this **WYSIWTG — What You See Is What They Get.** No surprises, and no need to trust us about what's in the code.

**A7. Generate a QR code.** Pick a child. Pick an expiry date. The code appears immediately.

**A8. Share it.** Four ways:
- Show the screen so the other adult can scan it directly
- Screenshot and send by text or email
- Save as a PDF and print a wallet card
- Print a sheet of small QR stickers

**A9. The app remembers who has a code.** A private list on the parent's phone: *"Coach John — expires Nov 30."* This is a note to themselves, not a server record.

**A10. Update information.** When a medication changes, they edit the card. The app shows: *"3 people have active codes for Maya. You may want to resend."* One tap regenerates all three.

**A11. Show the full record.** For an ER desk or a school reunification table, the parent opens the child's page on their own phone and shows it. Insurance and date of birth appear here and nowhere else.

---

## JOURNEY B — The Adult in Charge

**B1. Receive the code.** By text, by email, on paper, or by looking at the parent's screen.

**B2. Scan it.** Open the normal camera app, point at the code, tap the link that appears. Nothing to install.

**B3. Read the card.** A clean page opens. Allergies at the top, large and red. Contacts one tap to call.

**B4. Tap Save. This step is not optional and the button must be impossible to miss.**

Scanning the code does **not** by itself put the card on the coach's phone. The data arrived in the web address; the moment he closes the tab, it's gone. Tapping **Save** is what writes it into his browser's storage.

The failure we are designing against: a coach scans a code in the parking lot with full signal, drives to a campground with none, opens his phone, and has nothing. If he didn't tap Save, that happens.

So: the Save button is the largest thing on the page after the allergies, it says what it does — *"Keep on this phone until Nov 30"* — and if he tries to leave without tapping it, the page asks once.

**B5. Use it offline.** In a gym basement or on a trail with no signal, the saved card opens instantly. **This is the point of the whole design and it is the centerpiece of our demo video.**

**B6. Roster mode.** A coach scans fourteen codes at the start of a season and gets a list of names. Tap a name, see that card. Works offline once saved.

**B7. It expires on its own.** On the expiry date, the card stops displaying and is deleted from the browser. He doesn't have to do anything.

---

## JOURNEY C — The Kid

**C1. See your own card.** The parent opens it. You see exactly what an adult will see. No surprises.

**C2. Write your note.** Your space, your words:
- "I panic during thunderstorms."
- "I'm deaf in my left ear — talk to my right side."
- "If I go quiet, I'm about to have a panic attack."
- "My inhaler is in the front pocket of my blue bag."

**C3. Carry your sticker.** Helmet, water bottle, backpack tag, wristband.

**C4. If something happens.** Point at your sticker. Any adult with a phone can scan it.

**Why this journey exists at all.** Most safety products treat a child as a record to be managed. The note is the one place the kid speaks for himself, and adults who have read a kid's own words treat him differently. It costs us one text field and it's the most human thing in the app.

---

# 7. Every screen in the app

## Parent side
1. **Home** — list of children, *Add a child* button
2. **Add / edit child** — the form, with lock icons on phone-only fields
3. **Kid notes** — the kid's own space
4. **Card preview (WYSIWTG)** — exactly what a scanner sees
5. **Generate code** — pick expiry, see the QR
6. **Share** — screen, text, PDF, sticker sheet
7. **Active codes** — who has what, until when, resend all

## Adult in charge side
8. **Card view** — the page a scanned code opens, with the Save button
9. **Roster** — all saved cards, sorted by expiry
10. **Expired notice** — "This code expired on Nov 30. Ask the parent for a new one."

**Ten screens.** The first version of this brief had fifteen. Removing the PIN, the sharing levels, and the emergency kit took five screens out of the build — which is the whole reason we made those decisions. Four people, six weeks. That's the budget.

---

# 8. Every scenario we designed for

We don't build a special feature for each of these. We check that none of them break the design.

## Sports and activities
1. **Soccer collision** — coach scans the helmet sticker, sees "asthma, inhaler in green bag"
2. **Basketball season** — one code in October, good through March
3. **Swim lessons** — instructor learns about a seizure condition before the kid enters the water
4. **Martial arts** — twenty kids, no paperwork
5. **Dance recital** — backstage helper knows none of the kids
6. **Gym with no signal** — the reason Save exists

## School and learning
7. **Weekly tutor** — one code for the semester
8. **Field trip** — chaperone scans six kids who aren't hers
9. **Substitute after-school staff** — regular staff is out, sub knows nobody
10. **Summer camp** — counselor collects twelve codes at check-in
11. **Robotics team travel** — overnight trip, two adult drivers

## Scouts and youth groups
12. **Campout injury** — Scoutmaster scans, learns the kid takes seizure medication, ten miles from a cell tower
13. **Church youth trip** — volunteer leaders who barely know the families
14. **Service day** — kids using tools with adult strangers

## Social
15. **Birthday party** — host parent gets a code the day before, learns about the peanut allergy before the cake
16. **Sleepover** — fourteen hours in someone else's house
17. **Playdate** — two hours at a park
18. **Carpool** — driver has four kids who aren't hers

## Family
19. **Grandparents weekend** — code for the weekend; if there's a hospital visit, they call the parent
20. **Babysitter** — evening only
21. **Separated parents** — both hold the same information without arguing over paperwork
22. **Older sibling babysitting** — a 16-year-old still needs a contact number that works

## Travel
23. **Unaccompanied minor flight** — airline staff and the relative on the other end
24. **Vacation with another family** — a week, hundreds of miles away
25. **Out-of-state relatives** — a code made in California, scanned in New York, no lookup required

## Emergencies
26. **Separated at a fair or mall** — any adult scans the backpack tag
27. **Bike crash, stranger helps** — someone who's never met this kid
28. **School reunification after a lockdown** — parent shows the full record on their own screen to prove pickup authority
29. **Emergency room** — parent shows insurance and date of birth on screen instead of reciting them

## Medical
30. **Knocked-out tooth** — roughly 30 minutes to save a permanent tooth; the parent pulls up the dentist's number on their phone
31. **New pediatrician** — read from the card instead of filling out four pages
32. **Allergic reaction at school** — office staff scans and knows where the EpiPen is

## Kids with extra needs
33. **Non-verbal child** — the card speaks for them
34. **Child who wanders** — the kid's note explains what calms them
35. **Hearing aid or glasses** — adults know what to look for if it goes missing
36. **Parents with limited English** — fill the card in carefully at home instead of struggling with a paper form at check-in

---

# 9. What we are NOT building

**This section matters more than the feature list.** Knowing what to leave out is how four people finish in six weeks.

### No server, no database, no cloud
Everything lives on the device using it. This isn't laziness — it's the design. There's no server to breach because there's no server.

### No user accounts and no PIN
No signup, no login, no username, no password reset, and no app lock. The parent's phone already has a lock screen, a fingerprint reader, or a face scanner, and it is better than anything four students would build in six weeks. Adding our own PIN would have meant a PIN setup screen, an unlock screen, a lockout counter, and a "you lost your PIN and your data is gone forever" conversation — for a second lock sitting behind a lock that's already there.

### No sharing levels or permission management
We are **not** building "Coach John may view fields 3, 7, and 12," and we are not building a tier picker either. Real companies spend months on permission systems. We have one rule — Section 4 — and the app applies it, not the parent.

### No editing by the Adult in Charge
Read-only. They can't add notes, fix typos, or upload anything.

### No live syncing
If a parent edits a card, the coach's saved copy does **not** update. The parent sends a new code. We chose this trade on purpose and we say so in the video.

### No revoke button
Once a code is out, we cannot reach into someone's phone and delete it. **Expiry prevents accidental leftovers, not attacks.** Say this plainly.

### No photos inside the QR code
A QR holds about 2,000 characters. A photo is far larger. Photos appear on the parent's phone and on printed cards, not inside the code.

### No emergency supply kit, grab list, or GO mode
These were in the original concept and we cut them. They're checklist screens with no real engineering in them, they split a three-minute video in half, and every hour spent on them is an hour not spent on the QR work that actually makes this project interesting. If ReadyCard continues after October, this is the first thing we add back.

### No app store
A website that installs to the home screen. No developer account, no review process, no fees. iPhone and Android from one codebase.

### No push notifications
Reminders appear inside the app when opened. Real push notifications need a server.

### No third-party code
No analytics, no ads, no trackers, no Firebase, no login-with-Google. **We can say we read every line of code that runs.**

### No design tools in the pipeline
We sketch on paper and then hand-write HTML and CSS. We are not exporting from Canva or any other design tool — those produce markup that can't be maintained, and unpicking it costs more than writing it ourselves. Paper, then code.

### No fix for the same-device scan
If a coach receives a code as a screenshot on the same phone he'd scan with, he can't point a camera at his own screen. We looked at building a file-upload path into the viewer and decided it isn't worth a day of our six weeks. The answer is: the parent shows their screen, or sends it to someone who can print it. We say this out loud rather than hiding it.

---

# 10. How the technology works

## What kind of app is this?

A **Progressive Web App (PWA)** — a website that installs to the home screen, works offline, and runs on iPhone and Android from one set of code.

## What we're using

| Piece | Tool | Why |
|---|---|---|
| Structure | HTML | Plain, readable, hand-written |
| Appearance | CSS | No framework needed |
| Behavior | JavaScript | No React, no build step |
| QR codes | A small QR library | Draws and reads codes on-device |
| Storage | `localStorage` / `IndexedDB` | Built into every browser |
| Offline | Service Worker | Standard PWA technique |
| Hosting | GitHub Pages or Vercel | Free, and serves only static files |

## The key trick — how a QR works with no server

The QR code contains a web address that looks like this:

```
readycard.app/view#eyJuYW1lIjoiTWF5YSIsImFsbGVy...
```

Everything after the `#` is called a **URL fragment**. Browsers **never send fragments to the server**. That's a rule built into how the web works.

So when a coach scans:

1. His browser asks our site for the page — just the page, empty
2. Our site sends back HTML, CSS, and JavaScript with no data in it
3. His browser reads the information out of its own address bar
4. His browser fills in the card and displays it

**Our website never receives a single word of any child's information.**

We can prove it live by opening the browser's network tab during the demo.

## California to New York

The QR code **is** the data, not a pointer to a database. The coach's phone gets the blank page from the internet and the child's information from the code itself. Nothing is looked up, so distance is irrelevant.

## Two different things go offline, and they work differently

This confuses everyone, including us at first. Keep them separate.

**The page** is cached by the service worker the first time the coach's phone loads it. That's automatic.

**The card** arrives in the URL fragment and is not stored anywhere until he taps Save. That's manual, on purpose, and it's why B4 exists.

So the honest sentence is: *the first scan needs a connection; everything after that doesn't.*

## The 2,000-character problem

A QR code holds roughly 2,000 characters, and a card with long medication instructions can get close. Two things buy us room:

- Short keys in the encoded data — `n` instead of `"firstName"`, `a` instead of `"allergies"`
- Compressing the text before encoding it

This is real work and it belongs to whoever owns QR generation. Measure a worst-case card in Week 2, before anyone assumes it fits.

---

# 11. Security and privacy

## What laws actually apply

**HIPAA — does NOT apply to us.** HIPAA covers doctors, hospitals, insurers, and the companies that work for them. We are none of those. **Never write or say that ReadyCard is HIPAA compliant.** It isn't true, it isn't necessary, and a judge who knows the law will mark us down for claiming it. If someone asks, the answer is: *"HIPAA doesn't cover family tools. Here's what we did instead."*

**COPPA — about collecting data from children under 13.** We never collect anything, because nothing leaves the device. That's not a loophole; it's why we designed it this way.

**FERPA — for schools holding education records.** Doesn't apply. Worth saying we checked.

**State law** — California's CCPA and CPRA include extra protections for minors' data. Local-only storage keeps us clear.

## What actually protects a parent

Be precise here, because this is where projects get caught overstating.

| Threat | What protects against it |
|---|---|
| A company leaking a database | There is no database and no company holding anything |
| Someone intercepting the data in transit | The data never travels over the network — the fragment stays in the browser |
| Someone picking up the parent's phone | The phone's own lock screen |
| A coach forwarding a code | Section 4 — the code contains nothing worth stealing |
| A stranger scanning a helmet sticker | Same — an allergy and a phone number, less than a school ID badge |
| A stale code sitting on an old phone | Expiry; the viewer refuses to render it and deletes it |

## What we do NOT claim

- **We do not encrypt the QR payload.** It's encoded, not encrypted. Anyone can decode it. We're saying so first, before a judge does, and Section 4 is our answer.
- **We do not encrypt local storage.** Without a PIN there's no key to derive one from, and the phone's own lock is doing that job.
- **Expiry is not a cryptographic lock.** The viewer refuses to display an expired code and deletes its saved copy. Someone determined could still decode the original string. We prevent accidents, not attacks, and we say exactly that.

## The standards we did follow

| Standard | What it means for us |
|---|---|
| **OWASP ASVS** | A public security checklist we grade ourselves against |
| **Data minimization** | Section 4 *is* this principle, built into the product instead of promised in a policy |
| **Privacy by design** | The architecture makes the breach impossible rather than unlikely |

## Why a parent would trust us

Our answer isn't "trust us." It's:

- **There's no server to break into**
- **There's no account, so nothing links back to you**
- **The QR is the data, not a database lookup**
- **The app decides what can leave your phone, and Preview shows you**
- **Our source code is public — read it**
- **Compare it to what we replace:** a paper form with a birthdate and an insurance number on it, sitting in a coach's glovebox for six months. We are strictly safer than that.

---

# 12. Who builds what

Four students, four areas, plus Santosh as team lead. Everyone works on the video.

| Person | Area | What that means |
|---|---|---|
| **Hrithvik** | QR generation | Turning a card plus an expiry into a QR code. The 2,000-character problem. PDF wallet cards and printable sticker sheets. |
| **Manvik** | The reader | The page a scanned code opens. The Save button and offline storage. Roster mode. Expiry handling. |
| **Nayan** | Cards and data | Add/edit child screens, the kid's notes screen, the Preview screen, the active-codes list, and enforcing the Section 4 field rule in code. |
| **Kushu** | Design and the story | How the whole app looks on a phone, the printed sticker design, the demo video, and the written submission. |
| **Santosh** | Lead | Scope, decisions, testing logistics, deadline. |

**Why this split.** Hrithvik and Manvik were in the September 13 session and already have the serverless architecture in their heads, so they own the two halves of the QR path — the hardest part of the project and the part the video is built on. Nayan and Kushu need the Section 4 briefing before they start; that's the first agenda item Sunday.

**Kushu's area is not the leftover job.** Design is one of three scoring criteria, worth the same as the code, and forms-based apps lose there by default. A judge watches a video — Kushu owns the thing the judge actually sees.

**Swap these on Sunday if people want different areas.** Better to argue about it now than in Week 4.

---

# 13. The 6-week plan

Registration and submission close **October 26, 2026.** Everything below works backwards from that.

| Week | Dates | Goal |
|---|---|---|
| **1** | Sep 14–20 | Everyone reads this document. Nayan and Kushu get the serverless briefing. Sketch all ten screens on paper. Agree colors and fonts. Everyone can clone the repo and push. |
| **2** | Sep 21–27 | Nayan builds "add a child." Kushu designs the card. Hrithvik and Manvik learn the QR library and **measure a worst-case card against the 2,000-character limit.** |
| **3** | Sep 28–Oct 4 | **First QR generated on one phone and scanned on another, end to end.** Ugly is fine. This is the make-or-break week — if this slips, everything slips. |
| **4** | Oct 5–11 | Expiry. The Save button and offline storage. Section 4 field rule enforced in code. Preview screen. |
| **5** | Oct 12–18 | Roster mode. Printable stickers. Active-codes list and resend. Full visual design pass. |
| **6** | Oct 19–26 | **Test at a real event** early in the week — a troop meeting, a practice, a class. Fix what breaks. Record the video. Write the submission. **Flip the GitHub repo to public.** Submit. |

**Two hard checkpoints.** If the Week 3 scan doesn't work, we stop adding features and fix only that. If the Week 6 test hasn't happened by Oct 22, we drop roster mode and test with one family.

---

# 14. How we'll know it worked

- A parent who has never seen the app can create a card in under three minutes
- An adult who has never seen the app can scan and read a card in under thirty seconds
- A saved card opens with the phone in **airplane mode** — this is the shot the video is built around
- The browser's network tab shows no child data leaving the device
- Nothing in the Section 4 phone-only list ever appears inside a generated code — test this deliberately
- At least one real family used it at a real event before we submitted

---

# 15. FAQ

### About the product

**Q: Is this a website or an app?**
A website that installs to your home screen like an app. No app store.

**Q: Does the adult in charge need to install anything?**
No. They use their regular camera app and their regular browser.

**Q: Do I need an account?**
No. No signup, no password, no email, and no PIN.

**Q: Why no PIN? Isn't that less safe?**
Your phone already locks. A second lock behind the first one doesn't add protection — it adds a screen to build, a lockout to manage, and a way to permanently lose your own data. We'd rather put that time into the part of the product that actually matters.

**Q: Where is my child's information stored?**
In your phone's browser storage. Not on the internet, not on our computers, nowhere else.

**Q: What if I get a new phone?**
You'd re-enter the information. Backup and restore is the right feature and we don't have time to build it safely. It's on the list for after October.

**Q: Can two parents both have the cards?**
Each parent enters it on their own phone, or one sends the other a code. There's no automatic syncing.

### About sharing

**Q: Why can't I choose what goes in the code?**
Because a parent standing in a parking lot with a kid in the car should not have to make a privacy decision in four seconds. The app already made it, the same way every time, and Preview shows you the result before you send anything.

**Q: Do I have to send a new code every time my kid goes to practice?**
No. Set the expiry to match the relationship, not the session. A basketball coach gets one code in October that works until March.

**Q: What expiry should I pick?**

| Situation | Expiry |
|---|---|
| Birthday party | That evening |
| Sports season | End of season |
| Weekly tutor | End of semester |
| Scout troop | End of school year |
| Grandparents | One year |
| Helmet sticker | No expiry |

**Q: Can I take back a code I already sent?**
No, and we're upfront about that. Once an image is on someone's phone we can't delete it. Expiry stops the code from displaying after the date, which handles the everyday case — a coach whose phone still has last season's roster. It isn't protection against someone deliberately keeping the data.

**Q: What happens when my child's information changes?**
Edit the card, then resend. The app keeps a private list of who has an active code and offers to regenerate all of them at once.

**Q: Can the coach forward my child's code to someone else?**
Technically yes. That's exactly why the code holds an allergy and a phone number instead of a date of birth and an insurance number. Forwarding it doesn't give anyone anything useful.

**Q: How do I give the emergency room my insurance information?**
You show them your phone. That information is never in a code, so it can never end up in someone's camera roll.

### About the technology

**Q: How does a code made in California work in New York?**
The QR code contains the data itself, not a link to a database. The coach's browser downloads a blank page from us and fills it in from the code. Nothing is looked up, so distance is irrelevant.

**Q: Does it work without internet?**
Once the reader has tapped Save, yes, fully offline. The very first scan needs a connection to download the blank page.

**Q: What if the coach forgets to tap Save?**
Then he has nothing when he gets to the campground. This is the single most likely way our app fails a real family, which is why the Save button is the biggest thing on the page and why we ask again if he tries to leave.

**Q: What if your website shuts down?**
Cards people already saved keep working. New scans would stop. The code is public, so anyone could host it.

**Q: How much information fits in a QR code?**
Roughly 2,000 characters. Enough for our text fields if we keep the encoding tight. Not enough for a photo.

**Q: Is the QR code encrypted?**
No. It's encoded, and anyone can decode it in about ten seconds. That's true of every QR code, and it has to be — a coach reads it with nothing but a camera, so a password would defeat the entire point. Our answer isn't to lock the code. It's to control what's allowed inside it.

**Q: Someone scanned a code with a screenshot on the same phone and couldn't do it.**
Correct — you can't point a phone's camera at its own screen. Ask the parent to show you their screen directly, or print it. We chose not to spend a week of a six-week project on this.

### About safety and the law

**Q: Is this HIPAA compliant?**
No, and it doesn't need to be. HIPAA applies to healthcare providers and insurers, not to a tool a family uses on its own phone. We don't claim HIPAA compliance and neither should anyone describing our app.

**Q: What about COPPA?**
COPPA governs collecting data from children online. We never collect anything — nothing leaves the device. That's the whole reason for the architecture.

**Q: Is it safe to put a QR code on my kid's helmet where strangers can see it?**
It holds a name, an allergy, and a phone number. That's less than what's printed on most school ID badges, and nothing in it helps anyone impersonate your child.

**Q: Do you sell or share any data?**
There is nothing to sell. We never receive any data. There are no ads, no analytics, and no third-party code in the app at all.

### About the project

**Q: Why only kids under 18?**
Adults can speak for themselves, carry ID, and own phones with medical info already in them. Children get handed to other adults constantly, often can't explain their own conditions under stress, and usually don't have a phone. The need is real and specific.

**Q: Why didn't you use Firebase or a normal database?**
Because we're storing health information about children. The safest database is no database. It was harder to build, and it's the most interesting engineering decision we made.

**Q: What did you cut, and why?**
A PIN, three sharing levels, and an emergency supply kit. All three were in our first design. We cut them because four people in six weeks can build ten screens well or fifteen screens badly, and because each one turned out to be solving a problem we'd invented rather than a problem families have.

**Q: What would you build next if you had more time?**
Backup and restore, the emergency kit and GO mode, multi-parent sync, cards in more languages, and a version schools could hand out at registration.
