import { storiesOf } from '@storybook/vue';
import { withReadme } from 'storybook-readme';

import BattleLogAttackResults from '/imports/client/ui/game/battle/BattleLogAttackResults.vue';
import FrameComponent from '/imports/client/ui/layouts/LayoutFrame.vue';
import attackResult from '/imports/client/ui/game/battle/data-examples/attack-log-example';

storiesOf('Боевой экран', module)
  .addDecorator(withReadme(BattleLogAttackResults.__docs))
  .add('Визуальное отображение урона/защиты (BattleLogAttackResults)', () => ({
    components: { BattleLogAttackResults, FrameComponent },
    data() {
      return {
        attackData: attackResult(),
      };
    },
    template: `
      <div class="sb-page sb-page_withPaddings">
        <h2 class="sb-head">
          Визуальное отображение урона/защиты
        </h2>
        
        <FrameComponent class="sb__frame">
        
          <h3>Полоска игрока</h3>
          <BattleLogAttackResults
            :isPlayer="true"
            :attackData="attackData.player"
          ></BattleLogAttackResults>
        
          <h3>Полоска противника</h3>
          <BattleLogAttackResults
            :isPlayer="false"
            :attackData="attackData.enemy"
          ></BattleLogAttackResults>
          
        </FrameComponent>
        
      </div>
    `,
  }));
