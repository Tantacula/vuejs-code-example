<template lang="pug">
.BattleLog
  button.BattleLog__close.buttonClose(@click="$emit('closeLog')")

  .BattleLog__item(v-for="item in logSorted")
    BattleLogMessage(
      :currentUserId="currentUserId"
      :players="players"
      :logEntity="item"
    )

</template>

<script>

import BattleLogMessage from '/imports/client/ui/game/battle/BattleLogMessage.vue';

export default {
  components: {
    BattleLogMessage,
  },
  props: {
    currentUserId: {
      type: String,
      required: true,
    },
    players: {
      type: Object,
      required: true,
    },
    log: {
      type: Array,
      required: true,
    },
  },
  computed: {
    logSorted() {
      const sorted = this.log;
      return sorted.sort((a, b) => Date.parse(b.time) - Date.parse(a.time));
    },
  },
};
</script>

<style lang="stylus">
.BattleLog
  padding 40px 40px 0 40px

  &__item
    margin-bottom 1vh

    &:not(:last-child)
      padding-bottom 16px
      border-bottom solid 1px #dedede

</style>

<docs>
# Лог боя
```js
import BattleLog from '/imports/client/ui/game/battle/BattleLog.vue';
```

# Использование
```pug
BattleLog(
  :battleId="battleId"
  @closeLog="closeLog()"
)
```

battleId - параметр необязательный, но потенциально позволит получать данные о других поединках.

</docs>
