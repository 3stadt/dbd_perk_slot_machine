<template>
    <div class="info-text">
        <div class="paragraph">
            <h2>{{ $t("about.header") }}</h2>
            <i18n tag="p" path="about.description">
                <a place="url" href="https://deadbydaylight.com/">Dead by Daylight</a>
            </i18n>
        </div>
        <div class="paragraph yt">
            <iframe width="560" height="315" :src="$t('about.videoUrl')"
                    frameborder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen></iframe>
        </div>
        <div class="paragraph">
            <h2>{{ $t("howItWorks.header") }}</h2>
            <p>{{ $t("howItWorks.description") }}</p>
            <h3>{{ $t("howItWorks.missingPerks.header") }}</h3>
            <p>{{ $t("howItWorks.missingPerks.description") }}</p>
        </div>
        <div class="paragraph">
            <h2>{{ $t("streaming.header") }}</h2>
            <p>{{ $t("streaming.description") }}</p>
            <i18n tag="p" path="streaming.options.description">
                <code place="transparent">{{ $t("streaming.options.transparent") }}</code>
                <code place="autostart">{{ $t("streaming.options.autostart") }}</code>
            </i18n>
        </div>
        <div class="paragraph">
            <h2>{{ $t("team.header") }}</h2>
            <p>{{ $t("team.description") }}</p>
            <ul>
                <li>
                    3stadt
                    [
                    <a href="https://steamcommunity.com/id/dreistadt">Steam</a> |
                    <a href="https://twitter.com/3stadt_com">Twitter</a>
                    ]
                </li>
                <li>
                    moe_nana
                    [
                    <a href="https://steamcommunity.com/id/moe_nana">Steam</a> |
                    <a href="https://twitter.com/leichteckig">Twitter</a>
                    ]
                </li>
                <li>
                    Tobbe [<a href="https://github.com/tobiasberge">GitHub</a>]
                </li>
            </ul>
        </div>
        <div class="paragraph">
            <h2>{{ $t("attribution.header") }}</h2>
            <p>{{ $t("attribution.description") }}</p>
            <ul>
                <i18n tag="li" path="attribution.wiki.description">
                    <a place="wikiUrl" :href="$t('attribution.wiki.wikiUrl')">{{ $t('attribution.wiki.wikiUrlText') }}</a>
                    <a place="licenseUrl" :href="$t('attribution.wiki.licenseUrl')">{{ $t('attribution.wiki.licenseUrl') }}</a>
                </i18n>
                <i18n tag="li" path="attribution.happyclown.description">
                    <a place="profile" href="https://steamcommunity.com/profiles/76561198307075794">Happy Clown</a>
                    <a place="group" href="https://steamcommunity.com/groups/HappyClownsColoredIcons">{{ $t("attribution.happyclown.groupText") }}</a>
                </i18n>
                <i18n tag="li" path="attribution.rocketleaguecat.description">
                    <a href="https://imgur.com/gallery/8i5gR" place="bgImage">{{ $t("attribution.rocketleaguecat.bgImageText") }}</a>
                    <a place="profile" href="https://imgur.com/user/rocketleaguecat">rocketleaguecat</a>
                </i18n>
                <i18n tag="li" path="attribution.bhvr.description">
                    <a place="bhvr" href="https://www.bhvr.com/">BHVR</a>
                    <a place="dbd" href="https://deadbydaylight.com">Dead by Daylight</a>
                </i18n>
                <i18n tag="li" path="attribution.freepik.description">
                    <a place="freepik" href="https://www.freepik.com/" title="Freepik">Freepik</a>
                    <a place="flaticon" href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
                    <a place="licenseUrl" href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>
                </i18n>
            </ul>
        </div>
        <div class="paragraph">
            <h2>{{ $t("disclaimer.header") }}</h2>
            <i18n tag="p" path="disclaimer.description">
                <span place="email" class="e-mail" data-user="mspd" data-website="moc.tdats3"></span>
                <a place="statcounter" href="https://statcounter.com/">statcounter</a>
            </i18n>
        </div>
    </div>
</template>

<script>
export default {
  name: 'InfoText',

  props: {
    value: {
      required: false
    }
  }
}
</script>

<style lang="scss" scoped>
    .e-mail:before {
        content: attr(data-website) "\0040" attr(data-user);
        unicode-bidi: bidi-override;
        direction: rtl;
    }
</style>

<style lang="scss">
    @import "../design/main";
    @import "../design/typography";

    .paragraph {
        padding: 10px;

        a {
            color: $color-primary;
            text-decoration: none;
        }

        h3 {
            margin-top: 10px
        }

        a:hover {
            text-decoration: underline;
        }

        a:active {
            color: black;
        }

        a:visited {
            color: darkgrey;
        }

        &.yt {
            iframe {
                display: block;
                margin: 0 auto;
            }
        }
    }

    li {
        margin-left: 20px;
    }

    .video {
        min-height: 315px;
        width: 100%;
        height: 100%;
        max-width: 1024px;
        margin: 0 auto;
    }

</style>
