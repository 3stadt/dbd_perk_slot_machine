<template>
    <div style="display: inline-block">
        <div class="slot" id="slot-1">

        </div>
    </div>
</template>

<script>
import * as PIXI from 'pixi.js'

export default {
  name: 'PixiPerkSlot',
  data: function () {
    let perkData = this.type === 'Surv' ? require('./../resources/perks-survivor.json') : require('./../resources/perks-killer.json')
    let maxId = perkData.length - 1
    return {
      appStage: new PIXI.Application(1024, 256, { transparent: true }),
      loader: new PIXI.loaders.Loader(),
      resources: PIXI.loader.resources,
      Sprite: PIXI.Sprite,
      Container: PIXI.Container,
      Text: PIXI.Text,
      reels: [],
      tweening: [],
      reelContainer: null,
      perkTextures: null,
      maxId: maxId,
      elementHeight: 256,
      perkData: perkData,
      perkNames: [],
      targetPerkId: null,
      rcs: []
    }
  },
  props: {
    type: {
      type: String,
      required: true
    }
  },
  methods: {
    _reelsComplete: function () {
      this.active = false
      let style = new PIXI.TextStyle({
        fontWeight: 'bold',
        fontSize: 16,
        fontFamily: 'Arial',
        fill: '#FFFFFF',
        align: 'center',
        wordWrap: true,
        wordWrapWidth: 256
      })
      for (let i = 0; i < 4; i++) {
        let tCont = new this.Container()

        let perkText = new this.Text(this.targetPerkIds[i].name, style)
        perkText.x = this.rcs[i].width / 2
        perkText.y = 220
        perkText.anchor.x = 0.5

        let mask = new PIXI.Graphics().beginFill(0x000000, 0.5).drawRect(0, 206, 256, 50).endFill()

        tCont.addChild(mask)
        tCont.addChild(perkText)

        this.perkNames[i] = tCont
        this.rcs[i].addChild(this.perkNames[i])
      }
    },
    rollWheel: function (targetIds) {
      let me = this
      me.targetPerkIds = targetIds
      if (me.active) return
      me.tweening = []
      me.active = true
      for (let i = 0, pn = me.rcs.length; i < pn; i++) {
        this.rcs[i].removeChild(this.perkNames[i])
      }
      for (let i = 0; i < me.reels.length; i++) {
        let r = me.reels[i]
        me._tweenTo(r,
          'position',
          60 - targetIds[i].index,
          4000,
          me.backout(0.6),
          null,
          i === me.reels.length - 1 ? me._reelsComplete : null
        )
      }
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
    },
    _getBg: function () {
      return `/img/perkslots${this.type}.png`
    }
  },
  mounted () {
    let me = this
    document.getElementById('slot-1').appendChild(this.appStage.view)
    this.loader.add('atlas', '/sprites/surv.json')
    this.loader.load((loader, resources) => {
      let SYMBOL_SIZE = 256
      let REEL_WIDTH = 256
      this.perkTextures = resources.atlas.textures
      this.reels = []
      this.reelContainer = new this.Container()
      for (let i = 0; i < 4; i++) {
        this.rcs[i] = new this.Container()
        this.rcs[i].x = i * REEL_WIDTH
        this.reelContainer.addChild(this.rcs[i])

        let reel = {
          container: this.rcs[i],
          symbols: [],
          position: 0,
          previousPosition: 0,
          blur: new PIXI.filters.BlurFilter()
        }
        reel.blur.blurX = 0
        reel.blur.blurY = 0
        this.rcs[i].filters = [reel.blur]

        // Build the symbols
        for (let [name, perk] of Object.entries(this.perkTextures)) {
          let symbol = new this.Sprite(perk)
          symbol.name = name
          reel.symbols.push(symbol)
          this.rcs[i].addChild(symbol)
        }
        this.reels.push(reel)
      }
      this.appStage.stage.addChild(this.reelContainer)
      this.appStage.ticker.add(function (delta) {
        // Update the slots.
        for (let i = 0; i < me.reels.length; i++) {
          let r = me.reels[i]
          // Update blur filter y amount based on speed.
          // This would be better if calculated with time in mind also. Now blur depends on frame rate.
          r.blur.blurY = (r.position - r.previousPosition) * 8
          r.previousPosition = r.position

          // Update symbol positions on reel.
          for (let j = 0; j < r.symbols.length; j++) {
            let s = r.symbols[j]
            s.y = (r.position + j) % r.symbols.length * SYMBOL_SIZE - SYMBOL_SIZE
          }
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

    .perk-name {
        text-align: center;
        background: rgba(0, 0, 0, 0.5);
        margin: 0 10px 0 10px;
        opacity: 0;
    }

    .slot {
        height: #{$item-width}px;
        width: #{$item-width * 4}px;
        position: relative;
        overflow: hidden;
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

    @for $i from 0 through $n-surv {
        $pos: $i * $item-width * -1;
        .perkSurv-#{$i} {
            object-position: 0 #{$pos}px;
            transform: translateY(-#{$item-width}px);
        }
    }

    @for $i from 0 through $n-kill {
        $pos: $i * $item-width * -1;
        .perkKill-#{$i} {
            object-position: 0 #{$pos}px;
            transform: translateY(-#{$item-width}px);
        }
    }
</style>
