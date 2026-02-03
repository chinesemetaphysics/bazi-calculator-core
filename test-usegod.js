/**
 * Test Use God Module
 * Quick verification that the Use God calculation works correctly
 */

const { calculateFullChart } = require('./src/chartAnalysis');
const { selectUseGod, calculateDayMasterStrength, analyzeImbalances } = require('./src/useGod');

console.log('=== BaZi Use God Module Test ===\n');

// Test Case 1: Weak Day Master (needs support)
console.log('Test 1: Weak Day Master (Water born in Summer)');
const chart1 = calculateFullChart(1990, 6, 15, 10, 30, 'male'); // Water DM in Summer
console.log('Birth: 1990-06-15 10:30 (male)');
console.log('Day Master:', chart1.dayMaster.chinese, chart1.dayMaster.english);

const strength1 = calculateDayMasterStrength(chart1);
console.log('Strength:', strength1.score + '/100', `(${strength1.category})`);
console.log('  - Seasonal:', strength1.details.seasonal.description, `(${strength1.details.seasonal.weighted}/40)`);
console.log('  - Roots:', strength1.details.roots.description, `(${strength1.details.roots.weighted}/30)`);
console.log('  - Support:', strength1.details.support.description, `(${strength1.details.support.weighted}/30)`);

const useGod1 = selectUseGod(chart1);
console.log('\nUse God Analysis:');
console.log('  - Use God:', useGod1.useGod.toUpperCase());
console.log('  - Alternative:', useGod1.alternativeUseGod.toUpperCase());
console.log('  - Avoid God:', useGod1.avoidGod.join(', ').toUpperCase());
console.log('  - Reasoning:', useGod1.reasoning);
console.log('  - Imbalances:', {
  excessive: useGod1.imbalances.excessive.map(e => `${e.element}(${e.count})`),
  deficient: useGod1.imbalances.deficient.map(e => `${e.element}(${e.count})`)
});

console.log('\n' + '='.repeat(80) + '\n');

// Test Case 2: Strong Day Master (needs drainage)
console.log('Test 2: Strong Day Master (Wood born in Spring)');
const chart2 = calculateFullChart(1995, 3, 20, 14, 0, 'female'); // Wood DM in Spring
console.log('Birth: 1995-03-20 14:00 (female)');
console.log('Day Master:', chart2.dayMaster.chinese, chart2.dayMaster.english);

const strength2 = calculateDayMasterStrength(chart2);
console.log('Strength:', strength2.score + '/100', `(${strength2.category})`);
console.log('  - Seasonal:', strength2.details.seasonal.description, `(${strength2.details.seasonal.weighted}/40)`);
console.log('  - Roots:', strength2.details.roots.description, `(${strength2.details.roots.weighted}/30)`);
console.log('  - Support:', strength2.details.support.description, `(${strength2.details.support.weighted}/30)`);

const useGod2 = selectUseGod(chart2);
console.log('\nUse God Analysis:');
console.log('  - Use God:', useGod2.useGod.toUpperCase());
console.log('  - Alternative:', useGod2.alternativeUseGod.toUpperCase());
console.log('  - Avoid God:', useGod2.avoidGod.join(', ').toUpperCase());
console.log('  - Reasoning:', useGod2.reasoning);

console.log('\n' + '='.repeat(80) + '\n');

// Test Case 3: Balanced chart
console.log('Test 3: Balanced Day Master');
const chart3 = calculateFullChart(2000, 1, 1, 12, 0, 'male');
console.log('Birth: 2000-01-01 12:00 (male)');
console.log('Day Master:', chart3.dayMaster.chinese, chart3.dayMaster.english);

const strength3 = calculateDayMasterStrength(chart3);
console.log('Strength:', strength3.score + '/100', `(${strength3.category})`);

const useGod3 = selectUseGod(chart3);
console.log('\nUse God Analysis:');
console.log('  - Use God:', useGod3.useGod.toUpperCase());
console.log('  - Alternative:', useGod3.alternativeUseGod ? useGod3.alternativeUseGod.toUpperCase() : 'N/A');
console.log('  - Avoid God:', useGod3.avoidGod.join(', ').toUpperCase());
console.log('  - Reasoning:', useGod3.reasoning);

console.log('\n' + '='.repeat(80));
console.log('✅ Use God Module Test Complete!');
console.log('All functions executed successfully.');
