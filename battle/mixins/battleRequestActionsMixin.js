import { Meteor } from 'meteor/meteor';
import helpers from '/imports/client/ui/helpers';

const { showAlert, meteorCallPromise } = helpers;

export default {
  computed: {
    $_battleRequestActions_requestTimeout() {
      return this.battleRequestActions_character?.combatRequest?.timeout;
    },
    $_battleRequestActions_wasCalledToBattle() {
      return !!this.battleRequestActions_character?.combatRequest?.sender;
    },
    $_battleRequestActions_requestIsRejected() {
      return this.battleRequestActions_character?.combatRequest?.rejected;
    },
  },
  meteor: {
    battleRequestActions_character() {
      return Meteor.user()?.character;
    },
  },
  watch: {
    $_battleRequestActions_requestTimeout(val) {
      if (!val) {
        return;
      }

      if (Date.parse(val) > Date.now() && this.$_battleRequestActions_wasCalledToBattle) {
        this.$_battleRequestActions_displayRequest();
      }
    },
    $_battleRequestActions_requestIsRejected(val) {
      // TODO: избавиться от появления уведомления при каждой перезагрузки страницы
      const requestIsActual = Date.parse(this.$_battleRequestActions_requestTimeout) > Date.now();
      if (val && requestIsActual) {
        this.showAlert('', 'Ваш вызов был отклонен.');
      }
    },
  },
  methods: {
    showAlert,
    $_battleRequestActions_displayRequest() {
      const id = `battle-request-${Date.now()}`;
      this.$root.$emit(
        'createModalExtended',
        {
          id,
          head: 'Вас вызвали на поединок',
          text: 'Принять Вызов?',
          onAccept: this.$_battleRequestActions_acceptRequest,
          onReject: this.$_battleRequestActions_rejectRequest,
          preventClose: true,
        },
      );
      const interval = setInterval(() => {
        let remaining = Math.round(
          (Date.parse(this.$_battleRequestActions_requestTimeout) - Date.now()) / 1000,
        );
        if (remaining < 0) {
          remaining = 0;
        }
        this.$root.$emit('updateModalExtended',
          {
            id,
            modal: {
              text: `Принять вызов? (Осталось ${remaining} секунд)`,
            },
          });
      }, 200);
      setTimeout(
        () => {
          clearInterval(interval);
          this.$root.$emit('deleteModalExtended', { id });
        },
        Date.parse(this.$_battleRequestActions_requestTimeout) - Date.now(),
      );
    },
    async $_battleRequestActions_acceptRequest() {
      try {
        await meteorCallPromise('CombatRequest.accept');
      } catch (e) {
        this.showAlert('Ошибка при попытке вступить в поединок', e.error);
      }
    },
    async $_battleRequestActions_rejectRequest() {
      try {
        await meteorCallPromise('CombatRequest.reject');
      } catch (e) {
        this.showAlert('Ошибка при попытке отказаться от поединка', e.error);
      }
    },
  },
};
