<template>
    <div>
        <div class="slotMachineContainer" :class="[{blurred: blurReel && speed > 50}]">
            <div class="perk-slot" ref="slots" :key="key" v-for="(id, key) in ids"
                 :style="styleTransform(id, key)"
                 :class="['slot'+type+'-'+id, classHidden(key)]"></div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'PerkSlot',
  data: function () {
    return {
      slots: [],
      blurReel: false,
      reelMoving: false,
      reelSteps: [],
      breakPointSpeedUp: null,
      breakPointSpeedDown: null,
      currentStep: null,
      inViewPort: null
    }
  },
  props: {
    type: {
      type: String,
      required: true
    },
    ids: {
      type: Array,
      required: false,
      default: function () {
        return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58]
      }
    }
  },
  computed: {},
  methods: {
    roll: function (moveToId) {
      this.reelSteps = this.ids.length * 3 + this._getIdKey(moveToId) // spin reel 3 times, land on desired perk. One step per image, each step will have multiple frames
      this.breakPointSpeedUp = Math.floor(this.reelSteps / 4) // The first 25% will be used to speed up
      this.breakPointSpeedDown = this.reelSteps - this.breakPointSpeedUp // the last 25% will be used to speed down
      this.currentStep = 1
      if (this.inViewPort === null) {
        this.inViewPort = 0
      }
      window.requestAnimationFrame(this._moveReel)
    },
    _moveReel: function () {
      // set bottom element at top
      let bottomEl = this.inViewPort - 1
      if (bottomEl < 0) {
        bottomEl = this.ids.length - 1
      }
      this.slots[bottomEl].translate = (bottomEl * 256 * -1) - 256
      this.inViewPort++ /// TODO ...
      console.info(this.inViewPort)
    },
    _acceleration: function (step) {
      return Math.pow(2, step)
    },
    _getIdKey (id) {
      for (let i = 0; i < this.ids.length; i++) {
        if (this.ids[i] === id) { return i }
      }
      return false
    },
    _getTranslate: function (key) {
      if (!this.slots[key]) {
        return 0
      }
      return this.slots[key].translate
    },
    getHidden: function (key) {
      if (!this.slots[key]) {
        return false
      }
      return !this.slots[key].visible
    },
    styleTransform: function (id, key) {
      return {
        'transform': `translateY(${this._getTranslate(key)}px)`
      }
    },
    classHidden: function (key) {
      return {
        'hidden': this.getHidden(key)
      }
    }
  },
  mounted: function () {
    for (let key = 0, len = this.ids.length; key < len; key++) {
      this.slots.push({ 'id': this.ids[key], 'translate': 0, 'visible': true })
    }
    let preload = new Image()
    preload.src = `/img/perkslots${this.type}_blur.png`
  },
  encodeConfig: function (confString) { // For future use
    // eslint-disable-next-line
            return LZString.compressToEncodedURIComponent(confString)
  },
  decodeConfig: function (comp) { // For future use
    // eslint-disable-next-line
            return LZString.decompressFromEncodedURIComponent(comp)
  }
}
</script>

<style lang="scss" scoped>
    @import "../design/main";
    @import "../design/slots/Kill";
    @import "../design/slots/Surv";

    .slotMachineContainer {
        width: 256px;
        height: 256px;
        /*overflow: hidden;*/
        position: relative;
        float: left;
    }

    .hidden {
        opacity: 0;
        transition: none;
    }

    .perk-slot {
        height: 256px;
    }
</style>
