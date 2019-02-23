<template>
    <div id="app">
        <div class="header">
            <div class="nav container">
                <UiButton class="nav__killers" :routerLink="{ name: 'killers' }">
                    <img src="/img/icon_killer.png" slot="icon" alt="Killer">
                    Killer Roulette
                </UiButton>
                <UiButton class="nav__survivors" :routerLink="{ name: 'survivor' }">
                    <img src="/img/icon_survivor.png" slot="icon" alt="Survivor">
                    Survivor Roulette
                </UiButton>
            </div>
        </div>
        <div class="perk-config container">
            <router-view/>
        </div>
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
        background: $color-background url("../public/img/background_1.jpg") no-repeat center center fixed;
        background-size: cover;
        color: $color-text;
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
    }

    .perk-config {
        padding: 105px 30px;
        z-index: 2;

        @media screen and (max-width: 650px) {
            padding: 175px 30px;
        }
    }

    .nav {
        padding: 10px 30px;
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

    .nav__survivors {
        margin-left: auto;
    }
</style>
