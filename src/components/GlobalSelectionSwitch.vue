<template>
    <div class="perk-switch-container" :style="cssProps">
        <div class="perk-switch">
            <div class="perk-switch__image-container">
                <div class="perk-switch__image"
                     role="img"></div>
            </div>
            <div class="perk-switch__name">{{ $t("snippets.globalSwitchText").toUpperCase() }}</div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'GlobalSelectionSwitch',

  computed: {
    cssProps () {
      return {
        '--slotBg': `url('/img/icon_haste.png') 0 ${(128 * -1) + 'px'}`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
    @import "../design/main";

    .perk-switch-container {
        padding: 5%;
    }

    .perk-switch {
        border: 1px solid rgba(255, 255, 255, 0.2);
        background-color: rgba(0, 0, 0, 0.2);
        background-image: url(/img/img_blood.png);
        transition: all .15s ease-in-out;
        transform: scale(1);
        padding: 5%;
        height: 100%;
        background-size: cover;

        @media screen and (min-width: 992px) {
            &:hover {
                background-color: rgba(0, 0, 0, 0.4);
            }
        }

        .perk-switch__name {
            position: relative;
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
