const attackActions = [
  {
    name: 'head',
    zones: ['head'],
  },
  {
    name: 'torso',
    zones: ['torso'],
  },
  {
    name: 'waist',
    zones: ['waist'],
  },
  {
    name: 'legs',
    zones: ['legs'],
  },
];
const defendActions = [
  {
    name: 'legsHead',
    zones: ['legs', 'head'],
  },
  {
    name: 'headTorso',
    zones: ['head', 'torso'],
  },
  {
    name: 'torsoWaist',
    zones: ['torso', 'waist'],
  },
  {
    name: 'waistLegs',
    zones: ['waist', 'legs'],
  },
];

export { attackActions, defendActions };
