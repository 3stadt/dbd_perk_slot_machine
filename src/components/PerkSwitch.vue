<template>
    <div class="card" v-bind:style="cssProps">
        <div :class="['slot', perk.cls]">{{perk.name}}</div>
        <input type="checkbox" v-bind:checked="perk.checked">
    </div>
</template>

<script>
export default {
  name: 'PerkSwitch',
  props: ['perk'],
  computed: {
    cssProps () {
      let idx = this.perk.index
      return {
        '--slotBg': `url('/img/perkslotsSurvSmall.png') 0 ${idx === 0 ? 0 : (128 * idx * -1) + 'px'}`
      }
    }
  }
}
</script>

<style scoped>
    .card {
        height: 160px;
        width: 150px;
        border: 1px solid black;
        position: relative;
    }

    .slot {
        height: 128px;
        width: 128px;
        background-repeat: no-repeat;
        margin-left: 10%;
    }

    .slot::after {
        content: "";
        position: absolute;
        top: 20px;
        left: 50%; /* centers the left edge of the sprite */
        margin-left: -64px; /* this centers the actual sprite--this is half the sprite-window width. if you don't do this, the left edge will be centered instead of the center of the sprite.  */
        width: 128px; /* set window to see sprite through */
        height: 128px; /* set window to see sprite through */
        background: var(--slotBg); /* custom property is generated in cssProps() and bound in dov with class card*/
    }
</style>
