IMPORTANT:
Do NOT delete the existing TrackSync mobile functionality.

Preserve the existing:
- block request workflow
- request status
- approved block
- active work
- task completion
- evidence upload
- notifications
- profile

However, redesign the mobile ENTRY EXPERIENCE and HOME EXPERIENCE to be much simpler and more field-friendly.

The current mobile home is too data-dense.

The goal is:

SIMPLE
FAST
FIELD-FRIENDLY
PREMIUM
CLEAR

==================================================
PRODUCT
==================================================

TRACKSYNC

AI-Powered Maintenance Block Planning for Indian Railways

The mobile application is primarily used by:
1. Department Maintenance Supervisors
2. Field Engineers / Maintenance Staff

The mobile app is NOT a miniature version of the planner dashboard.

==================================================
VISUAL STYLE
==================================================

LIGHT THEME.

Premium white interface.

Colors:

Navy #123B66
Deep Navy #0B2545
Primary Blue #1769AA
Saffron #F28C28
India Green #138A4B
Background #F7F9FC
White #FFFFFF
Text #17202A
Secondary #64748B
Border #E2E8F0

Use premium blue gradients only on primary CTAs.

Use green for success.
Saffron for warning.
Red only for critical/error states.

Use subtle saffron-white-green accents.

Keep the UI spacious.

Avoid dense dashboards.

Avoid too many cards.

Avoid tiny text.

Avoid unnecessary charts on the mobile home.

==================================================
STARTUP EXPERIENCE
==================================================

Create a premium 3–5 second opening animation.

STEP 1:

Warm off-white background.

Centered:

नमस्ते

Elegant Devanagari font.

Soft fade-in.

A subtle saffron-white-green line appears.

STEP 2:

Fade to:

वन्दे मातरम्

Use elegant Devanagari typography.

STEP 3:

Fade to:

TRACKSYNC

AI-Powered Maintenance Block Planning

STEP 4:

Show:

“Plan smarter. Maintain safer. Keep trains moving.”

STEP 5:

A very subtle railway track line animation leads into the login screen.

Do NOT copy Apple's exact design or branding.

Keep it:
minimal
premium
Indian
calm
modern

==================================================
LOGIN SCREEN
==================================================

Create a clean mobile login screen.

Top:

TRACKSYNC

Small subtitle:

“Railway maintenance, coordinated.”

Fields:

Employee ID
Password

Primary CTA:

“Sign In”

Secondary:

“Need help?”

Add:

“Authorized railway personnel only”

Keep the screen extremely simple.

Do not use unnecessary input fields.

==================================================
ROLE EXPERIENCE
==================================================

Support:

Maintenance Supervisor
Field Engineer

For prototype demonstration, allow role selection through a simple segmented selector:

Supervisor
Field Engineer

Do NOT make the user configure complicated permissions.

Each role should automatically receive the appropriate home experience.

==================================================
SUPERVISOR HOME
==================================================

The Supervisor home should be extremely simple.

Header:

“नमस्ते, Supervisor”

“Good morning. What would you like to do?”

Primary large CTA:

“Apply for Maintenance Block”

This should be the most visually prominent action on the screen.

Secondary actions:

“My Requests”
“Approved Blocks”
“Today's Work”

Then show only a compact:

“Next Block”

B014
A–B Section
22:00–00:30

Status:
APPROVED

Do NOT show 6+ KPI cards.

Do NOT fill the screen with analytics.

A supervisor should immediately understand:
what can I do?
what is my next block?
what needs my attention?

Bottom navigation:

Home
Requests
Blocks
Tasks
Profile

==================================================
FIELD ENGINEER HOME
==================================================

For Field Engineer role, make the experience even simpler.

Header:

“नमस्ते, Engineer”

“Your field work for today”

Hero section:

“Next Task”

Track Inspection

A–B Section
KM 42+300

22:00–23:30

Priority:
High

Large CTA:

“View Task”

Then show:

TODAY

Task 1
Track Inspection
Pending

Task 2
OHE Visual Check
Pending

Task 3
Signal Inspection
Completed

Do not show complex analytics.

No large KPI dashboard.

