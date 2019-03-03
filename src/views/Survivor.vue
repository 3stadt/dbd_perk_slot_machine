<template>
    <div>
        <div>
            <perkslot0 @reRollRequested="randomize"
                   ref="perkslot0"
                   type="Surv"
                   :elementLength="elementLength"
                   :colorized="col"
        />
            <perkslot1 @reRollRequested="randomize"
                   ref="perkslot1"
                   type="Surv"
                   :elementLength="elementLength"
                   :colorized="col"
        />
            <perkslot2 @reRollRequested="randomize"
                   ref="perkslot2"
                   type="Surv"
                   :elementLength="elementLength"
                   :colorized="col"
        />
            <perkslot3 @reRollRequested="randomize"
                   ref="perkslot3"
                   type="Surv"
                   :elementLength="elementLength"
                   :colorized="col"
        />
        </div>
        <div v-if="hintVisible" class="hint-text">
            <img src="/img/icon_shortinfo.png" slot="icon" alt="Survivor" class="info-icon">
            <span>{{ message }}</span>
        </div>
    </div>
</template>

<script>
import PixiPerkSlot from '../components/PixiPerkSlot'
import rand from '@/lib/randomize'
import vp from '@/lib/viewport'

export default {
  name: 'Survivor',
  components: {
    'perkslot0': PixiPerkSlot,
    'perkslot1': PixiPerkSlot,
    'perkslot2': PixiPerkSlot,
    'perkslot3': PixiPerkSlot
  },
  data: function () {
    return {
      perkData: require('./../resources/perks-survivor.json'),
      col: !!this.$route.query.color,
      message: 'Click on any perk slot to start',
      hintVisible: true,
      elementLength: vp.getElementLength(),
      lastRoll: []
    }
  },
  methods: {
    randomize: function () {
      if (!this.lastRoll) this.lastRoll = [this.perkData[0], this.perkData[0], this.perkData[0], this.perkData[0]]
      let random = rand.getRandomData(4, this.$route.query.kids, this.perkData, this.lastRoll)
      this.hintVisible = false

      this.lastRoll = random
      this.$refs.perkslot0.rollWheel(random[0])
      this.$refs.perkslot1.rollWheel(random[1])
      this.$refs.perkslot2.rollWheel(random[2])
      this.$refs.perkslot3.rollWheel(random[3])
    }
  },
  mounted: function () {
    window.addEventListener('orientationchange', function () {
      let o = window.orientation
      if (o === 90 || o === -90 || o === 0) {
        window.location.reload()
      }
    })
  }
}
</script>

<style lang="scss">
    .hint-text {
        margin: 30px 30%;
        border: 1px solid rgba(255, 255, 255, 0.2);
        background-color: rgba(0, 0, 0, 0.2);
        padding: 10px 20px;
        align-items: center;
        justify-content: center;
        display: flex;

        @media screen and (max-width: 650px) {
            margin: 0 10%;
        }
    }
    .info-icon {
        width: 30px;
        margin: 0 10px;
        height: auto;
    }
</style>
