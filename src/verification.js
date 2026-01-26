/**
 * BaZi Calculator Core - Verification Module
 * Runtime integrity and accuracy checks
 * 
 * Version: 1.1.1
 * 
 * This module provides:
 * 1. Calculation accuracy verification against known reference data
 * 2. Runtime integrity checks on page load
 * 3. Visual verification badge for users
 * 
 * Reference Points (Immutable):
 * - December 17, 1923 = 甲子 (Jia Zi) Day Pillar
 * - 2017 Annual Flying Star Center = 1
 * - Kua formulas verified against traditional texts
 */

// ==============================================
// VERIFICATION TEST SUITE
// ==============================================

const VERIFICATION_TESTS = {
    // Day Pillar Tests - Historical Reference Points
    dayPillar: [
        { date: [1923, 12, 17], expected: { stem: 0, branch: 0 }, name: 'Reference Point (甲子)' },
        { date: [1955, 2, 24], expected: { stem: 2, branch: 4 }, name: 'Steve Jobs (丙辰)' },
        { date: [1955, 10, 28], expected: { stem: 8, branch: 10 }, name: 'Bill Gates (壬戌)' },
        { date: [1954, 4, 7], expected: { stem: 9, branch: 5 }, name: 'Jackie Chan (癸巳)' },
        { date: [2000, 1, 1], expected: { stem: 4, branch: 6 }, name: 'Y2K (戊午)' },
        { date: [2026, 1, 14], expected: { stem: 4, branch: 0 }, name: 'Jan 14 2026 (戊子)' }
    ],
    
    // Kua Number Tests - Pre-2000 and Post-2000
    kuaNumber: [
        { args: [1960, 6, 15, 'male'], expected: 4, formula: 'Pre-2000 Male' },
        { args: [1960, 6, 15, 'female'], expected: 2, formula: 'Pre-2000 Female' },
        { args: [1985, 6, 15, 'male'], expected: 6, formula: 'Pre-2000 Male' },
        { args: [1985, 6, 15, 'female'], expected: 9, formula: 'Pre-2000 Female' },
        { args: [1950, 6, 15, 'male'], expected: 2, formula: 'Kua 5→2 Male' },
        { args: [1990, 6, 15, 'female'], expected: 8, formula: 'Kua 5→8 Female' },
        { args: [2000, 6, 15, 'male'], expected: 9, formula: 'Post-2000 Male' },
        { args: [2000, 6, 15, 'female'], expected: 6, formula: 'Post-2000 Female' },
        { args: [2012, 8, 31, 'male'], expected: 6, formula: 'Post-2000 Male' },
        { args: [1954, 4, 7, 'male'], expected: 1, formula: 'Jackie Chan' }
    ],
    
    // Flying Star Center Tests - 9-year cycle
    flyingStarCenter: [
        { year: 2017, expected: 1 },
        { year: 2018, expected: 9 },
        { year: 2019, expected: 8 },
        { year: 2024, expected: 3 },
        { year: 2025, expected: 2 },
        { year: 2026, expected: 1 }
    ],
    
    // Zi Hour Tests - Late Zi (23:00-23:59) handling
    ziHour: [
        { date: [2000, 1, 1, 23, 30], expected: { isLateZi: true, hourStem: 0 }, name: 'Late Zi Hour' },
        { date: [2000, 1, 1, 12, 0], expected: { isLateZi: false }, name: 'Normal Hour' }
    ]
};

// ==============================================
// VERIFICATION FUNCTIONS
// ==============================================

/**
 * Run all verification tests
 * @returns {Object} { passed, failed, total, details, allPassed }
 */
