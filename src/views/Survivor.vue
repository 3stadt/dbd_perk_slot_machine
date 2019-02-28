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
      let random = this._getRandomData()
      this.$refs.perkslot0.rollWheel(random[0])
      this.$refs.perkslot1.rollWheel(random[1])
      this.$refs.perkslot2.rollWheel(random[2])
      this.$refs.perkslot3.rollWheel(random[3])
    },
    _getRandomData: function () {
      let avPerks = []
      let avPerkData = []
      if (this.$route.query.sids) {
        avPerks = this.$route.query.sids.split(',').map(function (item) {
          return parseInt(item, 10)
        })
      }
      let avLen = avPerks.length
      if (avLen >= 4) {
        for (let i = 0, pLen = this.perkData.length; i < pLen; i++) {
          if (this.perkData[i].index === i && avPerks.indexOf(i) >= 0) avPerkData.push(this.perkData[i])
          if (avPerkData.length === avLen) break
        }
      }

      avPerkData = avPerkData.length >= 4 ? avPerkData : this.perkData
      return avPerkData.sort(() => 0.5 - Math.random()).slice(0, 4)
    }
  }
}
</script>
