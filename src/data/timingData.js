/**
 * Timing Systems Data
 * 12 Day Officers (建除十二神) and 28 Lunar Mansions (二十八宿)
 * Traditional Chinese timing selection systems
 */

// 12 Day Officers (建除十二神)
// Used for selecting auspicious days for various activities
const TWELVE_OFFICERS = [
  { chinese: '建', pinyin: 'Jian', english: 'Establish', quality: 'auspicious',
    meaning: 'Day of establishing and initiating',
    good: 'Starting projects, opening businesses, making plans, taking initiative',
    avoid: 'Demolition, ending things, funerals' },
  { chinese: '除', pinyin: 'Chu', english: 'Remove', quality: 'auspicious',
    meaning: 'Day of removal and cleansing',
    good: 'Cleaning, medical treatment, removing obstacles, pest control, haircuts',
    avoid: 'Weddings, celebrations, starting long-term projects' },
  { chinese: '滿', pinyin: 'Man', english: 'Full', quality: 'auspicious',
    meaning: 'Day of fullness and abundance',
    good: 'Celebrations, receiving, harvesting, completing projects',
    avoid: 'Medical procedures, acupuncture' },
  { chinese: '平', pinyin: 'Ping', english: 'Balance', quality: 'neutral',
    meaning: 'Day of balance and equality',
    good: 'Routine matters, negotiations, mediation, paving roads',
    avoid: 'Major decisions, big purchases' },
  { chinese: '定', pinyin: 'Ding', english: 'Stable', quality: 'auspicious',
    meaning: 'Day of stability and settlement',
    good: 'Signing contracts, commitments, buying property, engagement',
    avoid: 'Travel, moving, litigation' },
  { chinese: '執', pinyin: 'Zhi', english: 'Execute', quality: 'neutral',
    meaning: 'Day of execution and holding',
    good: 'Legal matters, collecting debts, building, buying animals',
    avoid: 'Moving, travel, major changes' },
  { chinese: '破', pinyin: 'Po', english: 'Destroy', quality: 'inauspicious',
    meaning: 'Day of breaking and destruction',
    good: 'Demolition, breaking bad habits, ending harmful relationships',
    avoid: 'Weddings, contracts, starting anything new, celebrations' },
  { chinese: '危', pinyin: 'Wei', english: 'Danger', quality: 'inauspicious',
    meaning: 'Day of danger and risk',
    good: 'Climbing, risky activities only if necessary',
    avoid: 'Travel, water activities, major decisions, medical procedures' },
  { chinese: '成', pinyin: 'Cheng', english: 'Success', quality: 'auspicious',
    meaning: 'Day of accomplishment and success',
    good: 'Completing projects, celebrations, weddings, opening businesses',
    avoid: 'Litigation, demanding debts' },
  { chinese: '收', pinyin: 'Shou', english: 'Receive', quality: 'auspicious',
    meaning: 'Day of receiving and gathering',
    good: 'Collecting debts, harvesting, storing, receiving payments',
    avoid: 'Funerals, medical procedures' },
  { chinese: '開', pinyin: 'Kai', english: 'Open', quality: 'auspicious',
    meaning: 'Day of opening and beginning',
    good: 'Grand openings, starting jobs, moving in, weddings, travel',
    avoid: 'Funerals, burying' },
  { chinese: '閉', pinyin: 'Bi', english: 'Close', quality: 'inauspicious',
    meaning: 'Day of closing and ending',
    good: 'Funerals, filling holes, building walls, closing deals',
    avoid: 'Opening new ventures, starting projects, medical treatment' }
];

