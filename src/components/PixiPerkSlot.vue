<template>
    <div class="slot" ref="slot"></div>
</template>

<script>
import * as PIXI from 'pixi.js'

export default {
  name: 'PixiPerkSlot',
  data: function () {
    let perkData = this.type === 'Surv' ? require('./../resources/perks-survivor.json') : require('./../resources/perks-killer.json')
    let maxId = perkData.length - 1
    return {
      appStage: new PIXI.Application(256, 256, { transparent: true }),
      loader: new PIXI.loaders.Loader(),
      resources: PIXI.loader.resources,
      Sprite: PIXI.Sprite,
      Container: PIXI.Container,
      Text: PIXI.Text,
      reel: null,
      tweening: [],
      reelContainer: null,
      bgContainer: null,
      placeholderContainer: null,
      perkTextures: null,
      maxId: maxId,
      elementHeight: 256,
      perkData: perkData,
      perkName: '',
      targetPerkId: null
    }
  },
  props: {
    type: {
      type: String,
      required: true
    }
  },
  methods: {
    _reelComplete: function () {
      this.active = false
      let style = new PIXI.TextStyle({
        fontWeight: 'bold',
        fontSize: 16,
        fontFamily: 'Arial',
        fill: '#FFFFFF',
        align: 'center',
        wordWrap: true,
        wordWrapWidth: 250
      })

      let tCont = new this.Container({ height: 256, width: 256 })

      let perkText = new this.Text(this.targetPerkId.name, style)
      perkText.x = this.reelContainer.width / 2
      perkText.y = 233
      perkText.anchor.x = 0.5

      let mask = new PIXI.Graphics({
        height: 256,
        width: 256
      }).beginFill(0x000000, 0.5).drawRect(3, 230, 250, 26).endFill()

      tCont.addChild(mask)
      tCont.addChild(perkText)

      this.perkName = tCont
      this.reelContainer.addChild(this.perkName)
    },
    rollWheel: function (targetId) {
      let me = this
      if (me.active) return
      me.targetPerkId = targetId
      me.placeholderContainer.visible = false
      me.reelContainer.visible = true
      me.tweening = []
      me.active = true
      me.reelContainer.removeChild(this.perkName)
      me._tweenTo(me.reel,
        'position',
        (me.perkData.length + 1) - targetId.index,
        4000,
        me.backout(0.6),
        null,
        me._reelComplete
      )

      return true
    },
    lerp: function (a1, a2, t) {
      return a1 * (1 - t) + a2 * t
    },
    backout: function (amount) {
      return function (t) {
        return (--t * t * ((amount + 1) * t + amount) + 1)
      }
    },
    _tweenTo: function (object, property, target, time, easing, onchange, oncomplete) {
      let tween = {
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
    let me = this
    this.$refs.slot.appendChild(this.appStage.view)
    this.loader.add('atlas', `/sprites/${this.type.toLowerCase()}.json`)
    this.loader.load((loader, resources) => {
      this.perkTextures = resources.atlas.textures
      this.reelContainer = new this.Container()
      this.placeholderContainer = new this.Container()
      this.bgContainer = new this.Container()
      this.reelContainer.visible = false
      this.reelContainer.interactive = true
      this.placeholderContainer.interactive = true
      this.placeholderContainer.on('pointerdown', function () {
        me.$emit('reRollRequested')
      })
      this.reelContainer.on('pointerdown', function () {
        me.$emit('reRollRequested')
      })

      let reel = {
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
        let symbol = new this.Sprite(perk)
        symbol.name = name
        reel.symbols.push(symbol)
        this.reelContainer.addChild(symbol)
      }
      this.reel = reel
      let ph = this.Sprite.fromImage(`/img/placeholder_${this.type}.png`)
      let bg = this.Sprite.fromImage('/img/perkBg.png')
      this.placeholderContainer.addChild(ph)
      this.bgContainer.addChild(bg)
      this.appStage.stage.addChild(this.bgContainer)
      this.appStage.stage.addChild(this.reelContainer)
      this.appStage.stage.addChild(this.placeholderContainer)

      this.appStage.ticker.add(function (delta) {
        // Update the slots.

        let r = me.reel
        // Update blur filter y amount based on speed.
        // This would be better if calculated with time in mind also. Now blur depends on frame rate.
        r.blur.blurY = (r.position - r.previousPosition) * 8
        r.previousPosition = r.position

        // Update symbol positions on reel.
        for (let j = 0; j < r.symbols.length; j++) {
          let s = r.symbols[j]
          s.y = (r.position + j) % r.symbols.length * 256 - 256
        }
      })
    })
    this.appStage.ticker.add(function (delta) {
      let now = Date.now()
      let remove = []
      for (let i = 0; i < me.tweening.length; i++) {
        let t = me.tweening[i]
        let phase = Math.min(1, (now - t.start) / t.time)

        t.object[t.property] = me.lerp(t.propertyBeginValue, t.target, t.easing(phase))
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
        me.tweening.splice(me.tweening.indexOf(remove[i]), 1)
      }
    })
  }
}
</script>

<style lang="scss" scoped>
    @import '../design/perkData';

    .slot {
        height: #{$item-width}px;
        width: #{$item-width}px;
        position: relative;
        /*overflow: hidden;*/
        display: inline-block;
    }

    .perk {
        object-fit: none;
        object-position: 0 0;
        width: #{$item-width}px;
        height: #{$item-width}px;
        position: absolute;
        top: 0;
        left: 0;
    }
</style>
