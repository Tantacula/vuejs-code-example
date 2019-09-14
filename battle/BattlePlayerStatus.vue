<template lang="pug">
.PlayerStatus(:class="{PlayerStatus_isMirrored: isMirrored}")
  .PlayerStatus__nameContainer
    .PlayerStatus__name {{ name }}
    .PlayerStatus__health [{{ currentHP }} / {{ maxHP }}]

  .PlayerStatus__healthContainer
    .PlayerStatus__healthIndicatorWrapper
      .PlayerStatus__healthIndicator(:style="{height:healthPercentage + '%'}")
    .PlayerStatus__level {{ level }}

</template>

<script>
export default {
  props: {
    // Имя игрока
    name: {
      type: String,
      required: true,
    },
    // максимально возможное количество здоровья
    maxHP: {
      type: Number,
      required: true,
    },
    // Текущий уровень здоровья
    currentHP: {
      type: Number,
      required: true,
    },
    // Уровень игрока
    level: {
      type: Number,
      required: true,
    },
    // Отображать блок справа
    isMirrored: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    healthPercentage() {
      return Math.round(this.currentHP / this.maxHP * 100);
    },
  },
};
</script>

<style lang="stylus">
.PlayerStatus
  display flex

  &__healthContainer
    position relative

    margin-left 10px

  &__healthIndicatorWrapper
    position relative

    display block
    width 40px
    height @width
    overflow hidden

    background-color darkgrey
    border-radius 50%

  &__healthIndicator
    position absolute
    bottom 0

    display block
    width 40px
    height 100%

    background-color rgba(255, 0, 0, 0.4)

  &__level
    position absolute
    bottom 0
    left 0

    display flex
    align-items center
    justify-content center
    width 20px
    height 20px

    background-color yellow
    border-radius 50%

  &_isMirrored
    flex-direction row-reverse

    .PlayerStatus__nameContainer
      text-align right

    .PlayerStatus__healthContainer
      margin-right 10px
      margin-left auto

    .PlayerStatus__level
      left auto
      right 0

</style>

<docs>
# Статусбар

Отображает здоровье и уровень игрока

## Использование
```js
import BattleProcess from '/imports/client/ui/game/battle/BattleProcess.vue';
```
```pug
BattleProcess(
  :name="имя"
  :maxHP=100
  :currentHP=10
  :level=1
  :isMirrored=true
)
```
</docs>
