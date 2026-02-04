/**
 * Na Yin Module
 * Na Yin (Sound Element) for 60 Jia Zi combinations
 */

const { HEAVENLY_STEMS, EARTHLY_BRANCHES } = require('./constants');

// Na Yin (纳音) - 60 Jia Zi combinations with sound elements
const NAYIN = {
  '甲子': { element: 'metal', name: 'Gold in the Sea' }, '乙丑': { element: 'metal', name: 'Gold in the Sea' },
  '丙寅': { element: 'fire', name: 'Fire in the Furnace' }, '丁卯': { element: 'fire', name: 'Fire in the Furnace' },
  '戊辰': { element: 'wood', name: 'Wood of the Forest' }, '己巳': { element: 'wood', name: 'Wood of the Forest' },
  '庚午': { element: 'earth', name: 'Earth on the Road' }, '辛未': { element: 'earth', name: 'Earth on the Road' },
  '壬申': { element: 'metal', name: 'Sword Edge Metal' }, '癸酉': { element: 'metal', name: 'Sword Edge Metal' },
  '甲戌': { element: 'fire', name: 'Fire on the Mountain' }, '乙亥': { element: 'fire', name: 'Fire on the Mountain' },
  '丙子': { element: 'water', name: 'Stream Water' }, '丁丑': { element: 'water', name: 'Stream Water' },
  '戊寅': { element: 'earth', name: 'City Wall Earth' }, '己卯': { element: 'earth', name: 'City Wall Earth' },
  '庚辰': { element: 'metal', name: 'White Wax Metal' }, '辛巳': { element: 'metal', name: 'White Wax Metal' },
  '壬午': { element: 'wood', name: 'Willow Wood' }, '癸未': { element: 'wood', name: 'Willow Wood' },
  '甲申': { element: 'water', name: 'Spring Water' }, '乙酉': { element: 'water', name: 'Spring Water' },
  '丙戌': { element: 'earth', name: 'Roof Earth' }, '丁亥': { element: 'earth', name: 'Roof Earth' },
  '戊子': { element: 'fire', name: 'Thunderbolt Fire' }, '己丑': { element: 'fire', name: 'Thunderbolt Fire' },
  '庚寅': { element: 'wood', name: 'Pine & Cypress Wood' }, '辛卯': { element: 'wood', name: 'Pine & Cypress Wood' },
  '壬辰': { element: 'water', name: 'Long River Water' }, '癸巳': { element: 'water', name: 'Long River Water' },
  '甲午': { element: 'metal', name: 'Sand in Gold' }, '乙未': { element: 'metal', name: 'Sand in Gold' },
  '丙申': { element: 'fire', name: 'Fire at Mountain Foot' }, '丁酉': { element: 'fire', name: 'Fire at Mountain Foot' },
  '戊戌': { element: 'wood', name: 'Flat Land Wood' }, '己亥': { element: 'wood', name: 'Flat Land Wood' },
  '庚子': { element: 'earth', name: 'Earth on the Wall' }, '辛丑': { element: 'earth', name: 'Earth on the Wall' },
  '壬寅': { element: 'metal', name: 'Gold Foil Metal' }, '癸卯': { element: 'metal', name: 'Gold Foil Metal' },
  '甲辰': { element: 'fire', name: 'Lamp Fire' }, '乙巳': { element: 'fire', name: 'Lamp Fire' },
  '丙午': { element: 'water', name: 'Heavenly River Water' }, '丁未': { element: 'water', name: 'Heavenly River Water' },
  '戊申': { element: 'earth', name: 'Post Road Earth' }, '己酉': { element: 'earth', name: 'Post Road Earth' },
  '庚戌': { element: 'metal', name: 'Hairpin Metal' }, '辛亥': { element: 'metal', name: 'Hairpin Metal' },
  '壬子': { element: 'wood', name: 'Mulberry Wood' }, '癸丑': { element: 'wood', name: 'Mulberry Wood' },
  '甲寅': { element: 'water', name: 'Great Stream Water' }, '乙卯': { element: 'water', name: 'Great Stream Water' },
  '丙辰': { element: 'earth', name: 'Sand Earth' }, '丁巳': { element: 'earth', name: 'Sand Earth' },
  '戊午': { element: 'fire', name: 'Heavenly Fire' }, '己未': { element: 'fire', name: 'Heavenly Fire' },
  '庚申': { element: 'wood', name: 'Pomegranate Wood' }, '辛酉': { element: 'wood', name: 'Pomegranate Wood' },
  '壬戌': { element: 'water', name: 'Great Sea Water' }, '癸亥': { element: 'water', name: 'Great Sea Water' }
};

/**
 * Get Na Yin element and name for a stem-branch combination
 * @param {number|Object} stemIndex - Stem index (0-9) or stem object with chinese property
 * @param {number|Object} branchIndex - Branch index (0-11) or branch object with chinese property
 * @returns {Object} Na Yin object with element and name
 */
function getNaYin(stemIndex, branchIndex) {
  // Handle both index and object inputs
  const stem = typeof stemIndex === 'number' ? HEAVENLY_STEMS[stemIndex] : stemIndex;
  const branch = typeof branchIndex === 'number' ? EARTHLY_BRANCHES[branchIndex] : branchIndex;

  const key = stem.chinese + branch.chinese;
  return NAYIN[key] || { element: 'unknown', name: 'Unknown' };
}

module.exports = {
  NAYIN,
  getNaYin
};
