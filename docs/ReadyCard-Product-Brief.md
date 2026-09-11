# ReadyCard — Product Brief
### Congressional App Challenge 2026 | Everything the team needs to know

---

## Table of contents

1. What we're building
2. The problem
3. Who uses it — the three personas
4. The three sharing levels
5. What information we store
6. The complete user journeys
7. Every screen in the app
8. Every scenario we designed for
9. What we are NOT building
10. How the technology works
11. Security and privacy
12. Who builds what
13. The 7-week plan
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

**Problem 3 — Parents face an all-or-nothing choice.**
A soccer coach should know about asthma. He does not need a home address, a birthday, or an insurance number. Today there's nothing in between "tell them nothing" and "hand over everything."

---

# 3. Who uses it — the three personas

A **persona** is just a type of person who uses the app.

## Persona 1 — The Parent (the Owner)

**Who:** A parent or legal guardian of a child 18 or under.

**What they do:**
- Enter and update their child's information
- Choose how much to share and for how long
- Generate QR codes
- Keep a private list of who currently has a code
- Manage the emergency kit checklist

**What protects them:** A 6-digit PIN on their own phone.

## Persona 2 — The Kid (the Subject)

**Who:** The child the information is about, 18 or under.

**What they do:**
- View their own card, so there are no surprises about what adults see
- Write their own notes in their own words
- Carry a printed sticker or wristband

**What they cannot do:** Change medical information, change sharing levels, or generate codes. The parent controls those.

## Persona 3 — The Adult in Charge (the Reader)

**Who:** Coach, tutor, Scout leader, host parent, carpool driver, babysitter, grandparent, teacher, camp counselor.

**What they do:**
- Scan a QR code with their normal phone camera
- Read the card
- Save it until it expires
- Scan several kids into a roster

**What they cannot do:** Edit anything, add anything, or share it onward through the app.

**Important:** The Adult in Charge has **no account**. No signup, no login, no password. This is deliberate — see Section 9.

---

# 4. The three sharing levels

This is the single most important idea in the product. Instead of a complicated permission system, there are three fixed levels. The parent picks one.

## Level 1 — STICKER

Small enough to be safe in public, where a stranger might see it.

- First name only
- Photo
- Allergies
- One parent phone number

**Used for:** helmet stickers, backpack tags, water bottles, wristbands, bike frames.

**Expiry:** none. Reprint when information changes.

## Level 2 — EVENT

What an adult needs for a few hours or a whole season.

- Full name and photo
- Allergies, and how severe
- Medications, and exactly where they're kept
- Conditions that matter right now — asthma, epilepsy, diabetes, severe allergies
- Two emergency contacts
- **Notes written by the kid**

**Used for:** coaches, tutors, host parents, Scout leaders, carpool drivers, camp counselors.

**Expiry:** the parent picks — one evening, one season, one school year.

## Level 3 — FULL

Everything. Shown in person, never printed on a public sticker.

Everything in Event, plus:
- Date of birth
- Doctor's name and phone
- Dentist's name and phone
- Preferred hospital or urgent care
- Insurance carrier and member number
- Last tetanus shot date
- Glasses, hearing aids, wheelchair, or other equipment
- Behavior and sensory notes
- Adults authorized for pickup
- Language spoken at home

**Used for:** grandparents, the emergency room, shelter check-in during an evacuation.

**Expiry:** usually a year, or the length of a trip.

## Why three levels instead of individual checkboxes

A parent in a hurry will not tick twenty boxes. Three buttons takes three seconds. It's also far easier for us to build and far easier to explain in a video.

---

# 5. What information we store

