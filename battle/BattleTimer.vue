<template lang="pug">
.BattleTimer
  .BattleTimer__progressbar
    BaseProgress(
      :max="timerLength"
      :value="remainsInSeconds"
      :red="remainsInSeconds < 10"
      hideCounter
    )
  .BattleTimer__text
    template(v-if="textPrefix") {{ textPrefix }} {{ remainsInSeconds }} секунд
    template(v-else) осталось {{ remainsInSeconds }} с...
</template>

<script>
import BaseProgress from '/imports/client/ui/components/BaseProgress.vue';

export default {
  components: {
    BaseProgress,
  },
  props: {
    end: {
      type: Number,
      required: true,
    },
    timerLength: {
      type: Number,
      required: true,
    },
    notifyBefore: {
      type: Number,
      default: null,
    },
    textPrefix: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      remains: 0,
      interval: null,
    };
  },
  computed: {
    remainsInSeconds() {
      return Math.round(this.remains / 1000);
    },
  },
  watch: {
    end() {
      this.startInterval();
    },
    remains(val, oldVal) {
      if (!this.notifyBefore) {
        return;
      }
      if (oldVal > this.notifyBefore && val <= this.notifyBefore) {
        this.$emit('timerNotification', { remains: val });
      }
    },
  },
  created() {
    this.startInterval();
  },
  beforeDestroy() {
    this.clearInterval();
  },
  methods: {
    startInterval() {
      this.clearInterval();
      if (this.end <= Date.now()) {
        return;
      }
      this.interval = setInterval(() => {
        const remains = this.end - Date.now();
        if (remains < 0) {
          this.clearInterval();
          this.remains = 0;
          this.$emit('timeout');
        } else {
          this.remains = remains;
        }
      }, 200);
    },
    clearInterval() {
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      }
    },
  },
};
</script>

<style lang="stylus">
.BattleTimer
  width 112px
  text-align center

  &__text
    font-weight 700
    font-size 10px
    letter-spacing 0.02em

</style>

<docs>
# Таймер боя
```js
import BattleTimer from '/imports/client/ui/game/battle/BattleTimer.vue';
```

```pug
BattleTimer(
  :end="timestampInMs"
  :timerLength="lengthInSeconds"
  :notifyBefore="milliseconds"
  :textPrefix="someTextString"
  @timeout="cb"
  @timerNotification="cb2($event)"
)
```

### Параметры

```ts
<Number> end - таймштамп окончания таймера в миллисекундах
<Number> timeLength - Длительность таймера (для отображени прогрессбара)
<Number> notifyBefore - за столько мсек до конца отсчета таймер уведомит событием timerNotification
<String> textPrefix - текст перед таймером
```

параметр notifyBefore позволяет получить уведомление (timerNotification) за N миллисекунд до
окончания отсчета. Это будет полезно, если хочется учесть пинг между сервером и клиентом и
отключить возможность отправлять данные об атаке и блоке, когда сервер не успеет их обработать.
</docs>
