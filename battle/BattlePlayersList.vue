<template lang="pug">
.BattlePlayersList
  .BattlePlayersList__header Игроки онлайн
  .BattlePlayersList__emptyList(v-if="players.length === 0") Нет ни одного игрока в онлайне

  ul.BattlePlayersList__list
    li.BattlePlayersList__listItem(
      v-for="player in players"
      :key="player.id"
    )
      BaseButton(
        class="BattlePlayersList__item"
        :light="true"
        :text="player.name"
        @click="$emit('playerWasSelected', player.id)"
      )

</template>

<script>
import BaseButton from '/imports/client/ui/components/BaseButton.vue';

/**
 * Отображение список игроков.
 * @emits 'playerWasSelected' - отдает id выбранного игрока
 */
export default {
  components: {
    BaseButton,
  },
  props: {
    /**
     * @property {Object[]} players
     * @property {string} players[].name - имя игрока
     * @property {number} players[].id - id игрока
     */
    players: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="stylus">
.BattlePlayersList
  padding 20px

  &__header
    display block

    // TODO: когда будут добавлены общие размеры заголовков, заменить эти стили
    font-size 20px
    line-height (@font-size*1.33)
    margin-bottom (@font-size/1.5)
    text-align center

  &__list
    margin 0
    padding 0
    list-style-type none

  &__listItem:not(:last-child)
    margin-bottom 15px

  &__emptyList
    text-align center

  &__item
    width 100%
    overflow hidden
    text-overflow ellipsis

</style>

<docs>
# Список игроков в сети

```js
import BattlePlayersList from '/imports/client/ui/game/battle/BattlePlayersList.vue';
```
## Использование
```js
/**
* @param {Object[]} players
* @param {string} players[].name - имя игрока
* @param {number} players[].id - id игрока
* @emits id 'playerWasSelected' - id игрока
*/
```
```pug
BattlePlayersList(
  :players="players"
  @playerWasSelected="cb($event)"
)
```
</docs>
