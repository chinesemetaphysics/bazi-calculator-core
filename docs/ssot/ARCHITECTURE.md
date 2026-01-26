# SSOT Architecture - Chinese Metaphysics Core

## Single Source of Truth

**All calculation logic MUST originate from `core/src/`**

```
core/src/
├── solar-terms.js    ← SSOT for solar term calculations (VSOP87)
├── pillars.js        ← SSOT for Four Pillars calculations
├── constants.js      ← SSOT for stems, branches, elements
├── flying-stars.js   ← SSOT for Xuan Kong flying stars
└── verification.js   ← Runtime integrity checks
```

## Consumers

All websites and APIs MUST consume from core, NOT implement their own:

| Consumer | How to Use |
|----------|------------|
| `bazi/` (dcompass) | CDN or bundled from core |
| `daily/` | Import from core |
| `api/` | Require from core or mirror exactly |
| `portal/` | CDN or bundled from core |
| Future sites | CDN: `cdn.jsdelivr.net/gh/chinesemetaphysics/bazi-calculator-core@v2.0.0/src/` |

## CDN Usage (Recommended for Frontends)

```html
<!-- Load SSOT modules from CDN -->
<script src="https://cdn.jsdelivr.net/gh/chinesemetaphysics/bazi-calculator-core@v2.0.0/src/constants.js"></script>
<script src="https://cdn.jsdelivr.net/gh/chinesemetaphysics/bazi-calculator-core@v2.0.0/src/solar-terms.js"></script>
<script src="https://cdn.jsdelivr.net/gh/chinesemetaphysics/bazi-calculator-core@v2.0.0/src/pillars.js"></script>
```

## API/Backend Usage

```javascript
// Option 1: Direct require (if core is in same repo)
const { getSolarMonthForDate } = require('../core/src/solar-terms.js');
const { calculateMonthPillar } = require('../core/src/pillars.js');

// Option 2: Mirror the exact code (keep in sync!)
// If mirroring, add header: "SSOT: This file mirrors core/src/xxx.js"
```

## Golden Rule

```
┌─────────────────────────────────────────────────┐
│  Code MUST follow SSOT                          │
│  SSOT NEVER follows code                        │
│  If code differs from SSOT, code is WRONG       │
└─────────────────────────────────────────────────┘
```

## Change Control

Any change to core/src/ requires:
1. Version bump in file header
2. Update all consumers
3. Run golden vector tests (`bazi-layer0/test/`)
4. Update this document if architecture changes

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 2.0.0 | 2026-01-26 | Fixed findSolarLongitudeJD year boundary bug, fixed getSolarMonthForDate sorting bug |
| 1.0.0 | 2026-01-14 | Initial VSOP87-based astronomical calculations |

## Validation

Before deploying any website, verify calculations match golden vectors:

```bash
cd bazi-layer0
pwsh test/run_golden_tests.ps1
```

Test famous birthdates:
- Steve Jobs (Feb 24, 1955): Tiger month ✓
- Bill Gates (Oct 28, 1955): Dog month ✓
- Sept 2, 1978: Monkey month ✓
