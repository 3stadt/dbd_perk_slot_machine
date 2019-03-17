<template>
    <div class="perk-switch-container" @click="onClickPerk">
        <div class="perk-switch">
            <div :class="['_'+currentPerk.name, spriteType, 'perk-switch__image']"></div>
            <div :class="[{'perk-checked': currentPerk.checked}]"></div>
            <div class="perk-switch__name">
                <svg :width="itemLength" ref="svg" height="52">
                    <text ref="svgText" :id="'name_' + currentPerk.name" x="50%" y="50%" dy="-0.5rem" text-anchor="middle" fill="white" v-html="text"></text>
                </svg>
            </div>
        </div>
    </div>
</template>

<script src="./perkSwitch.js"></script>

<style lang="scss" src="./perkSwitch.scss" scoped></style>
