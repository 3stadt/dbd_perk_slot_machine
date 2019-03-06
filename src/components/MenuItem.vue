<template>
    <div class="perk-overview" :class="classes">
        <h2 class="perk-overview__toggle" @click="toggleCollapsed">
            <span class="perk-overview__icon-holder">
                <img :src="`/img/icon_${type.toLowerCase()}.png`" :alt="type">
            </span>
            <span class="perk-overview__title">{{type}} {{title}}</span>
        </h2>
        <transition name="fade">
            <div v-if="perkCondition" class="perk-overview__grid">
                <a href="#" @click.stop.prevent="$emit('resetPerks', type)">Switch all Perks on/off</a>
                <PerkSwitch :key="perk.index" @change="perkChange" v-for="perk in perks" :perk="perk" :type="type" />
            </div>
            <div v-if="infoCondition" class="perk-overview__box">
                <InfoText />
            </div>
        </transition>
    </div>
</template>

<script>
import PerkSwitch from './PerkSwitch.vue'
import InfoText from './InfoText.vue'

export default {
  name: 'MenuItem',

  props: {
    perks: {
      type: Array,
      default () {
        return []
      }
    },
    type: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      isCollapsed: false
    }
  },

  components: {
    PerkSwitch,
    InfoText
  },

  computed: {
    classes () {
      return {
        'is--collapsed': this.isCollapsed
      }
    },
    perkCondition () {
      return this.perks.length > 0 && this.isCollapsed
    },
    infoCondition () {
      return this.type === 'Info' && this.isCollapsed
    }
  },

  methods: {
    toggleCollapsed () {
      this.isCollapsed = !this.isCollapsed
    },
    perkChange (perk) {
      for (let i = 0; i < this.perks.length; i++) {
        if (perk.index === this.perks[i].index) {
          this.perks[i].checked = perk.checked
          this.$emit('change', this.type)
          return
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
    @import "../design/main";

    a {
        color:white;
    }

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

        .perk-overview__box {
            margin-top: 30px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            background-color: rgba(0, 0, 0, 0.2);
            padding: 10px 20px;
            display: flex;
            align-items: center;
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
