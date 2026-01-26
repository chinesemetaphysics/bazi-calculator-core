// Test: September 2, 1978 month pillar calculation
const { getSolarMonthForDate, getYearSolarTerms } = require('./src/solar-terms.js');
const { calculateMonthPillar, calculateYearPillar } = require('./src/pillars.js');

const STEMS = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
const BRANCHES = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
const ANIMALS = ['Rat','Ox','Tiger','Rabbit','Dragon','Snake','Horse','Goat','Monkey','Rooster','Dog','Pig'];
const ELEMENTS = ['water','earth','wood','wood','earth','fire','fire','earth','metal','metal','earth','water'];

const year = 1978, month = 9, day = 2;
console.log('=== Testing: September 2, 1978 ===\n');

// Get solar month info
const solarMonth = getSolarMonthForDate(year, month, day);
console.log('Solar Month Info:');
console.log('  solarMonthIndex:', solarMonth.solarMonthIndex);
console.log('  monthBranch:', solarMonth.monthBranch, '(' + BRANCHES[solarMonth.monthBranch] + ' / ' + ANIMALS[solarMonth.monthBranch] + ')');
if (solarMonth.currentTerm) {
    console.log('  Current Term:', solarMonth.currentTerm.term?.name || 'N/A');
    console.log('  Term Date:', solarMonth.termDate?.month + '/' + solarMonth.termDate?.day + '/' + solarMonth.termDate?.year);
}

// Get year pillar for the stem
const yearPillar = calculateYearPillar(year, month, day);
console.log('\nYear Pillar:', STEMS[yearPillar.stemIndex] + BRANCHES[yearPillar.branchIndex]);
console.log('  Year Stem Index:', yearPillar.stemIndex, '(' + STEMS[yearPillar.stemIndex] + ')');

// Get month pillar
const monthPillar = calculateMonthPillar(year, month, day, yearPillar.stemIndex, solarMonth);
console.log('\nMonth Pillar Calculation:');
console.log('  Stem Index:', monthPillar.stemIndex, '(' + STEMS[monthPillar.stemIndex] + ')');
console.log('  Branch Index:', monthPillar.branchIndex, '(' + BRANCHES[monthPillar.branchIndex] + ')');
console.log('  Month Animal:', ANIMALS[monthPillar.branchIndex]);
console.log('  Month Element:', ELEMENTS[monthPillar.branchIndex]);
console.log('\n  >>> MONTH PILLAR:', STEMS[monthPillar.stemIndex] + BRANCHES[monthPillar.branchIndex], 
    '-', ANIMALS[monthPillar.branchIndex], '/', ELEMENTS[monthPillar.branchIndex].toUpperCase());

console.log('\n=== Expected Result ===');
console.log('For September 2, 1978, month pillar should be:');
console.log('  庚申 (Geng Shen) - Monkey / METAL');

// Show Li Qiu (Start of Autumn) for 1978
console.log('\n=== Solar Terms around September 1978 ===');
const terms = getYearSolarTerms(1978);
const relevantTerms = terms.filter(t => t.term.index >= 10 && t.term.index <= 16);
relevantTerms.forEach(t => {
    console.log('  ' + t.term.name + ' (' + t.term.chinese + '):', 
        t.month + '/' + t.day + '/1978 -> ' + ANIMALS[(t.solarMonthIndex + 2) % 12] + ' month');
});