// 28 Lunar Mansions (二十八宿)
// Traditional Chinese asterisms used for timing and fortune telling
const TWENTY_EIGHT_MANSIONS = [
  { chinese: '角', pinyin: 'Jiao', english: 'Horn', animal: 'Dragon', element: 'wood', quality: 'auspicious' },
  { chinese: '亢', pinyin: 'Kang', english: 'Neck', animal: 'Dragon', element: 'metal', quality: 'inauspicious' },
  { chinese: '氐', pinyin: 'Di', english: 'Root', animal: 'Badger', element: 'earth', quality: 'auspicious' },
  { chinese: '房', pinyin: 'Fang', english: 'Room', animal: 'Rabbit', element: 'sun', quality: 'auspicious' },
  { chinese: '心', pinyin: 'Xin', english: 'Heart', animal: 'Fox', element: 'moon', quality: 'inauspicious' },
  { chinese: '尾', pinyin: 'Wei', english: 'Tail', animal: 'Tiger', element: 'fire', quality: 'auspicious' },
  { chinese: '箕', pinyin: 'Ji', english: 'Basket', animal: 'Leopard', element: 'water', quality: 'auspicious' },
  { chinese: '斗', pinyin: 'Dou', english: 'Dipper', animal: 'Unicorn', element: 'wood', quality: 'auspicious' },
  { chinese: '牛', pinyin: 'Niu', english: 'Ox', animal: 'Ox', element: 'metal', quality: 'inauspicious' },
  { chinese: '女', pinyin: 'Nu', english: 'Girl', animal: 'Bat', element: 'earth', quality: 'inauspicious' },
  { chinese: '虛', pinyin: 'Xu', english: 'Emptiness', animal: 'Rat', element: 'sun', quality: 'inauspicious' },
  { chinese: '危', pinyin: 'Wei', english: 'Rooftop', animal: 'Swallow', element: 'moon', quality: 'inauspicious' },
  { chinese: '室', pinyin: 'Shi', english: 'House', animal: 'Pig', element: 'fire', quality: 'auspicious' },
  { chinese: '壁', pinyin: 'Bi', english: 'Wall', animal: 'Porcupine', element: 'water', quality: 'auspicious' },
  { chinese: '奎', pinyin: 'Kui', english: 'Legs', animal: 'Wolf', element: 'wood', quality: 'auspicious' },
  { chinese: '婁', pinyin: 'Lou', english: 'Bond', animal: 'Dog', element: 'metal', quality: 'auspicious' },
  { chinese: '胃', pinyin: 'Wei', english: 'Stomach', animal: 'Pheasant', element: 'earth', quality: 'auspicious' },
  { chinese: '昴', pinyin: 'Mao', english: 'Hairy Head', animal: 'Rooster', element: 'sun', quality: 'inauspicious' },
  { chinese: '畢', pinyin: 'Bi', english: 'Net', animal: 'Crow', element: 'moon', quality: 'auspicious' },
  { chinese: '觜', pinyin: 'Zi', english: 'Turtle Beak', animal: 'Monkey', element: 'fire', quality: 'inauspicious' },
  { chinese: '參', pinyin: 'Shen', english: 'Three Stars', animal: 'Ape', element: 'water', quality: 'auspicious' },
  { chinese: '井', pinyin: 'Jing', english: 'Well', animal: 'Tapir', element: 'wood', quality: 'auspicious' },
  { chinese: '鬼', pinyin: 'Gui', english: 'Ghost', animal: 'Sheep', element: 'metal', quality: 'inauspicious' },
  { chinese: '柳', pinyin: 'Liu', english: 'Willow', animal: 'Deer', element: 'earth', quality: 'inauspicious' },
  { chinese: '星', pinyin: 'Xing', english: 'Star', animal: 'Horse', element: 'sun', quality: 'inauspicious' },
  { chinese: '張', pinyin: 'Zhang', english: 'Extended Net', animal: 'Stag', element: 'moon', quality: 'auspicious' },
  { chinese: '翼', pinyin: 'Yi', english: 'Wings', animal: 'Snake', element: 'fire', quality: 'inauspicious' },
  { chinese: '軫', pinyin: 'Zhen', english: 'Chariot', animal: 'Earthworm', element: 'water', quality: 'auspicious' }
];

module.exports = {
  TWELVE_OFFICERS,
  TWENTY_EIGHT_MANSIONS
};
