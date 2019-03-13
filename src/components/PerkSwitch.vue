<template>
    <div class="perk-switch-container" @click="onClickPerk">
        <div class="perk-switch">
            <div :class="['_'+currentPerk.name, spriteType, 'perk-switch__image']"></div>
            <div :class="[{'perk-checked': currentPerk.checked}]"></div>
            <div class="perk-switch__name">
                <svg :width="itemLength" ref="svg" height="26"><text ref="svgText" :id="'name_' + currentPerk.name" x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white">{{ name }}</text></svg>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'PerkSwitch',

  props: {
    name: {
      type: String,
      required: true
    },
    perk: {
      type: Object,
      default () {
        return []
      }
    },
    type: {
      type: String,
      required: true
    },
    itemLength: {
      type: Number,
      required: true
    }
  },

  data () {
    return {
      currentPerk: {}
    }
  },

  created () {
    this.currentPerk = this.perk
  },

  mounted () {
    this.calcSvgViewBox()
  },

  watch: {
    name: function () {
      this.calcSvgViewBox()
    }
  },

  computed: {
    spriteType: function () {
      return {
        'sprite-survivor': this.type === 'Survivor',
        'sprite-killer': this.type === 'Killer'
      }
    }
  },

  methods: {
    calcSvgViewBox () {
      // Animation frames are necessary because otherwise the width is calculated before the text has changed
      window.requestAnimationFrame(() => {
        this.$refs.svg.removeAttribute('viewBox')
      })
      window.requestAnimationFrame(() => {
        const bb = this.$refs.svgText.getBBox()
        if (bb.width <= this.itemLength) return
        this.$refs.svg.setAttribute('viewBox', '0 0 ' + bb.width + ' ' + bb.height)
      })
    },
    onClickPerk () {
      this.currentPerk.checked = !this.currentPerk.checked
      this.$emit('change', this.currentPerk)
    }
  }
}
</script>

<style lang="scss" scoped>
    @import "../design/main";

    .perk-switch-container {
        position: relative;
        margin: 0 auto;
        transform: translate(0, 0);
        background-image: url(/img/perkBg-md.png);
        background-size: cover;
        width: var(--elementlength, 128px);
        height: var(--elementlength, 128px);

        .perk-switch {
            position: absolute;
            top: 0;
            left: 0;
            width: var(--elementlength, 128px);
            height: var(--elementlength, 128px);
            z-index: 100;

            @media screen and (min-width: 992px) {
                &:not(.perk-checked):hover {
                    background-image: url(/img/perkswitch_hover-md.png);
                    background-size: cover;
                    cursor: pointer;
                }
            }
        }

        .perk-checked {
            background-image: url(/img/perkswitch_selected-md.png);
            background-size: cover;
            width: var(--elementlength, 128px);
            height: var(--elementlength, 128px);
            z-index: 150;
        }

        .perk-switch__name {
            position: absolute;
            top: var(--elementlength, 128px);
            left: 0;
            width: var(--elementlength, 128px);
            height: 26px;
        }

        .perk-switch__image {
            position: absolute;
            top: 0;
            left: 0;
            width: var(--elementlength, 128px);
            height: var(--elementlength, 128px);
        }
    }
</style>
