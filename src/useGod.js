/**
 * Use God (用神) Module
 * Determines the balancing element for a BaZi chart
 * This is the MOST IMPORTANT analysis in BaZi - the Use God guides all life decisions
 */

const { HEAVENLY_STEMS, EARTHLY_BRANCHES } = require('./constants');

/**
 * Seasonal Strength Table
 * Each element has different power levels in different months (branches)
 * Based on: 旺(Prosperous) 相(Growing) 休(Resting) 囚(Imprisoned) 死(Dead)
 */
const SEASONAL_STRENGTH = {
  wood: {
    // Spring (寅卯辰) - Prosperous (100)
    2: 100,  // 寅 Yin - Tiger
    3: 100,  // 卯 Mao - Rabbit
    4: 80,   // 辰 Chen - Dragon (transition to Earth)
    // Winter (亥子丑) - Growing (70)
    11: 70,  // 亥 Hai - Pig
    0: 70,   // 子 Zi - Rat
    1: 60,   // 丑 Chou - Ox (transition to Earth)
    // Summer (巳午未) - Resting (40)
    5: 40,   // 巳 Si - Snake
    6: 40,   // 午 Wu - Horse
    7: 30,   // 未 Wei - Goat (transition to Earth)
    // Autumn (申酉戌) - Imprisoned/Dead (10-20)
    8: 10,   // 申 Shen - Monkey
    9: 10,   // 酉 You - Rooster
    10: 20   // 戌 Xu - Dog (transition to Earth)
  },
  fire: {
    // Summer (巳午未) - Prosperous (100)
    5: 100,  // 巳 Si - Snake
    6: 100,  // 午 Wu - Horse
    7: 80,   // 未 Wei - Goat
    // Spring (寅卯辰) - Growing (70)
    2: 70,   // 寅 Yin - Tiger
    3: 70,   // 卯 Mao - Rabbit
    4: 60,   // 辰 Chen - Dragon
    // Autumn (申酉戌) - Resting (30-40)
    8: 30,   // 申 Shen - Monkey
    9: 30,   // 酉 You - Rooster
    10: 40,  // 戌 Xu - Dog
    // Winter (亥子丑) - Imprisoned/Dead (10)
    11: 10,  // 亥 Hai - Pig
    0: 10,   // 子 Zi - Rat
    1: 20    // 丑 Chou - Ox
  },
  earth: {
    // Earth is special - strongest in seasonal transitions (辰未戌丑)
    4: 100,  // 辰 Chen - Dragon (Spring→Summer)
    7: 100,  // 未 Wei - Goat (Summer→Autumn)
    10: 100, // 戌 Xu - Dog (Autumn→Winter)
    1: 100,  // 丑 Chou - Ox (Winter→Spring)
    // Summer (巳午) - Growing (70)
    5: 70,   // 巳 Si - Snake
    6: 70,   // 午 Wu - Horse
    // Autumn (申酉) - Resting (50)
    8: 50,   // 申 Shen - Monkey
    9: 50,   // 酉 You - Rooster
    // Spring (寅卯) - Imprisoned (30)
    2: 30,   // 寅 Yin - Tiger
    3: 30,   // 卯 Mao - Rabbit
    // Winter (亥子) - Dead (20)
    11: 20,  // 亥 Hai - Pig
    0: 20    // 子 Zi - Rat
  },
  metal: {
    // Autumn (申酉戌) - Prosperous (100)
    8: 100,  // 申 Shen - Monkey
    9: 100,  // 酉 You - Rooster
    10: 80,  // 戌 Xu - Dog
    // Earth months - Growing (60-70)
    4: 60,   // 辰 Chen - Dragon
    7: 60,   // 未 Wei - Goat
    1: 70,   // 丑 Chou - Ox
    // Winter (亥子) - Resting (40)
    11: 40,  // 亥 Hai - Pig
    0: 40,   // 子 Zi - Rat
    // Spring (寅卯) - Dead (10)
    2: 10,   // 寅 Yin - Tiger
    3: 10,   // 卯 Mao - Rabbit
    // Summer (巳午) - Imprisoned (20)
    5: 20,   // 巳 Si - Snake
    6: 20    // 午 Wu - Horse
  },
  water: {
    // Winter (亥子丑) - Prosperous (100)
    11: 100, // 亥 Hai - Pig
    0: 100,  // 子 Zi - Rat
    1: 80,   // 丑 Chou - Ox
    // Autumn (申酉戌) - Growing (70)
    8: 70,   // 申 Shen - Monkey
    9: 70,   // 酉 You - Rooster
    10: 60,  // 戌 Xu - Dog
    // Spring (寅卯辰) - Resting (40)
    2: 40,   // 寅 Yin - Tiger
    3: 40,   // 卯 Mao - Rabbit
    4: 30,   // 辰 Chen - Dragon
    // Summer (巳午未) - Imprisoned/Dead (10)
    5: 10,   // 巳 Si - Snake
    6: 10,   // 午 Wu - Horse
    7: 20    // 未 Wei - Goat
  }
};

