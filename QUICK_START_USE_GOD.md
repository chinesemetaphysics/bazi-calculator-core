# Quick Start: Use God Module

**5-minute guide to adding Use God analysis to your BaZi application**

---

## Installation

### Option 1: CDN (Browser)

```html
<script src="https://cdn.jsdelivr.net/gh/chinesemetaphysics/bazi-calculator-core@v3.2.0/dist/bazi-calculator.js"></script>
```

### Option 2: Local Build

```bash
cd bazi-calculator-core
node build.js
# Output: dist/bazi-calculator.js
```

---

## Basic Usage (3 Lines of Code)

```javascript
// 1. Calculate chart
const chart = BaZiCalculator.calculateFullChart(1990, 6, 15, 10, 30, 'male');

// 2. Get Use God
const analysis = BaZiCalculator.selectUseGod(chart);

// 3. Display result
console.log(`Your Use God is ${analysis.useGod.toUpperCase()}`);
// Output: "Your Use God is EARTH"
```

---

## What You Get

```javascript
{
  useGod: 'earth',                    // PRIMARY: Enhance this element
  avoidGod: ['fire', 'water'],        // AVOID: These elements
  alternativeUseGod: 'metal',         // ALTERNATIVE: Secondary helper
  reasoning: 'Day Master METAL is weak (20/100). Needs nurturing...',

  strength: {
    score: 20,                        // 0-100 strength
    category: 'weak',                 // Classification
    details: { seasonal, roots, support }
  },

  imbalances: {
    excessive: [{element: 'fire', count: '4.5'}],
    deficient: [{element: 'earth', count: '0.7'}],
    counts: { wood: 2, fire: 4.5, earth: 0.7, metal: 2, water: 2.8 }
  }
}
```

---

## Common Patterns

### Pattern 1: Show Use God Recommendations

```javascript
const elementColors = {
  wood: ['Green', 'Teal'],
  fire: ['Red', 'Orange', 'Purple'],
  earth: ['Yellow', 'Brown', 'Beige'],
  metal: ['White', 'Gold', 'Silver'],
  water: ['Blue', 'Black']
};

const elementDirections = {
  wood: 'East',
  fire: 'South',
  earth: 'Center/Southwest',
  metal: 'West',
  water: 'North'
};

const analysis = BaZiCalculator.selectUseGod(chart);
const colors = elementColors[analysis.useGod];
const direction = elementDirections[analysis.useGod];

console.log(`Wear: ${colors.join(', ')}`);
console.log(`Face: ${direction}`);
```

---

### Pattern 2: Strength Meter

```javascript
const strength = BaZiCalculator.calculateDayMasterStrength(chart);

// Create visual meter
const percentage = strength.score;
const bars = '█'.repeat(Math.floor(percentage / 5)) +
             '░'.repeat(20 - Math.floor(percentage / 5));

console.log(`Day Master Strength: ${strength.category.toUpperCase()}`);
console.log(`[${bars}] ${percentage}/100`);
console.log(`  Seasonal: ${strength.details.seasonal.weighted}/40`);
console.log(`  Roots: ${strength.details.roots.weighted}/30`);
console.log(`  Support: ${strength.details.support.weighted}/30`);
```

Output:
```
Day Master Strength: WEAK
[████░░░░░░░░░░░░░░░░] 20/100
  Seasonal: 8/40
  Roots: 2/30
  Support: 10/30
```

---

### Pattern 3: Element Balance Chart

```javascript
const imbalances = BaZiCalculator.analyzeImbalances(chart);

Object.entries(imbalances.counts).forEach(([element, count]) => {
  const isExcessive = parseFloat(count) >= 4;
  const isDeficient = parseFloat(count) <= 1;

  let status = '';
  if (isExcessive) status = '⚠️ EXCESSIVE';
  if (isDeficient) status = '⚠️ DEFICIENT';

  console.log(`${element.toUpperCase()}: ${count} ${status}`);
});
```

Output:
```
WOOD: 2.3
FIRE: 4.5 ⚠️ EXCESSIVE
EARTH: 0.7 ⚠️ DEFICIENT
METAL: 2.0
WATER: 2.8
```

---

## UI Templates

### Template 1: Simple Card

```html
<div class="use-god-card">
  <h2>🎯 Your Use God: <span id="useGod"></span></h2>
  <p id="reasoning"></p>

  <div class="recommendations">
    <strong>Enhance:</strong>
    <ul id="favorable"></ul>

    <strong>Avoid:</strong>
    <ul id="avoid"></ul>
  </div>
</div>

<script>
const analysis = BaZiCalculator.selectUseGod(chart);

document.getElementById('useGod').textContent = analysis.useGod.toUpperCase();
document.getElementById('reasoning').textContent = analysis.reasoning;

// Populate lists
const favorableList = document.getElementById('favorable');
favorableList.innerHTML = `<li>Colors: ${elementColors[analysis.useGod].join(', ')}</li>`;

const avoidList = document.getElementById('avoid');
analysis.avoidGod.forEach(element => {
  avoidList.innerHTML += `<li>${element.toUpperCase()} element</li>`;
});
</script>
```

