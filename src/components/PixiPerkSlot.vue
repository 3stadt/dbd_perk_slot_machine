<template>
    <div class="slot" ref="slot" :style="cssProps"></div>
</template>

<script>
import * as PIXI from 'pixi.js'

export default {
  name: 'PixiPerkSlot',
  data: function () {
    const perkData = this.type === 'Surv' ? require('./../resources/perks-survivor.json') : require('./../resources/perks-killer.json')
    const maxId = perkData.length - 1
    return {
      appStage: null,
      loader: null,
      resources: null,
      Sprite: null,
      Container: null,
      Text: null,
      reel: null,
      tweening: [],
      reelContainer: null,
      bgContainer: null,
      placeholderContainer: null,
      perkTextures: null,
      maxId: maxId,
      perkData: perkData,
      perkName: '',
      targetPerkId: null
    }
  },
  computed: {
    cssProps () {
      return {
        '--elementlength': this.elementLength,
        '--containerpadding': `${this.elementLength}px`
      }
    }
  },
  props: {
    type: {
      type: String,
      required: true
    },
    colorized: {
      type: Boolean,
      default: false
    },
    elementLength: {
      type: Number,
      required: true
    }
  },
  methods: {
    _reelComplete: function () {
      this.active = false
      const style = new PIXI.TextStyle({
        fontWeight: 'bold',
        fontSize: 16 * (1 / (256 / this.elementLength)),
        fontFamily: 'Arial',
        fill: '#FFFFFF',
        align: 'center',
        wordWrap: true,
        wordWrapWidth: this.elementLength * 0.967
      })

      const tCont = new this.Container({ height: this.elementLength, width: this.elementLength })

      const perkText = new this.Text(this.targetPerkId.name, style)
      perkText.x = this.reelContainer.width / 2
      perkText.y = this.elementLength * 0.91
      perkText.anchor.x = 0.5

      const textBoxBorder = this.elementLength * 0.012
      const textBoxY = this.elementLength * 0.9
      const textBoxWidth = this.elementLength * 0.967
      const textBoxHeight = this.elementLength * 0.1
      const mask = new PIXI.Graphics({
        height: this.elementLength,
        width: this.elementLength
      }).beginFill(0x000000, 0.5).drawRect(textBoxBorder, textBoxY, textBoxWidth, textBoxHeight).endFill()

      tCont.addChild(mask)
      tCont.addChild(perkText)

      this.perkName = tCont
      this.reelContainer.addChild(this.perkName)
    },
    rollWheel: function (targetId) {
      if (this.active) return
      this.targetPerkId = targetId
      this.placeholderContainer.visible = false
      this.reelContainer.visible = true
      this.tweening = []
      this.active = true
      this.reelContainer.removeChild(this.perkName)
      this._tweenTo({
        object: this.reel,
        property: 'position',
        target: (this.perkData.length + 1) - targetId.index,
        time: 4000,
        easing: this.backout(0.6),
        onchange: null,
        oncomplete: this._reelComplete
      })

      return true
    },
    lerp: function (a1, a2, t) {
      return a1 * (1 - t) + a2 * t
    },
    backout: function (amount) {
      return (t) => {
        return (--t * t * ((amount + 1) * t + amount) + 1)
      }
    },
    /**
    *
    * @param config {object, property, target, time, easing, onchange, oncomplete}
    * @returns {{propertyBeginValue: *, change: *, property: *, start: number, time: *, complete: *, easing: *, object: *, target: *}}
    * @private
    */
    _tweenTo: function (config) {
      const { object, property, target, time, easing, onchange, oncomplete } = config
      const tween = {
        object: object,
        property: property,
        propertyBeginValue: object[property],
        target: target,
        easing: easing,
        time: time,
        change: onchange,
        complete: oncomplete,
        start: Date.now()
      }

      this.tweening.push(tween)
      return tween
    }
  },
  mounted () {
    this.appStage = new PIXI.Application(this.elementLength, this.elementLength, { transparent: true })
    this.$refs.slot.appendChild(this.appStage.view)
    this.loader = new PIXI.loaders.Loader()
    this.resources = PIXI.loader.resources
    this.Sprite = PIXI.Sprite
    this.Container = PIXI.Container
    this.Text = PIXI.Text
    this.loader.add('atlas', `/sprites/${this.type.toLowerCase()}${this.colorized ? 'color' : ''}-hd.json`)
    this.loader.load((loader, resources) => {
      this.perkTextures = resources.atlas.textures
      this.reelContainer = new this.Container()
      this.placeholderContainer = new this.Container()
      this.bgContainer = new this.Container()
      this.reelContainer.visible = false
      this.reelContainer.interactive = true
      this.placeholderContainer.interactive = true
      this.placeholderContainer.on('pointerdown', () => {
        this.$emit('reRollRequested')
      })
      this.reelContainer.on('pointerdown', () => {
        this.$emit('reRollRequested')
      })

      const reel = {
        container: this.reelContainer,
        symbols: [],
        position: 0,
        previousPosition: 0,
        blur: new PIXI.filters.BlurFilter()
      }
      reel.blur.blurX = 0
      reel.blur.blurY = 0
      this.reelContainer.filters = [reel.blur]

      // Build the symbols
      for (let [name, perk] of Object.entries(this.perkTextures)) {
        const symbol = new this.Sprite(perk)
        symbol.width = this.elementLength
        symbol.height = this.elementLength
        symbol.name = name
        reel.symbols.push(symbol)
        this.reelContainer.addChild(symbol)
      }
      this.reel = reel
      const ph = this.Sprite.fromImage(`/img/placeholder_${this.type}.png`)
      ph.width = this.elementLength
      ph.height = this.elementLength
      const bg = this.Sprite.fromImage('/img/perkBg.png')
      bg.width = this.elementLength
      bg.height = this.elementLength
      this.placeholderContainer.addChild(ph)
      this.bgContainer.addChild(bg)
      this.appStage.stage.addChild(this.bgContainer)
      this.appStage.stage.addChild(this.reelContainer)
      this.appStage.stage.addChild(this.placeholderContainer)

      this.appStage.ticker.add(delta => {
        // Update the slots.

        const r = this.reel
        // Update blur filter y amount based on speed.
        // This would be better if calculated with time in mind also. Now blur depends on frame rate.
        r.blur.blurY = (r.position - r.previousPosition) * 8
        r.previousPosition = r.position

        // Update symbol positions on reel.
        for (let j = 0; j < r.symbols.length; j++) {
          const s = r.symbols[j]
          s.y = (r.position + j) % r.symbols.length * this.elementLength - this.elementLength
        }
      })
    })
    this.appStage.ticker.add(delta => {
      const now = Date.now()
      const remove = []
      for (let i = 0; i < this.tweening.length; i++) {
        const t = this.tweening[i]
        const phase = Math.min(1, (now - t.start) / t.time)

        t.object[t.property] = this.lerp(t.propertyBeginValue, t.target, t.easing(phase))
        if (t.change) t.change(t)
        if (phase === 1) {
          t.object[t.property] = t.target
          if (t.complete) {
            t.complete(t)
          }
          remove.push(t)
        }
      }
      for (let i = 0; i < remove.length; i++) {
        this.tweening.splice(this.tweening.indexOf(remove[i]), 1)
      }
    })
  }
}
</script>

<style lang="scss" scoped>
    @import '../design/perkData';

    .slot {
        height: var(--elementlength)px;
        width: var(--elementlength)px;
        position: relative;
        display: inline-block;
    }

    .perk {
        object-fit: none;
        object-position: 0 0;
        width: var(--elementlength)px;
        height: var(--elementlength)px;
        position: absolute;
        top: 0;
        left: 0;
    }
</style>
