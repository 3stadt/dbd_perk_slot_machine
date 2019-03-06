<template>
    <div class="perk-switch-container" @click="onClickPerk">
        <div class="perk-switch">
            <div :class="['_'+currentPerk.name, spriteType, 'perk-switch__image']" :style="cssProps"></div>
            <div :class="[{'perk-checked': currentPerk.checked}]" :style="cssProps"></div>
            <div class="perk-switch__name" v-html="nameBadge"></div>
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
      default: '',
      required: true
    },
    itemLength: {
      type: Number,
      default: 128,
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
    const name = document.getElementById('name_' + this.currentPerk.name)
    const bb = name.getBBox()
    if (bb.width <= this.itemLength) return
    name.parentElement.setAttribute('viewBox', '0 0 ' + bb.width + ' ' + bb.height)
  },

  computed: {
    spriteType: function () {
      return {
        'sprite-survivor': this.type === 'Survivor',
        'sprite-killer': this.type === 'Killer'
      }
    },

    nameBadge () {
      return `<svg width="${this.itemLength}" height="26"><text id="${'name_' + this.currentPerk.name}" x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white">${this.currentPerk.name}</text></svg>`
    }
  },

  methods: {
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
            background: var(--slotBg);
        }
    }
</style>
