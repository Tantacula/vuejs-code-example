import { storiesOf } from '@storybook/vue';
import { withReadme } from 'storybook-readme';

import BattleArmorActive from '/imports/client/ui/game/battle/BattleArmorActive.vue';
import FrameComponent from '/imports/client/ui/layouts/LayoutFrame.vue';

storiesOf('Боевой экран', module)
  .addDecorator(withReadme(BattleArmorActive.__docs))
  .add('Активная броня (BattleArmorActive)', () => ({
    components: { BattleArmorActive, FrameComponent },
    data() {
      return {
        head: 4,
        torso: 0,
        waist: 2,
        legs: 1,
      };
    },
    template: `
      <div class="sb-page sb-page_withPaddings">
        <h2 class="sb-head">
          Активная броня
        </h2>
        
        <FrameComponent  class="sb__frame">
        
          <div class="sb-flex sb-flex_space-between">
            <div>
              <h3>Обычная</h3>
              <BattleArmorActive
                style="height:120px;"
                :head="head"
                :torso="torso"
                :legs="legs"
              />            
            </div>

            <div>
              <h3>Отзеркаленная</h3>
              <BattleArmorActive
                style="height:120px;"
                :isMirrored="true"
                :torso="torso"
                :waist="waist"
                :legs="legs"
              />
            </div>
          </div>
          
        </FrameComponent>
        
      </div>
    `,
  }));
