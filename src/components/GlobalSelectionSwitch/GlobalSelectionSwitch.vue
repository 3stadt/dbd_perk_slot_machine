<template>
    <div class="perk-switch-container" :style="cssProps">
        <div class="perk-switch">
            <div class="perk-switch__image-container"></div>
            <div class="perk-switch__image"></div>
            <div class="perk-switch__name">
                <svg ref="svg" :width="itemLength" height="26">
                    <text ref="svgText" :id="'name_' + type" x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white">{{ text }}</text>
                </svg>
            </div>
        </div>
    </div>
</template>

<script src="./globalSelectionSwitch.js"></script>
<style lang="scss" src="./globalSelectionSwitch.scss" scoped></style>