/**
 * Get seasonal strength of an element in a specific month
 * @param {string} element - Element to check (wood/fire/earth/metal/water)
 * @param {number} monthBranch - Month branch index (0-11)
 * @returns {number} Strength score (0-100)
 */
function getSeasonalStrength(element, monthBranch) {
  return SEASONAL_STRENGTH[element][monthBranch] || 50;
}

/**
 * Calculate Day Master strength score
 * @param {Object} chart - Full chart object with all pillars
 * @returns {Object} { score: number (0-100), category: string, details: Object }
 */
function calculateDayMasterStrength(chart) {
  const dayMaster = chart.dayMaster || chart.day.stem;
  const dmElement = dayMaster.element;

  // Three factors determine Day Master strength:
  // 1. 得令 (De Ling) - Seasonal Timing (40% weight)
  // 2. 得地 (De Di) - Location/Roots in branches (30% weight)
  // 3. 得勢 (De Shi) - Support from other stems (30% weight)

  // === 1. SEASONAL STRENGTH (得令) - 40% ===
  const monthBranch = chart.month.branchIndex;
  const seasonalScore = getSeasonalStrength(dmElement, monthBranch);
  const seasonalWeight = seasonalScore * 0.4;

  // === 2. ROOTS IN BRANCHES (得地) - 30% ===
  // Check if Day Master has roots in earthly branches (including hidden stems)
  let rootCount = 0;
  let totalBranches = 0;

  ['year', 'month', 'day', 'hour'].forEach(pillar => {
    if (chart[pillar]) {
      totalBranches++;
      const branch = chart[pillar].branch;

      // Check visible element
      if (branch.element === dmElement) {
        rootCount += 1.0; // Full root
      }

      // Check hidden stems
      if (branch.hidden) {
        branch.hidden.forEach((hiddenStem, index) => {
          const hiddenElement = HEAVENLY_STEMS.find(s => s.chinese === hiddenStem)?.element;
          if (hiddenElement === dmElement) {
            // Primary hidden stem = 0.6, secondary = 0.3, tertiary = 0.1
            const weight = index === 0 ? 0.6 : (index === 1 ? 0.3 : 0.1);
            rootCount += weight;
          }
        });
      }
    }
  });

  const rootPercentage = (rootCount / totalBranches) * 100;
  const rootWeight = rootPercentage * 0.3;

  // === 3. SUPPORT FROM STEMS (得勢) - 30% ===
  // Count stems that support Day Master (same element or produces Day Master)
  let supportCount = 0;
  let totalStems = 0;

  const elementCycles = {
    produces: { wood: 'fire', fire: 'earth', earth: 'metal', metal: 'water', water: 'wood' },
    produced_by: { fire: 'wood', earth: 'fire', metal: 'earth', water: 'metal', wood: 'water' }
  };

  ['year', 'month', 'hour'].forEach(pillar => { // Exclude day stem (self)
    if (chart[pillar]) {
      totalStems++;
      const stemElement = chart[pillar].stem.element;

      if (stemElement === dmElement) {
        supportCount += 1.0; // Same element = full support
      } else if (elementCycles.produced_by[dmElement] === stemElement) {
        supportCount += 0.8; // Resource element = strong support
      }
    }
  });

  const supportPercentage = (supportCount / totalStems) * 100;
  const supportWeight = supportPercentage * 0.3;

  // === CALCULATE TOTAL STRENGTH ===
  const totalScore = seasonalWeight + rootWeight + supportWeight;

  // === CATEGORIZE STRENGTH ===
  let category;
  if (totalScore >= 75) {
    category = 'very-strong';
  } else if (totalScore >= 55) {
    category = 'strong';
  } else if (totalScore >= 35) {
    category = 'balanced';
  } else if (totalScore >= 20) {
    category = 'weak';
  } else {
    category = 'very-weak';
  }

  return {
    score: Math.round(totalScore),
    category: category,
    details: {
      seasonal: {
        score: seasonalScore,
        weighted: Math.round(seasonalWeight),
        description: `Day Master ${dmElement} born in ${EARTHLY_BRANCHES[monthBranch].chinese} month`
      },
      roots: {
        count: rootCount.toFixed(1),
        percentage: Math.round(rootPercentage),
        weighted: Math.round(rootWeight),
        description: `${rootCount.toFixed(1)} roots in 4 earthly branches`
      },
      support: {
        count: supportCount.toFixed(1),
        percentage: Math.round(supportPercentage),
        weighted: Math.round(supportWeight),
        description: `${supportCount.toFixed(1)} supporting stems out of 3`
      }
    }
  };
}

