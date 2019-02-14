<template>
    <div id="app">
        <div id="nav">
            <router-link to="/killers.html">Killer Roulette</router-link>
            |
            <router-link to="/survivors.html">Survivor Roulette</router-link>
        </div>
        <router-view/>
    </div>
</template>

<style lang="scss">
    * {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    body {
        font-family: Arial, Helvetica, sans-serif;
        line-height: 1.4;
        background: dimgrey;
    }
</style>
