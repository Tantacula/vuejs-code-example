<template lang="pug">
.BattleArmorActive(
  :class="{ BattleArmorActive_mirrored: isMirrored }"
)
  .BattleArmorActive__part.BattleArmorActive__part_head(
    :class="{ BattleArmorActive__part_empty: head === 0 }"
  )
    .BattleArmorActive__part_value {{ head }}
    .BattleArmorActive__part_image

  .BattleArmorActive__part.BattleArmorActive__part_torso(
    :class="{ BattleArmorActive__part_empty: torso === 0 }"
  )
    .BattleArmorActive__part_value {{ torso }}
    .BattleArmorActive__part_image

  .BattleArmorActive__part.BattleArmorActive__part_waist(
    :class="{ BattleArmorActive__part_empty: waist === 0 }"
  )
    .BattleArmorActive__part_value {{ waist }}
    .BattleArmorActive__part_image

  .BattleArmorActive__part.BattleArmorActive__part_legs(
    :class="{ BattleArmorActive__part_empty: legs === 0 }"
  )
    .BattleArmorActive__part_value {{ legs }}
    .BattleArmorActive__part_image

</template>

<script>
export default {
  name: 'BattleArmorActive',
  props: {
    isMirrored: Boolean,
    head: {
      type: Number,
      default: 0,
    },
    torso: {
      type: Number,
      default: 0,
    },
    waist: {
      type: Number,
      default: 0,
    },
    legs: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style lang="stylus">
@require '~imports/client/ui/styles/variables/colors'
$valueBgColor = #eaeaea
$valueBgColor_empty = $color_pink
$valueTextColor = #767676
$valueTextColor_empty = $color_red
$contentHeight = 16px

bodyPartBlock($fileName, $imageHeight)
  & .BattleArmorActive__part_image
    if $imageHeight < $contentHeight
      top (($contentHeight - $imageHeight)/2)
    height $imageHeight
    // TODO: Временное решение. Поменять, когда появится папка с общими картинками
    background-image 'url(/images/Item/Armor/%s.png)' % $fileName

.BattleArmorActive
  min-width 50px
  height 100%
  min-height 80px
  max-height 120px
  display flex
  flex-direction column
  justify-content space-between

  *
    box-sizing border-box

  &__part
    position relative
    height 20px

    &_value
      position absolute
      z-index 1
      width 40px
      height $contentHeight
      padding 0 8px
      font-size 11px
      color $valueTextColor
      background $valueBgColor
      border-radius 15px

      ^[0]:not(^[0]_mirrored) &
        right 11px

      ^[0]_mirrored &
        left 11px
        text-align right

    &_empty
      & .BattleArmorActive__part_value
        color $valueTextColor_empty
        background $valueBgColor_empty

    &_image
      position absolute
      z-index 2
      top 0
      width 23px
      background center no-repeat

      ^[0]:not(^[0]_mirrored) &
        right 0

      ^[0]_mirrored &
        left 0

    &_head
      bodyPartBlock(Helmet, 21px)

    &_torso
      bodyPartBlock(Body, 22px)

    &_waist
      bodyPartBlock(Belt, 12px)

    &_legs
      bodyPartBlock(Boots, 23px)

</style>

<docs>
# Карта активной брони
```js
import BattleArmorActive from '/imports/client/ui/game/battle/BattleArmorActive.vue';
```

## Использование

```pug
BattleArmorActive(
  isMirrored
  :head="Number"
  :torso="Number"
  :waist="Number"
  :legs="Number"
)
```

## Параметры
```js
{Boolean} isMirrored - обычный или отеркаленны вариант
{Number} head - количество брони на голове
{Number} torso - количество брони на теле
{Number} waist - количество брони на поясе
{Number} legs - количество брони на ногах
```

Если количество брони для определенной области не передано, по-умолчанию будет 0
</docs>
