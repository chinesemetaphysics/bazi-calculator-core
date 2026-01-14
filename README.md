# BaZi Calculator Core

Shared calculation library for Chinese Metaphysics applications.

**Version: 1.1.0** | **Build: 2026-01-14**

## Features

- **Four Pillars (BaZi)** - Year, Month, Day, Hour pillar calculations
- **Flying Stars (Xuan Kong)** - Annual, Monthly, Daily, Hourly flying stars
- **Eight Mansions (Ba Zhai)** - Kua number and favorable directions
- **Solar Terms** - Algorithmic calculation (VSOP87) for any year
- **Verification Module** - Runtime integrity and accuracy checks

## Usage via CDN (jsDelivr)

```html
<!-- Load bundled version (recommended) -->
<script src="https://cdn.jsdelivr.net/gh/chinesemetaphysics/bazi-calculator-core@v1.1.0/dist/bazi-calculator.js"></script>

<!-- Or load individual modules -->
<script src="https://cdn.jsdelivr.net/gh/chinesemetaphysics/bazi-calculator-core@v1.1.0/src/constants.js"></script>
<script src="https://cdn.jsdelivr.net/gh/chinesemetaphysics/bazi-calculator-core@v1.1.0/src/solar-terms.js"></script>
<script src="https://cdn.jsdelivr.net/gh/chinesemetaphysics/bazi-calculator-core@v1.1.0/src/pillars.js"></script>
<script src="https://cdn.jsdelivr.net/gh/chinesemetaphysics/bazi-calculator-core@v1.1.0/src/flying-stars.js"></script>
<script src="https://cdn.jsdelivr.net/gh/chinesemetaphysics/bazi-calculator-core@v1.1.0/src/verification.js"></script>
```

## Verification

The library includes built-in verification that runs automatically on page load:

```javascript
// Manual verification
const results = runVerificationTests();
console.log(results.allPassed ? 'All tests passed!' : 'Some tests failed');

// Quick check (returns boolean)
if (quickVerify()) {
    console.log('Calculations verified!');
}

// Show detailed results
showVerificationDetails();
```

A verification badge is automatically added to the page footer showing the verification status.

## Reference Points (Immutable)

| Reference | Value | Purpose |
|-----------|-------|---------|
| Day Pillar | December 17, 1923 = 甲子 | Day calculation base |
| Flying Stars | 2017 Center = 1 | 9-year cycle reference |
| Solar Terms | VSOP87 Algorithm | Astronomical calculation |

## Validated Against

- Ten Thousand Year Calendar (万年历)
- Historical birth data (Steve Jobs: Feb 24, 1955; Bill Gates: Oct 28, 1955)
- Traditional BaZi reference texts (淵海子平, 三命通會)

## API Reference

### Pillar Calculations

```javascript
// Calculate all four pillars
const chart = calculateBaZiChart(1990, 5, 15, 14, 30, 'male');
// Returns: { year, month, day, hour, dayMaster, kuaNumber, ... }

// Calculate individual pillars
const dayPillar = calculateDayPillar(1990, 5, 15);
const yearPillar = calculateYearPillar(1990, 5, 15);
const monthPillar = calculateMonthPillar(1990, 5, 15, yearPillar.stemIndex);
const hourPillar = calculateHourPillar(14, 30, dayPillar.stemIndex);

// Calculate Kua number
const kua = calculateKuaNumber(1990, 5, 15, 'female');
```

### Flying Stars

```javascript
// Annual flying stars
const annual = calculateAnnualFlyingStars(2026, 3, 1);
// Returns: { N: 5, NE: 1, E: 3, SE: 8, S: 4, SW: 6, W: 2, NW: 7, Center: 9 }

// Daily flying stars
const daily = calculateDailyFlyingStars(2026, 1, 14);

// Hourly flying stars
const hourly = calculateHourlyFlyingStars(2026, 1, 14, 15, 30);

// Annual afflictions
const afflictions = getAnnualAfflictions(2026, 3, 1);
// Returns: { taiSui, suiPo, wuHuang, sanSha, ... }
```

### Solar Terms

```javascript
// Get Li Chun date for a year
const liChun = getLiChunDate(2026);
// Returns: { year: 2026, month: 2, day: 4, hour: 4, minute: 51, ... }

// Get solar month for a date
const solarMonth = getSolarMonthForDate(2026, 3, 15);
// Returns: { solarMonthIndex: 1, monthBranch: 3, ... }
```

## Changelog

### v1.1.0 (2026-01-14)
- Added verification module with runtime integrity checks
- Added automatic verification badge
- Fixed Zi hour (23:00-23:59) day rollover
- Improved Kua number formula validation

### v1.0.0 (2026-01-07)
- Initial release
- Core constants, solar terms, pillars, flying stars

## License

MIT License - Free to use for personal and commercial projects.

## Copyright

© 2026 TheArties. All Rights Reserved.
