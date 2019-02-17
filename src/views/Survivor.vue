<template>
    <div>
        <button v-on:click.stop.prevent="randomize" style="margin-left: 800px;">Randomize!</button>
        <h1>Survivor Roulette</h1>
        <slot1 ref="slot1" type="Surv" :ids="getIds()" />
        <slot1 ref="slot2" type="Surv" />
        <slot1 ref="slot3" type="Surv" />
        <slot1 ref="slot4" type="Surv" />
    </div>
</template>

<script>
import PerkSlot from '../components/PerkSlot'

export default {
  name: 'Survivor',
  components: {
    'slot1': PerkSlot
  },
  methods: {
    randomize: function () {
      this.$refs.slot1.roll(10)
      this.$refs.slot2.roll(7)
      this.$refs.slot3.roll(15)
      this.$refs.slot4.roll(3)
    },
    getIds: function () {
      return [22, 23, 24, 25, 26]
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
