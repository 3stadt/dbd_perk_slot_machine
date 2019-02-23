<template>
    <div>
        <button v-on:click.stop.prevent="randomize" style="margin-left: 800px;">Randomize!</button>
        <h1>Survivor Roulette ({{ randId }})</h1>
        <slot1 ref="slot1" type="Surv" />
        <slot2 ref="slot2" type="Surv" />
        <slot3 ref="slot3" type="Surv" />
        <slot4 ref="slot4" type="Surv" />
    </div>
</template>

<script>
import DDDSlot from '../components/DDDSlot'

export default {
  name: 'Survivor',
  components: {
    'slot1': DDDSlot,
    'slot2': DDDSlot,
    'slot3': DDDSlot,
    'slot4': DDDSlot
  },
  data: function () {
    return {
      randId: 0
    }
  },
  methods: {
    randomize: function () {
      this.$refs.slot1.rollWheel(0, 2.5, 0.2)
      this.$refs.slot2.rollWheel(12, 3, 0.4)
      this.$refs.slot3.rollWheel(44, 3.5, 0.15)
      this.$refs.slot4.rollWheel(19, 4, 0.55)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
