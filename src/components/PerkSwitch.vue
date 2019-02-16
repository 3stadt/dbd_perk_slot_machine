<template>
    <div class="perk-switch" :style="cssProps">
        <UiCheckbox class="perk-checkbox"></UiCheckbox>
        <div class="perk-switch__image-container">
            <div class="perk-switch__image" :class="[perk.cls]" role="img"></div>
        </div>
        <div class="perk-switch__name">{{perk.name}}</div>
    </div>
</template>

<script>
import UiCheckbox from './UiCheckbox'
export default {
  name: 'PerkSwitch',
  components: { UiCheckbox },
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
  }
}
</script>

<style lang="scss">
    @import "../design/main";
    .perk-checkbox {
        margin: 5px
    }

    .perk-switch {
        border: 1px solid $color-border;
        border-radius: $border-radius-default;
        background: lighten($color-background, 8%);
        transition: all .15s ease-in-out;
        transform: scale(1);

        &:hover {
            transform: scale(1.1);
            background-color: $color-primary;
            cursor: pointer;
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
    }
</style>
