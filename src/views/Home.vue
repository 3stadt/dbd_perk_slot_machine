<template>
    <div class="perk-config home">
        <div class="language-switch">
            <img @click="changeLang('de')" src="img/flags/germany.svg" width="32" height="32" alt="deutsch" class="flag">
            <img @click="changeLang('en')" src="img/flags/united-kingdom.svg" width="32" height="32" alt="english" class="flag">
        </div>
        <MenuItem type="Info" :title="$t('snippets.info')" />
        <MenuItem :perks="perks.survivors" @resetPerks="resetPerks" @change="change" type="Survivor" :title="$t('snippets.survPerkConfig')" />
        <MenuItem :perks="perks.killers" @resetPerks="resetPerks" @change="change" type="Killer" :title="$t('snippets.killPerkConfig')" />
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
    changeLang (lang) {
      const { ...q } = this.$route.query
      q.lang = lang
      this.$i18n.locale = lang
      this.$router.push({ path: this.$route.path, query: q })
    },
    resetPerks (type) {
      const { ...query } = this.$route.query
      switch (type) {
        case 'Survivor':
          if (this.sids.length > 0 && this.sids[0] === 'none') {
            for (let i = 0; i < this.perks.survivors.length; i++) {
              this.perks.survivors[i].checked = true
            }
            delete query.sids
            this.$router.push({ path: this.$route.path, query: query })
            return
          }
          for (let i = 0; i < this.perks.survivors.length; i++) {
            this.perks.survivors[i].checked = false
          }
          query.sids = 'none'
          this.$router.push({ path: this.$route.path, query: query })
          break
        case 'Killer':
          if (this.kids.length > 0 && this.kids[0] === 'none') {
            for (let i = 0; i < this.perks.killers.length; i++) {
              this.perks.killers[i].checked = true
            }
            delete query.kids
            this.$router.push({ path: this.$route.path, query: query })
            return
          }
          for (let i = 0; i < this.perks.killers.length; i++) {
            this.perks.killers[i].checked = false
          }
          query.kids = 'none'
          this.$router.push({ path: this.$route.path, query: query })
          break
      }
    },
    change (type) {
      let perkExclusion = false
      const { ...query } = this.$route.query
      const chosenPerks = []
      switch (type) {
        case 'Survivor':
          for (let i = 0; i < this.perks.survivors.length; i++) {
            if (this.perks.survivors[i].checked) {
              chosenPerks.push(this.perks.survivors[i].index)
              continue
            }
            perkExclusion = true
          }
          if (!perkExclusion) {
            this.$router.push({ path: this.$route.path, query: query })
            return
          }
          query.sids = chosenPerks.join(',')
          this.$router.push({ path: this.$route.path, query: query })
          break
        case 'Killer':
          for (let i = 0; i < this.perks.killers.length; i++) {
            if (this.perks.killers[i].checked) {
              chosenPerks.push(this.perks.killers[i].index)
              continue
            }
            perkExclusion = true
          }
          if (!perkExclusion) {
            this.$router.push({ path: this.$route.path, query: query })
            return
          }
          query.kids = chosenPerks.join(',')
          this.$router.push({ path: this.$route.path, query: query })
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
    let survivorsRaw = Object.keys(this.perksSHD.frames)
    let survivors = []
    // make sure array keys match the ids in file name. TODO maybe make sure no key is reassigned because of naming issues
    for (let i = 0, sLen = survivorsRaw.length; i < sLen; i++) {
      let perkFileName = survivorsRaw[i]
      let key = Number(perkFileName.substr(0, 2))
      survivors[key] = {
        'index': key,
        'name': perkFileName,
        'checked': true
      }
    }

    let killersRaw = Object.keys(this.perksKHD.frames)
    let killers = []
    // make sure array keys match the ids in file name. TODO maybe make sure no key is reassigned because of naming issues
    for (let i = 0, kLen = killersRaw.length; i < kLen; i++) {
      let perkFileName = killersRaw[i]
      let key = Number(perkFileName.substr(0, 2))
      killers[key] = {
        'index': key,
        'name': perkFileName,
        'checked': true
      }
    }
    return {
      langs: ['en', 'de'],
      perks: {
        survivors: survivors,
        killers: killers
      }
    }
  }
}
</script>

<style lang="scss" scoped>
    .language-switch {
        .flag {
            margin-right: 1rem;
        }
    }

    @media screen and (max-width: 1055px) {
        .language-switch {
            margin-left: 1rem;
        }
    }

</style>

<style lang="scss">
    @import "../../public/sprites/surv-css.css";
    @import "../../public/sprites/kill-css.css";
</style>
