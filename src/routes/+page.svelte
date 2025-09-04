<script>
    import Footer from "../components/Footer.svelte";
    import Header from "../components/Header.svelte";
    import Navbar from "../components/Navbar.svelte";
    import DaalBotLogo from '$lib/images/assets/DaalBotSquare.svg';
    import { onMount } from "svelte";
    import { browser } from "$app/environment";

    /**
     * @type {{ message_counts: Record<string, number>, bot: { user_count: number, channel_count: number, guild_count: number }, resType: "fresh" | "cached" | "nodata" }}
    */
    let stats = {
        message_counts: {
            day: 0,
            lifetime: 0
        },
        bot: {
            user_count: 0,
            channel_count: 0,
            guild_count: 0
        },
        resType: "nodata"
    };

    let messageCountRange = 'day';

    /**
     * Change the message count range
     * @param range {string} The new message count range
    */
    function changeCountRange(range) {
        messageCountRange = range;

        const changeCountRangeButton = document.getElementById('change-mp-range');
        if (changeCountRangeButton) {
            changeCountRangeButton.innerText = range == 'day' ? '24h' : 'all';
        } else {
            console.error('Could not find changeCountRange button');
        }
    }

    let scrollY = 0;

    onMount(async() => {
        const response = await fetch('https://api.daalbot.xyz/get/bot/stats');
        stats = await response.json();

        scrollY = window.scrollY;

        // @ts-ignore
        window.functions = { // Share the changeCountRange function with the window object for the button to use
            changeCountRange
        };

        window.addEventListener('scroll', async() => {
            scrollY = window.scrollY;
        })
    })
</script>

<svelte:head>
    <title>DaalBot - The only Discord bot you need</title>
    <meta name="description" content="DaalBot is a multipurpose Discord bot with features to help make your server better">
    <link rel="prefetch" href="https://api.daalbot.xyz/get/bot/stats" as="fetch" type="application/json"/>
</svelte:head>
<Navbar />
<Header title="DaalBot" buttons={[
    { text: "Dashboard", href: "https://dashboard.daalbot.xyz" },
    { text: "Invite", href: "https://go.daalbot.xyz/Invite" }
]} subtext="{stats.resType !== 'nodata' ? `Servers: ${stats.bot.guild_count} | Messages processed <button id="change-mp-range" style="padding: 0.25rem 0.5rem; cursor: pointer; background-color: #1e1e1e; border-radius: .75rem; border: none; color: white;" onclick="this.innerText = this.innerText == '24h' ? 'all' : '24h'; window.functions.changeCountRange(this.innerText == '24h' ? 'day' : 'lifetime')">${messageCountRange == 'day' ? '24h' : 'all'}</button>: ${browser && (stats.message_counts[messageCountRange]).toLocaleString(undefined, {notation: 'compact'})}+`
: 'Statistics loading...'}"/>

<span class="scroll-hint" style="opacity: {scrollY == 0 ? '100' : '0'}%; transition: all 0.5s;"/>
<div class="page">
    <div class="introduction">
        <center>
            <div>
                <img src={DaalBotLogo} alt="DaalBot Logo" style="border-radius: 50%; width: 250px; height: 250px; border: 2px solid #2f2f2f"/>
                <span>
                    <h1>About DaalBot</h1>
                    <p>DaalBot is an <a href='https://github.com/DaalBot/Discord'>open source</a> multipurpose Discord bot with features to help make your server better</p>
                </span>
            </div>
        </center>
    </div>
    <div class="features">
        <h1 style="font-size: 5rem; margin-bottom: 0;">Features</h1>
        <p>An (incomplete) list of features within DaalBot</p>

        <div class="feature-list">
            <div class="feature-card">
                <h2 class="feature-title">Self Roles</h2>
                <p class="feature-description">Allow members to give themselves roles in the server with customizable menus</p>
                <picture>
                    <source srcset="https://media.piny.dev/daalbot/website/SelfRole.webp" type="image/webp"/>
                    <img class="feature-image" src="https://media.piny.dev/daalbot/website/SelfRole.png" alt="DaalBot Self Roles"/>
                </picture>
            </div>

            <div class="feature-card">
                <h2 class="feature-title">Welcome Messages</h2>
                <p class="feature-description">Welcome new members to your server with customizable messages</p>
                <picture>
                    <source srcset="https://media.piny.dev/daalbot/website/Welcome.webp" type="image/webp"/>
                    <img class="feature-image" src="https://media.piny.dev/daalbot/website/Welcome.png" alt="DaalBot Welcome Messages"/>
                </picture>
            </div>

            <div class="feature-card">
                <h2 class="feature-title">Social Feeds</h2>
                <p class="feature-description">Get updates from your favorite social media accounts* in your server</p>
                <picture>
                    <source srcset="https://media.piny.dev/daalbot/website/Socials.webp" type="image/webp"/>
                    <img class="feature-image" style="margin-bottom: 0;" src="https://media.piny.dev/daalbot/website/Socials.png" alt="DaalBot Social Feeds"/>
                </picture><br/>
                <sup>*Currently only supports Twitch</sup>
            </div>
        </div>
    </div>

    <div class="invite-section">
        <center>
            <h1>Invite DaalBot</h1>
            <p style="font-size: 1.5rem; margin-bottom: 3rem;">Invite DaalBot to your server and start using its features today!</p>
            <a href="https://go.daalbot.xyz/Invite" style="font-size: 1.5rem">Invite DaalBot</a>
        </center>
    </div>

    <Footer colour="#2f2f2f"/>
