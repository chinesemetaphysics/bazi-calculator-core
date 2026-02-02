# BaZi Calculator Core

> **Single Source of Truth (SSOT)** for Four Pillars (BaZi) calculations in TheArties applications

[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](https://github.com/chinesemetaphysics/bazi-calculator-core/releases)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![jsDelivr](https://data.jsdelivr.com/v1/package/gh/chinesemetaphysics/bazi-calculator-core/badge)](https://www.jsdelivr.com/package/gh/chinesemetaphysics/bazi-calculator-core)

## Overview

Core calculation engine for **Four Pillars of Destiny (BaZi 八字)** analysis. This library provides:

- ✅ **Year Pillar** calculation (handles Li Chun solar term boundary)
- ✅ **Month Pillar** calculation (solar term based)
- ✅ **Day Pillar** calculation (Julian Day Number method)
- ✅ **Hour Pillar** calculation (2-hour Chinese watch system)
- ✅ **Solar Terms** (24 节气) reference data
- ✅ **Timezone support** (converts local time to UTC for calculation)

## Installation & Usage

### Browser (CDN - Recommended)

```html
<!-- Use specific version (recommended for production) -->
<script src="https://cdn.jsdelivr.net/gh/chinesemetaphysics/bazi-calculator-core@v2.0.0/dist/bazi-calculator.js"></script>

<!-- Or use latest version (auto-updates, good for development) -->
<script src="https://cdn.jsdelivr.net/gh/chinesemetaphysics/bazi-calculator-core@latest/dist/bazi-calculator.js"></script>

<script>
  // Calculate Four Pillars
  const chart = BaZiCalculator.calculateBaZi({
    year: 2000,
    month: 1,
    day: 1,
    hour: 12,
    minute: 0,
    timezone: '+08:00'  // Asia/Kuala_Lumpur, Asia/Singapore, etc.
  });

  console.log(chart);
  // Output:
  // {
  //   year_pillar: { stem: "己", branch: "卯", ... },
  //   month_pillar: { stem: "丁", branch: "丑", ... },
  //   day_pillar: { stem: "甲", branch: "子", ... },
  //   hour_pillar: { stem: "庚", branch: "午", ... },
  //   _debug: { ... }
  // }
</script>
```

### Node.js / Cloudflare Workers

```bash
npm install github:chinesemetaphysics/bazi-calculator-core
```

```javascript
const { calculateBaZi } = require('bazi-calculator-core');

const chart = calculateBaZi({
  year: 2000,
  month: 1,
  day: 1,
  hour: 12,
  minute: 0,
  timezone: '+08:00'
});
```

## API Reference

### `BaZiCalculator.calculateBaZi(birth)`

Main calculation function.

**Parameters:**
- `birth` (Object):
  - `year` (Number): Gregorian year (e.g., 2000)
  - `month` (Number): Gregorian month (1-12)
  - `day` (Number): Gregorian day (1-31)
  - `hour` (Number): Hour in 24-hour format (0-23)
  - `minute` (Number): Minute (0-59)
  - `timezone` (String): Timezone offset (e.g., "+08:00", "-05:00")

**Returns:**
```javascript
{
  year_pillar: {
    stem: "己",           // Heavenly Stem (Chinese)
    branch: "卯",         // Earthly Branch (Chinese)
    stemPinyin: "Ji",
    branchPinyin: "Mao",
    stemEnglish: "Yin Earth",
    branchEnglish: "Rabbit",
    stemElement: "earth",
    branchElement: "wood"
  },
  month_pillar: { ... },
  day_pillar: { ... },
  hour_pillar: { ... },
  _debug: {
    // Internal indices and Chinese characters for verification
    year: { stem: 5, branch: 3, chinese: "己卯", adjustedYear: 1999 },
    month: { stem: 3, branch: 1, chinese: "丁丑" },
    day: { stem: 0, branch: 0, chinese: "甲子" },
    hour: { stem: 6, branch: 6, chinese: "庚午" },
    input: { year: 2000, month: 1, day: 1, hour: 12, minute: 0 }
  }
}
```

### Individual Pillar Functions

```javascript
// Calculate individual pillars
BaZiCalculator.calculateYearPillar(year, month, day);
BaZiCalculator.calculateMonthPillar(year, month, day, yearStemIndex);
BaZiCalculator.calculateDayPillar(year, month, day);
BaZiCalculator.calculateHourPillar(hour, minute, dayStemIndex);

// Solar terms
BaZiCalculator.getSolarTerms(year);
BaZiCalculator.findLiChun(year);  // Returns Li Chun date for year

// Formatters
BaZiCalculator.formatPillar(stemIndex, branchIndex);
BaZiCalculator.formatChinesePillar(stemIndex, branchIndex);
```

### Constants

```javascript
BaZiCalculator.HEAVENLY_STEMS;   // Array of 10 stems
BaZiCalculator.EARTHLY_BRANCHES;  // Array of 12 branches
```

## Methodology

### Year Pillar
- Calculated based on **Li Chun (立春)** solar term boundary
- Birth before Li Chun → uses previous year's stem-branch
- Uses **Lower Era (下元)** Period 9 reference (2024 = 甲辰)

### Month Pillar
- Based on **24 solar terms** (节气)
- Month changes at solar term, NOT Gregorian month boundary
- Stem follows **Five Tigers formula** (五虎遁)

### Day Pillar
- Uses **Julian Day Number** algorithm
- Accurate from year 1 to 9999
- Day stem-branch cycles every 60 days (Jia Zi cycle)

### Hour Pillar
- Based on **12 two-hour watches** (时辰)
- Stem follows **Five Rats formula** (五鼠遁)
- 23:00-01:00 = 子时 (Rat Hour, starts previous day)

## Timezone Handling

All calculations use **local solar time** (not UTC). The `timezone` parameter converts the input time to UTC internally for solar term lookups, but the pillar calculations respect local observation time.

**Example:**
```javascript
// Born in Singapore (UTC+8) at 12:00 noon
const chart = BaZiCalculator.calculateBaZi({
  year: 2000, month: 1, day: 1,
  hour: 12, minute: 0,
  timezone: '+08:00'
});
```

## Validation

This library includes golden test vectors from classical BaZi references. All calculations have been verified against:
- 《渊海子平》(Yuan Hai Zi Ping)
- 《三命通会》(San Ming Tong Hui)
- 《滴天髓》(Di Tian Sui)

## Used By

- **Daily Compass** (https://dcompass.thearties.com)
- **BaZi Calculator** (https://bazi.thearties.com)
- **Daily Portal** (https://portal.thearties.com)
- **TheArties API** (SSOT Worker)

## Development

```bash
# Clone repository
git clone https://github.com/chinesemetaphysics/bazi-calculator-core.git
cd bazi-calculator-core

# Build UMD bundle
node build.js

# Test locally
open test-local.html
```

## Versioning

This project uses [Semantic Versioning](https://semver.org/).

Current version: **v2.0.0**

- Major: Breaking API changes
- Minor: New features (backward compatible)
- Patch: Bug fixes

## License

MIT © TheArties

## Support

For issues or questions:
- GitHub Issues: https://github.com/chinesemetaphysics/bazi-calculator-core/issues
- Email: report@thearties.com

---

**Note:** For educational and entertainment purposes only. Not a substitute for professional Ba Zi consultation.
