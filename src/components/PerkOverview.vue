<template>
    <div>
        <h1>{{type}} Perk Configuration</h1>
        <div v-bind:key="perk.index" v-for="perk in perks">
            <PerkSwitch v-bind:perk="perk"/>
        </div>
    </div>
</template>

<script>
import PerkSwitch from './PerkSwitch.vue'

export default {
  name: 'PerkOverview',
  props: ['perks', 'type'],
  components: {
    PerkSwitch
  }
}
</script>

<style scoped>

</style>
