import { Meteor } from 'meteor/meteor';
import CombatCollection from '/imports/modules/Combat/lib/collection';
import helpers from '/imports/client/ui/helpers';

const { showAlert } = helpers;

export default {
  data() {
    return {
      battleProcessMixin_battleId: '',
    };
  },
  computed: {
    battleProcessMixin_redirectToBattlePage() {
      return !!this.battleProcessMixin_currentBattle
        && !this.battleProcessMixin_currentBattle.winnerId;
    },
    battleProcessMixin_userCharacter() {
      return this.battleProcessMixin_currentUser?.character;
    },
  },
  watch: {
    battleProcessMixin_userCharacter(val) {
      // нельзя напрямую привязать combat._id, так как в этом случае подписка combat уничтожится
      // до повяления информации о победе вместе с character.combat._id
      if (val?.combat?._id) {
        this.battleProcessMixin_battleId = val.combat._id;
        this.$subscribe('combat', [val.combat._id]);
      }
    },
    battleProcessMixin_redirectToBattlePage(val) {
      if (!!val && this.$router.currentRoute?.name !== 'Battle') {
        this.$router.push({ name: 'Battle' });
      }
    },
    battleProcessMixin_currentBattle(val, oldVal) {
      if (oldVal && !oldVal.winnerId && val?.winnerId) {
        if (this.battleProcessMixin_currentUser?._id === val.winnerId) {
          this.battleProcessMixin_displayWinnerNotification();
        } else {
          this.battleProcessMixin_displayLoserNotification();
        }
        // this.battleProcessMixin_battleId = '';
      }
    },
  },
  methods: {
    showAlert,
    battleProcessMixin_displayWinnerNotification() {
      this.showAlert('Поздравяем, вы одержали победу.', '');
    },
    battleProcessMixin_displayLoserNotification() {
      this.showAlert('К сожалению, вы проиграли', '');
    },
  },
  meteor: {
    battleProcessMixin_currentUser() {
      return Meteor.user();
    },
    battleProcessMixin_currentBattle() {
      return CombatCollection.findOne({ _id: this.battleProcessMixin_battleId });
    },
  },
};
