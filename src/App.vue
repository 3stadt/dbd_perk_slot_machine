<template>
    <div id="app">
        <div class="header">
            <div class="nav container">
                <template v-if="routerName === 'killer' || routerName === 'survivor'">
                    <UiButton class="nav__left" :routerLink="{ name: 'home' }">
                        <img src="/img/icon_exit.png" slot="icon" alt="Survivor">
                        Home
                    </UiButton>
                </template>
                <UiButton v-if="routerName !== 'killer'  && routerName === 'home'" class="nav__left" :routerLink="{ name: 'killer' }">
                    <img src="/img/icon_killer.png" slot="icon" alt="Killer">
                    Killer Roulette
                </UiButton>
                <UiButton v-if="routerName !== 'killer' && routerName !== 'home'" class="nav__right" :routerLink="{ name: 'killer' }">
                    <img src="/img/icon_killer.png" slot="icon" alt="Killer">
                    Killer Roulette
                </UiButton>
                <UiButton v-if="routerName !== 'survivor'" class="nav__right" :routerLink="{ name: 'survivor' }">
                    <img src="/img/icon_survivor.png" slot="icon" alt="Survivor">
                    Survivor Roulette
                </UiButton>
            </div>
        </div>
        <div class="container">
            <router-view/>
        </div>
    </div>
</template>

<script>
import UiButton from './components/UiButton'

export default {
  components: {
    UiButton
  },
  computed: {
    routerName () {
      return this.$route.name;
    }
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
        background: $color-background url("../public/img/background_1.jpg") no-repeat center center fixed;
        background-size: cover;
        color: $color-text;
        top: 0;
    }

    #app {
        margin: 0 auto;
        padding: 0.1px;
    }

    .header {
        z-index: 1;
        position: fixed;
        width: 100%;

        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        background-color: rgba(0, 0, 0, 0.5);
    }

    .container {
        max-width: 1024px;
        margin: 0 auto;

        padding: 105px 0;
        z-index: 2;

        @media screen and (max-width: 650px) {
            padding: 175px 30px;
        }
    }

    .nav {
        padding: 10px 0;
        display: flex;

        @media screen and (max-width: 650px) {
            display: block;
            padding: 0 30px;

            .ui-button {
                margin: 15px 0;
                width: 100%;
            }
        }
    }

    .nav__right {
        margin-left: auto;
    }
</style>
