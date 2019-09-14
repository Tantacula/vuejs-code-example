import { storiesOf } from '@storybook/vue';
import { withReadme } from 'storybook-readme';

import BattleAttackSelection from '/imports/client/ui/game/battle/BattleAttackSelection.vue';
import FrameComponent from '/imports/client/ui/layouts/LayoutFrame.vue';

import { attackActions, defendActions } from '/imports/client/ui/game/battle/BattleAttackDefendActionsList';

storiesOf('Боевой экран', module)
  .addDecorator(withReadme(BattleAttackSelection.__docs))
  .add('Компонент выбора типа атаки и защиты (BattleAttackSelection)', () => ({
    components: { BattleAttackSelection, FrameComponent },
    data() {
      return {
        attackActions,
        defendActions,
        isAvailable: true,
        selectedAttack: null,
        selectedDefend: null,
      };
    },
    template: `
      <div class="sb-page sb-page_withPaddings">
        <h2 class="sb-head">
          Компонент выбора типа атаки и защиты
        </h2>
        
        <FrameComponent class="sb__frame" style="max-width: 480px;">
          <div style="display: flex; justify-content:space-between;">
            <BattleAttackSelection
              style="flex-basis:48%;"
              :isAvailable="isAvailable"
              :actionsList="attackActions"
              :selectedValue="selectedAttack"
              :isDefend="false"
              @actionWasSelected="selectedAttack = $event.type"
            />
            
            <BattleAttackSelection
              style="flex-basis:48%;"
              :isAvailable="isAvailable"
              :actionsList="defendActions"
              :selectedValue="selectedDefend"
              isDefend
              @actionWasSelected="selectedDefend = $event.type"
            />
          
          </div>
        </FrameComponent>
        
        <button
          style="margin-top: 10px;"
          @click="isAvailable = !isAvailable">
          Переключить доступность
         </button>
        
      </div>
    `,
  }));
