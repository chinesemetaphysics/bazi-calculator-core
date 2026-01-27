/**
 * BaZi Layer 0 - Formatters
 * Convert stem/branch indices to readable pillar names
 * Output format: "Yang-Wood Rat", "Yin-Fire Rabbit", etc.
 */

const { HEAVENLY_STEMS, EARTHLY_BRANCHES } = require('./constants');

/**
 * Format a pillar as "Stem Branch" (e.g., "Yang-Wood Rat")
 * @param {number} stemIndex - Stem index (0-9)
 * @param {number} branchIndex - Branch index (0-11)
 * @returns {string} Formatted pillar name
 */
function formatPillar(stemIndex, branchIndex) {
    const stem = HEAVENLY_STEMS[stemIndex];
    const branch = EARTHLY_BRANCHES[branchIndex];

    if (!stem || !branch) {
        throw new Error(`Invalid indices: stem=${stemIndex}, branch=${branchIndex}`);
    }

    return `${stem.english} ${branch.english}`;
}

/**
 * Format Chinese pillar (e.g., "甲子")
 * @param {number} stemIndex - Stem index (0-9)
 * @param {number} branchIndex - Branch index (0-11)
 * @returns {string} Chinese pillar
 */
function formatChinesePillar(stemIndex, branchIndex) {
    const stem = HEAVENLY_STEMS[stemIndex];
    const branch = EARTHLY_BRANCHES[branchIndex];

    if (!stem || !branch) {
        throw new Error(`Invalid indices: stem=${stemIndex}, branch=${branchIndex}`);
    }

    return `${stem.chinese}${branch.chinese}`;
}

module.exports = {
    formatPillar,
    formatChinesePillar
};
