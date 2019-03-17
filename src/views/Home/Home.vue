<template>
    <div class="perk-config home">
        <div class="language-switch">
            <img @click="changeLang('de')" src="img/flags/germany.svg" width="32" height="32" alt="deutsch" class="flag">
            <img @click="changeLang('en')" src="img/flags/united-kingdom.svg" width="32" height="32" alt="english" class="flag">
        </div>
        <MenuItem type="Info" :title="$t('snippets.info')" />
        <MenuItem :perks="perks.survivors" @resetPerks="resetPerks" @change="change" type="Survivor" :title="$t('snippets.survPerkConfig')" />
        <MenuItem :perks="perks.killers" @resetPerks="resetPerks" @change="change" type="Killer" :title="$t('snippets.killPerkConfig')" />
    </div>
</template>

<script src="./Home.js"></script>
<style lang="scss" src="./Home.scss" scoped></style>
