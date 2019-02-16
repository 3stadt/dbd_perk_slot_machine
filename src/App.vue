<template>
    <div id="app">
        <div class="nav">
            <UiButton class="nav__killers" :routerLink="{ name: 'killers' }">Killer Roulette</UiButton>
            <UiButton class="nav__survivors" :routerLink="{ name: 'survivor' }">Survivor Roulette</UiButton>
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
    @import "design/main";

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
        padding: 10px;
    }

    .nav {
        padding: 30px 0;
        display: flex;
    }

    .nav__survivors {
        margin-left: auto;
    }
</style>
