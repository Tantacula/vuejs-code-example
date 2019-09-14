import { storiesOf } from '@storybook/vue';
import { withReadme } from 'storybook-readme';

import BattleProcess from '/imports/client/ui/game/battle/BattleProcess.vue';
import FrameComponent from '/imports/client/ui/layouts/LayoutFrame.vue';

// TODO: пример данных. Переписать, когда будут готовы данные с сервера
import { player, enemies } from '/imports/client/ui/game/battle/data-examples/player-example';

const date = new Date();
date.setSeconds(date.getSeconds() + 30);

storiesOf('Боевой экран', module)
  .addDecorator(withReadme(BattleProcess.__docs))
  .add('Процесс боя (BattleProcess)', () => ({
    components: { BattleProcess, FrameComponent },
    data() {
      return {
        player,
        enemy: enemies[0],
        battleData: {
          _id: 'fAzMHxwzb9bsGmDyE',
          log: [],
          timeout: date.toUTCString(),
          userActions: {
            ysDTcE2rRYqR2G2aR: {
              attackZone: 'legs',
              defenseZone: ['torso', 'waist'],
            },
          },
        },
      };
    },
    created() {
      this.player.combat = this.battleData;
      this.player.userId = 1;
      this.enemy.combat = this.battleData;
      this.enemy.userId = 2;
    },
    template: `
      <div class="sb-page sb-page_withPaddings">
        <h2 class="sb-head">
          Процесс боя
        </h2>
        
        <FrameComponent class="sb__frame" style="max-width:480px;">
          <BattleProcess
            :player="player"
            :enemy="enemy"
            :battleData="battleData"
          />
        </FrameComponent>
        
      </div>
    `,
  }));