| Field | Sticker | Event | Full |
|---|---|---|---|
| First name | Yes | Yes | Yes |
| Last name | — | Yes | Yes |
| Photo | Yes | Yes | Yes |
| Allergies | Yes | Yes | Yes |
| Allergy severity | — | Yes | Yes |
| Medications and location | — | Yes | Yes |
| Medical conditions | — | Yes | Yes |
| Kid's own notes | — | Yes | Yes |
| Emergency contact 1 | Yes | Yes | Yes |
| Emergency contact 2 | — | Yes | Yes |
| Date of birth | — | — | Yes |
| Doctor name and phone | — | — | Yes |
| Dentist name and phone | — | — | Yes |
| Preferred hospital | — | — | Yes |
| Insurance carrier and ID | — | — | Yes |
| Tetanus shot date | — | — | Yes |
| Equipment (glasses, hearing aids) | — | — | Yes |
| Behavior and sensory notes | — | — | Yes |
| Authorized pickup adults | — | — | Yes |
| Home language | — | — | Yes |

Every field is optional. A parent can fill in three things or twenty.

**Note on photos:** photos display on the parent's phone and on printed cards, but they are too large to fit inside a QR code. See Section 10.

---

# 6. The complete user journeys

## JOURNEY A — The Parent

**A1. First visit.** They open the website on their phone and are asked to create a 6-digit PIN. The PIN protects everything and is never sent anywhere.

**A2. Add to home screen.** The app offers to install itself as an icon. From then on it opens like a regular app and works offline.

**A3. Add a child.** Tap "Add a child." Enter a name, add a photo, fill in allergies, medications, and contacts. Skip anything they don't want to enter.

**A4. Add more children.** Each child gets their own card. Most families have more than one.

**A5. Hand the phone to the kid.** The kid writes their own note. Small feature, big emotional weight.

**A6. Generate a QR code.** Pick a child. Pick a level. Pick an expiry date. The code appears immediately.

**A7. Share it.** Four ways:
- Show the screen so the other adult can scan it directly
- Screenshot and send by text or email
- Save as a PDF and print a wallet card
- Print a sheet of small QR stickers

**A8. The app remembers who has a code.** A private list on the parent's phone: *"Coach John — Event — expires Nov 30."* This is a note to themselves, not a server record.

**A9. Update information.** When a medication changes, they edit the card. The app shows: *"3 people have active codes for Maya. You may want to resend."*

**A10. Emergency kit.** A separate part of the app. Pick a region — earthquake, wildfire, flood, hurricane. Get a checklist sized to the family. Tick items off.

**A11. Expiry reminders.** Monthly nudge: *"Your emergency water expires in 30 days."* This is what brings parents back to the app between emergencies.

**A12. GO mode.** One big button for a real emergency. Shows the grab list, the family meeting point, and every child's full card, all offline.

---

## JOURNEY B — The Adult in Charge

**B1. Receive the code.** By text, by email, on paper, or by looking at the parent's screen.

**B2. Scan it.** Open the normal camera app, point at the code, tap the link that appears. Nothing to install.

**B3. Read the card.** A clean page opens. Allergies at the top, large and red. Contacts one tap to call.

**B4. Save it.** Tap "Keep until Nov 30." Now it's stored in their browser, on their phone.

**B5. Use it offline.** In a gym basement or on a trail with no signal, the saved card still opens. This is the point of the whole design.

**B6. Roster mode.** A coach scans fourteen codes at the start of a season and gets a list of names. Tap a name, see that card.

**B7. It expires on its own.** On the expiry date, the card greys out and is deleted from the browser. They don't have to do anything.

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

---

# 7. Every screen in the app

## Parent side
1. **PIN setup** — first visit only
2. **PIN unlock** — every visit after
3. **Home** — list of children, readiness score, GO button
4. **Add / edit child** — the form
5. **Kid notes** — the kid's own space
6. **Card preview** — see what each level shows
7. **Generate code** — pick level, pick expiry, see the QR
8. **Share** — screen, text, PDF, sticker sheet
9. **Active codes** — who has what, until when
10. **Kit checklist** — by region, with quantities
11. **Reminders** — what's expiring soon
12. **GO screen** — grab list, meeting point, all cards

## Adult in charge side
13. **Card view** — the page a scanned code opens
14. **Roster** — all saved cards, sorted by expiry
15. **Expired notice** — "This code expired on Nov 30. Ask the parent for a new one."

**Fifteen screens.** Four people, seven weeks. That's the budget.

