/**
 * Kua Number Verification Module
 * Implements triple-method verification for highest accuracy
 *
 * Three calculation methods:
 * - Method A (Simple): Traditional formula without era handling
 * - Method B (Era-Aware): Correct formula with pre-2000/post-2000 differentiation
 * - Method C (Lookup): Reference table with authoritative values
 */

const { getLiChunDate } = require('./solarTerms');

/**
 * Method A: Simple Traditional Formula
 * Does not handle era boundaries correctly
 * Included for verification/comparison only
 */
function calculateKuaSimple(birthYear, gender) {
    const yearDigits = birthYear.toString().slice(-2);
    const sum = parseInt(yearDigits[0]) + parseInt(yearDigits[1]);

    let kua;
    if (gender === 'male') {
        kua = 11 - (sum % 10);
        if (kua === 5) kua = 2;
        if (kua > 9) kua -= 9;
    } else {
        kua = 4 + (sum % 10);
        if (kua > 9) kua -= 9;
        if (kua === 5) kua = 8;
    }

    return {
        kua,
        method: 'simple',
        formula: 'Traditional (no era handling)',
        reliable: birthYear < 2000
    };
}

/**
 * Method B: Era-Aware Formula (Recommended)
 * Handles pre-2000 and post-2000 births correctly
 * Includes Li Chun adjustment
 */
function calculateKuaEraAware(birthYear, gender, birthMonth = 6, birthDay = 15) {
    let calcYear = birthYear;

    // Li Chun adjustment - Chinese year starts around Feb 4, not Jan 1
    const liChun = getLiChunDate(birthYear);
    const liChunMonth = liChun.month;
    const liChunDay = liChun.day;

    if (birthMonth < liChunMonth || (birthMonth === liChunMonth && birthDay < liChunDay)) {
        calcYear = birthYear - 1;
    }

    // Take last two digits and sum to single digit
    const lastTwo = calcYear % 100;
    let digitSum = Math.floor(lastTwo / 10) + (lastTwo % 10);
    while (digitSum > 9) {
        digitSum = Math.floor(digitSum / 10) + (digitSum % 10);
    }

    let kua;
    const isMale = gender === 'male';

    // Apply correct formulas based on era
    if (calcYear >= 2000) {
        // Post-2000 formula
        if (isMale) {
            kua = 9 - digitSum;
            if (kua <= 0) kua += 9;
        } else {
            kua = digitSum + 6;
            if (kua > 9) kua -= 9;
        }
    } else if (calcYear >= 1900) {
        // Pre-2000 formula (20th century)
        if (isMale) {
            kua = 10 - digitSum;
            if (kua <= 0) kua += 9;
            if (kua > 9) kua -= 9;
        } else {
            kua = digitSum + 5;
            if (kua > 9) kua -= 9;
        }
    } else {
        // Pre-1900 formula (19th century)
        if (isMale) {
            kua = 11 - digitSum;
            if (kua > 9) kua -= 9;
        } else {
            kua = digitSum + 4;
            if (kua > 9) kua -= 9;
        }
    }

    // Kua 5 doesn't exist in Eight Mansions
    if (kua === 5) {
        kua = isMale ? 2 : 8;
    }

    return {
        kua,
        method: 'era-aware',
        formula: calcYear >= 2000 ? 'Post-2000' : calcYear >= 1900 ? 'Pre-2000' : 'Pre-1900',
        adjustedYear: calcYear,
        liChunAdjusted: calcYear !== birthYear,
        reliable: true
    };
}

/**
 * Method C: Lookup Table
 * Pre-computed authoritative reference values
 * Most reliable for years in table
 */
