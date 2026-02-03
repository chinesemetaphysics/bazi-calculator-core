# Use God (用神) Module Documentation

## Overview

The Use God module is **THE most important feature in BaZi analysis**. It determines which element should be enhanced in a person's life to achieve balance and harmony.

**Version:** 3.2.0
**Location:** `src/useGod.js`
**Status:** Production Ready

---

## What is Use God?

In BaZi (Four Pillars of Destiny), the **Use God (用神, Yong Shen)** is the element that balances your chart. It's the element you should:
- Wear (colors, materials)
- Surround yourself with (home decor, environment)
- Pursue in career (industries aligned with the element)
- Choose for timing (years/months when Use God is strong)

Professional BaZi consultants spend **80% of their analysis time** identifying the correct Use God.

---

## Module Architecture

### Core Functions

#### 1. `selectUseGod(chart)`
**Main function** - Analyzes chart and returns complete Use God analysis.

**Parameters:**
- `chart` (Object) - Full chart from `calculateFullChart()`

**Returns:**
```javascript
{
  useGod: 'fire',              // Primary Use God element
  avoidGod: ['water', 'metal'], // Elements to avoid
  alternativeUseGod: 'wood',    // Secondary helpful element
  reasoning: '...',             // Human-readable explanation
  strength: {                   // Day Master strength breakdown
    score: 45,                  // 0-100 strength score
    category: 'balanced',       // very-weak/weak/balanced/strong/very-strong
    details: { ... }
  },
  imbalances: {                 // Element imbalances
    excessive: [{element: 'fire', count: '4.5'}],
    deficient: [{element: 'metal', count: '0.3'}],
    balanced: [{element: 'water', count: '2.1'}],
    counts: { wood: 2.3, fire: 4.5, ... }
  },
  dayMaster: {
    element: 'earth',
    chinese: '戊',
    english: 'Yang Earth'
  }
}
```

---

#### 2. `calculateDayMasterStrength(chart)`
Calculates how strong/weak the Day Master is using the **Three Foundations**:

**三得 (San De) - Three Strengths:**
1. **得令 (De Ling) - Seasonal Timing** (40% weight)
   - Is Day Master element in its powerful season?
   - Wood strong in Spring, Fire in Summer, etc.

2. **得地 (De Di) - Roots in Branches** (30% weight)
   - How many earthly branches support Day Master?
   - Includes hidden stems with reduced weight

3. **得勢 (De Shi) - Support from Stems** (30% weight)
   - How many other heavenly stems support Day Master?
   - Same element or Resource element

**Returns:**
```javascript
{
  score: 45,           // Total strength: 0-100
  category: 'balanced', // Classification
  details: {
    seasonal: {
      score: 70,       // Raw seasonal strength
      weighted: 28,    // After 40% weight
      description: 'Day Master wood born in 寅 month'
    },
    roots: {
      count: '1.9',    // Root count (includes hidden)
      percentage: 48,
      weighted: 14,
      description: '1.9 roots in 4 earthly branches'
    },
    support: {
      count: '1.8',
      percentage: 60,
      weighted: 18,
      description: '1.8 supporting stems out of 3'
    }
  }
}
```

---

#### 3. `analyzeImbalances(chart)`
Identifies excessive/deficient elements in the chart.

**Counting logic:**
- Visible stems: 1.0 each
- Visible branches: 1.0 each
- Hidden stems:
  - Primary (first): 0.6
  - Secondary (second): 0.3
  - Tertiary (third): 0.1

**Returns:**
```javascript
{
  excessive: [
    { element: 'fire', count: '4.5' }  // >= 4 total
  ],
  deficient: [
    { element: 'metal', count: '0.3' } // <= 1 total
  ],
  balanced: [
    { element: 'water', count: '2.1' }
  ],
  counts: {
    wood: 2.3,
    fire: 4.5,
    earth: 3.2,
    metal: 0.3,
    water: 2.1
  }
}
```

---

#### 4. `getSeasonalStrength(element, monthBranch)`
Returns seasonal strength score for an element in a given month.

**Parameters:**
- `element` (string) - 'wood', 'fire', 'earth', 'metal', or 'water'
- `monthBranch` (number) - Month branch index (0-11)

