<template>
    <div>
        <button v-on:click.stop.prevent="randomize" style="margin-left: 800px;">Randomize!</button>
        <slot1 ref="slot1" type="Surv"/>
        <slot2 ref="slot2" type="Surv"/>
        <slot3 ref="slot3" type="Surv"/>
        <slot4 ref="slot4" type="Surv"/>
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
      perkData: require('./../resources/perks-survivor.json')
    }
  },
  methods: {
    randomize: function () {
      let random = this.perkData.sort(() => 0.5 - Math.random()).slice(0, 4)
      // targetId, rollDuration, speed
      this.$refs.slot1.rollWheel(random[0].index, 2, 0.2)
      this.$refs.slot2.rollWheel(random[1].index, 3, 0.2)
      this.$refs.slot3.rollWheel(random[2].index, 3.5, 0.22)
      this.$refs.slot4.rollWheel(random[3].index, 3.5, 0.4)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
