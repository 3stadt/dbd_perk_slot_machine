<template>
    <div>
        <perkslot0 @reRollRequested="randomize" ref="perkslot0" type="Kill"/>
        <perkslot1 @reRollRequested="randomize" ref="perkslot1" type="Kill"/>
        <perkslot2 @reRollRequested="randomize" ref="perkslot2" type="Kill"/>
        <perkslot3 @reRollRequested="randomize" ref="perkslot3" type="Kill"/>
    </div>
</template>

<script>
import PixiPerkSlot from '../components/PixiPerkSlot'

export default {
  name: 'Killer',
  components: {
    'perkslot0': PixiPerkSlot,
    'perkslot1': PixiPerkSlot,
    'perkslot2': PixiPerkSlot,
    'perkslot3': PixiPerkSlot
  },
  data: function () {
    return {
      perkData: require('./../resources/perks-killer.json')
    }
  },
  methods: {
    randomize: function () {
      let random = this._getRandomData(4)
      this.$refs.perkslot0.rollWheel(random[0])
      this.$refs.perkslot1.rollWheel(random[1])
      this.$refs.perkslot2.rollWheel(random[2])
      this.$refs.perkslot3.rollWheel(random[3])
    },
    _getRandomData: function (n) {
      let avPerks = []
      let avPerkData = []
      if (this.$route.query.kids) {
        avPerks = this.$route.query.kids.split(',').map(function (item) {
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

      let result = new Array(n)
      let len = avPerkData.length
      let taken = new Array(len)
      // https://stackoverflow.com/a/19270021
      if (n > len) { throw new RangeError('getRandom: more elements taken than available') }
      while (n--) {
        let x = Math.floor(Math.random() * len)
        result[n] = avPerkData[x in taken ? taken[x] : x]
        taken[x] = --len in taken ? taken[len] : len
      }
      return result
    }
  }
}
</script>
