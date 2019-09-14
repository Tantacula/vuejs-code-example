
const player = {
  id: 1,
  name: 'супергерой',
  gender: 'male',
  maxHP: 250,
  currentHP: 140,
  image: '/images/logo.png',
  background: 'neutral',
  calculated: {
    'Attributes/Level': 6,
  },
  attributesPrimary: {
    'Attribute/Primary/Strength': 3,
    'Attribute/Primary/Dexterity': 3,
    'Attribute/Primary/Endurance': 3,
    'Attribute/Primary/Intuition': 4,
  },
  equipment: {
    Torso: {
      typeId: 'Item/Armor/Body/ShirtGolden',
    },
  },
};

const enemies = [
  {
    id: 2,
    name: 'имярек1',
    gender: 'male',
    maxHP: 150,
    currentHP: 140,
    image: '/images/logo.png',
    background: 'neutral',
    calculated: {
      'Attributes/Level': 4,
    },
    attributesPrimary: {
      'Attribute/Primary/Strength': 3,
      'Attribute/Primary/Dexterity': 3,
      'Attribute/Primary/Endurance': 3,
      'Attribute/Primary/Intuition': 4,
    },
    equipment: {
      Torso: {
        typeId: 'Item/Armor/Body/ShirtGolden',
      },
    },
  },
  {
    id: 3,
    name: 'имярек2',
    gender: 'female',
    maxHP: 100,
    currentHP: 70,
    image: '/images/logo.png',
    background: 'neutral',
    calculated: {
      'Attributes/Level': 2,
    },
    attributesPrimary: {
      'Attribute/Primary/Strength': 3,
      'Attribute/Primary/Dexterity': 3,
      'Attribute/Primary/Endurance': 3,
      'Attribute/Primary/Intuition': 4,
    },
    equipment: {
      Torso: {
        typeId: 'Item/Armor/Body/ShirtGolden',
      },
    },
  },
];

export { player, enemies };
