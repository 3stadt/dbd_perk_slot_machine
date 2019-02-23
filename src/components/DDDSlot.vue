<template>
    <div style="display: inline-block">
        <div class="slot">
            <img class="perk" src="/img/perkBg.png" alt="">
            <template v-for="(n, i) in  (maxId + 1)">
                <img :key="n" ref="perks" class="perk" :class="[ 'perk-'+ i ]" :src="_isBlurred()" alt="">
            </template>
        </div>
    </div>
</template>

<script>
export default {
  name: 'DDDSlot',
  data: function () {
    let maxId = 58
    return {
      maxId: maxId,
      elementHeight: 256,
      rollTemplate: {
        active: false,
        startTime: null,
        currentPerksStartTime: null,
        speed: 0.8, // how many seconds a perk needs to travel through the viewport
        targetPerkReveal: false, // used to show the final target perk
        targetPerkId: 0,
        rollDuration: 2, // how many seconds before revealing/stopping
        disappearingPerk: {
          id: 0,
          position: 0
        },
        appearingPerk: {
          id: maxId,
          position: -256
        }
      },
      roll: null
    }
  },
  methods: {
    rollWheel: function (targetId, rollDuration, speed) {
      if (this.roll.active) {
        return false
      }
      this.roll.active = true
      this.roll.startTime = null
      this.roll.currentPerksStartTime = null
      this.roll.targetPerkId = targetId
      if (rollDuration) this.roll.rollDuration = rollDuration * 1000
      if (speed) this.roll.speed = speed
      window.requestAnimationFrame(this._doRollWheel)
      return true
    },
    _doRollWheel: function (timestamp) {
      let roll = this.roll
      // set start time if it is null, for the whole run as well as the currently animated perks
      roll.startTime = roll.startTime || timestamp
      roll.currentPerksStartTime = roll.currentPerksStartTime || timestamp

      let animationTime = timestamp - roll.startTime
      if (animationTime >= this.roll.rollDuration) { // We've reached the reveal phase
        roll.targetPerkReveal = true
      }

      // If the appearing perk is fully in the viewport, get the next one ready
      // The appearing perk becomes the disappearing perk, a new perk becomes the appearing one.
      // The position of the old disappearing perk is reset
      if (roll.appearingPerk.position >= 0) {
        if (roll.targetPerkReveal && roll.appearingPerk.id === roll.targetPerkId) { // target perk is in view
          this.$refs.perks[roll.targetPerkId].setAttribute('style', 'transform: translateY(0px);')
          this.$refs.perks[roll.disappearingPerk.id].removeAttribute('style')
          this.roll = this.rollTemplate
          this.roll.disappearingPerk.id = roll.targetPerkId
          this.roll.disappearingPerk.position = 0
          this.roll.appearingPerk.id = this._previousPerkId(roll.targetPerkId)
          this.roll.appearingPerk.position = this.elementHeight * -1
          this.roll.currentPerksStartTime = null
          this.roll.startTime = null
          this.roll.targetPerkReveal = null
          this.roll.active = false
          console.info(this.roll)
          return
        }
        // reset disappearing perk image
        this.$refs.perks[roll.disappearingPerk.id].removeAttribute('style')

        // set next perk position to currently appearing
        let nextAppearingPerk = this._previousPerkId(roll.appearingPerk.id)
        if (roll.targetPerkReveal) nextAppearingPerk = roll.targetPerkId
        let nextAppearingPerkPosition = this.elementHeight * -1 + roll.appearingPerk.position
        this.$refs.perks[nextAppearingPerk].setAttribute('style', 'transform: translateY(' + nextAppearingPerkPosition + 'px);')

        // switch appearing perk to be the disappearing one
        roll.disappearingPerk = roll.appearingPerk
        roll.appearingPerk = {
          id: nextAppearingPerk,
          position: nextAppearingPerkPosition
        }

        // reset current perk transition time
        roll.currentPerksStartTime = timestamp
      }

      // Calculate new positions according to elapsed animation time and speed.
      // Speed determines how much time a perk should be visible in the viewport.
      let currentPerkAnimationTime = timestamp - roll.currentPerksStartTime
      let stepPixels = this.elementHeight * (currentPerkAnimationTime / (roll.speed * 1000))

      // Position is different for the disappearing perk and the appearing one, by 1 elem height
      roll.appearingPerk.position = this.elementHeight * -1 + stepPixels
      roll.disappearingPerk.position = stepPixels

      // apply the new position
      this.$refs.perks[roll.appearingPerk.id].setAttribute('style', 'transform: translateY(' + roll.appearingPerk.position + 'px);')
      this.$refs.perks[roll.disappearingPerk.id].setAttribute('style', 'transform: translateY(' + roll.disappearingPerk.position + 'px);')

      window.requestAnimationFrame(this._doRollWheel)
    },
    _previousPerkId: function (curId) {
      let prevId = curId - 1
      if (prevId < 0) prevId = this.maxId
      return prevId
    },
    _initSlot: function () {
      let randId = this._getRandomInt(0, this.maxId)
      this.$refs.perks[randId].setAttribute('style', 'transform: translateY(0px);')
      this.roll = this.rollTemplate
      this.roll.disappearingPerk.id = randId
      this.roll.appearingPerk.id = this._previousPerkId(randId)
    },
    _getRandomInt: function (min, max) {
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random() * (max - min + 1)) + min
    },
    _isBlurred: function () {
      // if (this.roll.speed > this.roll.maxSpeed * 0.25) {
      //   return '/img/perkslotsSurv_blur.png'
      // }
      return '/img/perkslotsSurv.png'
    }
  },
  mounted: function () {
    this._initSlot()
  }
}
</script>

<style lang="scss" scoped>
    @import '../design/perkData';

    .slot {
        height: #{$item-width}px;
        width: #{$item-width}px;
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
