<template>
    <div class="perk-switch-container" :style="cssProps">
        <div class="perk-switch">
            <div class="perk-switch__image-container"></div>
            <div class="perk-switch__image"></div>
            <div class="perk-switch__name" v-html="switchText"></div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'GlobalSelectionSwitch',

  props: {
    itemLength: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },

  mounted () {
    const name = document.getElementById('name_' + this.type)
    const bb = name.getBBox()
    if (bb.width <= this.itemLength) return
    name.parentElement.setAttribute('viewBox', '0 0 ' + bb.width + ' ' + bb.height)
  },

  computed: {
    cssProps () {
      return {
        '--slotBg': `url('/img/icon_perk.png') 0 ${(128 * -1) + 'px'}`,
        '--elementlength': this.itemLength + 'px'
      }
    },
    switchText () {
      return `<svg width="${this.itemLength}" height="26"><text id="${'name_' + this.type}" x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white">${this.$t('snippets.globalSwitchText').toUpperCase()}</text></svg>`
    }
  }
}
</script>

<style lang="scss" scoped>
    @import "../design/main";

    .perk-switch-container {
        position: relative;
        margin: 0 auto;
        width: var(--elementlength, 128px);
        height: var(--elementlength, 128px);

        .perk-switch {
            position: absolute;
            border: 1px solid rgba(255, 255, 255, 0.2);
            background-color: rgba(0, 0, 0, 0.2);
            background-image: url(/img/img_blood.png);
            transition: all .15s ease-in-out;
            transform: scale(1);
            background-size: cover;
            width: var(--elementlength, 128px);
            height: var(--elementlength, 128px);

            @media screen and (min-width: 992px) {
                &:hover {
                    background-color: rgba(0, 0, 0, 0.4);
                }
            }

            .perk-switch__name {
                position: absolute;
                top: var(--elementlength, 128px);
                width: var(--elementlength, 128px);
                height: 26px;
            }

            .perk-switch__image-container {
                top: 0;
                position: relative;
                width: var(--elementlength, 128px);
                height: var(--elementlength, 128px);
            }

            .perk-switch__image {
                position: absolute;
                top: 0;
                width: var(--elementlength, 100px);
                height: var(--elementlength, 100px);
                background: var(--slotBg);
            }
        }
    }
</style>