**Returns:** Number (0-100)

**Example:**
```javascript
getSeasonalStrength('wood', 2)  // 100 - Wood in 寅 (Tiger/Spring)
getSeasonalStrength('wood', 6)  // 40  - Wood in 午 (Horse/Summer)
getSeasonalStrength('fire', 0)  // 10  - Fire in 子 (Rat/Winter)
```

---

### Constants

#### `SEASONAL_STRENGTH`
Comprehensive table of element strength by month.

**Structure:**
```javascript
{
  wood: {
    0: 70,   // 子 Zi (Rat) - Winter/Growing
    1: 60,   // 丑 Chou (Ox)
    2: 100,  // 寅 Yin (Tiger) - Spring/Prosperous
    3: 100,  // 卯 Mao (Rabbit)
    // ... all 12 branches
  },
  fire: { ... },
  earth: { ... },
  metal: { ... },
  water: { ... }
}
```

**Based on Five Phases:**
- **旺 (Wang) - Prosperous:** 100 (element's season)
- **相 (Xiang) - Growing:** 70 (produced by seasonal element)
- **休 (Xiu) - Resting:** 30-40 (produces seasonal element)
- **囚 (Qiu) - Imprisoned:** 10-20 (controlled by seasonal element)
- **死 (Si) - Dead:** 10 (controls seasonal element)

---

## Use God Selection Logic

### Algorithm Overview

```
1. Calculate Day Master strength (0-100)
2. Analyze chart imbalances
3. Apply selection rules:

   IF Day Master is WEAK (< 35):
     → Use God = Resource element (produces Day Master)
     → Alternative = Same element (peer support)
     → Avoid = Control + Output elements

   ELSE IF Day Master is STRONG (> 55):
     → Use God = Output element (drains Day Master)
     → Or element that controls excessive element
     → Avoid = Resource + Same elements

   ELSE (Balanced 35-55):
     → Use God = Most deficient element
     → Or element to control excessive element
     → Or maintain balance with same element
```

---

## Usage Examples

### Basic Usage

```javascript
const BaZi = require('./bazi-calculator-core');

// Calculate full chart
const chart = BaZi.calculateFullChart(
  1990, 6, 15,  // Year, Month, Day
  10, 30,       // Hour, Minute
  'male'        // Gender
);

// Get Use God analysis
const analysis = BaZi.selectUseGod(chart);

console.log('Your Use God:', analysis.useGod);
console.log('Avoid:', analysis.avoidGod.join(', '));
console.log('Why:', analysis.reasoning);
```

---

### Day Master Strength Only

```javascript
const strength = BaZi.calculateDayMasterStrength(chart);

console.log(`Day Master is ${strength.category} (${strength.score}/100)`);
console.log('Seasonal:', strength.details.seasonal.description);
console.log('Roots:', strength.details.roots.description);
console.log('Support:', strength.details.support.description);
```

---

### Element Imbalance Analysis

```javascript
const imbalances = BaZi.analyzeImbalances(chart);

console.log('Excessive elements:',
  imbalances.excessive.map(e => `${e.element} (${e.count})`));
console.log('Missing elements:',
  imbalances.deficient.map(e => `${e.element} (${e.count})`));
```

---

## Integration with UI

### Recommended Display

**1. Use God Card (top priority)**
```html
<div class="use-god-card">
  <h2>🎯 Your Use God: FIRE</h2>
  <p>Enhance Fire element for balance and success</p>

  <div class="recommendations">
    <h3>Favorable:</h3>
    <ul>
      <li>Colors: Red, Purple, Orange</li>
      <li>Directions: South</li>
      <li>Industries: Energy, Marketing, Arts</li>
      <li>Materials: Candles, Lights, Electronics</li>
    </ul>

    <h3>Avoid:</h3>
    <ul>
      <li>Water element (blue, north, water industries)</li>
      <li>Metal element (white, west, metal industries)</li>
    </ul>
  </div>

  <details>
    <summary>Why Fire?</summary>
    <p>{{ analysis.reasoning }}</p>
  </details>
</div>
```

---

**2. Day Master Strength Meter**
```html
<div class="strength-meter">
  <h3>Day Master Strength</h3>
  <div class="meter-bar">
    <div class="fill" style="width: 45%"></div>
  </div>
  <p>Balanced (45/100)</p>

  <div class="breakdown">
    <div>季節 Seasonal: 28/40</div>
    <div>根基 Roots: 14/30</div>
    <div>助力 Support: 18/30</div>
  </div>
</div>
```

---

**3. Element Balance Chart**
```html
<div class="element-balance">
  <h3>Five Element Distribution</h3>

  <div class="element-bars">
    <div class="bar wood">Wood: 2.3</div>
    <div class="bar fire excessive">Fire: 4.5 ⚠️ EXCESSIVE</div>
    <div class="bar earth">Earth: 3.2</div>
    <div class="bar metal deficient">Metal: 0.3 ⚠️ DEFICIENT</div>
    <div class="bar water">Water: 2.1</div>
  </div>
</div>
```

---

## Validation & Testing

### Test Cases Included

1. **Weak Day Master** - Water born in Summer
2. **Strong Day Master** - Wood born in Spring
3. **Balanced Chart** - Identifies missing elements

Run tests:
```bash
cd bazi-calculator-core
node test-usegod.js
```

---

### Expected Outputs

**Weak Wood in Autumn:**
- Use God: Water (produces Wood)
- Alternative: Wood (peer support)
- Avoid: Metal (controls), Fire (drains)

**Strong Fire in Summer:**
- Use God: Earth (drains Fire positively)
- Alternative: Water (controls Fire)
- Avoid: Wood (produces more Fire)

**Balanced with excessive Earth:**
- Use God: Wood (controls Earth)
- Alternative: Metal (drains Earth)

---

## Accuracy & Metaphysics

### BaZi Principles Applied

✅ **Three Strengths (三得)** - Seasonal/Roots/Support weighting
✅ **Seasonal strength tables** - Based on 旺相休囚死 theory
✅ **Hidden stems** - Included with proper weighting
✅ **Element cycles** - Production/Control/Weakening
✅ **Imbalance detection** - Excessive/Deficient analysis

### Traditional BaZi Rules

This module follows classical BaZi texts:
- 《滴天髓》 (Di Tian Sui)
- 《窮通寶鑑》 (Qiong Tong Bao Jian)
- 《子平真詮》 (Zi Ping Zhen Quan)

---

## Future Enhancements

### Planned Features (v3.3.0+)

1. **Special Patterns (從格)**
   - Follow the Flow patterns (从强/从弱)
   - Auto-detect and apply special rules

2. **Seasonal Sub-divisions**
   - Early/Middle/Late month strength variations
   - Hidden stem strength by day of month

3. **Use God by Life Stage**
   - Childhood vs Adult Use God differences
   - Luck Pillar interaction

4. **Dual Use God**
   - Cases requiring two Use Gods
   - Conditional Use God (season-dependent)

---

## API Reference Summary

### Functions

| Function | Input | Output | Purpose |
|----------|-------|--------|---------|
| `selectUseGod` | chart | Use God object | Main analysis |
| `calculateDayMasterStrength` | chart | Strength object | Day Master power |
| `analyzeImbalances` | chart | Imbalance object | Element distribution |
| `getSeasonalStrength` | element, branch | number | Seasonal power |

### Constants

| Constant | Type | Purpose |
|----------|------|---------|
| `SEASONAL_STRENGTH` | Object | Element strength by month |

---

## Performance

- **Calculation time:** < 5ms per chart
- **Memory:** Negligible (pure calculation, no state)
- **Dependencies:** Only core constants module

---

## Version History

### v3.2.0 (Current)
- ✅ Initial Use God module
- ✅ Day Master strength calculation
- ✅ Seasonal strength tables (all 5 elements × 12 months)
- ✅ Imbalance analysis
- ✅ Hidden stem integration
- ✅ Complete reasoning output

### Planned v3.3.0
- Special patterns (从格)
- Seasonal sub-divisions
- Luck Pillar influence

---

## Support

For questions or bug reports:
- GitHub Issues: `chinesemetaphysics/bazi-calculator-core`
- Documentation: See README.md

---

**Built with accuracy and respect for traditional Chinese metaphysics.**
