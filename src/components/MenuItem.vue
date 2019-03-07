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
                <div @click.stop.prevent="$emit('resetPerks', type)">
                    <GlobalSelectionSwitch />
                </div>
                <PerkSwitch :key="perk.index" @change="perkChange" v-for="perk in perks" :perk="perk" :name="translation[perk.name]" :type="type"/>
            </div>
            <div v-if="infoCondition" class="perk-overview__box">
                <InfoText/>
            </div>
        </transition>
    </div>
</template>

<script>
import PerkSwitch from './PerkSwitch.vue'
import GlobalSelectionSwitch from './GlobalSelectionSwitch.vue'
import InfoText from './InfoText.vue'

export default {
  name: 'MenuItem',

  props: {
    translation: {
      type: Object,
      default () {
        return {}
      }
    },
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
    InfoText,
    GlobalSelectionSwitch
  },

  computed: {
    classes () {
      return {
        'is--collapsed': this.isCollapsed
      }
    },
    cssProps () {
      let idx = this.perk.index
      return {
        '--slotBg': `url('/img/${this.imageFileName}') 0 ${idx === 0 ? 0 : (128 * idx * -1) + 'px'}`
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
        color: white;
    }

    .perk-switch {
        background-color: rgba(0, 0, 0, 0.2);
        transition: all .15s ease-in-out;
        transform: scale(1);
        padding: 5%;
        height: 100%;

        @media screen and (min-width: 992px) {
            &:hover {
                background-color: rgba(0, 0, 0, 0.4);
            }
        }

        .perk-switch__name {
            position: relative;
            text-align: center;
        }

        .perk-switch__image-container {
            position: relative;
            height: 128px;
        }

        .perk-switch__image {
            position: absolute;
            left: 50%; /* centers the left edge of the sprite */
            margin-left: -64px; /* this centers the actual sprite--this is half the sprite-window width. if you don't do this, the left edge will be centered instead of the center of the sprite.  */
            width: 128px; /* set window to see sprite through */
            height: 128px; /* set window to see sprite through */
            background: var(--slotBg); /* custom property is generated in cssProps() and bound in dov with class card*/
        }
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
