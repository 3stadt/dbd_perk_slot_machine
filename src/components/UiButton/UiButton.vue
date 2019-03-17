<template>
    <router-link class="ui-button" :class="classes" v-if="routerLink" :to="routerLink">
        <span v-if="hasIconSlot" class="ui-button__icon">
            <slot name="icon"></slot>
        </span>
        <slot></slot>
    </router-link>
    <button v-else class="ui-button" :class="classes">
        <span v-if="hasIconSlot" class="ui-button__icon">
            <slot name="icon"></slot>
        </span>
        <slot></slot>
    </button>
</template>

<script src="./uiButton.js"></script>
<style lang="scss" src="./uiButton.scss"></style>
