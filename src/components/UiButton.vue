<template>
    <router-link class="button" v-if="routerLink" :to="routerLink">
        <slot></slot>
    </router-link>
    <button v-else class="button">
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
  }
}
</script>

<style lang="scss">
    @import "../deisgn/main";

    .button {
        display: inline-block;
        padding: 5px 20px;
        color: $color-text;
        background-color: $color-primary;
        border: 0 none;
        text-decoration: none;
        border-radius: $border-radius-default;
        font-family: $font-family-default;
        font-size: $font-size-default;
        text-align: center;
    }
</style>
