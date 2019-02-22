<template>
    <div>
        <button v-on:click.stop.prevent="randomize" style="margin-left: 800px;">Randomize!</button>
        <h1>Survivor Roulette</h1>
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
  methods: {
    randomize: function () {
      this.$refs.slot1.rollWheel(5)
      // this.$refs.slot2.roll(12)
      // this.$refs.slot3.roll(15)
      // this.$refs.slot4.roll(9)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
