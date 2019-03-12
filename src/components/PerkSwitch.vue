<template>
    <div :class="['perk-switch-container', {'perk-checked': this.currentPerk.checked}]">
        <div class="perk-switch" @click="onClickPerk">
            <UiCheckbox v-model="currentPerk.checked" class="perk-checkbox"
                        :class="[{'dim-image': !this.currentPerk.checked}]"></UiCheckbox>
            <div class="perk-switch__image-container">
                <div class="perk-switch__image" :class="['_'+currentPerk.name, spriteType, {'dim-image': !currentPerk.checked}]"
                     role="img"></div>
            </div>
            <div>
                <div class="perk-switch__name" :class="[{'dim-image': !this.currentPerk.checked}]">{{ name.toUpperCase() }}</div>
            </div>
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
    spriteType: function () {
      return {
        'sprite-survivor': this.type === 'Survivor',
        'sprite-killer': this.type === 'Killer'
      }
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

    .perk-checkbox {
        position: absolute;
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
        filter: brightness(0.5);
    }

    .perk-checked {
        border-image: url(/img/border_white.png) 10% round;
    }

    .perk-switch {
        background-color: rgba(0, 0, 0, 0.2);
        transition: all .15s ease-in-out;
        transform: scale(1);
        padding: 5%;
        height: 100%;
        width: 100%;
        text-align: center;

        @media screen and (min-width: 992px) {
            &:hover {
                background-color: rgba(0, 0, 0, 0.4);
            }
        }

        .perk-switch__name {
            position: relative;
            text-align: center;
            text-overflow: ellipsis;
            overflow: hidden;
            word-wrap: break-word
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
        }
    }
</style>
