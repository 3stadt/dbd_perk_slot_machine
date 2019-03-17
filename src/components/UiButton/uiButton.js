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
