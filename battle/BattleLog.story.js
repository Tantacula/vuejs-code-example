import { storiesOf } from '@storybook/vue';
import { withReadme } from 'storybook-readme';

import BattleLog from '/imports/client/ui/game/battle/BattleLog.vue';
import LayoutMain from '/imports/client/ui/layouts/LayoutMain.vue';
import BaseButton from '/imports/client/ui/components/BaseButton.vue';
import ResizeableContainer from '/imports/client/ui/components/ResizeableContainer.vue';

storiesOf('Боевой экран', module)
  .addDecorator(withReadme(BattleLog.__docs))
  .add('Лог боя (BattleLog)', () => ({
    components: {
      BaseButton,
      BattleLog,
      LayoutMain,
      ResizeableContainer,
    },
    data() {
      return {
        displayLog: true,
      };
    },
    methods: {
      toggleLog() {
        this.displayLog = !this.displayLog;
      },
    },
    template: `
        <div class="sb-page">
          <LayoutMain>
          
            <div style="min-height:100%"></div>
            
            <ResizeableContainer
              v-if="displayLog"
              :containerName="'BattleLog__resizeableContainer'"
              :minContainerHeight="50"
              :maxContainerHeight="300"
              :saveSettings="true">
              
              <BattleLog
                v-if="displayLog"
                @closeLog="displayLog = false"
              />
              
            </ResizeableContainer>
            
            <template slot="footer">
              <button @click="toggleLog">Переключить лог</button>
            </template>
           
          </LayoutMain>
        </div>
    `,
  }));
