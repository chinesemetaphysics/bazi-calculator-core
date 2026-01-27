# BaZi Layer 0 - SSOT Calculation Engine

## Overview

This is the Single Source of Truth (SSOT) for all BaZi (Four Pillars) calculations in the system.

**Location:** `api/src/engine/bazi/`

**Authority:** All BaZi calculations must derive from this Layer 0 engine. No logic duplication permitted.

## Architecture

### Modules

1. **constants.js** - Heavenly Stems and Earthly Branches definitions
2. **solarTerms.js** - Astronomical solar longitude calculations (VSOP87)
3. **yearPillar.js** - Year pillar with Li Chun boundary (315° solar longitude)
4. **monthPillar.js** - Month pillar with solar month boundaries
5. **dayPillar.js** - Day pillar using 1923-12-17 = 甲子 reference point
6. **hourPillar.js** - Hour pillar with 2-hour period branches
7. **formatters.js** - Pillar formatting utilities
8. **index.js** - Main orchestrator

### Key Design Decisions

#### Astronomical vs Lookup Tables

**This engine uses astronomical calculations, NOT lookup tables.**

- **Li Chun (立春):** Calculated at solar longitude 315° using VSOP87
- **Solar Months:** Calculated at Jie (節) term boundaries (every 30° from Li Chun)
- **Accuracy:** ~0.01° precision (sufficient for BaZi)

**Known Difference:**
- Astronomical: Li Chun 1984 = Feb 4
- Legacy lookup tables: Li Chun 1984 = Feb 5
- Cause: Rounding, timezone assumptions, or table generation methodology

**Authority:** This astronomical engine is the SSOT. Golden vectors align to it.

#### Timezone Handling

- Input birth data includes timezone (e.g., "+08:00")
- Calculations use LOCAL birth time, not UTC
- Solar terms are computed astronomically but applied to local date/time

#### Reference Points

- **Day Pillar:** December 17, 1923 = 甲子 (Jia Zi, jiazi index 0)
- **Year Formula:** Based on year 4 CE = 甲子
- **Validated Against:** Steve Jobs (1955-02-24), Bill Gates (1955-10-28)

## Usage

### CLI

```bash
node bazi-layer0/engine/run.js '{"year":1984,"month":2,"day":5,"hour":9,"minute":30,"timezone":"+08:00"}'
```

### Programmatic

```javascript
const { calculateBaZi } = require('./api/src/engine/bazi');

const birth = {
  year: 1984,
  month: 2,
  day: 5,
  hour: 9,
  minute: 30,
  timezone: "+08:00"
};

const result = calculateBaZi(birth);
console.log(result);
// {
//   year_pillar: "Yang-Wood Rat",
//   month_pillar: "Yin-Fire Ox",
//   day_pillar: "Yin-Earth Snake",
//   hour_pillar: "Yin-Earth Snake"
// }
```

## Golden Vectors

**Location:** `bazi-layer0/golden/`

All golden vectors include provenance metadata documenting:
- Calculation method (astronomical)
- Solar longitude model (VSOP87)
- Li Chun degree (315°)
- Authority (this SSOT engine)

Golden vectors are DERIVED from the engine, not external references.

## CI

**Workflow:** `.github/workflows/bazi-layer0.yml`

Runs on every push to `wip-safe` and `main` branches. Enforces golden vector compliance.

```bash
pwsh bazi-layer0/test/run_golden_tests.ps1
```

## Non-Negotiable Rules

1. **DO NOT** create BaZi calculation logic elsewhere
2. **DO NOT** introduce lookup tables for Li Chun or solar terms
3. **DO NOT** modify golden vectors without regenerating from SSOT
4. **DO NOT** weaken or bypass CI
5. **ALL** BaZi features must call this Layer 0 engine

## Roadmap

- [ ] Add luck pillar calculations
- [ ] Add ten gods (十神) relationships
- [ ] Add hidden stems extraction
- [ ] Add clashes/harms/combinations detection
- [ ] Expand golden vector coverage (edge cases, leap years, etc.)
