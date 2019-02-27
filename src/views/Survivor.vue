<template>
    <div>
        <button v-on:click="randomize">Randomize!</button>
        <perkslots ref="perkslots" type="Surv"/>
    </div>
</template>

<script>
import PixiPerkSlot from '../components/PixiPerkSlot'

export default {
  name: 'Survivor',
  components: {
    'perkslots': PixiPerkSlot
  },
  data: function () {
    return {
      perkData: require('./../resources/perks-survivor.json'),
      lastRun: [0, 0, 0, 0]
    }
  },
  methods: {
    _getRandomWithDistance: function (distance) {
      let random = this.perkData.sort(() => 0.5 - Math.random()).slice(0, 4)
      for (let i = 0; i < random.length; i++) {
        if (Math.abs(random[i].index - this.lastRun[i].index) < distance) return this._getRandomWithDistance(distance)
      }
      return random
    },
    randomize: function () {
      let random = this._getRandomWithDistance(10)
      this.lastRun = random
      this.$refs.perkslots.rollWheel(random)
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
