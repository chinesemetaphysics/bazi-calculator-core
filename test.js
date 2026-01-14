// Test script for BaZi Calculator Core
// Simple direct test without complex module loading

console.log('═══════════════════════════════════════════════════════════');
console.log('  BAZI CALCULATOR - VERIFICATION TESTS');
console.log('═══════════════════════════════════════════════════════════\n');

// Day Pillar Test Function (standalone)
function testDayPillar(year, month, day) {
    const STEMS = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
    const BRANCHES = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];

    const refDate = Date.UTC(1923, 11, 17);
    const targetDate = Date.UTC(year, month - 1, day);
    const daysDiff = Math.floor((targetDate - refDate) / (1000 * 60 * 60 * 24));
    const jiaziIndex = ((daysDiff % 60) + 60) % 60;

    return STEMS[jiaziIndex % 10] + BRANCHES[jiaziIndex % 12];
}

// Kua Number Test Function (standalone - CORRECTED formula)
function testKuaNumber(year, month, day, gender) {
    let calcYear = year;

    // Li Chun adjustment (simplified - Feb 4)
    if (month < 2 || (month === 2 && day < 4)) {
        calcYear = year - 1;
    }

    const lastTwo = calcYear % 100;
    let digitSum = Math.floor(lastTwo / 10) + (lastTwo % 10);
    while (digitSum > 9) {
        digitSum = Math.floor(digitSum / 10) + (digitSum % 10);
    }

    let kua;
    const isMale = gender === 'male';

    if (calcYear >= 2000) {
        if (isMale) {
            kua = 9 - digitSum;
            if (kua <= 0) kua += 9;
        } else {
            kua = digitSum + 6;
            if (kua > 9) kua -= 9;
        }
    } else {
        if (isMale) {
            kua = 10 - digitSum;
            if (kua <= 0) kua += 9;
            if (kua > 9) kua -= 9;
        } else {
            kua = digitSum + 5;
            if (kua > 9) kua -= 9;
        }
    }

    if (kua === 5) kua = isMale ? 2 : 8;
    return kua;
}

// Flying Star Center (9-year descending cycle)
function testFlyingStarCenter(year) {
    const diff = year - 2017;
    let center = ((1 - diff) % 9 + 9) % 9;
    return center === 0 ? 9 : center;
}

// Run Tests
console.log('▶ DAY PILLAR TESTS');
console.log('─────────────────────────────────────────────────────────────');
const dayTests = [
    { date: [1923, 12, 17], expected: '甲子', name: 'Reference' },
    { date: [1955, 2, 24], expected: '丙辰', name: 'Steve Jobs' },
    { date: [1955, 10, 28], expected: '壬戌', name: 'Bill Gates' },
    { date: [1954, 4, 7], expected: '癸巳', name: 'Jackie Chan' },
    { date: [2000, 1, 1], expected: '戊午', name: 'Y2K' },
];

let passed = 0, failed = 0;
dayTests.forEach(t => {
    const result = testDayPillar(...t.date);
    const ok = result === t.expected;
    console.log(`  ${ok ? '✓' : '✗'} ${t.date.join('-')}: ${result} ${ok ? '' : '(expected ' + t.expected + ')'} [${t.name}]`);
    ok ? passed++ : failed++;
});

console.log('\n▶ KUA NUMBER TESTS');
console.log('─────────────────────────────────────────────────────────────');
const kuaTests = [
    { args: [1960, 6, 15, 'male'], expected: 4 },
    { args: [1960, 6, 15, 'female'], expected: 2 },
    { args: [1985, 6, 15, 'male'], expected: 6 },
    { args: [1985, 6, 15, 'female'], expected: 9 },
    { args: [1950, 6, 15, 'male'], expected: 2, note: '5→2' },
    { args: [1990, 6, 15, 'female'], expected: 8, note: '5→8' },
    { args: [2000, 6, 15, 'male'], expected: 9 },
    { args: [2000, 6, 15, 'female'], expected: 6 },
    { args: [2012, 8, 31, 'male'], expected: 6 },
    { args: [1954, 4, 7, 'male'], expected: 1, note: 'Jackie Chan' },
];

kuaTests.forEach(t => {
    const result = testKuaNumber(...t.args);
    const ok = result === t.expected;
    const note = t.note ? ` (${t.note})` : '';
    console.log(`  ${ok ? '✓' : '✗'} ${t.args[0]} ${t.args[3]}: Kua ${result} ${ok ? '' : '(expected ' + t.expected + ')'}${note}`);
    ok ? passed++ : failed++;
});

console.log('\n▶ FLYING STAR CENTER TESTS');
console.log('─────────────────────────────────────────────────────────────');
const fsTests = [
    { year: 2017, expected: 1 },
    { year: 2018, expected: 9 },
    { year: 2024, expected: 3 },
    { year: 2025, expected: 2 },
    { year: 2026, expected: 1 },
];

fsTests.forEach(t => {
    const result = testFlyingStarCenter(t.year);
    const ok = result === t.expected;
    console.log(`  ${ok ? '✓' : '✗'} ${t.year}: Center Star ${result} ${ok ? '' : '(expected ' + t.expected + ')'}`);
    ok ? passed++ : failed++;
});

console.log('\n═══════════════════════════════════════════════════════════');
console.log(`  RESULTS: ${passed} passed, ${failed} failed`);
console.log('═══════════════════════════════════════════════════════════');

if (failed > 0) process.exit(1);