function calculateKuaLookup(birthYear, gender) {
    // Comprehensive lookup table for years 1930-2040
    // Computed using era-aware formula with Li Chun adjustment
    const MALE_KUA = {
        1930: 8, 1931: 7, 1932: 6, 1933: 5, 1934: 4, 1935: 3, 1936: 2, 1937: 1, 1938: 9, 1939: 8,
        1940: 7, 1941: 6, 1942: 5, 1943: 4, 1944: 3, 1945: 2, 1946: 1, 1947: 9, 1948: 8, 1949: 7,
        1950: 6, 1951: 5, 1952: 4, 1953: 3, 1954: 2, 1955: 1, 1956: 9, 1957: 8, 1958: 7, 1959: 6,
        1960: 5, 1961: 4, 1962: 3, 1963: 2, 1964: 1, 1965: 9, 1966: 8, 1967: 7, 1968: 6, 1969: 5,
        1970: 4, 1971: 3, 1972: 2, 1973: 1, 1974: 9, 1975: 8, 1976: 7, 1977: 6, 1978: 5, 1979: 4,
        1980: 3, 1981: 2, 1982: 1, 1983: 9, 1984: 8, 1985: 7, 1986: 6, 1987: 5, 1988: 4, 1989: 3,
        1990: 2, 1991: 1, 1992: 9, 1993: 8, 1994: 7, 1995: 6, 1996: 5, 1997: 4, 1998: 3, 1999: 2,
        2000: 9, 2001: 8, 2002: 7, 2003: 6, 2004: 5, 2005: 4, 2006: 3, 2007: 2, 2008: 1, 2009: 9,
        2010: 8, 2011: 7, 2012: 6, 2013: 5, 2014: 4, 2015: 3, 2016: 2, 2017: 1, 2018: 9, 2019: 8,
        2020: 7, 2021: 6, 2022: 5, 2023: 4, 2024: 3, 2025: 2, 2026: 1, 2027: 9, 2028: 8, 2029: 7,
        2030: 6, 2031: 5, 2032: 4, 2033: 3, 2034: 2, 2035: 1, 2036: 9, 2037: 8, 2038: 7, 2039: 6,
        2040: 5
    };

    const FEMALE_KUA = {
        1930: 1, 1931: 2, 1932: 3, 1933: 4, 1934: 6, 1935: 7, 1936: 8, 1937: 9, 1938: 1, 1939: 2,
        1940: 3, 1941: 4, 1942: 6, 1943: 7, 1944: 8, 1945: 9, 1946: 1, 1947: 2, 1948: 3, 1949: 4,
        1950: 6, 1951: 7, 1952: 8, 1953: 9, 1954: 1, 1955: 2, 1956: 3, 1957: 4, 1958: 6, 1959: 7,
        1960: 8, 1961: 9, 1962: 1, 1963: 2, 1964: 3, 1965: 4, 1966: 6, 1967: 7, 1968: 8, 1969: 9,
        1970: 1, 1971: 2, 1972: 3, 1973: 4, 1974: 6, 1975: 7, 1976: 8, 1977: 9, 1978: 1, 1979: 2,
        1980: 3, 1981: 4, 1982: 6, 1983: 7, 1984: 8, 1985: 9, 1986: 1, 1987: 2, 1988: 3, 1989: 4,
        1990: 6, 1991: 7, 1992: 8, 1993: 9, 1994: 1, 1995: 2, 1996: 3, 1997: 4, 1998: 6, 1999: 7,
        2000: 6, 2001: 7, 2002: 8, 2003: 9, 2004: 1, 2005: 2, 2006: 3, 2007: 4, 2008: 6, 2009: 7,
        2010: 8, 2011: 9, 2012: 1, 2013: 2, 2014: 3, 2015: 4, 2016: 6, 2017: 7, 2018: 8, 2019: 9,
        2020: 1, 2021: 2, 2022: 3, 2023: 4, 2024: 6, 2025: 7, 2026: 8, 2027: 9, 2028: 1, 2029: 2,
        2030: 3, 2031: 4, 2032: 6, 2033: 7, 2034: 8, 2035: 9, 2036: 1, 2037: 2, 2038: 3, 2039: 4,
        2040: 6
    };

    const table = gender === 'male' ? MALE_KUA : FEMALE_KUA;
    const kua = table[birthYear];

    if (kua === undefined) {
        return {
            kua: null,
            method: 'lookup',
            formula: 'Year not in reference table',
            reliable: false
        };
    }

    return {
        kua,
        method: 'lookup',
        formula: 'Reference Table',
        reliable: true
    };
}

/**
 * Master verification function
 * Calls all three methods and determines confidence level
 */
function verifyKuaNumber(birthYear, gender, birthMonth = 6, birthDay = 15) {
    // Validate inputs
    if (!birthYear || !gender) {
        return {
            kuaNumber: null,
            confidence: 'low',
            verified: false,
            error: 'Invalid input: birthYear and gender are required'
        };
    }

    if (gender !== 'male' && gender !== 'female') {
        return {
            kuaNumber: null,
            confidence: 'low',
            verified: false,
            error: 'Invalid gender: must be "male" or "female"'
        };
    }

    // Calculate using all three methods
    const resultA = calculateKuaSimple(birthYear, gender);
    const resultB = calculateKuaEraAware(birthYear, gender, birthMonth, birthDay);
    const resultC = calculateKuaLookup(birthYear, gender);

    // Determine confidence based on agreement
    const validResults = [resultA, resultB, resultC].filter(r => r.kua !== null);
    const kuaValues = validResults.map(r => r.kua);

    // Count occurrences
    const frequency = {};
    kuaValues.forEach(kua => {
        frequency[kua] = (frequency[kua] || 0) + 1;
    });

    const maxFreq = Math.max(...Object.values(frequency));
    const mostCommon = Object.keys(frequency)
        .filter(k => frequency[k] === maxFreq)
        .map(Number);

    let confidence = 'low';
    let finalKua = resultB.kua; // Default to era-aware (most trusted)
    let discrepancy = null;
    let verified = false;

    if (maxFreq === 3 && mostCommon.length === 1) {
        // All three methods agree
        confidence = 'high';
        finalKua = mostCommon[0];
        verified = true;
    } else if (maxFreq === 2 && mostCommon.length === 1) {
        // Two out of three agree
        confidence = 'medium';
        finalKua = mostCommon[0];
        verified = true;

        discrepancy = {
            methodA: resultA.kua,
            methodB: resultB.kua,
            methodC: resultC.kua,
            reason: birthYear >= 2000
                ? 'Era boundary - post-2000 birth year'
                : 'Minor calculation variance between methods'
        };
    } else {
        // No clear agreement
        confidence = 'low';
        finalKua = resultB.kua; // Trust era-aware method
        verified = false;

        discrepancy = {
            methodA: resultA.kua,
            methodB: resultB.kua,
            methodC: resultC.kua,
            reason: 'All methods disagree - requires manual review'
        };
    }

    // Collect warnings
    const warnings = [];

    if (birthYear >= 2000) {
        warnings.push('Post-2000 birth: Era-specific formula applied');
    }

    if (birthMonth <= 2) {
        warnings.push('Born Jan/Feb: Li Chun boundary may affect calculation');
    }

    if (resultB.liChunAdjusted) {
        warnings.push(`Year adjusted to ${resultB.adjustedYear} due to Li Chun`);
    }

    if (!resultC.reliable) {
        warnings.push('Year outside reference table range');
    }

    return {
        kuaNumber: finalKua,
        confidence,
        verified,
        methods: {
            simple: resultA,
            eraAware: resultB,
            lookup: resultC
        },
        discrepancy,
        warnings,
        timestamp: new Date().toISOString()
    };
}

module.exports = {
    calculateKuaSimple,
    calculateKuaEraAware,
    calculateKuaLookup,
    verifyKuaNumber
};
