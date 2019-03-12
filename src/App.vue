<template>
    <div id="app">
        <div class="header">
            <div class="nav container">
                <template v-if="routerName !== 'home'">
                    <UiButton class="nav__left" :routerLink="{ name: 'home', query: $route.query }">
                        <img src="/img/icon_exit.png" slot="icon" alt="Home">
                        {{ $t('snippets.buttonHome') }}
                    </UiButton>
                </template>
                <UiButton v-if="routerName !== 'killer'  && routerName === 'home'" class="nav__left" :routerLink="{ name: 'killer', query: $route.query }">
                    <img src="/img/icon_killer.png" slot="icon" alt="Killer">
                    {{ $t('snippets.buttonKillRoulette') }}
                </UiButton>
                <UiButton v-if="routerName !== 'killer' && routerName !== 'home'" class="nav__right" :routerLink="{ name: 'killer', query: $route.query }">
                    <img src="/img/icon_killer.png" slot="icon" alt="Killer">
                    {{ $t('snippets.buttonKillRoulette') }}
                </UiButton>
                <UiButton v-if="routerName !== 'survivor'" class="nav__right" :routerLink="{ name: 'survivor', query: $route.query }">
                    <img src="/img/icon_survivor.png" slot="icon" alt="Survivor">
                    {{ $t('snippets.buttonSurvRoulette') }}
                </UiButton>
            </div>
        </div>
        <div class="container">
            <a href="https://github.com/3stadt/dbd_perk_slot_machine/" class="github-corner" aria-label="View source on GitHub">
                <!-- http://tholman.com/github-corners/ -->
                <svg width="80" height="80" viewBox="0 0 250 250"
                     aria-hidden="true" class="github-svg">
                    <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
                    <path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
                          fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path>
                    <path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
                          fill="currentColor" class="octo-body"></path>
                </svg>
            </a>
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
    this.$i18n.locale = this.$route.query.lang ? this.$route.query.lang.toLowerCase() : 'en'
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
        z-index: 100;
        position: fixed;
        width: 100%;

        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        background-color: rgba(0, 0, 0, 0.5);
    }

    .container {
        max-width: 1024px;
        margin: 0 auto;

        padding: 105px 0;
        z-index: 50;

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

    .github-svg {
        z-index: 125;
        fill: #151513;
        color: #fff;
        position: fixed;
        top: 0;
        border: 0;
        right: 0;
    }

    .github-corner:hover .octo-arm {
        z-index: 150;
        position: fixed;
        animation: octocat-wave 560ms ease-in-out
    }

    @keyframes octocat-wave {
        0%, 100% {
            transform: rotate(0)
        }
        20%, 60% {
            transform: rotate(-25deg)
        }
        40%, 80% {
            transform: rotate(10deg)
        }
    }

    @media (max-width: 500px) {
        .github-corner:hover .octo-arm {
            animation: none
        }

        .github-corner .octo-arm {
            animation: octocat-wave 560ms ease-in-out
        }
    }
</style>
