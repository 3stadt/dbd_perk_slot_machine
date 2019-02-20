<template>
    <div>
        <div class="slotMachineContainer">
            <div class="perk-slot" :id="'slot-'+id" ref="slots" :key="key" v-for="(id, key) in ids"
                 :style="getBgImage(id, key)"
                 :class="['smoothAnimation', hidden(key)]"></div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'PerkSlot',
  data: function () {
    return {
      slots: [],
      active: false,
      inViewPort: 0,
      lKey: -1,
      speed: 0,
      maxSpeed: 150,
      acceleration: 2,
      currentShifting: 0,
      animationStart: null,
      animationCount: 0
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
    roll: function (animationCount) {
      if (this.active) return
      this.animationCount = animationCount
      window.requestAnimationFrame(this._doRoll)
    },
    _doRoll: function (timestamp) {
      console.info('_doRoll')
      if (!this.animationStart) {
        this.animationStart = timestamp
      }
      let progress = timestamp - this.animationStart
      if (progress === 0) {
        // set bottom element at top
        this.animationCount--
        this.lKey = this.inViewPort - 1
        if (this.inViewPort === 0) {
          this.lKey = this.slots.length - 1
        }
        this.slots[this.lKey].visible = false
        this.slots[this.lKey].translate = (this.lKey * 256 * -1) - 256
      }
      window.requestAnimationFrame(this._moveSlots)
    },
    _moveSlots: function (timestamp) {
      // let progress = timestamp - this.animationStart
      console.info('_moveSlots')
      if (this.speed + this.acceleration < this.maxSpeed) {
        this.speed += this.acceleration
      }
      let speed = this.speed
      this.active = true
      this.slots[this.lKey].visible = true
      if (this.currentShifting + 10 > 256) {
        speed = 256 - this.currentShifting
      }
      for (let key = 0, len = this.slots.length; key < len; key++) {
        this.slots[key].translate += speed
      }
      this.currentShifting += speed
      if (this.currentShifting === 256) {
        this.inViewPort = this.inViewPort === this.slots.length ? 0 : this.lKey
        this.animationCount--
        this.animationStart = null
        this.currentShifting = 0
        if (this.animationCount > 0) {
          window.requestAnimationFrame(this._doRoll)
        } else {
          this.speed = 0
          this.active = false
        }
        return
      }
      window.requestAnimationFrame(this._doRoll)
    },
    getTranslate: function (key) {
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
    getBgImage: function (id, key) {
      let pos = 256 * id * -1 + 'px'
      return {
        'background': `url("/img/perkslots${this.type}${this.active && this.speed > 50 ? '_blur' : ''}.png") 0 ${pos}`,
        'transform': `translateY(${this.getTranslate(key)}px)`
      }
    },
    hidden: function (key) {
      return {
        'hidden': this.getHidden(key)
      }
    }
  },
  mounted: function () {
    for (let key = 0, len = this.ids.length; key < len; key++) {
      this.slots.push({ 'id': this.ids[key], 'translate': 0, 'visible': true })
    }
  }
}
</script>

<style lang="scss" scoped>
    @import "../design/main";

    .slotMachineContainer {
        width: 256px;
        height: 256px;
        overflow: hidden;
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
