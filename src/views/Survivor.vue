<template>
    <div>
        <button v-on:click.stop.prevent="randomize" style="margin-left: 800px;">Randomize!</button>
        <h1>Survivor Roulette</h1>
        <p>{{ randId }}</p>
        <slot1 ref="slot1" type="Surv" />
        <!--<slot1 ref="slot1" type="Surv" />-->
        <!--<slot1 ref="slot2" type="Surv" />-->
        <!--<slot1 ref="slot3" type="Surv" />-->
        <!--<slot1 ref="slot4" type="Surv" />-->
    </div>
</template>

<script>
// import PerkSlot from '../components/PerkSlot'
import DDDSlot from '../components/DDDSlot'

export default {
  name: 'Survivor',
  components: {
    // 'slot': PerkSlot,
    'slot1': DDDSlot
  },
  data: function () {
    return {
      randId: 0
    }
  },
  methods: {
    randomize: function () {
      this.randId = this.randId === 0 ? 1 : 0

      this.$refs.slot1.rollWheel(this.randId)
      // this.$refs.slot2.roll(12)
      // this.$refs.slot3.roll(15)
      // this.$refs.slot4.roll(9)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
