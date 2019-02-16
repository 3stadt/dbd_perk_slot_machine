<template>
    <div class="perk-overview">
        <h1>{{type}} Perk Configuration</h1>
        <div class="perk-overview__grid">
            <PerkSwitch :key="perk.index" v-for="perk in perks" :perk="perk" />
        </div>
    </div>
</template>

<script>
import PerkSwitch from './PerkSwitch.vue'

export default {
  name: 'PerkOverview',
  props: {
    perks: {
      type: Array,
      default () {
        return []
      },
      required: true
    },
    type: {
      type: String,
      default: '',
      required: true
    }
  },
  components: {
    PerkSwitch
  }
}
</script>

<style lang="scss">
    .perk-overview {
        .perk-overview__grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            grid-gap: 30px;
        }
    }
</style>
