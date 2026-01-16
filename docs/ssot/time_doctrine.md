\# TIME \& TIMEZONE DOCTRINE (SSOT)



\## 1. PURPOSE

This document defines the single authoritative doctrine for handling

date, time, and timezone in all metaphysics computations.



This doctrine is binding for:

\- BaZi (Four Pillars)

\- Qi Men Dun Jia

\- Flying Star Feng Shui

\- Date Selection

\- All future engines



No calculation may contradict this document.



---



\## 2. CORE PRINCIPLE (NON-NEGOTIABLE)



\*\*All metaphysics charts are computed based on the LOCAL CIVIL TIME

at the PLACE where the event occurs.\*\*



\- Birth → place of birth

\- Event → place of event

\- Analysis → converted only after chart generation



Time is NEVER computed based on:

\- Server timezone

\- User current location

\- Viewer location



---



\## 3. INPUT REQUIREMENTS (USER-FACING)



Required inputs:

\- Date (YYYY-MM-DD)

\- Time (HH:MM)

\- Location (City / Country OR lat/long)



Optional but recommended:

\- Timezone (IANA, e.g. Asia/Kuala\_Lumpur)



If timezone is not provided:

\- It is inferred from location



---



\## 4. TIMEZONE HANDLING



\### 4.1 Canonical Rule

\- User input time is assumed to be \*\*local civil time at the given location\*\*

\- Timezone offsets are applied \*\*only internally\*\*



\### 4.2 DST (Daylight Saving Time)

\- DST is respected \*\*if historically applicable\*\* at that location and date

\- DST rules are determined by IANA timezone database



---



\## 5. SOLAR TIME VS CIVIL TIME



\### 5.1 Default Rule

\- Charts are generated using \*\*local civil time\*\*

\- Solar time adjustment is \*\*optional and explicit\*\*



\### 5.2 Solar Adjustment (Advanced Mode)

If enabled:

\- Longitude-based solar correction may be applied

\- This affects:

  - Hour pillar

  - Qi Men hour plate

\- Solar correction NEVER changes:

  - Date

  - Day pillar



---



\## 6. SAME CLOCK TIME, DIFFERENT LOCATIONS (CRITICAL)



Two individuals born at:

\- Same date

\- Same clock time

\- Different locations



→ \*\*WILL NOT necessarily share the same chart\*\*



Reason:

\- Different longitude

\- Different timezone offsets

\- Different solar position



This is expected and correct in classical metaphysics.



---



\## 7. UTC NORMALIZATION (INTERNAL ONLY)



\- UTC is used ONLY for:

  - Internal comparison

  - Storage

  - Auditing



UTC must NEVER be shown to users as chart time.



---



\## 8. OUTPUT RULES



All outputs must:

\- State the interpreted local time

\- State the location used

\- State whether solar adjustment was applied



Transparency is mandatory.



---



\## 9. FORBIDDEN PRACTICES



The following are explicitly forbidden:

\- Reinterpreting user time to server timezone

\- Guessing location from IP

\- Applying solar correction silently

\- Mixing civil and solar rules



---



\## 10. CHANGE CONTROL



This doctrine is versioned.



Any change requires:

\- New SSOT version

\- Explicit migration notes

\- No silent retroactive recalculation

