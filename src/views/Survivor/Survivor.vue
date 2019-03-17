<template>
    <div>
        <div>
            <perkslot0 @reRollRequested="randomize"
                       ref="perkslot0"
                       type="Surv"
                       :elementLength="elementLength"
                       :colorized="color"
                       :lang="lang"
                       :perkData="Object.keys(perksSHD.frames)"
            />
            <perkslot1 @reRollRequested="randomize"
                       ref="perkslot1"
                       type="Surv"
                       :elementLength="elementLength"
                       :colorized="color"
                       :lang="lang"
                       :perkData="Object.keys(perksSHD.frames)"
            />
            <perkslot2 @reRollRequested="randomize"
                       ref="perkslot2"
                       type="Surv"
                       :elementLength="elementLength"
                       :colorized="color"
                       :lang="lang"
                       :perkData="Object.keys(perksSHD.frames)"
            />
            <perkslot3 @reRollRequested="randomize"
                       ref="perkslot3"
                       type="Surv"
                       :elementLength="elementLength"
                       :colorized="color"
                       :lang="lang"
                       :perkData="Object.keys(perksSHD.frames)"
            />
        </div>
        <div v-if="hintVisible" class="hint-text overview__box">
            <img src="/img/icon_shortinfo.png" slot="icon" alt="Survivor" class="info-icon">
            <span>{{ $t('snippets.startPerkRoll') }}</span>
        </div>
    </div>
</template>

<script src="./survivor.js"></script>