==================================================
SUPERVISOR — APPLY FOR BLOCK
==================================================

The primary home CTA:

“Apply for Maintenance Block”

must open a simple guided form.

Do NOT show one giant form.

Use a multi-step flow.

STEP 1:

Select Department

Engineering
Signal & Telecom
Traction Distribution

Use large cards / segmented choices.

STEP 2:

Select Work Type

Dynamically show options based on selected department.

Engineering:
Inspection
Preventive Maintenance
Track Repair
Track Replacement
Welding
Point & Crossing Maintenance
Other

S&T:
Signal Inspection
Signal Repair
Track Circuit Maintenance
Interlocking Maintenance
Telecom Maintenance
Cable Work
Other

Traction:
OHE Inspection
OHE Repair
Electrical Maintenance
Isolator Maintenance
Transformer Maintenance
Other

STEP 3:

Location

Division
Section / Corridor
From Station
To Station
Asset ID

Use searchable dropdowns.

STEP 4:

Why is the block required?

Scheduled Maintenance
Preventive Maintenance
Defect Repair
Emergency Repair
Inspection
Safety-related Work
Overdue Maintenance

STEP 5:

Criticality information

Safety Critical:
Yes / No

Severity:
Low / Medium / High / Critical

Overdue:
Yes / No

Clearly show:

“Final priority will be assessed by TrackSync AI.”

STEP 6:

Preferred Date

Use a beautiful simple calendar.

Allow:
First preference
Second preference
Third preference

STEP 7:

Preferred Time

From
To

Also include:

“Any suitable time”

STEP 8:

Required duration

Large interactive slider:

30 min ───────── 8 hours

Show selected value prominently.

Example:

2h 00m

STEP 9:

Resources

Team Size
Equipment
Safety requirements

Use chips and dropdowns rather than long text fields.

STEP 10:

Department coordination

Ask:

“Can this work be coordinated with another department?”

Choices:

Engineering
S&T
Traction

Show subtle message:

“TrackSync AI may identify additional compatible work.”

STEP 11:

Description + Evidence

Description field.

Photo upload.

STEP 12:

Review Request

Show a clean summary.

Primary CTA:

“Submit Block Request”

==================================================
REQUEST SUBMISSION
==================================================

After submission:

Show:

✓ Request Submitted

BR-1024

Status:

AI Analysis Pending

Progress:

Submitted
→ AI Analysis
→ Planner Review
→ Approved
→ Scheduled

==================================================
APPROVED BLOCK
==================================================

Make approved blocks visually clear.

Example:

BLOCK B014

A–B Section

18 September
22:00–00:30

APPROVED

Engineering
Track Repair

S&T
Signal Inspection

Traction
OHE Inspection

Train Impact:
Low

Primary CTA:

“View Work Plan”

==================================================
FIELD TASK
==================================================

For Field Engineer:

Show:

YOUR NEXT TASK

Track Inspection

A–B Section
KM 42+300

22:00–23:30

Priority:
High

Large button:

START WORK

After clicking:

WORK IN PROGRESS

Show actual elapsed time.

Actions:

Pause
Report Issue
Upload Evidence
Complete Work

==================================================
COMPLETE WORK
==================================================

Keep completion flow extremely simple.

Checklist:
Work completed
Safety checks completed
Section cleared

Upload photo.

Add remarks.

Primary CTA:

“Complete Work”

Then show:

✓ Work Completed

==================================================
MOBILE UX RULES
==================================================

Field engineers should not have to understand:
- AI models
- optimization mathematics
- railway scheduling algorithms
- complex analytics

They only need:

WHAT
WHERE
WHEN
STATUS
WHAT DO I DO NEXT?

The Supervisor needs:

REQUEST
TRACK
APPROVE/RECEIVE
EXECUTE

The Planner's detailed analytics remain on Web.

==================================================
FINAL MOBILE FEEL
==================================================

The app should feel:

Calm
Premium
Very easy
Fast
Readable
Field-ready
Indian Railway specific

The user should be able to open the app and understand what to do within 3 seconds.

Do NOT create a dense enterprise dashboard on mobile.