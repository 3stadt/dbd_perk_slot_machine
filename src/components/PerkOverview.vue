<template>
    <div class="perk-overview" :class="classes">
        <h2 class="perk-overview__toggle" @click="toggleCollapsed">
            <span class="perk-overview__icon-holder">
                <img :src="`/img/icon_${type.toLowerCase()}.png`" :alt="type">
            </span>
            <span class="perk-overview__title">{{type}} Perk Configuration</span>
        </h2>
        <transition name="fade">
            <div v-if="isCollapsed" class="perk-overview__grid">
                <PerkSwitch :key="perk.index" v-for="perk in perks" :perk="perk" :type="type" />
            </div>
        </transition>
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
            border: 1px solid rgba(255, 255, 255, 0.2);
            background-color: rgba(0, 0, 0, 0.2);
            padding: 10px 20px;
            font-size: 25px;
            font-weight: 500;
            cursor: pointer;
            text-transform: uppercase;
            display: flex;
            align-items: center;

            &:hover {
                border: 1px solid rgba(255, 255, 255, 0.3);
                background-color: rgba(0, 0, 0, 0.3);
            }
        }

        .perk-overview__icon-holder {
            display: block;
            margin-right: 20px;
            width: 120px;
            flex-shrink: 0;

            img {
                display: block;
                max-width: 100%;
            }
        }

        @media screen and (max-width: 500px) {
            .perk-overview__toggle {
                font-size: 18px;
            }

            .perk-overview__icon-holder {
                width: 50px;
            }
        }

        .perk-overview__grid {
            padding: 30px 0;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            grid-gap: 30px;
        }

        .fade-enter-active,
        .fade-leave-active {
            transition: all .2s ease-in-out;
            transform: translateY(0);
            opacity: 1;
        }

        .fade-enter,
        .fade-leave-to {
            transform: translateY(-50px);
            opacity: 0;
        }
    }
</style>
