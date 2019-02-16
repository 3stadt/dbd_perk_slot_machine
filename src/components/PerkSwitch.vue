<template>
    <div class="perk-switch" :style="cssProps">
        <div class="name">{{perk.name}}</div>
        <div class="perk-switch__image" :class="[perk.cls]" role="img"></div>
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
    @import "../deisgn/main";

    .perk-switch {
        height: 160px;
        border: 1px solid $color-border;
        border-radius: $border-radius-default;
        position: relative;

        .perk-switch__image {
            position: absolute;
            top: 20px;
            left: 50%; /* centers the left edge of the sprite */
            margin-left: -64px; /* this centers the actual sprite--this is half the sprite-window width. if you don't do this, the left edge will be centered instead of the center of the sprite.  */
            width: 128px; /* set window to see sprite through */
            height: 128px; /* set window to see sprite through */
            background: var(--slotBg); /* custom property is generated in cssProps() and bound in dov with class card*/
        }
    }
</style>
