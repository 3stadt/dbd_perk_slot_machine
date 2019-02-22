<template>
    <div class="slot">
        <img class="perk" src="/img/perkBg.gif" alt="">
        <template v-for="(n, i) in  (maxId + 1)">
            <img :key="n" ref="perks" class="perk" :class="[ 'perk-'+ i ]" src="/img/perkslotsSurv.png" alt="">
        </template>
    </div>
</template>

<script>
export default {
  name: 'DDDSlot',
  data: function () {
    return {
      maxId: 58,
      roll: {
        steps: 0,
        speed: 5,
        targetId: 0,
        pxTraveled: 256,
        pxTraveledAdj: 0,
        currentPerkId: 0
      }
    }
  },
  methods: {
    rollWheel: function (targetId) {
      this.roll.targetId = targetId
      window.requestAnimationFrame(this._doRollWheel)
    },
    _doRollWheel: function () {
      let roll = this.roll
      let adjacentPerkId = roll.currentPerkId - 1
      if (adjacentPerkId < 0) {
        adjacentPerkId = this.maxId
      }

      roll.pxTraveled += 256 / 100 * roll.speed
      roll.pxTraveledAdj += 256 / 100 * roll.speed
      let newPos = -256 + roll.pxTraveled
      let newPosAdj = -256 + roll.pxTraveledAdj

      if (roll.pxTraveled <= 512) {
        this.$refs.perks[roll.currentPerkId].setAttribute('style', 'transform: translateY(' + newPos + 'px);')
        this.$refs.perks[adjacentPerkId].setAttribute('style', 'transform: translateY(' + newPosAdj + 'px);')
        window.requestAnimationFrame(this._doRollWheel)
        return
      }
      this.$refs.perks[roll.currentPerkId].removeAttribute('style')
      roll.pxTraveled = roll.pxTraveledAdj
      roll.pxTraveledAdj = 0
      roll.currentPerkId = adjacentPerkId
      roll.steps++
      if (roll.currentPerkId === roll.targetId || roll.steps > 6) {
        return
      }
      window.requestAnimationFrame(this._doRollWheel)
    }
  },
  mounted: function () {
    this.$refs.perks[0].setAttribute('style', 'transform: translateY(0px);')
  }
}
</script>

<style lang="scss" scoped>
    $item-width: 256;
    $n: 59;

    .slot {
        height: #{$item-width}px;
        position: relative;
        overflow: hidden;
    }

    .perk {
        object-fit: none;
        object-position: 0 0;
        width: #{$item-width}px;
        height: #{$item-width}px;
        position: absolute;
        top: 0;
        left: 0;
    }

    @for $i from 0 through $n {
        $pos: $i * $item-width * -1;
        .perk-#{$i} {
            object-position: 0 #{$pos}px;
            transform: translateY(-256px);
        }
    }
</style>
