<template>
    <div class="info-text">
        <div class="paragraph">
            <h2>What is this about?</h2>
            <p>
                This site is a perk wheel for use with the game <a href="https://deadbydaylight.com/">Dead
                by Daylight</a>. To be precise, there is no wheel, but a slot machine. Works the same, looks better.
                Here, have a video containing everything you need to know:
            </p>
        </div>
        <div class="paragraph">
            <iframe class="video" src="https://www.youtube-nocookie.com/embed/vSaUjJC68Kc" frameborder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen></iframe>
        </div>
        <div class="paragraph">
            <h2>How does it work?</h2>
            <p>
                If you have all perks on one of your characters on the killer and survivor site, just
                click one of the red buttons on top, click on any perk slot, done.
                This way four different perks are chosen for you to play with. That's how a perk wheel /
                slot machine works. Have fun!
            </p>
            <h3>...but I don't have ALL THE PERKS!</h3>
            <p>
                If you are missing some perks, click on one of the "Configure..." boxes below. Then
                disable the perks you don't have or want.
                The perks you've chosen are not saved, but the url is used to determine which perks are
                active. <br>
                So configure your perks, create a bookmark for this configuration, done.
            </p>
        </div>
        <div class="paragraph">
            <h2>How to use this with OBS/XSplit?</h2>
            <p>
                There are a number of options you can set via URL. This is explained in-depth in the video above.<br>
                In short, use the parameters
                <code>bg=0&header=0&hint=0</code>
                to only show the perk slots,
                use e.g.
                <code>autostart=1000</code>
                to start a roll 1 second after page load.
            </p>
        </div>
        <div class="paragraph">
            <h2>The team</h2>
            <p>This project was brought to life by:</p>
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
            <h2>Attribution</h2>
            <p>The media on this page was not originally created by it's author.</p>
            <ul>
                <li>Most Images were taken from the awesome
                    <a href="https://deadbydaylight.gamepedia.com/Dead_by_Daylight_Wiki">official dead by daylight
                        wiki</a>.The content of that wiki is licensed under the Creative Commons <a
                            href="https://creativecommons.org/licenses/by-nc-sa/3.0/">Attribution-NonCommercial-ShareAlike
                        3.0 Unported (CC BY-NC-SA 3.0)</a> license.
                </li>
                <li>The colored Icons (special mode) were made by <a
                        href="https://steamcommunity.com/profiles/76561198307075794">Happy Clown</a> and there is even a
                    <a href="https://steamcommunity.com/groups/HappyClownsColoredIcons">steam group</a> for them. Go
                    check it out!
                </li>
                <li>The <a href="https://imgur.com/gallery/8i5gR">background image</a> was made by the imgur user <a
                        href="https://imgur.com/user/rocketleaguecat">rocketleaguecat</a>.
                </li>
                <li>The perk and background images are property of and originally made by
                    <a href="https://www.bhvr.com/">BHVR</a> for <a href="https://deadbydaylight.com">Dead by
                        Daylight</a>.
                </li>
            </ul>
        </div>
        <div class="paragraph">
            <h2>Disclaimer</h2>
            <p>
                This site is not associated with, endorsed by, or in any other form connected with any
                company.
                It's a fan project. If anything is wrong, feel free to contact the author via e-mail at
                <span class="e-mail" data-user="mspd" data-website="moc.tdats3"></span>.
                <b>There are no warranties whatsoever. Use at your own risk.</b>
                Good news are, this site does not use cookies and is running in your browser, no data is
                saved on the server.
                However, this site uses <a href="https://statcounter.com/">statcounter</a> to track how
                many visitors are using it.
            </p>
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