function runVerificationTests() {
    const results = {
        passed: 0,
        failed: 0,
        total: 0,
        details: [],
        timestamp: new Date().toISOString(),
        version: '1.1.1'
    };
    
    // Test Day Pillar calculations
    if (typeof calculateDayPillar === 'function') {
        VERIFICATION_TESTS.dayPillar.forEach(test => {
            results.total++;
            const result = calculateDayPillar(...test.date);
            const pass = result.stemIndex === test.expected.stem && 
                        result.branchIndex === test.expected.branch;
            
            if (pass) {
                results.passed++;
            } else {
                results.failed++;
            }
            
            results.details.push({
                category: 'Day Pillar',
                name: test.name,
                input: test.date.join('-'),
                expected: `Stem:${test.expected.stem} Branch:${test.expected.branch}`,
                actual: `Stem:${result.stemIndex} Branch:${result.branchIndex}`,
                passed: pass
            });
        });
    }
    
    // Test Kua Number calculations
    if (typeof calculateKuaNumber === 'function') {
        VERIFICATION_TESTS.kuaNumber.forEach(test => {
            results.total++;
            const result = calculateKuaNumber(...test.args);
            const pass = result === test.expected;
            
            if (pass) {
                results.passed++;
            } else {
                results.failed++;
            }
            
            results.details.push({
                category: 'Kua Number',
                name: `${test.args[0]} ${test.args[3]} (${test.formula})`,
                expected: test.expected,
                actual: result,
                passed: pass
            });
        });
    }
    
    // Test Flying Star Center
    if (typeof getAnnualCenterStar === 'function') {
        VERIFICATION_TESTS.flyingStarCenter.forEach(test => {
            results.total++;
            const result = getAnnualCenterStar(test.year);
            const pass = result === test.expected;
            
            if (pass) {
                results.passed++;
            } else {
                results.failed++;
            }
            
            results.details.push({
                category: 'Flying Star',
                name: `${test.year} Center Star`,
                expected: test.expected,
                actual: result,
                passed: pass
            });
        });
    }
    
    // Test Zi Hour handling
    if (typeof calculateBaZiChart === 'function') {
        VERIFICATION_TESTS.ziHour.forEach(test => {
            results.total++;
            const result = calculateBaZiChart(...test.date, 'male');
            let pass = result.isLateZiHour === test.expected.isLateZi;
            
            if (test.expected.hourStem !== undefined) {
                pass = pass && result.hour.stemIndex === test.expected.hourStem;
            }
            
            if (pass) {
                results.passed++;
            } else {
                results.failed++;
            }
            
            results.details.push({
                category: 'Zi Hour',
                name: test.name,
                expected: JSON.stringify(test.expected),
                actual: `isLateZi:${result.isLateZiHour}, hourStem:${result.hour.stemIndex}`,
                passed: pass
            });
        });
    }
    
    results.allPassed = results.failed === 0;
    return results;
}

/**
 * Quick verification check (returns boolean only)
 * @returns {boolean}
 */
function quickVerify() {
    const results = runVerificationTests();
    return results.allPassed;
}

/**
 * Create verification badge HTML
 * @param {Object} results - Verification results
 * @returns {string} HTML string
 */
function createVerificationBadge(results) {
    const status = results.allPassed ? 'verified' : 'warning';
    const icon = results.allPassed ? '✓' : '⚠';
    const color = results.allPassed ? '#4CAF50' : '#ff9800';
    const text = results.allPassed 
        ? `Verified (${results.passed}/${results.total})` 
        : `Warning: ${results.failed} test(s) failed`;
    
    return `
        <div class="bazi-verification-badge" style="
            display: inline-flex;
            align-items: center;
            gap: 5px;
            padding: 4px 10px;
            background: ${color}20;
            border: 1px solid ${color};
            border-radius: 15px;
            font-size: 0.75rem;
            color: ${color};
            cursor: pointer;
        " title="Click for details" onclick="window.showVerificationDetails && window.showVerificationDetails()">
            <span>${icon}</span>
            <span>${text}</span>
        </div>
    `;
}

/**
 * Show verification details in console and optional modal
 */
