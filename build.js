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
 * BaZi Calculator Core v3.6.1
 * https://github.com/chinesemetaphysics/bazi-calculator-core
 *
 * Core calculation engine for Four Pillars (BaZi) analysis
 * SSOT for TheArties applications
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
    // MAIN CALCULATOR
    // ============================================
    ${stripCommonJS(index)}

    // ============================================
    // PUBLIC API
    // ============================================
    return {
        // Main calculation function
        calculateBaZi: calculateBaZi,
        
        // Individual pillar functions
        calculateYearPillar: calculateYearPillar,
        calculateMonthPillar: calculateMonthPillar,
        calculateDayPillar: calculateDayPillar,
        calculateHourPillar: calculateHourPillar,
        
        // Solar terms
        getYearSolarTerms: getYearSolarTerms,
        getLiChunDate: getLiChunDate,
        getSolarMonthForDate: getSolarMonthForDate,
        
        // Formatters
        formatPillar: formatPillar,
        formatChinesePillar: formatChinesePillar,
        
        // Constants
        HEAVENLY_STEMS: HEAVENLY_STEMS,
        EARTHLY_BRANCHES: EARTHLY_BRANCHES,
        
        // Version
        version: '3.6.1'
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
