
export default {
  name: 'PerkSwitch',

  props: {
    name: {
      type: String,
      required: true
    },
    perk: {
      type: Object,
      default () {
        return []
      }
    },
    type: {
      type: String,
      required: true
    },
    itemLength: {
      type: Number,
      required: true
    }
  },

  data () {
    return {
      currentPerk: {}
    }
  },

  created () {
    this.currentPerk = this.perk
  },

  mounted () {
    this.calcSvgViewBox()
  },

  watch: {
    text: function () {
      this.calcSvgViewBox()
    }
  },

  computed: {
    spriteType: function () {
      return {
        'sprite-survivor': this.type === 'Survivor',
        'sprite-killer': this.type === 'Killer'
      }
    },
    text () {
      // split at whitespace after 10 chars
      let text = this.name.replace(/.{10}\S*\s+/g, '$&@').split(/\s+@/)
      return `<tspan x="50%">${text.join('</tspan> <tspan x="50%" dy="1rem">')}</tspan>`
    }
  },

  methods: {
    calcSvgViewBox () {
      // Animation frames are necessary because otherwise the width is calculated before the text has changed
      window.requestAnimationFrame(() => {
        this.$refs.svg.removeAttribute('viewBox')
      })
      window.requestAnimationFrame(() => {
        const bb = this.$refs.svgText.getBBox()
        if (bb.width <= this.itemLength) return
        this.$refs.svg.setAttribute('viewBox', '0 0 ' + bb.width + ' ' + bb.height)
      })
    },
    onClickPerk () {
      this.currentPerk.checked = !this.currentPerk.checked
      this.$emit('change', this.currentPerk)
    }
  }
}

