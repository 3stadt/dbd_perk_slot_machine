<template>
    <div class="perk-switch" :style="cssProps">
        <div class="perk-switch__name">{{perk.name}}</div>
        <div class="perk-switch__image-container">
            <div class="perk-switch__image" :class="[perk.cls]" role="img"></div>
        </div>
        <input type="checkbox" :checked="perk.checked">
    </div>
</template>

<script>
export default {
  name: 'PerkSwitch',
  props: {
    perk: {
      type: Object,
      default () {
        return []
      }
    }
  },

  computed: {
    cssProps () {
      let idx = this.perk.index
      return {
        '--slotBg': `url('/img/perkslotsSurvSmall.png') 0 ${idx === 0 ? 0 : (128 * idx * -1) + 'px'}`
      }
    }
  }
}
</script>

<style lang="scss">
    @import "../design/main";

    .perk-switch {
        border: 1px solid rgba(255, 255, 255, 0.2);
        background-color: rgba(0, 0, 0, 0.2);
        transition: all .15s ease-in-out;
        transform: scale(1);

        &:hover {
            transform: scale(1.1);
            // background-color: $color-primary;
            border-color: rgba(255, 255, 255, 0.8);
            box-shadow: 0 0 5px rgba(255, 255, 255, 0.6);
            background-color: rgba(0, 0, 0, 0.4);
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

        input[type="checkbox"] {
            visibility: hidden;
        }
    }
</style>