---

# 8. Every scenario we designed for

We don't build a special feature for each of these. We check that none of them break the design.

## Sports and activities
1. **Soccer collision** — coach scans the helmet sticker, sees "asthma, inhaler in green bag"
2. **Basketball season** — one Event code in October, good through March
3. **Swim lessons** — instructor learns about a seizure condition before the kid enters the water
4. **Martial arts** — twenty kids, no paperwork
5. **Dance recital** — backstage helper knows none of the kids

## School and learning
6. **Weekly tutor** — one code for the semester
7. **Field trip** — chaperone scans six kids who aren't hers
8. **Substitute after-school staff** — regular staff is out, sub knows nobody
9. **Summer camp** — counselor collects twelve codes at check-in
10. **Robotics team travel** — overnight trip, two adult drivers

## Scouts and youth groups
11. **Campout injury** — Scoutmaster scans, learns the kid takes seizure medication
12. **Church youth trip** — volunteer leaders who barely know the families
13. **Service day** — kids using tools with adult strangers

## Social
14. **Birthday party** — host parent gets a code the day before, learns about the peanut allergy before the cake
15. **Sleepover** — fourteen hours in someone else's house
16. **Playdate** — two hours at a park
17. **Carpool** — driver has four kids who aren't hers

## Family
18. **Grandparents weekend** — Full code with doctor and dentist
19. **Babysitter** — evening only, Event level
20. **Separated parents** — both hold the same information without arguing over paperwork
21. **Older sibling babysitting** — a 16-year-old still needs the doctor's number

## Travel
22. **Unaccompanied minor flight** — airline staff and the relative on the other end
23. **Vacation with another family** — a week, hundreds of miles away
24. **Out-of-state relatives** — different hospital, different everything

## Emergencies
25. **Separated at a fair or mall** — any adult scans the backpack tag
26. **Bike crash, stranger helps** — someone who's never met this kid
27. **School reunification after a lockdown** — parent shows Full card to prove pickup authority
28. **Wildfire evacuation** — GO screen: grab meds, water, documents, meet at the library
29. **Earthquake** — same GO screen, no internet, no cell service
30. **Emergency room** — parent shows Full card instead of reciting insurance numbers

## Medical
31. **Knocked-out tooth** — roughly 30 minutes to save a permanent tooth; the dentist's number being right there matters
32. **New pediatrician** — read from the card instead of filling out four pages
33. **Allergic reaction at school** — office staff scans and knows where the EpiPen is

## Kids with extra needs
34. **Non-verbal child** — the card speaks for them
35. **Child who wanders** — behavior note explains it and what calms them
36. **Hearing aid or glasses** — adults know what to look for if it goes missing
37. **Parents with limited English** — fill the card in carefully at home instead of struggling with a paper form at check-in

## Emergency kit
38. **Building a first kit** — checklist sized to the family
39. **Monthly reminder** — "water expires in 30 days"
40. **The GO bag** — one screen listing everything to grab, in order

---

# 9. What we are NOT building

**This section matters more than the feature list.** Knowing what to leave out is how four people finish in seven weeks.

### No server, no database, no cloud
Everything lives on the device using it. This isn't laziness — it's the design. There's no server to breach because there's no server.

### No user accounts
No signup, no login, no username, no password reset email. Just a PIN on the parent's own phone.

### No permission management
We are **not** building "Coach John may view fields 3, 7, and 12." Real companies spend months on that. We have three fixed levels and a date.

### No editing by the Adult in Charge
Read-only. They can't add notes, fix typos, or upload anything.

### No live syncing
If a parent edits a card, the coach's saved copy does **not** update. The parent sends a new code. We chose this trade on purpose and we say so in the video.

### No revoke button
Once a code is out, we cannot reach into someone's phone and delete it. **Expiry prevents accidental leftovers, not attacks.** Say this plainly.

### No photos inside the QR code
A QR holds about 2,000 characters. A photo is far larger. Photos appear on the parent's phone and on printed cards, not inside the code.

