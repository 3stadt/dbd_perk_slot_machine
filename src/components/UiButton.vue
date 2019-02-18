<template>
    <router-link class="ui-button" :class="classes" v-if="routerLink" :to="routerLink">
        <span v-if="hasIconSlot" class="ui-button__icon">
            <slot name="icon"></slot>
        </span>
        <slot></slot>
    </router-link>
    <button v-else class="ui-button" :class="classes">
        <span v-if="hasIconSlot" class="ui-button__icon">
            <slot name="icon"></slot>
        </span>
        <slot></slot>
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

<style lang="scss">
    @import "../design/main";

    .ui-button {
        display: inline-block;
        padding: 4px 35px;
        color: $color-text;
        background-color: $color-primary;
        border: 0 none;
        text-decoration: none;
        border-radius: $border-radius-default;
        font-family: $font-family-default;
        font-size: $font-size-default;
        text-transform: uppercase;
        overflow: hidden;
        white-space: nowrap;
        text-align: center;

        .ui-button__icon {
            display: block;
            width: 50px;

            img {
                display: block;
                max-width: 100%;
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
</style>