function showVerificationDetails() {
    const results = runVerificationTests();
    
    console.group('🔍 BaZi Calculator Verification Report');
    console.log(`Timestamp: ${results.timestamp}`);
    console.log(`Version: ${results.version}`);
    console.log(`Status: ${results.allPassed ? '✓ ALL PASSED' : '⚠ SOME FAILURES'}`);
    console.log(`Results: ${results.passed}/${results.total} passed`);
    
    if (results.failed > 0) {
        console.group('❌ Failed Tests');
        results.details.filter(d => !d.passed).forEach(d => {
            console.log(`${d.category} - ${d.name}`);
            console.log(`  Expected: ${d.expected}`);
            console.log(`  Actual: ${d.actual}`);
        });
        console.groupEnd();
    }
    
    console.group('📋 All Test Details');
    results.details.forEach(d => {
        console.log(`${d.passed ? '✓' : '✗'} [${d.category}] ${d.name}`);
    });
    console.groupEnd();
    
    console.groupEnd();
    
    return results;
}

/**
 * Initialize verification on page load
 * Adds verification badge to page and logs results
 */
function initVerification(options = {}) {
    const {
        containerSelector = null,
        showBadge = true,
        logToConsole = true,
        onComplete = null
    } = options;
    
    // Run verification
    const results = runVerificationTests();
    
    // Log to console
    if (logToConsole) {
        console.log(`🔍 BaZi Verification: ${results.allPassed ? '✓ PASSED' : '⚠ FAILED'} (${results.passed}/${results.total})`);
        if (!results.allPassed) {
            console.warn('Some verification tests failed. Check console for details.');
            showVerificationDetails();
        }
    }
    
    // Add badge to page
    if (showBadge && typeof document !== 'undefined') {
        const badge = createVerificationBadge(results);
        
        if (containerSelector) {
            const container = document.querySelector(containerSelector);
            if (container) {
                container.insertAdjacentHTML('beforeend', badge);
            }
        } else {
            // Look for common footer elements
            const footerSelectors = ['footer', '.footer', '.copyright-footer', '#footer'];
            for (const selector of footerSelectors) {
                const footer = document.querySelector(selector);
                if (footer) {
                    footer.insertAdjacentHTML('afterbegin', badge);
                    break;
                }
            }
        }
    }
    
    // Callback
    if (typeof onComplete === 'function') {
        onComplete(results);
    }
    
    // Make details function available globally
    if (typeof window !== 'undefined') {
        window.showVerificationDetails = showVerificationDetails;
        window.baziVerificationResults = results;
    }
    
    return results;
}

// ==============================================
// INTEGRITY CHECK (Hash-based)
// ==============================================

/**
 * Simple checksum for core functions
 * Used to detect if core calculation functions have been modified
 */
function calculateIntegrityChecksum() {
    const criticalFunctions = [
        typeof calculateDayPillar === 'function' ? calculateDayPillar.toString() : '',
        typeof calculateKuaNumber === 'function' ? calculateKuaNumber.toString() : '',
        typeof calculateBaZiChart === 'function' ? calculateBaZiChart.toString() : ''
    ].join('');
    
    // Simple hash
    let hash = 0;
    for (let i = 0; i < criticalFunctions.length; i++) {
        const char = criticalFunctions.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    
    return hash.toString(16);
}

// ==============================================
// AUTO-INITIALIZATION
// ==============================================

if (typeof window !== 'undefined') {
    // Auto-run verification when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => initVerification({ showBadge: true }), 100);
        });
    } else {
        setTimeout(() => initVerification({ showBadge: true }), 100);
    }
}

// ==============================================
// EXPORTS
// ==============================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        VERIFICATION_TESTS,
        runVerificationTests,
        quickVerify,
        createVerificationBadge,
        showVerificationDetails,
        initVerification,
        calculateIntegrityChecksum
    };
}

console.log('✓ BaZi Verification Module loaded');
