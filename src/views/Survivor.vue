<template>
    <div>
        <perkslot0 @reRollRequested="randomize" ref="perkslot0" type="Surv"/>
        <perkslot1 @reRollRequested="randomize" ref="perkslot1" type="Surv"/>
        <perkslot2 @reRollRequested="randomize" ref="perkslot2" type="Surv"/>
        <perkslot3 @reRollRequested="randomize" ref="perkslot3" type="Surv"/>
    </div>
</template>

<script>
import PixiPerkSlot from '../components/PixiPerkSlot'
import rand from '@/lib/randomize'

export default {
  name: 'Survivor',
  components: {
    'perkslot0': PixiPerkSlot,
    'perkslot1': PixiPerkSlot,
    'perkslot2': PixiPerkSlot,
    'perkslot3': PixiPerkSlot
  },
  data: function () {
    return {
      perkData: require('./../resources/perks-survivor.json')
    }
  },
  methods: {
    randomize: function () {
      let random = rand.getRandomData(4, this.$route.query, this.perkData)
      this.$refs.perkslot0.rollWheel(random[0])
      this.$refs.perkslot1.rollWheel(random[1])
      this.$refs.perkslot2.rollWheel(random[2])
      this.$refs.perkslot3.rollWheel(random[3])
    }
  }
}
</script>