/**
 * Analyze elemental imbalances in the chart
 * @param {Object} chart - Full chart object
 * @returns {Object} { excessive: array, deficient: array, balanced: array }
 */
function analyzeImbalances(chart) {
  const elementCounts = { wood: 0, fire: 0, earth: 0, metal: 0, water: 0 };

  // Count visible stems and branches
  ['year', 'month', 'day', 'hour'].forEach(pillar => {
    if (chart[pillar]) {
      elementCounts[chart[pillar].stem.element]++;
      elementCounts[chart[pillar].branch.element]++;
    }
  });

  // Count hidden stems with reduced weight
  ['year', 'month', 'day', 'hour'].forEach(pillar => {
    if (chart[pillar] && chart[pillar].branch.hidden) {
      chart[pillar].branch.hidden.forEach((hiddenStem, index) => {
        const hiddenElement = HEAVENLY_STEMS.find(s => s.chinese === hiddenStem)?.element;
        if (hiddenElement) {
          const weight = index === 0 ? 0.6 : (index === 1 ? 0.3 : 0.1);
          elementCounts[hiddenElement] += weight;
        }
      });
    }
  });

  // Categorize (out of 8 visible + ~4-6 hidden = ~12-14 total)
  const excessive = [];
  const deficient = [];
  const balanced = [];

  Object.entries(elementCounts).forEach(([element, count]) => {
    if (count >= 4) {
      excessive.push({ element, count: count.toFixed(1) });
    } else if (count <= 1) {
      deficient.push({ element, count: count.toFixed(1) });
    } else {
      balanced.push({ element, count: count.toFixed(1) });
    }
  });

  return { excessive, deficient, balanced, counts: elementCounts };
}

/**
 * Select the Use God (用神) for a BaZi chart
 * @param {Object} chart - Full chart object from calculateFullChart
 * @returns {Object} { useGod, avoidGod, reasoning, strength, alternativeUseGod }
 */
