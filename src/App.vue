<template>
    <div id="app">
        <div id="nav">
            <UiButton :routerLink="{ name: 'killers' }">Killer Roulette</UiButton>
            <UiButton :routerLink="{ name: 'survivor' }">Survivor Roulette</UiButton>
        </div>
        <router-view/>
    </div>
</template>

<script>
import UiButton from './components/UiButton'

export default {
  components: {
    UiButton
  }
}
</script>

<style lang="scss">
    @import "deisgn/main";

    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    body {
        font-family: $font-family-default;
        line-height: 1.4;
        background: $color-background;
        color: $color-text;
    }

    #app {
        max-width: 1024px;
        margin: 0 auto;
    }
</style>
