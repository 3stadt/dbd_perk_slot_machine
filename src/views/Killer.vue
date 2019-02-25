<template>
    <div>
        <button v-on:click.stop.prevent="randomize" style="margin-left: 800px;">Randomize!</button>
        <slot1 ref="slot1" type="Kill"/>
        <slot2 ref="slot2" type="Kill"/>
        <slot3 ref="slot3" type="Kill"/>
        <slot4 ref="slot4" type="Kill"/>
    </div>
</template>

<script>
import PerkSlot from '../components/PerkSlot'

export default {
  name: 'Killer',
  components: {
    'slot1': PerkSlot,
    'slot2': PerkSlot,
    'slot3': PerkSlot,
    'slot4': PerkSlot
  },
  data: function () {
    return {
      perkData: require('./../resources/perks-killer.json')
    }
  },
  methods: {
    randomize: function () {
      let random = this._getRandomData()
      // targetId, rollDuration, speed
      this.$refs.slot1.rollWheel(random[0].index, 2, 0.2)
      this.$refs.slot2.rollWheel(random[1].index, 3, 0.2)
      this.$refs.slot3.rollWheel(random[2].index, 3.5, 0.22)
      this.$refs.slot4.rollWheel(random[3].index, 3.5, 0.4)
    },
    _getRandomData: function () {
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
          if (this.perkData[i].index === i && avPerks.indexOf(i) >= 0) {
            avPerkData.push(this.perkData[i])
          }
          if (avPerkData.length === avLen) {
            break
          }
        }
      }

      avPerkData = avPerkData.length >= 4 ? avPerkData : this.perkData
      return avPerkData.sort(() => 0.5 - Math.random()).slice(0, 4)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