### No app store
A website that installs to the home screen. No developer account, no review process, no fees. iPhone and Android from one codebase.

### No push notifications
Reminders appear inside the app when opened. Real push notifications need a server.

### No third-party code
No analytics, no ads, no trackers, no Firebase, no login-with-Google. **We can say we read every line of code that runs.**

### No multi-parent sync
Two parents each keep their own copy. Sharing between them is just sending a code.

---

# 10. How the technology works

## What kind of app is this?

A **Progressive Web App (PWA)** — a website that installs to the home screen, works offline, and runs on iPhone and Android from one set of code.

## What we're using

| Piece | Tool | Why |
|---|---|---|
| Structure | HTML | Plain, readable |
| Appearance | CSS | No framework needed |
| Behavior | JavaScript | No React, no build step |
| QR codes | A small QR library | Draws and reads codes on-device |
| Storage | `localStorage` / `IndexedDB` | Built into every browser |
| Encryption | `Web Crypto API` | Built in, government-grade |
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

## What we're honest about

- Our host does see that *somebody* loaded the page. It never sees what was on it.
- If our site goes offline, new scans fail. Already-saved cards keep working.
- About 2,000 characters means no photos in the code.

---

# 11. Security and privacy

## What laws actually apply

**HIPAA — does NOT apply to us.** HIPAA covers doctors, hospitals, and insurers. We are none of those. **Never claim HIPAA compliance.** A knowledgeable judge will catch it.

**COPPA — about collecting data from children under 13.** We never collect anything, because nothing leaves the device. That's not a loophole; it's why we designed it this way.

**FERPA — for schools holding education records.** Doesn't apply. Worth saying we checked.

**State law** — California's CCPA and CPRA include extra protections for minors' data. Local-only storage keeps us clear.

## The standards we followed

| Standard | What it means for us |
|---|---|
| **FIPS 197** | AES-256 encryption for stored data |
| **NIST SP 800-132** | Derive the encryption key from the PIN using PBKDF2, 250,000+ rounds, random salt |
| **NIST SP 800-63B** | PIN handling — lock out after 5 failed attempts |
| **OWASP ASVS** | A security checklist we grade ourselves against |
| **Data minimization** | Share only what's needed — our three levels *are* this principle, built into the product |

## What we actually code

1. Full-level data encrypted with AES-256-GCM before storage
2. Encryption key derived from the parent's PIN, never stored
3. Lockout after five failed PIN attempts
4. Expiry timestamp inside every generated code
5. Sticker level limited to four low-risk fields
6. Zero outbound network requests carrying data

## Why a parent would trust us

Our answer isn't "trust us." It's:

- **There's no server to break into**
- **There's no account, so nothing links back to you**
- **The QR is the data, not a database lookup**
- **The parent chooses the level every time**
- **Our source code is public — read it**
- **Compare it to what we replace:** a paper form in a coach's glovebox for six months. We are strictly safer than that.

---

# 12. Who builds what

Four people, four areas. Everyone works on the video.

**Person 1 — Cards and security**
Add/edit child screens, PIN setup and unlock, encryption, local storage.

**Person 2 — QR generation**
Turning a card plus a level plus an expiry into a QR code. PDF wallet cards. Printable sticker sheets.

**Person 3 — The reader**
The page a scanned code opens. Saving to the browser, roster mode, expiry handling, offline support.

**Person 4 — Kit and design**
Emergency kit checklist, expiry reminders, GO screen, readiness score, and making the whole app look good on a phone.

**Everyone together:** demo video, written submission, and real-world testing.

---

# 13. The 7-week plan

| Week | Goal |
|---|---|
| **1** | Everyone reads this document. Sketch all fifteen screens on paper. Set up GitHub. Agree on colors and fonts. |
| **2** | Person 1 builds "add a child." Person 4 builds the kit checklist. Persons 2 and 3 learn the QR library. |
| **3** | **First QR generated and scanned end to end.** Ugly is fine. This is the most important week — if this slips, everything slips. |
| **4** | Three levels. Expiry. PIN and encryption. |
| **5** | Roster mode. Printable stickers. GO screen. Visual design pass. |
| **6** | **Test at a real event.** A troop meeting, a practice, a class. Fix what breaks. |
| **7** | Record the video. Write the submission. Submit before October 26. |

