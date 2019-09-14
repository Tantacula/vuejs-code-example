<template lang="pug">
.BattleLogAttackResults(:class="{ BattleLogAttackResults__player: isPlayer }")
  .BattleLogAttackResults__item(
    v-for="item in attackData"
    :class=`{
      BattleLogAttackResults__item_attack: item.wasAttacked,
      BattleLogAttackResults__item_block: item.hasBlocked,
      BattleLogAttackResults__item_criticalHit: item.isCriticalHit,
      BattleLogAttackResults__item_dodge: item.hasDodged,
    }`
  )
</template>

<script>
import helpers from '/imports/client/ui/helpers/common';
import ConfigLib from '/imports/content/GameData/lib/GameDesign';

const zones = ConfigLib.attackZones;

export default {
  name: 'BattleLogAttackResults',
  props: {
    isPlayer: Boolean,
    attackData: {
      type: Object,
      required: true,
      validator(prop) {
        const requiredBodyParts = [
          'wasAttacked',
          'hasBlocked',
          'isCriticalHit',
          'hasDodged',
        ];

        const firstValidationStep = helpers.hasProperties(prop, zones);
        if (!firstValidationStep) {
          return false;
        }

        return zones.every(
          bodyPart => helpers.hasProperties(prop[bodyPart], requiredBodyParts),
        );
      },
    },
  },
  // каждая ячейка это название части тела, wasAttacked, wasBlocked, isCriticalHit, wasDodged

};
</script>

<style lang="stylus">
@require '~imports/client/ui/styles/variables/colors'
$base_cell_size = 10px

.BattleLogAttackResults
  display flex
  height ($base_cell_size + 2)

  &:not(:last-child)
    margin-right 5px

  &:before,
  &:after
    content ''
    width 3px

    background-color $color_red

  &:before
    border-radius 3px 0 0 3px

  &:after
    border-radius 0 3px 3px 0

  &__player
    &:before,
    &:after
      background-color $color_blue

  &__item
    display flex
    justify-content center
    align-items center

    width $base_cell_size
    height $base_cell_size

    border 1px solid $color_gray
    border-radius 2px

    &_attack,
    &_criticalHit
      &:before
        content ''
        display block
        width ($base_cell_size/2)
        height @width

        border-radius 50%
        background-color $color_black

    &_criticalHit:before
      background-color $color_red

    &_block
      background-color lighten($color_gray, 30%)

    &_dodge
      background-color $color_green

</style>

<docs>
# BattleLogAttackResults
```js
import BattleLogAttackResults from '/imports/client/ui/game/battle/BattleLogAttackResults.vue';
```

# Использование
```pug
BattleLogAttackResults(
  :isPlayer="true" // Выводится лог для игрока или соперника
  :attackData="attackData" // Данные по нанесенным ударам и блкоам
)
```

</docs>
