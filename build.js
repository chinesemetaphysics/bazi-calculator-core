/**
 * Build Script - Creates UMD bundle for browser use
 * Output: dist/bazi-calculator.umd.js
 */

const fs = require('fs');
const path = require('path');

// Read all source files
const constants = fs.readFileSync(path.join(__dirname, 'src/constants.js'), 'utf8');
const solarTerms = fs.readFileSync(path.join(__dirname, 'src/solarTerms.js'), 'utf8');
const dayPillar = fs.readFileSync(path.join(__dirname, 'src/dayPillar.js'), 'utf8');
const yearPillar = fs.readFileSync(path.join(__dirname, 'src/yearPillar.js'), 'utf8');
const monthPillar = fs.readFileSync(path.join(__dirname, 'src/monthPillar.js'), 'utf8');
const hourPillar = fs.readFileSync(path.join(__dirname, 'src/hourPillar.js'), 'utf8');
const formatters = fs.readFileSync(path.join(__dirname, 'src/formatters.js'), 'utf8');
const tenGods = fs.readFileSync(path.join(__dirname, 'src/tenGods.js'), 'utf8');
const branchRelations = fs.readFileSync(path.join(__dirname, 'src/branchRelations.js'), 'utf8');
const nayin = fs.readFileSync(path.join(__dirname, 'src/nayin.js'), 'utf8');
const useGod = fs.readFileSync(path.join(__dirname, 'src/useGod.js'), 'utf8');
const voidStars = fs.readFileSync(path.join(__dirname, 'src/voidStars.js'), 'utf8');
const symbolicStars = fs.readFileSync(path.join(__dirname, 'src/symbolicStars.js'), 'utf8');
const fengShui = fs.readFileSync(path.join(__dirname, 'src/fengShui.js'), 'utf8');
const qiMenData = fs.readFileSync(path.join(__dirname, 'src/data/qiMenData.js'), 'utf8');
const qiMen = fs.readFileSync(path.join(__dirname, 'src/qiMen.js'), 'utf8');
const timingData = fs.readFileSync(path.join(__dirname, 'src/data/timingData.js'), 'utf8');
const timing = fs.readFileSync(path.join(__dirname, 'src/timing.js'), 'utf8');
const chartAnalysis = fs.readFileSync(path.join(__dirname, 'src/chartAnalysis.js'), 'utf8');
const luckPillars = fs.readFileSync(path.join(__dirname, 'src/luckPillars.js'), 'utf8');
const index = fs.readFileSync(path.join(__dirname, 'src/index.js'), 'utf8');

// Strip module.exports and require statements
function stripCommonJS(code) {
    return code
        .replace(/module\.exports\s*=\s*\{[^}]*\};?/g, '')
        .replace(/const\s+\{[^}]+\}\s*=\s*require\([^)]+\);?/g, '')
        .trim();
}

