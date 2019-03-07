<template>
    <div class="perk-config home">
        <MenuItem type="Info" title="/ Attribution" />
        <MenuItem :perks="perks.survivors" :translation="perks.translationsSurv" @resetPerks="resetPerks" @change="change" type="Survivor" title="Perk Configuration" />
        <MenuItem :perks="perks.killers" :translation="perks.translationsKill" @resetPerks="resetPerks" @change="change" type="Killer" title="Perk Configuration" />
    </div>
</template>

<script>
import MenuItem from '../components/MenuItem.vue'

export default {
  name: 'home',
  components: {
    MenuItem
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
    },
    perksSHD: {
      type: Object,
      required: true
    }
  },
  methods: {
    resetPerks (type) {
      switch (type) {
        case 'Survivor':
          if (this.sids.length > 0 && this.sids[0] === 'none') {
            for (let i = 0; i < this.perks.survivors.length; i++) {
              this.perks.survivors[i].checked = true
            }
            this.$router.push({ path: this.$route.path, query: { kids: this.kids.join(','), color: this.color ? '1' : '0', lang: this.lang } })
            return
          }
          for (let i = 0; i < this.perks.survivors.length; i++) {
            this.perks.survivors[i].checked = false
          }
          this.$router.push({ path: this.$route.path, query: { sids: 'none', kids: this.kids.join(','), color: this.color ? '1' : '0', lang: this.lang } })
          break
        case 'Killer':
          if (this.kids.length > 0 && this.kids[0] === 'none') {
            for (let i = 0; i < this.perks.killers.length; i++) {
              this.perks.killers[i].checked = true
            }
            this.$router.push({ path: this.$route.path, query: { sids: this.sids.join(','), color: this.color ? '1' : '0', lang: this.lang } })
            return
          }
          for (let i = 0; i < this.perks.killers.length; i++) {
            this.perks.killers[i].checked = false
          }
          this.$router.push({ path: this.$route.path, query: { kids: 'none', sids: this.sids.join(','), color: this.color ? '1' : '0', lang: this.lang } })
          break
      }
    },
    change (type) {
      let perkExclusion = false
      let params = { color: this.color ? '1' : '0', lang: this.lang }
      const chosenPerks = []
      switch (type) {
        case 'Survivor':
          if (this.kids.length > 0) {
            params.kids = this.kids.join(',')
          }
          for (let i = 0; i < this.perks.survivors.length; i++) {
            if (this.perks.survivors[i].checked) {
              chosenPerks.push(this.perks.survivors[i].index)
              continue
            }
            perkExclusion = true
          }
          if (!perkExclusion) {
            this.$router.push({ path: this.$route.path, query: params })
            return
          }
          params.sids = chosenPerks.join(',')
          this.$router.push({ path: this.$route.path, query: params })
          break
        case 'Killer':
          if (this.sids.length > 0) {
            params.sids = this.sids.join(',')
          }
          for (let i = 0; i < this.perks.killers.length; i++) {
            if (this.perks.killers[i].checked) {
              chosenPerks.push(this.perks.killers[i].index)
              continue
            }
            perkExclusion = true
          }
          if (!perkExclusion) {
            this.$router.push({ path: this.$route.path, query: params })
            return
          }
          params.kids = chosenPerks.join(',')
          this.$router.push({ path: this.$route.path, query: params })
          break
        default:
          console.warn(`changes to unknown perk type ${type}`)
      }
    }
  },
  mounted: function () {
    if (this.sids.length > 0) {
      for (let i = 0; i < this.perks.survivors.length; i++) {
        if (this.sids.indexOf(`${this.perks.survivors[i].index}`) === -1) {
          this.perks.survivors[i].checked = false
        }
      }
    }
    if (this.kids.length > 0) {
      for (let i = 0; i < this.perks.killers.length; i++) {
        if (this.kids.indexOf(`${this.perks.killers[i].index}`) === -1) {
          this.perks.killers[i].checked = false
        }
      }
    }
    document.getElementsByTagName('body')[0].setAttribute('style', 'overflow-y: scroll;')
  },
  data () {
    let translationsKill = {}
    let translationsSurv = {}
    try {
      translationsKill = require(`./../../assets/translations/perksKill${this.lang}.json`)
    } catch (err) {
      console.warn(err)
      translationsKill = require(`./../../assets/translations/perksKillEn.json`)
    }
    try {
      translationsSurv = require(`./../../assets/translations/perksSurv${this.lang}.json`)
    } catch (err) {
      console.warn(err)
      translationsSurv = require(`./../../assets/translations/perksSurvEn.json`)
    }
    let survivorsRaw = Object.keys(this.perksSHD.frames)
    let survivors = []
    // make sure array keys match the ids in file name. TODO maybe make sure no key is reassigned because of naming issues
    for (let i = 0, sLen = survivorsRaw.length; i < sLen; i++) {
      let s = survivorsRaw[i]
      let k = Number(s.substr(0, 2))
      survivors[k] = {
        'index': i,
        'name': s,
        'checked': true
      }
    }

    let killersRaw = Object.keys(this.perksKHD.frames)
    let killers = []
    // make sure array keys match the ids in file name. TODO maybe make sure no key is reassigned because of naming issues
    for (let i = 0, kLen = killersRaw.length; i < kLen; i++) {
      let s = killersRaw[i]
      let k = Number(s.substr(0, 2))
      killers[k] = {
        'index': i,
        'name': s,
        'checked': true
      }
    }
    return {
      perks: {
        survivors: survivors,
        killers: killers,
        translationsKill: translationsKill,
        translationsSurv: translationsSurv
      }
    }
  }
}
</script>

<style lang="scss">
    @import "../../public/sprites/surv-css.css";
    @import "../../public/sprites/kill-css.css";
</style>
