import { storiesOf } from '@storybook/vue';
import { withReadme } from 'storybook-readme';

import BattlePlayerStatus from '/imports/client/ui/game/battle/BattlePlayerStatus.vue';
import FrameComponent from '/imports/client/ui/layouts/LayoutFrame.vue';

storiesOf('Боевой экран', module)
  .addDecorator(withReadme(BattlePlayerStatus.__docs))
  .add('Статус игрока (BattlePlayerStatus)', () => ({
    components: { BattlePlayerStatus, FrameComponent },
    data() {
      return {
        name: 'Имярек',
        maxHP: 100,
        currentHP: 75,
        level: 4,
        isMirrored: false,
      };
    },
    template: `
      <div class="sb-page sb-page_withPaddings">
        <h2 class="sb-head">
          Статусбар левый
        </h2>
        <FrameComponent class="sb__frame">
          <BattlePlayerStatus
            :name="name"
            :maxHP="maxHP"
            :currentHP="currentHP"
            :level="level"
            :isMirrored="isMirrored"
          />
        </FrameComponent>
        <h2 class="sb-head">
          Статусбар правый
        </h2>
        <FrameComponent class="sb__frame">
          <BattlePlayerStatus
            :name="name"
            :maxHP="maxHP"
            :currentHP="currentHP"
            :level="level"
            :isMirrored="true"
          />
        </FrameComponent>
      </div>
    `,
  }));
