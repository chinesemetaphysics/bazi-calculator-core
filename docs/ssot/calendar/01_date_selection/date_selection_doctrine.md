\# Date Selection (择日) Doctrine — SSOT



This document defines the ONLY valid framework for date selection (择日).



---



\## PURPOSE OF 择日



Date selection is used to:

\- Reduce friction

\- Avoid unnecessary conflict

\- Enhance probability of smooth execution



It is NOT used to:

\- Change destiny

\- Override natal chart

\- Guarantee outcomes



---



\## INPUT LAYERS (MANDATORY ORDER)



Date selection must consider, in strict order:



1\. \*\*User Context\*\*

&nbsp;  - Purpose (marriage, signing, travel, surgery, launch)

&nbsp;  - Location

&nbsp;  - Time sensitivity



2\. \*\*Natal Chart Constraints\*\*

&nbsp;  - Direct clashes to Day Master

&nbsp;  - Critical branch conflicts (冲, 刑, 害)



3\. \*\*Luck Pillar Context (大运)\*\*

&nbsp;  - Supportive vs opposing cycles



4\. \*\*Annual / Monthly Flow\*\*

&nbsp;  - 流年 / 流月 compatibility



5\. \*\*Calendar Systems\*\*

&nbsp;  - 建除十二神 (12 Day Officers)

&nbsp;  - 二十八宿 (28 Lunar Mansions)



---



\## 12 DAY OFFICERS (建除十二神)



Usage rules:

\- Officers define suitability of actions

\- Each officer permits specific activities

\- Officers NEVER override BaZi conflicts



Forbidden:

\- Using officers alone

\- Ignoring natal clashes



---



\## 28 LUNAR MANSIONS (二十八宿)



Usage rules:

\- Provide fine-grained auspiciousness

\- Used AFTER day officer filtering

\- Contextual, not absolute



---



\## TIME WINDOW SELECTION



\- Hour selection is optional but recommended

\- Must align with:

&nbsp; - Day flow

&nbsp; - Apparent solar time

\- Zi hour rule applies (23:00 start)



---



\## CONFLICT RESOLUTION



Priority order:

Natal > Luck Pillar > Year > Month > Day Officer > Lunar Mansion > Hour



Lower layers cannot override higher layers.



---



\## OUTPUT REQUIREMENTS



Date selection output must include:

\- Recommended dates

\- Explicit exclusions

\- Reasoning summary

\- Confidence level (High / Medium / Low)



---



\## FORBIDDEN PRACTICES



Invalid:

\- Using Gregorian weekdays

\- Using Western astrology

\- Claiming guaranteed success

\- Hiding exclusions



---



\## ENGINE CONTRACT



Engine must expose:

\- `date\_selection.recommended\[]`

\- `date\_selection.avoid\[]`

\- `date\_selection.reasoning`



---



\## NON-NEGOTIABLE



\-择日 is advisory, not deterministic

\- Transparency is mandatory



This doctrine is binding across all systems.



