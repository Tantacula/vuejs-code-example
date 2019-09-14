import { storiesOf } from '@storybook/vue';
import { withReadme } from 'storybook-readme';
import BattleCharacterInfo from '/imports/client/ui/game/battle/BattleCharacterInfo.vue';
import FrameComponent from '/imports/client/ui/layouts/LayoutFrame.vue';

// TODO: пример данных. Переписать, когда будут готовы данные с сервера
import { enemies } from '/imports/client/ui/game/battle/data-examples/player-example';

storiesOf('Боевой экран', module)
  .addDecorator(withReadme(BattleCharacterInfo.__docs))
  .add('Информация о персонаже (BattleCharacterInfo)', () => ({
    components: {
      FrameComponent,
      BattleCharacterInfo,
    },
    data() {
      return {
        character: enemies[0],
      };
    },
    template: `
      <div class="sb-page sb-page_withPaddings">
        <FrameComponent class="sb__frame">
          <BattleCharacterInfo :character="character"/>
        </FrameComponent>
      </div>
    `,
  }));
