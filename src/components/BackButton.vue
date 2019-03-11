<template>
    <router-link class="ui-button" :class="classes" v-if="routerLink" :to="routerLink">
        <div class="ui-blood">
            <div class="ui-button__limiter">

                <span v-if="hasIconSlot" class="ui-icon">
                    <slot name="icon"></slot>
                </span>

                <span class="ui-text">
                    <slot></slot>
                </span>
            </div>
        </div>
    </router-link>
    <button v-else class="ui-button ui-blood" :class="classes">
        <div class="ui-blood">
            <div class="ui-button__limiter">

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
    name: 'BackButton',

    props: {
      routerLink: {
        type: Object,
        default () {
          return {}
        },
        required: false
      }
    },

    computed: {
      classes () {
        return {
          'ui-button--icon': this.hasIconSlot
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
        background-image: url(/img/button_background_back.png);
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center left;
        padding: 7px 2px;
        position: relative;
        text-decoration: none;

        border: 0 none;

        @media screen and (max-width: 650px) {
            background-image: url(/img/icon_menu.png);
            background-size: contain;
            background-repeat: no-repeat;

            width: 75px;
            height: 75px;
        }

        .ui-icon {
            display: none;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-top: -20px;
            margin-left: -20px;

            @media screen and (max-width: 650px) {
                display: inline-block;
            }
        }

        .ui-text {
            margin-left: 25px;
            text-decoration: none;
            border-radius: $border-radius-default;
            font-family: $font-family-default;
            font-size: $font-size-default;
            text-transform: uppercase;
            overflow: hidden;
            white-space: nowrap;
            text-align: left;

            @media screen and (max-width: 650px) {
                display: none;
            }
        }

        .ui-blood {
            @media screen and (min-width: 650px) {
                &:hover {
                    background-image: url(/img/blood_mark.png);
                    background-size: contain;
                    background-position: left;
                    background-repeat: no-repeat;
                }
            }
        }

        &.ui-button--icon {
            display: flex;
            align-items: center;
            padding-left: 15px;

            .ui-button__icon {
                margin-right: 15px;
            }
        }
    }

    .ui-button__limiter {
        left: 0;
        margin: 4px;
        background-image: url(/img/back-icon.png);
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center left;

        @media screen and (max-width: 650px) {
            background: 0 none;
        }
    }
</style>
