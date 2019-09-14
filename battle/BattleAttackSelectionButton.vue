<template lang="pug">
button.AttackSelectionButton(
  :class="className"
  @click="$emit('click')"
  :disabled="isDisabled"
  :description="description"
)
  slot

</template>

<script>
export default {
  props: {
    isActive: Boolean,
    isDisabled: Boolean,
    description: {
      type: String,
      default: '',
    },
  },
  computed: {
    className() {
      return {
        AttackSelectionButton_active: this.isActive,
      };
    },
  },
};
</script>

<style lang="stylus">
@require '~imports/client/ui/styles/variables/colors'
$activeBorderColor = #F9A617
$activeBgColor = $color_white
$defaultBgColor = $color_white
$descriptionBgColor = $color_red
$descriptionTextColor = $color_white

$max_mobile_res = 824px

.AttackSelectionButton
  position relative
  display flex
  align-items center
  justify-content center
  max-width 70px
  min-width 45px
  width 100%
  height 40px
  padding 0
  overflow hidden
  box-sizing border-box

  color #767676

  background $defaultBgColor
  box-shadow 0 1px 5px rgba(0, 0, 0, 0.15)
  border-radius 4px
  border none
  cursor pointer

  @media screen and (max-width: $max_mobile_res)
    min-height 27px
    height 4.6vh

  &:before
    content attr(description)
    position absolute
    bottom 0
    right 0
    padding 0 3px

    font-size 10px
    color $descriptionTextColor
    background-color $descriptionBgColor
    border-radius 3px

  &:focus
    outline none

  &_active,
  &:hover,
  &:active
    background $activeBgColor
    border 2px solid $activeBorderColor
    box-shadow 0 1px 5px transparentify($activeBorderColor, 0.25)

  &_disabled, &[disabled]
    color #C0C3C5
    background linear-gradient(360deg, #F0F1F1 0%, rgba(255, 255, 255, 0) 100%)
    box-shadow none
    border 1px solid #C0C3C5
    cursor not-allowed

</style>

<docs>
# BattleAttackSelectionButton
```js
import BattleAttackSelectionButton from
'/imports/client/ui/game/battle/BattleAttackSelectionButton.vue';
```

## Использование в шаблоне

```pug
BattleAttackSelectionButton(
  :isActive="true"
  :isDisabled="true"
  :description="string"
  @click="callback()"
) some useful content inside the button
```
## Параметры
```js
{Boolean} isActive // Активна ли внопка
{Boolean} isDisabled // Кнопка в состоянии disabled
{String} description // Дополнительное описание
```
</docs>
