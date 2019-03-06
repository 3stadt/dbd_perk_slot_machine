<template>
    <div id="app">
        <div class="header">
            <div class="nav container">
                <template v-if="routerName === 'killer' || routerName === 'survivor'">
                    <UiButton class="nav__left" :routerLink="{ name: 'home', query: $route.query }">
                        <img src="/img/icon_exit.png" slot="icon" alt="Survivor">
                        Home
                    </UiButton>
                </template>
                <UiButton v-if="routerName !== 'killer'  && routerName === 'home'" class="nav__left" :routerLink="{ name: 'killer', query: $route.query }">
                    <img src="/img/icon_killer.png" slot="icon" alt="Killer">
                    Killer Roulette
                </UiButton>
                <UiButton v-if="routerName !== 'killer' && routerName !== 'home'" class="nav__right" :routerLink="{ name: 'killer', query: $route.query }">
                    <img src="/img/icon_killer.png" slot="icon" alt="Killer">
                    Killer Roulette
                </UiButton>
                <UiButton v-if="routerName !== 'survivor'" class="nav__right" :routerLink="{ name: 'survivor', query: $route.query }">
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
  data: function () {
    return {
      removeBackground: this.$route.query.bg === '0',
      removeHint: this.$route.query.hint === '0',
      removeHeader: this.$route.query.header === '0'
    }
  },
  computed: {
    routerName () {
      return this.$route.name
    }
  },
  mounted: function () {
    if (this.removeBackground) {
      document.getElementsByTagName('body')[0].setAttribute('style', 'background:none;padding:0;margin:0')
    }
    if (this.removeHint) {
      document.getElementsByClassName('hint-text')[0].setAttribute('style', 'display:none;')
    }
    if (this.removeHeader) {
      document.getElementsByClassName('container')[1].setAttribute('style', 'padding:0;max-width:none;')
      document.getElementsByClassName('header')[0].setAttribute('style', 'display:none;')
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
        background: $color-background url("../public/img/Background-Main.jpg") no-repeat center center fixed;
        background-size: cover;
        color: $color-text;
        top: 0;
    }

    .hide-bg {
        background: none;
        background-size: unset;
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
            padding: 175px 0;
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
