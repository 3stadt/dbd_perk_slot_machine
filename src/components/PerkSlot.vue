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
      inViewPort: 0
    }
  },
  props: {
    speed: {
      type: Number,
      required: false,
      default: function () {
        return 1
      }
    },
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
    roll: function (times) {
      this.doRoll(times, this)
    },
    doRoll: function (times, me) {
      times--
      window.requestAnimationFrame(function () {
        let lKey = me.inViewPort - 1
        if (me.inViewPort === 0) {
          lKey = me.slots.length - 1
        }
        me.slots[lKey].visible = false
        me.slots[lKey].translate = (lKey * 256 * -1) - 256
        window.requestAnimationFrame(function () {
          me.active = true
          me.slots[lKey].visible = true
          for (let key = 0, len = me.slots.length; key < len; key++) {
            me.slots[key].translate += 256
          }
          me.inViewPort = me.inViewPort === me.slots.length ? 0 : lKey
          if (times > 0) {
            window.requestAnimationFrame(function () {
              me.doRoll(times, me)
            })
          } else {
            me.active = false
          }
        })
      })
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
        'background': `url("/img/perkslots${this.type}${this.active ? '_blur' : ''}.png") 0 ${pos}`,
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

    .smoothAnimation {
        transition: transform .2s ease-in-out;
    }

    .hidden {
        opacity: 0;
        transition: none;
    }

    .perk-slot {
        height: 256px;
    }
</style>
