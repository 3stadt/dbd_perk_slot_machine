<template>
    <div style="display: inline-block">
        <div class="slot">
            <img class="perk" src="/img/perkBg.png" alt="">
            <img class="perk" ref="placeholder" :src="'/img/placeholder_' + type + '.png'" alt="">
            <template v-for="perk in perkData">
                <img :key="perk.index" ref="perks" class="perk" :class="[ 'perk'+type+'-'+ perk.index ]" :src="_getBg()" alt="">
            </template>
        </div>
        <div class="perk-name" :class="{visible: perkNameVisible}">{{ perkName }}</div>
    </div>
</template>

<script>
export default {
  name: 'PerkSlot',
  data: function () {
    let perkData = this.type === 'Surv' ? require('./../resources/perks-survivor.json') : require('./../resources/perks-killer.json')
    let maxId = perkData.length - 1
    return {
      maxId: maxId,
      elementHeight: 256,
      perkData: perkData,
      perkName: '',
      firstRoll: true,
      perkNameVisible: false,
      rollTemplate: {
        active: false,
        startTime: null,
        currentPerksStartTime: null,
        speed: 0.8, // how many seconds a perk needs to travel through the viewport
        minimalSpeed: this.speed / 4,
        targetPerkReveal: false, // used to show the final target perk
        targetPerkId: 0,
        rollDuration: 2, // how many seconds before revealing/stopping
        blurPerks: false,
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
  props: {
    type: {
      type: String,
      default: '',
      required: true
    }
  },
  methods: {
    rollWheel: function (targetId, rollDuration, speed) {
      if (!this.roll) {
        this.roll = this.rollTemplate
      }
      if (this.roll.active) {
        return false
      }
      this.roll.active = true
      this.roll.startTime = null
      this.roll.currentPerksStartTime = null
      this.roll.targetPerkId = targetId
      this.perkNameVisible = false
      this.perkName = this._getTargetPerkName(targetId)
      if (rollDuration) this.roll.rollDuration = rollDuration * 1000
      if (speed) this.roll.speed = speed
      window.requestAnimationFrame(this._doRollWheel)
      return true
    },
    _getTargetPerkName: function (targetPerkId) {
      for (let i = 0, pLen = this.perkData.length; i < pLen; i++) {
        if (targetPerkId === this.perkData[i].index) {
          return this.perkData[i].name
        }
      }
      return 'target perk not found'
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
        // Animation is finished! Cleanup.
        if (roll.targetPerkReveal && roll.appearingPerk.id === roll.targetPerkId) {
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
          this.perkNameVisible = true
          return
        }
        // reset disappearing perk image, on first roll just hide placeholder
        if (!this.firstRoll) {
          this.$refs.perks[roll.disappearingPerk.id].removeAttribute('style')
        } else {
          this.firstRoll = false
          this.$refs.placeholder.setAttribute('style', 'opacity: 0;')
        }

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

      // Calculate if the images should be blurred. Occurs between first and last quarter of animation
      this.blurPerks = animationTime > this.roll.rollDuration / 4 && animationTime < this.rollDuration - (this.roll.rollDuration / 4)

      // Calculate new positions according to elapsed animation time and speed.
      // Speed determines how much time a perk should be visible in the viewport.
      let speed = roll.speed
      if (animationTime < this.roll.rollDuration / 2) { // Ramp speed up in first half
        speed = speed * ((this.roll.rollDuration / 2) / animationTime)
      } else if (animationTime > this.roll.rollDuration / 2) { // Slow down in second half, but keep speed for the final reveal
        speed = speed / ((this.roll.rollDuration / 2) / animationTime)
        if (speed < this.minimalSpeed) {
          speed = this.minimalSpeed
        }
      }
      let currentPerkAnimationTime = timestamp - roll.currentPerksStartTime
      let stepPixels = this.elementHeight * (currentPerkAnimationTime / (speed * 1000))

      // Position is different for the disappearing perk and the appearing one, by 1 elem height
      roll.appearingPerk.position = this.elementHeight * -1 + stepPixels
      roll.disappearingPerk.position = stepPixels

      // apply the new position
      this.$refs.perks[roll.appearingPerk.id].setAttribute('style', 'transform: translateY(' + roll.appearingPerk.position + 'px);')
      if (this.firstRoll) {
        this.$refs.placeholder.setAttribute('style', 'object-position: 0 ' + roll.disappearingPerk.position + 'px;')
      } else {
        this.$refs.perks[roll.disappearingPerk.id].setAttribute('style', 'transform: translateY(' + roll.disappearingPerk.position + 'px);')
      }

      // Animation not finished yet, we need another frame.
      window.requestAnimationFrame(this._doRollWheel)
    },
    _previousPerkId: function (curId) {
      let prevId = curId - 1
      if (prevId < 0) prevId = this.maxId
      return prevId
    },
    _getBg: function () {
      if (this.blurPerks) {
        return '/img/perkslots' + this.type + '_blur.png'
      }
      return '/img/perkslots' + this.type + '.png'
    }
  }
}
</script>

<style lang="scss" scoped>
    @import '../design/perkData';

    .perk-name {
        text-align: center;
        background: rgba(0, 0, 0, 0.5);
        margin: 0 10px 0 10px;
        opacity: 0;
    }

    .visible {
        opacity: 1;
    }

    .slot {
        height: #{$item-width}px;
        width: #{$item-width}px;
        position: relative;
        overflow: hidden;
        clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
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

    @for $i from 0 through $nSurv {
        $pos: $i * $item-width * -1;
        .perkSurv-#{$i} {
            object-position: 0 #{$pos}px;
            transform: translateY(-#{$item-width}px);
        }
    }

    @for $i from 0 through $nKill {
        $pos: $i * $item-width * -1;
        .perkKill-#{$i} {
            object-position: 0 #{$pos}px;
            transform: translateY(-#{$item-width}px);
        }
    }
</style>
