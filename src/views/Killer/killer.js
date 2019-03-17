import PixiPerkSlot from '../../components/PixiPerkSlot/PixiPerkSlot.vue'
import rand from '@/lib/randomize'
import vp from '@/lib/viewport'

export default {
  name: 'Killer',
  components: {
    'perkslot0': PixiPerkSlot,
    'perkslot1': PixiPerkSlot,
    'perkslot2': PixiPerkSlot,
    'perkslot3': PixiPerkSlot
  },
  props: {
    lang: {
      type: String,
      required: true
    },
    color: {
      type: Boolean,
      default: false,
      required: false
    },
    sids: {
      type: Array,
      default: function () {
        return []
      },
      required: false
    },
    kids: {
      type: Array,
      default: function () {
        return []
      },
      required: false
    },
    perksKHD: {
      type: Object,
      required: true
    }
  },
  data: function () {
    let killersRaw = Object.keys(this.perksKHD.frames)
    let killers = []
    // make sure array keys match the ids in file name. TODO maybe make sure no key is reassigned because of naming issues
    for (let i = 0, kLen = killersRaw.length; i < kLen; i++) {
      let perkFileName = killersRaw[i]
      let key = Number(perkFileName.substr(0, 2))
      killers[key] = {
        'index': key,
        'name': perkFileName
      }
    }
    return {
      perkData: killers,
      hintVisible: true,
      elementLength: vp.getElementLength(),
      lastRoll: null
    }
  },
  methods: {
    randomize: function () {
      if (!this.lastRoll) this.lastRoll = [this.perkData[0], this.perkData[0], this.perkData[0], this.perkData[0]]
      let random = rand.getRandomData(4, this.kids, this.perkData, this.lastRoll)
      this.hintVisible = false

      this.lastRoll = random
      this.$refs.perkslot0.rollWheel(random[0])
      this.$refs.perkslot1.rollWheel(random[1])
      this.$refs.perkslot2.rollWheel(random[2])
      this.$refs.perkslot3.rollWheel(random[3])
    }
  },
  mounted: function () {
    if (this.$route.query.streammode === '1') {
      document.getElementsByTagName('body')[0].setAttribute('style', 'background:none;padding:0;margin:0')
      const hints = document.getElementsByClassName('hint-text')
      if (hints.length > 0) {
        hints[0].setAttribute('style', 'display:none;')
      }
      const containers = document.getElementsByClassName('container')
      if (containers.length > 1) {
        containers[1].setAttribute('style', 'padding:0;max-width:none;')
      }
      const headers = document.getElementsByClassName('header')
      if (headers.length > 0) {
        headers[0].setAttribute('style', 'display:none;')
      }
      const corners = document.getElementsByClassName('github-corner')
      if (corners.length > 0) {
        corners[0].setAttribute('style', 'display:none;')
      }
    }
    const obs = this.$route.query.obs
    let as = parseInt(this.$route.query.autostart)
    if (!isNaN(as) && as > 0 && obs !== '1') {
      window.setTimeout(() => {
        this.randomize()
      }, as)
    }
    if (obs === '1' && window.obsstudio) {
      const delayedRand = (visible) => {
        if (!visible) return
        window.setTimeout(() => {
          this.randomize()
        }, !isNaN(as) && as > 0 ? as : 1000)
      }
      if (window.obsstudio.linuxbrowser || Number(window.obsstudio.pluginVersion.slice(0, 4)) > 1.29) {
        window.obsstudio.onActiveChange = delayedRand
      } else {
        window.obsstudio.onVisibilityChange = delayedRand
      }
    }
    window.addEventListener('orientationchange', function () {
      let o = window.orientation
      if (o === 90 || o === -90 || o === 0) {
        window.location.reload()
      }
    })
  }
}
