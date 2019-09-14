<template lang="pug">
.BattleLogMessage
  .BattleLogMessage__info
    .BattleLogMessage__attackData
      BattleLogAttackResults(
        v-if="playerEntity && !playerWasSkippedTheTurn"
        :isPlayer="true"
        :attackData="playerAttackData"
      )
      BattleLogAttackResults(
        v-if="enemyEntity && !enemyWasSkippedTheTurn"
        :attackData="enemyAttackData"
      )
    .BattleLogMessage__time {{ time }}
  .BattleLogMessage__text
    div {{ playerMessage }}
    div {{ enemyMessage }}

</template>

<script>
import BattleLogAttackResults from '/imports/client/ui/game/battle/BattleLogAttackResults.vue';
import { LOG_ACTION } from '/imports/modules/Combat/lib/constants';
import ConfigLib from '/imports/content/GameData/lib/GameDesign';

const zones = ConfigLib.attackZones;

export default {
  components: {
    BattleLogAttackResults,
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
    logEntity: {
      type: Object,
      required: true,
    },
  },
  computed: {
    time() {
      const time = new Date(this.logEntity.time);
      return `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
    },
    currentEnemyId() {
      return Object.keys(this.players)
        .filter(item => item !== this.currentUserId)[0];
    },
    playerEntity() {
      return this.logEntity[this.currentUserId];
    },
    enemyEntity() {
      return this.logEntity[this.currentEnemyId];
    },
    playerAttackData() {
      return zones.reduce((attackData, zone) => {
        const zoneAttacked = this.enemyEntity?.attackZone === zone;
        return {
          ...attackData,
          [zone]: {
            wasAttacked: zoneAttacked,
            hasBlocked: this.playerEntity?.defenseZone.includes(zone),
            isCriticalHit: zoneAttacked && this.enemyEntity?.result?.type === LOG_ACTION.CRITICAL,
            hasDodged: zoneAttacked && this.playerEntity?.result?.type === LOG_ACTION.DODGE,
          },
        };
      }, {});
    },
    playerWasSkippedTheTurn() {
      return this.playerEntity?.result?.type === LOG_ACTION.SKIP;
    },
    enemyAttackData() {
      return zones.reduce((attackData, zone) => {
        const zoneAttacked = this.playerEntity?.attackZone === zone;
        return {
          ...attackData,
          [zone]: {
            wasAttacked: zoneAttacked,
            hasBlocked: this.enemyEntity?.defenseZone.includes(zone),
            isCriticalHit: zoneAttacked && this.playerEntity?.result?.type === LOG_ACTION.CRITICAL,
            hasDodged: zoneAttacked && this.enemyEntity?.result?.type === LOG_ACTION.DODGE,
          },
        };
      }, {});
    },
    enemyWasSkippedTheTurn() {
      return this.enemyEntity?.result?.type === LOG_ACTION.SKIP;
    },
    playerMessage() {
      return this.generateMessage(this.playerEntity?.result);
    },
    enemyMessage() {
      return this.generateMessage(this.enemyEntity?.result);
    },
  },
  methods: {
    generateMessage({ type, text, value }) {
      if (!text) {
        return '';
      }
      const userIds = Object.keys(this.players);
      let processed = text;

      userIds.forEach((id) => {
        processed = processed.replace(`%${id}%`, this.players[id]);
      });

      if (type === 'damage' && value) { // TODO: сделать как-то более универсально, пока только урон и на if'ах
        processed = processed.replace('%damage%', value);
      }

      return processed;
    },
  },
};
</script>

<style lang="stylus">
@require '~imports/client/ui/styles/variables/colors'
$timeTextColor = $color_textGray

.BattleLogMessage
  display flex
  flex-direction column
  padding 5px

  &__info
    display flex
    justify-content space-between
    align-items center

  &__attackData
    display flex

  &__time
    text-align right
    color $timeTextColor

</style>

<docs>
# BattleLogMessage
```js
import BattleLogMessage from '/imports/client/ui/game/battle/BattleLogMessage.vue';
```
</docs>
