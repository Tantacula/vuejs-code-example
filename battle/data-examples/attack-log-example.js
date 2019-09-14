function getAttackVal(bodyPart, player) {
  if (player === 'player') {
    return {
      bodyPart,
      wasAttacked: bodyPart === 'head',
      hasBlocked: bodyPart === 'head' || bodyPart === 'chest',
      isCriticalHit: false,
      hasDodged: bodyPart === 'head',
    };
  }
  return {
    bodyPart,
    wasAttacked: false,
    hasBlocked: bodyPart === 'groin' || bodyPart === 'chest',
    isCriticalHit: bodyPart === 'legs',
    hasDodged: false,
  };
}

const attackResult = function getAttackResult() {
  const bodyParts = ['head', 'chest', 'groin', 'legs'];
  const result = {
    player: {},
    enemy: {},
  };

  bodyParts.forEach((elem) => {
    result.player[elem] = getAttackVal(elem, 'player');
    result.enemy[elem] = getAttackVal(elem, 'enemy');
  });

  return result;
};

export default attackResult;
