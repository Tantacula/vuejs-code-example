import { storiesOf } from '@storybook/vue';
import { withReadme } from 'storybook-readme';

import BattleAttackSelectionButton from '/imports/client/ui/game/battle/BattleAttackSelectionButton.vue';
import FrameComponent from '/imports/client/ui/layouts/LayoutFrame.vue';
import { attackActions } from '/imports/client/ui/game/battle/BattleAttackDefendActionsList';

storiesOf('Боевой экран', module)
  .addDecorator(withReadme(BattleAttackSelectionButton.__docs))
  .add('Кнопка выбора типа атаки/защиты (BattleAttackSelectionButton)', () => ({
    components: { BattleAttackSelectionButton, FrameComponent },
    data() {
      return {
        buttonImagesPath: '/images/battle/AttackSelectionButtons/',
        bodyParts: attackActions,
        active: 'head',
      };
    },
    template: `
      <div class="sb-page sb-page_withPaddings">
        <h2 class="sb-head">
          Кнопка выбора типа атаки/защиты
        </h2>
        
        <FrameComponent class="sb__frame">
          <h3>Обычная</h3>
          <template v-for="attackType in bodyParts">
            <BattleAttackSelectionButton
              :isActive="active === attackType.name"
              @click="active = attackType.name"
              :description="attackType.name === 'head' ? '-50%' : ''"
            >
              <img :src="buttonImagesPath + attackType.name + '.png'">
            </BattleAttackSelectionButton>
          </template>
        </FrameComponent>
        
        <FrameComponent class="sb__frame">
          <h3>Отключенная</h3>
          
          <BattleAttackSelectionButton
            :isDisabled="true"
          >
            <img :src="buttonImagesPath + bodyParts[0].name + '.png'">
          </BattleAttackSelectionButton>
        </FrameComponent>
        
      </div>
    `,
  }));