// Build UMD wrapper
const umdBundle = `/**
 * BaZi Calculator Core v3.6.2
 * https://github.com/chinesemetaphysics/bazi-calculator-core
 *
 * Core calculation engine for Four Pillars (BaZi) analysis
 * SSOT for TheArties applications
 * v3.6.2: Restore v3.5.0 features + v3.6.0 timezone/solar term fixes
 * v3.5.0: 12 Officers (建除十二神) & 28 Mansions (二十八宿)
 * v3.4.0: Qi Men Dun Jia (奇門遁甲)
 * v3.3.0: Use God (用神)
 */
(function (global, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        // CommonJS (Node.js)
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        // AMD
        define([], factory);
    } else {
        // Browser global
        global.BaZiCalculator = factory();
    }
})(typeof window !== 'undefined' ? window : this, function () {
    'use strict';

    // ============================================
    // CONSTANTS
    // ============================================
    ${stripCommonJS(constants)}

    // ============================================
    // SOLAR TERMS
    // ============================================
    ${stripCommonJS(solarTerms)}

    // ============================================
    // DAY PILLAR
    // ============================================
    ${stripCommonJS(dayPillar)}

    // ============================================
    // YEAR PILLAR
    // ============================================
    ${stripCommonJS(yearPillar)}

    // ============================================
    // MONTH PILLAR
    // ============================================
    ${stripCommonJS(monthPillar)}

    // ============================================
    // HOUR PILLAR
    // ============================================
    ${stripCommonJS(hourPillar)}

    // ============================================
    // FORMATTERS
    // ============================================
    ${stripCommonJS(formatters)}

    // ============================================
    // TEN GODS & ELEMENT RELATIONS
    // ============================================
    ${stripCommonJS(tenGods)}

    // ============================================
    // BRANCH RELATIONS
    // ============================================
    ${stripCommonJS(branchRelations)}

    // ============================================
    // NA YIN (60 JIA ZI)
    // ============================================
    ${stripCommonJS(nayin)}

    // ============================================
    // USE GOD (v3.3.0)
    // ============================================
    ${stripCommonJS(useGod)}

    // ============================================
    // VOID STARS (v3.3.0)
    // ============================================
    ${stripCommonJS(voidStars)}

    // ============================================
    // SYMBOLIC STARS (v3.3.0)
    // ============================================
    ${stripCommonJS(symbolicStars)}

    // ============================================
    // FENG SHUI (v3.3.0)
    // ============================================
    ${stripCommonJS(fengShui)}

    // ============================================
    // QI MEN DUN JIA (v3.4.0)
    // ============================================
    ${stripCommonJS(qiMenData)}
    ${stripCommonJS(qiMen)}

    // ============================================
    // TIMING SYSTEMS (v3.5.0)
    // ============================================
    ${stripCommonJS(timingData)}
    ${stripCommonJS(timing)}

    // ============================================
    // CHART ANALYSIS
    // ============================================
    ${stripCommonJS(chartAnalysis)}

    // ============================================
    // LUCK PILLARS
    // ============================================
    ${stripCommonJS(luckPillars)}

    // ============================================
    // MAIN CALCULATOR
    // ============================================
    ${stripCommonJS(index)}

    // ============================================
    // PUBLIC API
    // ============================================
    return {
        // Main calculation functions
        calculateBaZi: calculateBaZi,
        calculateFullChart: calculateFullChart,

        // Individual pillar functions
        calculateYearPillar: calculateYearPillar,
        calculateMonthPillar: calculateMonthPillar,
        calculateDayPillar: calculateDayPillar,
        calculateHourPillar: calculateHourPillar,

        // Solar terms
        getSolarTerms: getYearSolarTerms,
        getYearSolarTerms: getYearSolarTerms,
        findLiChun: getLiChunDate,
        getLiChunDate: getLiChunDate,
        getSolarMonthForDate: getSolarMonthForDate,

        // Formatters
        formatPillar: formatPillar,
        formatChinesePillar: formatChinesePillar,

        // Constants - Core
        HEAVENLY_STEMS: HEAVENLY_STEMS,
        EARTHLY_BRANCHES: EARTHLY_BRANCHES,

        // Constants - Ten Gods & Elements
        TEN_GODS: TEN_GODS,
        ELEMENT_CYCLES: ELEMENT_CYCLES,

        // Constants - Branch Relations
        SIX_HARMONIES: SIX_HARMONIES,
        SIX_CLASHES: SIX_CLASHES,
        SIX_HARMS: SIX_HARMS,

        // Constants - Na Yin
        NAYIN: NAYIN,

        // Constants - Use God
        SEASONAL_STRENGTH: SEASONAL_STRENGTH,

        // Analysis Functions
        getTenGod: getTenGod,
        getElementRelation: getElementRelation,
        getNaYin: getNaYin,
        getElementCount: getElementCount,
        getFavorableElements: getFavorableElements,
        getLifeGua: getLifeGua,
        getFavorableDirections: getFavorableDirections,

        // Luck Pillars
        calculateLuckPillars: calculateLuckPillars,

        // Use God Functions (v3.3.0)
        selectUseGod: selectUseGod,
        calculateDayMasterStrength: calculateDayMasterStrength,
        getSeasonalStrength: getSeasonalStrength,
        analyzeImbalances: analyzeImbalances,
        HIDDEN_STEMS: HIDDEN_STEMS,
        getHiddenStems: getHiddenStems,
        getHiddenStemsForChart: getHiddenStemsForChart,

        // Void Stars (v3.3.0)
        getVoidStars: getVoidStars,
        isVoidBranch: isVoidBranch,
        analyzeVoidStarsInChart: analyzeVoidStarsInChart,

        // Symbolic Stars (v3.3.0)
        getNoblepeople: getNoblepeople,
        getPeachBlossom: getPeachBlossom,
        getSkyHorse: getSkyHorse,
        getIntelligenceStar: getIntelligenceStar,
        getLifePalace: getLifePalace,

        // Feng Shui (v3.3.0)
        calculateKuaNumber: calculateKuaNumber,
        calculateFlyingStarCenter: calculateFlyingStarCenter,
        getAnnualAfflictions: getAnnualAfflictions,

        // Qi Men Dun Jia (v3.4.0)
        getSolarTermsForYear: getSolarTermsForYear,
        getSolarTermForDate: getSolarTermForDate,
        getQiMenStructure: getQiMenStructure,
        getLifeStemPairIndex: getLifeStemPairIndex,
        calculateDestinyDoor: calculateDestinyDoor,
        EIGHT_DOORS: EIGHT_DOORS,

        // Timing Systems (v3.5.0)
        getTodayOfficer: getTodayOfficer,
        getTodayMansion: getTodayMansion,
        getHourRating: getHourRating,
        getHourDirection: getHourDirection,
        TWELVE_OFFICERS: TWELVE_OFFICERS,
        TWENTY_EIGHT_MANSIONS: TWENTY_EIGHT_MANSIONS,

        // Version
        version: '3.6.2'
    };
});
`;

// Ensure dist directory exists
if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist', { recursive: true });
}

// Write UMD bundle
fs.writeFileSync('dist/bazi-calculator.umd.js', umdBundle, 'utf8');

// Copy as main entry point
fs.writeFileSync('dist/bazi-calculator.js', umdBundle, 'utf8');

console.log('✅ Build complete!');
console.log('   - dist/bazi-calculator.umd.js');
console.log('   - dist/bazi-calculator.js');
console.log('');
console.log('Usage in browser:');
console.log('  <script src="https://cdn.jsdelivr.net/gh/chinesemetaphysics/bazi-calculator-core@v3.6.1/dist/bazi-calculator.js"></script>');
console.log('  <script>');
console.log('    const chart = BaZiCalculator.calculateBaZi({ year: 2000, month: 1, day: 1, hour: 12, minute: 0, timezone: "+08:00" });');
console.log('  </script>');
