export default {
  name: 'GlobalSelectionSwitch',

  props: {
    itemLength: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },

  computed: {
    cssProps () {
      return {
        '--slotBg': `url('/img/icon_perk.png') 0 ${(128 * -1) + 'px'}`,
        '--elementlength': this.itemLength + 'px'
      }
    },
    text () {
      return this.$t('snippets.globalSwitchText').toUpperCase()
    }
  }
}

