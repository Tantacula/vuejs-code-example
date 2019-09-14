import { storiesOf } from '@storybook/vue';
import { withReadme } from 'storybook-readme';
import { action } from '@storybook/addon-actions';

import BattlePlayersList from '/imports/client/ui/game/battle/BattlePlayersList.vue';
import FrameComponent from '/imports/client/ui/layouts/LayoutFrame.vue';

storiesOf('Боевой экран', module)
  .addDecorator(withReadme(BattlePlayersList.__docs))
  .add('Список игроков (BattlePlayersList)', () => ({
    components: {
      BattlePlayersList,
      FrameComponent,
    },
    data() {
      return {
        players: [
          {
            name: 'Викториан',
            id: 1,
          },
          {
            name: 'Василий',
            id: 2,
          },
        ],
      };
    },
    methods: {
      selectPlayer: action('Игрок был выбран'),
    },
    template: `
      <div class="sb-page sb-page_withPaddings">
        <h2 class="sb-head">
          Список игроков
        </h2>
        
        <FrameComponent>
          <BattlePlayersList 
            :players="players"
            @playerWasSelected="selectPlayer"
          />
        </FrameComponent>
        

        
        <h2 class="sb-head">
          Нет игроков в сети
        </h2>
        
        <FrameComponent>
          <BattlePlayersList 
            :players="[]"
          />
        </FrameComponent>
        
      </div>
    `,
  }));
