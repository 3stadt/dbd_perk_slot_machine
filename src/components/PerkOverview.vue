<template>
    <div class="perk-overview" :class="classes">
        <h2 class="perk-overview__toggle" @click="toggleCollapsed">{{type}} Perk Configuration</h2>
        <div v-if="isCollapsed" class="perk-overview__grid">
            <PerkSwitch :key="perk.index" v-for="perk in perks" :perk="perk" :type="type" />
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

  data () {
    return {
      isCollapsed: false
    }
  },

  components: {
    PerkSwitch
  },

  computed: {
    classes () {
      return {
        'is--collapsed': this.isCollapsed
      }
    }
  },

  methods: {
    toggleCollapsed () {
      this.isCollapsed = !this.isCollapsed
    }
  }
}
</script>

<style lang="scss">
    @import "../design/main";

    .perk-overview {
        margin-bottom: 30px;

        .perk-overview__toggle {
            border: 1px dashed $color-border;
            padding: 30px;
            font-size: 30px;
            font-weight: 300;
            cursor: pointer;

            &:hover {
                background-color: lighten($color-background, 10%);
            }
        }

        .perk-overview__grid {
            border-bottom: 1px dashed $color-border;
            border-left: 1px dashed $color-border;
            border-right: 1px dashed $color-border;
            padding: 30px;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            grid-gap: 30px;
        }
    }
</style>
