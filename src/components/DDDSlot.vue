<template>
    <div class="slot">
        <img class="perk" src="/img/perkBg.gif" alt="">
        <template v-for="(n, i) in  (maxId + 1)">
            <img :key="n" ref="perks" class="perk" :class="[ 'perk-'+ i ]" :src="_isBlurred()" alt="">
        </template>
    </div>
</template>

<script>
export default {
  name: 'DDDSlot',
  data: function () {
    let me = this
    return {
      maxId: 58,
      elementHeight: 256,
      roll: {
        active: false,
        extraSteps: true,
        originalTargetId: 0,
        stepsTotal: 0,
        steps: 0,
        acceleration: 0.1,
        maxSpeed: 30,
        speed: 0,
        targetId: 0,
        pxTraveled: me.elementHeight,
        pxDistance: 0,
        pxTraveledAdj: 0,
        currentPerkId: 0,
        startTime: null
      }
    }
  },
  methods: {
    _getDistance: function () {
      if (this.roll.currentPerkId < this.roll.targetId) {
        return (this.roll.currentPerkId - this.maxId - this.roll.targetId)
      }
      return (this.roll.currentPerkId - this.roll.targetId)
    },
    _getPxDistance: function () {
      return this._getDistance() * this.elementHeight
    },
    rollWheel: function (targetId) {
      this.roll.targetId = targetId
      this.roll.pxDistance = this._getPxDistance()
      this.roll.stepsTotal = this._getDistance()
      if (this.roll.pxDistance < (this.maxId * this.elementHeight)) {
        this.roll.originalTargetId = targetId
        this.roll.extraSteps = true
        this.roll.targetId = this.maxId
        this.roll.pxDistance += this._getPxDistance()
        this.roll.stepsTotal += this._getDistance()
      }
      if (this.roll.active || this.roll.currentPerkId === targetId) {
        return false
      }
      this.roll.active = true
      window.requestAnimationFrame(this._doRollWheel)
      return true
    },
    _doRollWheel: function (timestamp) {
      let roll = this.roll
      roll.startTime = roll.startTime || timestamp // set start time if it is null
      let rampSpeed = (timestamp - roll.startTime) / roll.maxSpeed * roll.acceleration
      roll.speed = rampSpeed // easing speed to be slower at the start/end
      // console.log(roll.stepsTotal - roll.steps)

      // determine the perk left to/before the one currently visible/dissapearing
      let adjacentPerkId = roll.currentPerkId - 1
      if (adjacentPerkId < 0) {
        adjacentPerkId = this.maxId
      }

      if (rampSpeed >= roll.maxSpeed) { // speed is already at max
        roll.speed = roll.maxSpeed
      }

      roll.pxTraveled += this.elementHeight / 100 * roll.speed
      roll.pxTraveledAdj += this.elementHeight / 100 * roll.speed
      if (isNaN(roll.pxTraveled)) { // that thing is already in viewport, happens on the initial perk
        roll.pxTraveled = this.elementHeight
      }
      let newPos = -this.elementHeight + roll.pxTraveled
      let newPosAdj = -this.elementHeight + roll.pxTraveledAdj
      if (roll.pxTraveled <= this.elementHeight * 2 || roll.pxTraveledAdj <= this.elementHeight) {
        this.$refs.perks[roll.currentPerkId].setAttribute('style', 'transform: translateY(' + newPos + 'px);')
        this.$refs.perks[adjacentPerkId].setAttribute('style', 'transform: translateY(' + newPosAdj + 'px);')
        window.requestAnimationFrame(this._doRollWheel)
        return
      }
      this.$refs.perks[roll.currentPerkId].removeAttribute('style')
      this.$refs.perks[adjacentPerkId].setAttribute('style', 'transform: translateY(0);')
      roll.currentPerkId = adjacentPerkId
      roll.pxTraveled = roll.pxTraveledAdj
      roll.pxTraveledAdj = 0
      roll.steps++
      if (roll.currentPerkId === roll.targetId && roll.pxTraveled >= this.elementHeight) {
        if (!roll.extraSteps) {
          roll.pxDistance = 0
          this.roll.active = false
          roll.startTime = null
          return
        }
        roll.steps = 0
        roll.extraSteps = false
        roll.targetId = roll.originalTargetId
        roll.originalTargetId = 0
      }
      window.requestAnimationFrame(this._doRollWheel)
    },
    _isBlurred: function () {
      if (this.roll.speed > this.roll.maxSpeed * 0.25) {
        return '/img/perkslotsSurv_blur.png'
      }
      return '/img/perkslotsSurv.png'
    }
  },
  mounted: function () {
    this.$refs.perks[0].setAttribute('style', 'transform: translateY(0px);')
  }
}
</script>

<style lang="scss" scoped>
    @import '../design/perkData';

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
            transform: translateY(-#{$item-width}px);
        }
    }
</style>
