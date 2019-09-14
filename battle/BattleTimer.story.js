import { storiesOf } from '@storybook/vue';
import { withReadme } from 'storybook-readme';

import BattleTimer from '/imports/client/ui/game/battle/BattleTimer.vue';
import FrameComponent from '/imports/client/ui/layouts/LayoutFrame.vue';

storiesOf('Боевой экран', module)
  .addDecorator(withReadme(BattleTimer.__docs))
  .add('таймер боя (BattleTimer)', () => ({
    components: { BattleTimer, FrameComponent },
    data() {
      return {
        end: Date.now() + 30000,
        timerLength: 30,
      };
    },
    methods: {
      timeout() {
        setTimeout(() => {
          this.end = Date.now() + 30000;
        }, 1000);
      },
      notificationHandler() {
        //
      },
    },
    template: `
      <div class="sb-page sb-page_withPaddings">
        <h2 class="sb-head">
          таймер боя
        </h2>
        
        <FrameComponent class="sb__frame">
          <BattleTimer
            :end="end"
            :timerLength="timerLength"
            :notifyBefore=2000
            @timeout="timeout"
            @timerNotification="notificationHandler()"
          />
        </FrameComponent>
        
      </div>
    `,
  }));