function selectUseGod(chart) {
  const dayMaster = chart.dayMaster || chart.day.stem;
  const dmElement = dayMaster.element;

  // Calculate Day Master strength
  const strength = calculateDayMasterStrength(chart);
  const imbalances = analyzeImbalances(chart);

  // Element production and control cycles
  const produces = { wood: 'fire', fire: 'earth', earth: 'metal', metal: 'water', water: 'wood' };
  const producedBy = { fire: 'wood', earth: 'fire', metal: 'earth', water: 'metal', wood: 'water' };
  const controls = { wood: 'earth', earth: 'water', water: 'fire', fire: 'metal', metal: 'wood' };
  const controlledBy = { earth: 'wood', water: 'earth', fire: 'water', metal: 'fire', wood: 'metal' };

  let useGod;
  let avoidGod;
  let reasoning;
  let alternativeUseGod;

  // === USE GOD SELECTION LOGIC ===

  if (strength.category === 'very-weak' || strength.category === 'weak') {
    // WEAK DAY MASTER: Need support and resources
    // Use God = Element that produces Day Master OR same element

    useGod = producedBy[dmElement];
    alternativeUseGod = dmElement;
    avoidGod = [controlledBy[dmElement], produces[dmElement]];

    reasoning = `Day Master ${dmElement.toUpperCase()} is ${strength.category} (${strength.score}/100). ` +
                `Needs nurturing and support. Use God is ${useGod.toUpperCase()} (Resource element that produces ${dmElement}). ` +
                `Alternative: ${dmElement.toUpperCase()} (same element for peer support). ` +
                `Avoid ${controlledBy[dmElement].toUpperCase()} (controls/pressures you) and ${produces[dmElement].toUpperCase()} (drains your energy).`;

  } else if (strength.category === 'very-strong' || strength.category === 'strong') {
    // STRONG DAY MASTER: Need drainage and control
    // Use God = Element that Day Master produces OR element that controls Day Master

    // Check if there are excessive elements to consider
    const hasExcessive = imbalances.excessive.length > 0;

    if (hasExcessive) {
      // If there's an excessive element, prioritize controlling it
      const excessiveElement = imbalances.excessive[0].element;

      if (excessiveElement === dmElement) {
        // Too much of Day Master itself
        useGod = produces[dmElement]; // Output/expression
        alternativeUseGod = controlledBy[dmElement]; // Control
      } else {
        // Excessive different element
        useGod = controls[excessiveElement]; // Control the excess
        alternativeUseGod = produces[dmElement]; // Drain Day Master
      }
    } else {
      // No major imbalances, use standard strong Day Master approach
      useGod = produces[dmElement]; // Output element (drains Day Master positively)
      alternativeUseGod = controlledBy[dmElement]; // Control element
    }

    avoidGod = [producedBy[dmElement], dmElement];

    reasoning = `Day Master ${dmElement.toUpperCase()} is ${strength.category} (${strength.score}/100). ` +
                `Has excess energy that needs expression or control. Use God is ${useGod.toUpperCase()} ` +
                `(${hasExcessive ? 'balances excessive elements and drains Day Master' : 'output element for creative expression'}). ` +
                `Alternative: ${alternativeUseGod.toUpperCase()}. ` +
                `Avoid ${producedBy[dmElement].toUpperCase()} and ${dmElement.toUpperCase()} (add more strength, causing imbalance).`;

  } else {
    // BALANCED DAY MASTER: Focus on what's missing or excessive

    if (imbalances.deficient.length > 0) {
      // Has deficient elements - enhance the most deficient
      useGod = imbalances.deficient[0].element;
      alternativeUseGod = producedBy[useGod]; // Element that produces the deficient one
      avoidGod = [controlledBy[useGod]];

      reasoning = `Day Master ${dmElement.toUpperCase()} is balanced (${strength.score}/100). ` +
                  `Chart is missing ${useGod.toUpperCase()} element. Use God is ${useGod.toUpperCase()} to fill the void. ` +
                  `Avoid ${controlledBy[useGod].toUpperCase()} (controls/suppresses Use God).`;

    } else if (imbalances.excessive.length > 0) {
      // Has excessive elements - control them
      const excessiveElement = imbalances.excessive[0].element;
      useGod = controlledBy[excessiveElement];
      alternativeUseGod = produces[excessiveElement]; // Drain the excess
      avoidGod = [producedBy[excessiveElement]];

      reasoning = `Day Master ${dmElement.toUpperCase()} is balanced (${strength.score}/100). ` +
                  `Chart has excessive ${excessiveElement.toUpperCase()}. Use God is ${useGod.toUpperCase()} ` +
                  `to control and harmonize. Avoid ${producedBy[excessiveElement].toUpperCase()} (adds more excess).`;

    } else {
      // Truly balanced - maintain the balance
      useGod = dmElement;
      alternativeUseGod = producedBy[dmElement];
      avoidGod = [controlledBy[dmElement]];

      reasoning = `Day Master ${dmElement.toUpperCase()} is balanced (${strength.score}/100). ` +
                  `Chart is harmonious. Use God is ${dmElement.toUpperCase()} (maintain balance with same element). ` +
                  `Avoid ${controlledBy[dmElement].toUpperCase()} (would disrupt harmony).`;
    }
  }

  return {
    useGod: useGod,
    avoidGod: Array.isArray(avoidGod) ? avoidGod : [avoidGod],
    alternativeUseGod: alternativeUseGod,
    reasoning: reasoning,
    strength: strength,
    imbalances: imbalances,
    dayMaster: {
      element: dmElement,
      chinese: dayMaster.chinese,
      english: dayMaster.english
    }
  };
}

module.exports = {
  selectUseGod,
  calculateDayMasterStrength,
  getSeasonalStrength,
  analyzeImbalances,
  SEASONAL_STRENGTH
};