---

# 14. How we'll know it worked

- A parent who has never seen the app can create a card in under three minutes
- An adult who has never seen the app can scan and read a card in under thirty seconds
- A saved card opens with the phone in airplane mode
- The browser's network tab shows no child data leaving the device
- At least one real family used it at a real event before we submitted

---

# 15. FAQ

### About the product

**Q: Is this a website or an app?**
A website that installs to your home screen like an app. No app store.

**Q: Does the adult in charge need to install anything?**
No. They use their regular camera app and their regular browser.

**Q: Do I need an account?**
No. No signup, no password, no email. Just a PIN on your own phone.

**Q: Where is my child's information stored?**
In your phone's browser storage. Not on the internet, not on our computers, nowhere else.

**Q: What if I get a new phone?**
For our MVP, you'd re-enter the information. We chose this because building backup and restore safely takes more time than we have.

**Q: Can two parents both have the cards?**
Each parent enters it on their own phone, or one sends the other a Full code. There's no automatic syncing.

**Q: What if I lose my PIN?**
There's no reset, because there's no server that could reset it. Your data stays encrypted and inaccessible. This is the honest cost of having no accounts.

### About sharing

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
No, and we're upfront about that. Once an image is on someone's phone we can't delete it. Expiry stops the code from displaying after the date, which handles the everyday case — but it isn't protection against someone deliberately keeping the data.

**Q: What happens when my child's information changes?**
Edit the card, then resend. The app keeps a private list of who has an active code and reminds you.

**Q: Can the coach share my child's code with someone else?**
Technically yes — he could forward the image. This is why we have levels. Only send Full codes to people you'd hand your child's insurance card to.

### About the technology

**Q: How does a code made in California work in New York?**
The QR code contains the data itself, not a link to a database. The coach's browser downloads a blank page from us and fills it in from the code. Nothing is looked up, so distance is irrelevant.

**Q: Does it work without internet?**
Once the reader has saved a card, yes, fully offline. The very first scan needs a connection to download the blank page.

**Q: What if your website shuts down?**
Cards people already saved keep working. New scans would stop. We'd publish the code so anyone could host it.

**Q: How much information fits in a QR code?**
Roughly 2,000 characters. Enough for all our text fields. Not enough for a photo, which is why photos live on the phone instead.

**Q: Is it really encrypted?**
Full-level data stored on the parent's phone is encrypted with AES-256 using a key derived from their PIN. The QR payload itself is encoded, not encrypted — which is why Sticker level only holds low-risk fields.

### About safety and the law

**Q: Is this HIPAA compliant?**
No, and it doesn't need to be. HIPAA applies to healthcare providers and insurers. We're a family tool. We don't claim HIPAA compliance and neither should anyone describing our app.

**Q: What about COPPA?**
COPPA governs collecting data from children online. We never collect anything — nothing leaves the device. That's the whole reason for the architecture.

**Q: Is it safe to put a QR code on my kid's helmet where strangers can see it?**
The Sticker level holds a first name, a photo, an allergy, and one phone number. That's less than what's printed on most school ID badges. Everything sensitive requires a code you sent directly.

**Q: Do you sell or share any data?**
There is nothing to sell. We never receive any data. There are no ads, no analytics, and no third-party code in the app at all.

### About the project

**Q: Why only kids under 18?**
Adults can speak for themselves, carry ID, and own phones with medical info already in them. Children get handed to other adults constantly, often can't explain their own conditions under stress, and usually don't have a phone. The need is real and specific.

**Q: Why didn't you use Firebase or a normal database?**
Because we're storing health information about children. The safest database is no database. It was harder to build, and it's the most interesting engineering decision we made.

**Q: What would you build next if you had more time?**
Encrypted backup and restore, multi-parent sync, printable wallet cards in more languages, and a version schools could hand out at registration.
