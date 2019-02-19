<template>
    <div :class="['perk-switch-container', {'perk-checked': this.currentPerk.checked}]" :style="cssProps">
        <div class="perk-switch" @click="onClickPerk" :style="cssProps">
            <UiCheckbox v-model="currentPerk.checked" class="perk-checkbox"></UiCheckbox>
            <div class="perk-switch__image-container">
                <div class="perk-switch__image" :class="[currentPerk.cls, {'dim-image': !this.currentPerk.checked}]"
                     role="img"></div>
            </div>
            <div class="perk-switch__name">{{ currentPerk.name }}</div>
        </div>
    </div>
</template>

<script>
import UiCheckbox from './UiCheckbox'

export default {
  name: 'PerkSwitch',

  components: {
    UiCheckbox
  },

  props: {
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

  computed: {
    imageFileName () {
      return this.type === 'Survivor' ? 'perkslotsSurvSmall.png' : 'perkslotsKillSmall.png'
    },

    cssProps () {
      let idx = this.perk.index
      return {
        '--slotBg': `url('/img/${this.imageFileName}') 0 ${idx === 0 ? 0 : (128 * idx * -1) + 'px'}`
      }
    }
  },

  methods: {
    // @TODO: Just a workaround to check checkbox when clicking whole box
    onClickPerk () {
      this.currentPerk.checked = !this.currentPerk.checked
    }
  }
}
</script>

<style lang="scss" scoped>
    @import "../design/main";

    .perk-checkbox {
        margin: 5px
    }

    .perk-switch-container {
        border: 10px solid rgba(255, 255, 255, 0.2);
        border-image: url(/img/border_black.png) 10% round;

        @media screen and (min-width: 992px) {
            &:hover {
                transform: scale(1.2);
                border-image: url(/img/border_red.png) 10% round;
                cursor: pointer;
            }
        }

    }

    .dim-image {
        filter: brightness(0.7);
    }

    .perk-checked {
        border-image: url(/img/border_white.png) 10% round;
    }

    .perk-switch {
        background-color: rgba(0, 0, 0, 0.2);
        transition: all .15s ease-in-out;
        transform: scale(1);
        padding-top: 1%;
        height: 100%;

        @media screen and (min-width: 992px) {
            &:hover {
                background-color: rgba(0, 0, 0, 0.4);
            }
        }

        .perk-switch__name {
            padding: 10px;
            text-align: center;
        }

        .perk-switch__image-container {
            position: relative;
            height: 128px;
        }

        .perk-switch__image {
            position: absolute;
            left: 50%; /* centers the left edge of the sprite */
            margin-left: -64px; /* this centers the actual sprite--this is half the sprite-window width. if you don't do this, the left edge will be centered instead of the center of the sprite.  */
            width: 128px; /* set window to see sprite through */
            height: 128px; /* set window to see sprite through */
            background: var(--slotBg); /* custom property is generated in cssProps() and bound in dov with class card*/
        }

        input[type="checkbox"] {
            visibility: hidden;
        }

    }
</style>