---

### Template 2: Detailed Panel

```html
<div class="use-god-panel">
  <!-- Use God -->
  <section class="use-god-primary">
    <h2>Use God: EARTH</h2>
    <div class="element-badge earth">土</div>
    <p>Enhance Earth element for balance</p>
  </section>

  <!-- Day Master Strength -->
  <section class="strength-meter">
    <h3>Day Master Strength</h3>
    <div class="meter-bar">
      <div class="fill" style="width: 45%">45/100</div>
    </div>
    <span class="category">Balanced</span>

    <details>
      <summary>Breakdown</summary>
      <table>
        <tr><td>Seasonal</td><td>28/40</td></tr>
        <tr><td>Roots</td><td>14/30</td></tr>
        <tr><td>Support</td><td>18/30</td></tr>
      </table>
    </details>
  </section>

  <!-- Element Balance -->
  <section class="element-balance">
    <h3>Five Element Balance</h3>
    <div class="bars">
      <div class="bar wood" style="width: 23%">Wood 2.3</div>
      <div class="bar fire excessive" style="width: 45%">Fire 4.5 ⚠️</div>
      <div class="bar earth deficient" style="width: 7%">Earth 0.7 ⚠️</div>
      <div class="bar metal" style="width: 20%">Metal 2.0</div>
      <div class="bar water" style="width: 28%">Water 2.8</div>
    </div>
  </section>
</div>
```

---

## CSS Styling

```css
/* Use God Card */
.use-god-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

/* Element Badges */
.element-badge {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
}

.element-badge.wood { background: #10b981; }
.element-badge.fire { background: #ef4444; }
.element-badge.earth { background: #f59e0b; }
.element-badge.metal { background: #d1d5db; color: #1f2937; }
.element-badge.water { background: #3b82f6; }

/* Strength Meter */
.meter-bar {
  width: 100%;
  height: 30px;
  background: #e5e7eb;
  border-radius: 15px;
  overflow: hidden;
  margin: 0.5rem 0;
}

.meter-bar .fill {
  height: 100%;
  background: linear-gradient(90deg, #10b981 0%, #059669 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  transition: width 0.5s ease;
}

/* Element Balance Bars */
.bars .bar {
  height: 30px;
  margin: 0.5rem 0;
  border-radius: 4px;
  display: flex;
  align-items: center;
  padding-left: 1rem;
  color: white;
  font-weight: bold;
}

.bar.wood { background: #10b981; }
.bar.fire { background: #ef4444; }
.bar.earth { background: #f59e0b; }
.bar.metal { background: #6b7280; }
.bar.water { background: #3b82f6; }

.bar.excessive { animation: pulse 2s infinite; }
.bar.deficient { opacity: 0.5; }

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}
```

---

## Troubleshooting

### Issue: "selectUseGod is not a function"

**Solution:** Make sure you're using v3.2.0+

```javascript
console.log(BaZiCalculator.version);
// Should output: "3.2.0"
```

---

### Issue: Strength always shows 0

**Solution:** Make sure you're passing a full chart, not just pillars

```javascript
// ❌ Wrong
const chart = BaZiCalculator.calculateBaZi(birth);
const analysis = BaZiCalculator.selectUseGod(chart); // Missing dayMaster

// ✅ Correct
const chart = BaZiCalculator.calculateFullChart(year, month, day, hour, minute, gender);
const analysis = BaZiCalculator.selectUseGod(chart);
```

---

### Issue: Hidden stems not counted

**Solution:** Ensure you're using `calculateFullChart` which includes full stem/branch objects with hidden stems.

---

## Next Steps

1. Read **USE_GOD_MODULE.md** for complete API reference
2. See **RELEASE_NOTES_v3.2.0.md** for technical details
3. Check **test-usegod.js** for working examples

---

## Element Reference

### Quick Lookup

| Element | Colors | Directions | Industries | Materials |
|---------|--------|------------|------------|-----------|
| Wood | Green, Teal | East | Education, Fashion, Art | Plants, Paper |
| Fire | Red, Purple | South | Energy, Marketing, Tech | Lights, Electronics |
| Earth | Yellow, Brown | Center, SW, NE | Real Estate, Agriculture | Ceramics, Soil |
| Metal | White, Gold | West | Finance, Engineering | Metals, Machinery |
| Water | Blue, Black | North | Travel, Communications | Liquids, Glass |

---

**Ready to implement Use God analysis in 5 minutes!**