</div>

<style>
    .scroll-hint {
        width: 100%;
        height: 8em;

        position: fixed;
        bottom: 0;
        left: 0;

        background: rgb(30,30,30);
        background: linear-gradient(0deg, rgba(30,30,30,1) 39%, rgba(0,0,0,0) 100%);
    }

    .page {
        background-color: #2f2f2f;

        height: 100%;

        font-family: Poppins, sans-serif;
        color: white;
    }

    .introduction {
        padding-top: 2.5rem;
        padding-bottom: 2.5rem;
        background-color: #1e1e1e;
        width: 100%;
        height: 300px;
    }

    .introduction h1 {
        color: white;
        font-size: 2rem;
    }

    .introduction p {
        color: white;
        font-size: 1.2rem;
    }

    a {
        color: #b3b3b3;
    }

    .features {
        padding: 2.5rem;
        padding-left: 5rem;
        background-color: #1e1e1e;
    }

    .feature-list {
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: start;
        gap: 1rem;

        width: 100%;
    }

    .feature-card:nth-child(odd) {
        align-self: flex-end;
        text-align: right;
    }

    sup {
        color: #b3b3b3;
        font-size: 1rem;

        margin-top: 0;
    }

    .introduction div {
        width: 70%;

        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        gap: 2rem;
    }

    .introduction span {
        width: 60%;
        text-align: left;
    }

    .feature-title {
        font-size: 3rem;
        margin-bottom: 0;
    }

    .feature-description {
        font-size: 1.5rem;
        margin-top: 0;
    }

    .feature-image {
        width: 800px;
        height: 400px;

        border-radius: 10px;
        border: 1px solid white;

        margin-bottom: 10rem;
    }

    @media only screen and (max-width: 800px) {
        .features {
            padding: 1rem;
            padding-left: 1rem;
        }

        .feature-image {
            display: none;
        }

        .feature-title {
            font-size: 2rem;
        }

        .feature-description {
            font-size: 1rem;
        }

        p {
            margin: 1rem;
        }

        .invite-section h1 {
            font-size: 3rem !important;
        }

        .introduction div {
            flex-direction: column;
            gap: 0;
        }

        .introduction img {
            width: 120px !important;
            height: 120px !important;
        }

        .introduction span {
            width: 100%;
            text-align: center;

            margin-top: 1rem;
        }

        .introduction span * {
            margin: 0;
        }
    }

    .invite-section {
        background-image: url("data:image/svg+xml,%3Csvg width='170' height='27' viewBox='0 0 170 27' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M0.440674 19.0268L2.27289 15.8557C3.96416 12.6846 7.48765 6.34228 11.0111 7.92785C14.5346 9.51342 18.0581 19.0268 21.5816 21.6695C25.1051 24.3121 28.6286 20.0839 32.1521 17.4413C35.6756 14.7987 39.1991 13.7416 42.7225 15.3272C46.246 16.9128 49.7695 21.1409 53.293 22.198C56.8165 23.255 60.34 21.1409 63.8635 20.0839C67.387 19.0268 70.9105 19.0268 74.434 20.0839C77.9574 21.1409 81.4809 23.255 85.0044 20.6124C88.5279 17.9698 92.9765 14.2282 96.5 10C100.023 5.77181 104.977 7.35738 108.5 10C112.023 12.6426 113.192 12.6846 116.716 15.8557C120.239 19.0268 123.763 19.0268 127.286 21.1409C130.81 23.255 134.333 27.4832 137.857 26.9547C141.38 26.4262 144.904 21.1409 148.427 17.4413C151.951 13.7416 155.474 11.6275 158.998 12.6846C162.521 13.7416 166.045 17.9698 167.877 20.0839L169.568 22.198V0H167.877C166.045 0 162.521 0 158.998 0C155.474 0 151.951 0 148.427 0C144.904 0 141.38 0 137.857 0C134.333 0 130.81 0 127.286 0C123.763 0 120.239 0 116.716 0C113.192 0 109.669 0 106.145 0C102.622 0 99.0984 0 95.5749 0C92.0514 0 88.5279 0 85.0044 0C81.4809 0 77.9574 0 74.434 0C70.9105 0 67.387 0 63.8635 0C60.34 0 56.8165 0 53.293 0C49.7695 0 46.246 0 42.7225 0C39.1991 0 35.6756 0 32.1521 0C28.6286 0 25.1051 0 21.5816 0C18.0581 0 14.5346 0 11.0111 0C7.48765 0 3.96416 0 2.27289 0H0.440674V19.0268Z' fill='url(%23paint0_linear_59_53)'/%3E%3Cdefs%3E%3ClinearGradient id='paint0_linear_59_53' x1='85' y1='0' x2='85' y2='27' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%231E1E1E'/%3E%3Cstop offset='1' stop-color='%232F2F2F'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E%0A");
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;

        padding-top: 2rem;
    }

    .invite-section a {
        color: white;
        text-decoration: none;
        border: 1px solid white;
        border-radius: 5px;
        margin: 1rem;
        padding: 1rem;
        font-size: 1.5rem;
    }

    .invite-section h1 {
        font-size: 5rem;
        margin-bottom: 0;
    }
</style>
