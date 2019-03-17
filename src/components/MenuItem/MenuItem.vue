<template>
    <div class="perk-overview" :class="classes">
        <h2 class="perk-overview__toggle overview__box" @click="toggleCollapsed">
            <span class="perk-overview__icon-holder">
                <img :src="`/img/icon_${type.toLowerCase()}.png`" :alt="type">
            </span>
            <span class="perk-overview__title">{{title}}</span>
        </h2>
        <transition name="fade">
            <div v-if="perkCondition" class="perk-overview__grid">
                <div @click.stop.prevent="$emit('resetPerks', type)">
                    <GlobalSelectionSwitch :itemLength="elementLength" :type="type"></GlobalSelectionSwitch>
                </div>
                <PerkSwitch :itemLength="elementLength" :key="perk.index" @change="perkChange" v-for="perk in perks" :perk="perk" :name="translate(perk.name)" :type="type"></PerkSwitch>
            </div>
            <div v-if="infoCondition" class="overview__box">
                <InfoText></InfoText>
            </div>
        </transition>
    </div>
</template>

<script src="./menuItem.js"></script>
<style lang="scss" src="./menuItem.scss" scoped></style>
