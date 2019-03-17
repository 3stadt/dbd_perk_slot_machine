import vp from '@/lib/viewport'
import PerkSwitch from '../PerkSwitch/PerkSwitch.vue'
import GlobalSelectionSwitch from '../GlobalSelectionSwitch/GlobalSelectionSwitch.vue'
import InfoText from '../InfoText/InfoText.vue'

export default {
  name: 'MenuItem',

  props: {
    perks: {
      type: Array,
      default () {
        return []
      }
    },
    type: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },

  data () {
    let elLen = vp.getElementLength()
    if (elLen > 128) elLen = 128
    return {
      isCollapsed: false,
      elementLength: elLen
    }
  },

  components: {
    PerkSwitch,
    InfoText,
    GlobalSelectionSwitch
  },

  computed: {
    classes () {
      return {
        'is--collapsed': this.isCollapsed
      }
    },
    cssProps () {
      let idx = this.perk.index
      return {
        '--slotBg': `url('/img/${this.imageFileName}') 0 ${idx === 0 ? 0 : (128 * idx * -1) + 'px'}`
      }
    },
    perkCondition () {
      return this.perks.length > 0 && this.isCollapsed
    },
    infoCondition () {
      return this.type === 'Info' && this.isCollapsed
    }
  },

  methods: {
    translate (name) {
      return this.$t(`perks.${this.type.toLowerCase()}.${name}`)
    },
    toggleCollapsed () {
      this.isCollapsed = !this.isCollapsed
    },
    perkChange (perk) {
      for (let i = 0; i < this.perks.length; i++) {
        if (perk.index === this.perks[i].index) {
          this.perks[i].checked = perk.checked
          this.$emit('change', this.type)
          return
        }
      }
    }
  }
}

