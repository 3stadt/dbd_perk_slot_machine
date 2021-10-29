<template>
  <div class="perk-config home">
    <video playsinline autoplay muted loop id="bg-vid">
      <source src="/splash_bg.mp4" type="video/mp4" />
    </video>
    <div class="language-switch overview__box">
      <img
        @click="changeLang('en')"
        src="img/flags/united-kingdom.svg"
        width="32"
        height="32"
        alt="english"
        class="flag"
      />
      <img
        @click="changeLang('de')"
        src="img/flags/germany.svg"
        width="32"
        height="32"
        alt="deutsch"
        class="flag"
      />
      <img
        @click="changeLang('fr')"
        src="img/flags/france.svg"
        width="32"
        height="32"
        alt="français"
        class="flag"
      />
      <img
        @click="changeLang('es')"
        src="img/flags/spain.svg"
        width="32"
        height="32"
        alt="español"
        class="flag"
      />
      <img
        @click="changeLang('ja')"
        src="img/flags/japan.svg"
        width="32"
        height="32"
        alt="日本語"
        class="flag"
      />
    </div>
    <div class="tooltip">
      <img
        @click="toggleColoredIcons()"
        :src=artistPalette
        width="32"
        height="32"
        alt="toggle colored icons"
        class="flag"
      />
      <span class="tooltiptext">{{ $t("snippets.toggleColoredIcons") }}</span>
    </div>
    <div class="latest-update">{{ $t("snippets.update") }}</div>
    <MenuItem type="Info" :title="$t('snippets.info')" />
    <MenuItem
      :perks="perks.survivors"
      @resetPerks="resetPerks"
      @change="change"
      type="Survivor"
      :title="$t('snippets.survPerkConfig')"
    />
    <MenuItem
      :perks="perks.killers"
      @resetPerks="resetPerks"
      @change="change"
      type="Killer"
      :title="$t('snippets.killPerkConfig')"
    />
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
    toggleColoredIcons () {
      const { ...q } = this.$route.query
      q.color = q.color === '1' ? '0' : '1'
      this.artistPalette = q.color === '1' ? 'img/artist-palette.svg' : 'img/artist-palette-bw.svg'
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
          // eslint-disable-next-line
          console.warn(`changes to unknown perk type ${type}`);
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
    document
      .getElementsByTagName('body')[0]
      .setAttribute('style', 'overflow-y: scroll;')
  },
  data () {
    const { ...q } = this.$route.query
    const initialArtistPalette = q.color === '1' ? 'img/artist-palette.svg' : 'img/artist-palette-bw.svg'

    const survivorsRaw = Object.keys(this.perksSHD.frames)
    const survivors = []
    // make sure array keys match the ids in file name. TODO maybe make sure no key is reassigned because of naming issues
    for (let i = 0, sLen = survivorsRaw.length; i < sLen; i++) {
      const perkFileName = survivorsRaw[i]
      const key = Number(perkFileName.substr(0, 2))
      survivors[key] = {
        index: key,
        name: perkFileName,
        checked: true
      }
    }

    const killersRaw = Object.keys(this.perksKHD.frames)
    const killers = []
    // make sure array keys match the ids in file name. TODO maybe make sure no key is reassigned because of naming issues
    for (let i = 0, kLen = killersRaw.length; i < kLen; i++) {
      const perkFileName = killersRaw[i]
      const key = Number(perkFileName.substr(0, 2))
      killers[key] = {
        index: key,
        name: perkFileName,
        checked: true
      }
    }
    return {
      artistPalette: initialArtistPalette,
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
#bg-vid {
  display: none;
}
@media (min-width: 700px) {
  #bg-vid {
    display: inherit;
    position: fixed;
    z-index: -99;
    object-fit: cover; // this is the key
    width: 100%;
    height: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    filter: brightness(50%);

    &::-webkit-media-controls {
      display: none !important;
    }
  }
}
.language-switch {
  .flag {
    margin: 0 0.3rem;
    cursor: pointer;
  }

  padding: 0.3rem 0.15rem 0 0.15rem;
  margin: 0.5rem 0;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background-color: rgba(0, 0, 0, 0.2);
  display: inline-block;
  align-items: center;
}

.latest-update {
  padding: 0.3rem;
  margin: 0.5rem 1rem;
  display: inline-block;
  background-color: rgba(255, 0, 0, 0.5);
  border: 3px solid rgba(255, 255, 255, 0.5);
  color: white;
  transform: rotate(-5deg);
}

@media screen and (max-width: 1055px) {
  .language-switch {
    margin-left: 1rem;
  }
}
/* Tooltip container */
.tooltip {
  margin-left: 0.5rem;
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black; /* If you want dots under the hoverable text */
}

/* Tooltip text */
.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;

  /* Position the tooltip text - see examples below! */
  position: absolute;
  z-index: 1;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
  visibility: visible;
}
</style>

<style lang="scss">
@import "../../public/sprites/surv-css.css";
@import "../../public/sprites/kill-css.css";
</style>
