<template lang="pug">
.BattleCharacterInfo
  button.buttonClose.BattleCharacterInfo__buttonClose(@click="$emit('close')")

  CharacterLook(
    :character="character"
  )

  .BattleCharacterInfo__paramsContainer
    CharacterAttributes(
      :attributes="character.attributesPrimary"
      :attributeTypes="attributeTypes"
    )

  .BattleCharacterInfo__callToBattle
    BaseButton(
      :class="{ BaseButton_disabled: timerObj }"
      text="Вызвать на поединок"
      @click.native.stop="callToBattle"
    )

</template>

<script>
import BaseButton from '/imports/client/ui/components/BaseButton.vue';
import CharacterLook from '/imports/client/ui/character/CharacterLook.vue';
import CharacterAttributes from '/imports/client/ui/character/CharacterAttributesList.vue';
import AttributeTypes from '/imports/content/Attribute';
import helpers from '/imports/client/ui/helpers/common';

const { showAlert } = helpers;

export default {
  components: {
    BaseButton,
    CharacterLook,
    CharacterAttributes,
  },
  props: {
    character: {
      type: Object,
      required: true,
    },
    // Параметр timeout должен корректно обрабатываться функцией Date.parse()
    timeout: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      timerObj: null,
    };
  },
  watch: {
    timeout() {
      this.initTimer();
    },
  },
  created() {
    this.attributeTypes = AttributeTypes;
    this.initTimer();
  },
  beforeDestroy() {
    this.clearTimer();
  },
  methods: {
    showAlert,
    initTimer() {
      this.clearTimer();
      const ts = Date.parse(this.timeout);
      if (Number.isNaN(ts)) {
        return;
      }
      const msRemains = ts - Date.now();
      if (msRemains < 0) {
        return;
      }
      this.timerObj = setTimeout(() => {
        this.clearTimer();
      }, msRemains);
    },
    clearTimer() {
      if (this.timerObj) {
        clearTimeout(this.timerObj);
        this.timerObj = null;
      }
    },
    callToBattle() {
      if (this.timerObj) {
        const timeout = Math.round((Date.parse(this.timeout) - Date.now()) / 1000);
        this.showAlert('', `Вы не можете вызвать этого игрока на бой еще ${timeout} секунд.`);
        return;
      }
      this.$emit('callToBattle', this.character.userId);
    },
  },
};
</script>

<style lang="stylus">
@require '~imports/client/ui/styles/variables/colors'
$buttonClose_text = $color_gray

.BattleCharacterInfo
  display flex
  flex-direction column
  padding 10px

  &__buttonClose
    top 10px
    right 10px

  &__paramsContainer
    margin-bottom 20px

  &__callToBattle
    display flex
    justify-content center
    align-items center
    height 10%

</style>

<docs>
# Информация об игроке
```js
import BattleCharacterInfo from '/imports/client/ui/game/battle/BattleCharacterInfo.vue';
```

## Использование

```pug
BattleCharacterInfo(
:character="character"
:timeout="String"
@close="cb1"
@callToBattle="cb2"
)
```

## Параметры
```js
{Object} character - объект персонажа
{String} timeout - временная метка для Date.parse(), до которой игрока нельзя вызвать на бой
{Function} close - коллбэк для события закрытия окна
{Function} callToBattle - коллбэк для обработки события вызова на поединок
```
</docs>
