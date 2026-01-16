\# Flow Luck Doctrine (流年 / 流月 / 流日 / 流时) — SSOT



This document defines the ONLY valid rules for dynamic time-based BaZi influences.



---



\## DEFINITION



Flow Luck refers to time-based influences layered onto:

1\. Natal chart

2\. Luck Pillars (大运)



They are temporal modifiers, not identity changers.



---



\## HIERARCHY OF INFLUENCE (TOP → BOTTOM)



1\. Hour (流时)

2\. Day (流日)

3\. Month (流月)

4\. Year (流年)

5\. Luck Pillar (大运)

6\. Natal Chart (immutable base)



Higher layers modify expression temporarily.

Lower layers define structure.



---



\## YEAR FLOW (流年)



\- Uses JiaZi year based on solar year

\- Changes at 立春

\- Interacts with:

&nbsp; - Natal pillars

&nbsp; - Current Luck Pillar



---



\## MONTH FLOW (流月)



\- Solar-term based

\- Changes at major solar terms (节)

\- Must align with calendar doctrine



---



\## DAY FLOW (流日)



\- Continuous JiaZi cycle

\- Derived from normalized local date

\- Used for:

&nbsp; - Daily guidance

&nbsp; - Date selection



---



\## HOUR FLOW (流时)



\- Derived from apparent solar time

\- Zi hour starts at 23:00

\- Used for:

&nbsp; - Qi Men activation

&nbsp; - Fine-grained timing



---



\## INTERACTION RULES



\- Flows interact via:

&nbsp; - Stem combinations

&nbsp; - Branch clashes

&nbsp; - Ten Gods activation

\- No flow may:

&nbsp; - Redefine Day Master

&nbsp; - Redefine natal strength



---



\## CONFLICT RESOLUTION



When conflicts arise:

\- Natal > Luck Pillar > Year > Month > Day > Hour

Lower layers cannot override higher authority layers.



---



\## FORBIDDEN PRACTICES



Invalid:

\- Using Gregorian months for 流月

\- Using lunar dates for 流日

\- Mixing flow layers arbitrarily

\- Ignoring Luck Pillar context



---



\## ENGINE CONTRACT



Engine must expose:

\- `flow.year`

\- `flow.month`

\- `flow.day`

\- `flow.hour`

\- `flow.current\_context`



---



\## NON-NEGOTIABLE



\- Flow layers are recalculated dynamically

\- Natal chart is NEVER recalculated

\- Any deviation is an engine error



This doctrine is binding across all systems.



