<template>
    <router-link class="ui-button" :class="classes" v-if="routerLink" :to="routerLink">
        <div :class="'ui-blood--' + this.direction">
            <div :class="'ui-button__limiter--' + this.direction">

                <span v-if="hasIconSlot" class="ui-icon">
                    <slot name="icon"></slot>
                </span>

                <span class="ui-text">
                    <slot></slot>
                </span>
            </div>
        </div>
    </router-link>
    <button v-else class="ui-button" :class="classes">
        <div :class="'ui-blood--' + this.direction">
            <div :class="'ui-button__limiter--' + this.direction">
                <span v-if="hasIconSlot" class="ui-icon">
                    <slot name="icon"></slot>
                </span>

                <span class="ui-text">
                    <slot></slot>
                </span>
            </div>
        </div>
    </button>
</template>

<script>
  export default {
    name: 'UiButton',

    props: {
      routerLink: {
        type: Object,
        default () {
          return {}
        },
        required: false
      },
      direction: {
        type: String,
        default: 'left',
        required: true
      }
    },

    computed: {
      classes () {
        console.log(this.direction)
        return {
          'ui-button--icon': this.hasIconSlot,
          'ui-direction--right': this.direction === 'right',
          'ui-direction--left': this.direction === 'left'
        }
      },

      hasIconSlot () {
        return !!this.$slots.icon
      }
    }
  }
</script>

<style lang="scss" scoped>
    @import "../design/main";

    .ui-button {
        display: inline-block;
        color: $color-text;
        right: 0;
        width: 250px;
        padding: 7px 2px;
        background-size: 250px;
        background-repeat: no-repeat;
        background-position: center var(--elementlength);
        flex-shrink: 0;
        position: relative;
        text-decoration: none;

        @media screen and (max-width: 650px) {
            width: 75px;
            height: 75px;
        }

        .ui-icon {
            display: none;

            @media screen and (max-width: 650px) {
                display: inline-block;
                position: absolute;
                top: 45%;
                left: 50%;
                margin-top: -20px;
                margin-left: -20px;
            }
        }
    }

    .ui-button__limiter--left,
    .ui-button__limiter--right {
        left: 0;
        margin: 3px 10px;
        background-image: url(/img/button_main_limiter_nav.png);
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center left;

        @media screen and (max-width: 650px) {
            background: 0 none;
            margin: 0;
        }
    }

    .ui-button__limiter--right {
        background-position: center right;
    }

    .ui-direction--right {
        right:0;
    }

    .ui-direction--left {
        left: 0;
    }

    .ui-direction--right {
        text-align: right;
        background-image: url(/img/button_background_nav.png);

        .ui-text {
            margin-right: 15px;
            display: block;

            border-radius: $border-radius-default;
            font-family: $font-family-default;
            font-size: $font-size-default;
            text-transform: uppercase;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            width: 200px;

            @media screen and (max-width: 650px) {
                display: none;
            }
        }

        @media screen and (max-width: 650px) {
                background-image: url(/img/icon_menu.png);
                background-size: contain;
                background-repeat: no-repeat;
        }
    }

    .ui-blood--right {
        margin-left: auto;

        @media screen and (min-width: 650px) {
            &:hover {
                background-image: url(/img/blood_mark.png);
                background-size: contain;
                background-position: right;
                background-repeat: no-repeat;
            }
        }
    }

    .ui-direction--left {
        background-image: url(/img/button_background_nav_reverse.png);

        .ui-text {
            margin-left: 15px;
            text-decoration: none;
            border-radius: $border-radius-default;
            font-family: $font-family-default;
            font-size: $font-size-default;
            text-transform: uppercase;
            overflow: hidden;
            white-space: nowrap;

            @media screen and (max-width: 650px) {
                display: none;
            }
        }

        @media screen and (max-width: 650px) {
                background-image: url(/img/icon_menu.png);
                background-size: contain;
                background-repeat: no-repeat;
        }
    }

    .ui-blood--left {
        left: 0;

        @media screen and (min-width: 650px) {
            &:hover {
                background-image: url(/img/blood_mark.png);
                background-size: contain;
                background-position: left;
                background-repeat: no-repeat;
            }
        }
    }
</style>
