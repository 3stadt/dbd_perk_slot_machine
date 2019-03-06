<template>
    <div class="perk-config home">
        <MenuItem type="Info" title="/ Attribution" />
        <MenuItem :perks="perks.survivors" @resetPerks="resetPerks" @change="change" type="Survivor" title="Perk Configuration" />
        <MenuItem :perks="perks.killers" @resetPerks="resetPerks" @change="change" type="Killer" title="Perk Configuration" />
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
    col: {
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
            this.$router.push({ path: this.$route.path, query: { kids: this.kids.join(','), col: this.col ? '1' : '0' } })
            return
          }
          for (let i = 0; i < this.perks.survivors.length; i++) {
            this.perks.survivors[i].checked = false
          }
          this.$router.push({ path: this.$route.path, query: { sids: 'none', kids: this.kids.join(','), col: this.col ? '1' : '0' } })
          break
        case 'Killer':
          if (this.kids.length > 0 && this.kids[0] === 'none') {
            for (let i = 0; i < this.perks.killers.length; i++) {
              this.perks.killers[i].checked = true
            }
            this.$router.push({ path: this.$route.path, query: { sids: this.sids.join(','), col: this.col ? '1' : '0' } })
            return
          }
          for (let i = 0; i < this.perks.killers.length; i++) {
            this.perks.killers[i].checked = false
          }
          this.$router.push({ path: this.$route.path, query: { kids: 'none', sids: this.sids.join(','), col: this.col ? '1' : '0' } })
          break
      }
    },
    change (type) {
      let perkExclusion = false
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
          if (!perkExclusion) return
          this.$router.push({ path: this.$route.path, query: { sids: chosenPerks.join(','), kids: this.kids.join(','), col: this.col ? '1' : '0' } })
          break
        case 'Killer':
          for (let i = 0; i < this.perks.killers.length; i++) {
            if (this.perks.killers[i].checked) {
              chosenPerks.push(this.perks.killers[i].index)
              continue
            }
            perkExclusion = true
          }
          if (!perkExclusion) return
          this.$router.push({ path: this.$route.path, query: { sids: this.sids.join(','), kids: chosenPerks.join(','), col: this.col ? '1' : '0' } })
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
  },
  data () {
    return {
      perks: {
        survivors: require('./../resources/perks-survivor.json'),
        killers: require('./../resources/perks-killer.json')
      }
    }
  }
}
</script>
