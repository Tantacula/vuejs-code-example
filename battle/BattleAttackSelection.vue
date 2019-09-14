<template lang="pug">
.BattleAttackSelection
  .BattleAttackSelection__header(v-if="isDefend") Блок
  .BattleAttackSelection__header(v-else) Атака

  .BattleAttackSelection__container(
    :class="{ BattleAttackSelection__container_reversed: isDefend }"
  )
    .BattleAttackSelection__armorActive
      BattleArmorActive(
        v-bind="armorActive"
        :isMirrored="isDefend"
      )

    .BattleAttackSelection__buttonsContainer

      template(v-if="isDefend")
        transition(name="AttackSelection__transition")
          .BattleAttackSelection__disabledActionsNotification(
            v-if="!isAvailable"
          )
            h3.BattleAttackSelection__disabledActionsHeader Вы оглушены
            img(
              src="/images/battle/AttackSelection/stunning.png"
            )
            .BattleAttackSelection__disabledActionsDescription И не можете защищаться
      template(v-else)
        transition(name="AttackSelection__transition")
          .BattleAttackSelection__disabledActionsNotification(
          v-if="!isAvailable"
          )
            h3.BattleAttackSelection__disabledActionsHeader Вы сбиты с ног
            img(
            src="/images/battle/AttackSelection/stunning.png"
            )
            .BattleAttackSelection__disabledActionsDescription И не можете атаковать

      BattleAttackSelectionButton(
        class="BattleAttackSelection__button"
        v-for="actionType in actionsList"
        :key="actionType.name"
        :isActive="selectedValue && actionType.name === selectedValue"
        @click="selectAction(actionType.name)"
      )
        img(
          v-for="image in actionType.zones"
          :key="image"
          :src="`${buttonImagesPath}${image}.png`"
        )

</template>

<script>
import BattleAttackSelectionButton from '/imports/client/ui/game/battle/BattleAttackSelectionButton.vue';
import helpers from '/imports/client/ui/helpers/common';
import BattleArmorActive from '/imports/client/ui/game/battle/BattleArmorActive';

const buttonImagesPath = '/images/battle/AttackSelectionButtons/';

export default {
  name: 'BattleAttackSelection',
  components: {
    BattleArmorActive,
    BattleAttackSelectionButton,
  },
  props: {
    // Отобразить кнопки для защиты вместо кнопок атаки
    isDefend: Boolean,
    // Доступны ли кнопки в данном компоненте
    isAvailable: Boolean,
    actionsList: {
      type: Array,
      required: true,
      validator(value) {
        return value.every(
          elem => helpers.hasProperties(elem, ['name', 'zones']),
        );
      },
    },
    armorActive: {
      type: Object,
      default() {
        return {
          head: 0,
          torso: 0,
          waist: 0,
          legs: 0,
        };
      },
      validator(value) {
        return helpers.hasProperties(value, ['head', 'torso', 'waist', 'legs']);
      },
    },
    selectedValue: {
      type: String,
      default: '',
    },
  },
  created() {
    this.buttonImagesPath = buttonImagesPath;
  },
  methods: {
    selectAction(id) {
      if (!this.isAvailable) {
        return;
      }
      this.$emit('actionWasSelected', { type: id });
    },
  },
};

</script>

<style lang="stylus">
.BattleAttackSelection
  &__header
    position relative
    margin-bottom 15px

    @media screen and (max-device-aspect-ratio: 1/2)
      margin-bottom 2.63vh

    line-height 13px
    font-size 13px
    font-weight 500
    text-align center
    color rgba(0, 0, 0, 0.9)

  &__buttonsContainer
    position relative

    display flex
    flex-direction column
    align-items flex-end

  &__button
    &:not(:last-child)
      margin-bottom 0.7vh

  &__disabledActionsNotification
    position absolute
    z-index 1
    box-sizing border-box
    width 100%
    height 100%
    padding 5px

    font-size 10px
    text-align center
    background-color #F9F9F9
    border 2px solid lighten(black, 60%)
    border-radius 3px

  &__disabledActionsHeader
    font-size 10px

  &__armorActive
    display flex
    justify-content center
    align-items center
    padding 5px 0
    box-sizing border-box

  &__container
    display flex
    align-items stretch
    justify-content space-around

    & > *
      flex-basis 36%

    &_reversed
      flex-direction row-reverse

      & .BattleAttackSelection__buttonsContainer
        align-items flex-start

  &__transition
    &-enter-active
      transition all .3s ease-in
    &-leave-active
      transition all .3s ease-out
    &-enter, &-leave-to
      transform translateY(-100%)
      opacity 0

</style>

<docs>
# Карта атаки-защиты
```js
import BattleAttackSelection from '/imports/client/ui/game/battle/BattleAttackSelection.vue';
```

## Использование

```pug
BattleAttackSelection(
  isAvailable
  isDefend
  :actionsList="Array"
  :selectedValue="attackTypeSelected"
  @action-was-selected="callback($event.type)"
  @actionWasSelected="callback($event.type)"
)
```

## Параметры
```js
{Boolean} isAvailable - Доступен ли выбор в компоненте
{Boolean} isDefend - Отрисовка кнопок для защиты (иначе для удара)
{Array} actionsList - Список действий и иконок для них (см. BattleAttackDefendActionsList.js)
{String} selectedValue - Текущее выбранное действие (=== actionsList[].name)
```
</docs>
