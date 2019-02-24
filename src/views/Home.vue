<template>
    <div class="home">
        <MenuItem type="Info" title="/ Attribution" />
        <MenuItem :perks="perks.survivors" type="Survivor" title="Perk Configuration" />
        <MenuItem :perks="perks.killers" type="Killer" title="Perk Configuration" />
    </div>
</template>

<script>
import MenuItem from '../components/MenuItem.vue'

export default {
  name: 'home',
  components: {
    MenuItem
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
