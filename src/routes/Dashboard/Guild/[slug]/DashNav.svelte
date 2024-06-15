<script>
    import { browser } from "$app/environment";
    import { onMount } from "svelte";
    import tools from "$lib/dashboard/tools";

    // Icons
    import homeIcon from "$lib/images/svg/icons/home.svg";
    import usersIcon from "$lib/images/svg/icons/users.svg";
    import gearIcon from "$lib/images/svg/icons/gear.svg";
    import routeSquareIcon from "$lib/images/svg/icons/route-square.svg";
    import listDetailsIcon from "$lib/images/svg/icons/list-details.svg";
    import ticketIcon from "$lib/images/svg/icons/ticket.svg";
    import userPlusIcon from "$lib/images/svg/icons/user-plus.svg";
    import twitchGlitchWhite from "$lib/images/svg/icons/TwitchGlitchWhite.svg";
    import brandTwitter from "$lib/images/svg/icons/brand-twitter.svg";

    export let menuExpanded = false;
    let guildId = '0';
    let pathName = `/Dashboard/Guild/0/`;
    let drawerOpen = false;
    let currentCategory = 'None';

    async function toggleMenu() {
        menuExpanded = !menuExpanded;

        if (!browser) return;
        if (await checkMobile()) return;

        // Button will only be clickable by humans if the menu is already closed so we can open it
        const drawer = document.querySelector('.drawer-placement-start');
        if (drawer) {
            // @ts-ignore
            drawer.open = true;
        }
    }

    async function checkMobile() {
        if (!browser) return false;
        // Check if the user is on a mobile device using the user agent
        let isMobile = /iPhone|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 800;

        // If the user is on a mobile device, add a background to the navbar
        if (isMobile) {
            if (document.body) {
                document.body.style.backgroundColor = "#2f2f2f";
            }
        }

        return isMobile;
    }

    let isMobile = false;

    (async() => {
        isMobile = await checkMobile();
    })();

    onMount(async() => {
        window.addEventListener("resize", checkMobile);
        pathName = window.location.pathname;

        guildId = await tools.guild.extractURL(window.location.href);

        // Set current category
        const path = window.location.href;
        if (!path.includes('feature')) {
            currentCategory = 'None';
        } else {
            // URL will look like /Dashboard/Guild/[[GUILD_ID]]/feature/[[CATEGORY]]/[[FEATURE]]/...
            const splitPath = path.split('/');
            currentCategory = splitPath[splitPath.indexOf('feature') + 1];
        }

        if (!isMobile) {
            setInterval(async() => {
                const oldState = drawerOpen;
                const drawer = document.querySelector('.drawer-placement-start');
                if (drawer) {
                    // @ts-ignore
                    drawerOpen = drawer.open;
                }

                if (oldState != drawerOpen) {
                    console.log(`Drawer state changed to ${drawerOpen ? 'open' : 'closed'}`)
                    menuExpanded = drawerOpen;
                }
            }, 750)
        }
    });

    const categorys = [
        'None', // Always put None first
        'Server',
        'Social',
        'XP',
        'Tools'
    ]

    const links = [
        {
            text: 'Home',
            href: '/Dashboard/Guild/[[GUILD_ID]]/',
            category: 'None',
            icon: homeIcon
        },
        {
            text: 'Auto Roles',
            href: '/Dashboard/Guild/[[GUILD_ID]]/feature/guild/autorole',
            category: 'Server',
            icon: usersIcon
        },
        {
            text: 'Config',
            href: '/Dashboard/Guild/[[GUILD_ID]]/feature/guild/config',
            category: 'Server',
            icon: gearIcon
        },
        {
            text: 'Events',
            href: '/Dashboard/Guild/[[GUILD_ID]]/feature/guild/events',
            category: 'Server',
            icon: routeSquareIcon
        },
        {
            text: 'Logs',
            href: '/Dashboard/Guild/[[GUILD_ID]]/feature/guild/logs',
            category: 'Server',
            icon: listDetailsIcon
        },
        {
            text: 'Tickets',
            href: '/Dashboard/Guild/[[GUILD_ID]]/feature/guild/ticket',
            category: 'Server',
            icon: ticketIcon
        },
        {
            text: 'Welcoming',
            href: '/Dashboard/Guild/[[GUILD_ID]]/feature/guild/welcome',
            category: 'Server',
            icon: userPlusIcon
        },
        {
            text: 'Twitch',
            href: '/Dashboard/Guild/[[GUILD_ID]]/feature/social/twitch',
            category: 'Social',
            icon: twitchGlitchWhite
        },
        {
            text: 'Twitter',
            href: '/Dashboard/Guild/[[GUILD_ID]]/feature/social/twitter',
            category: 'Social',
            icon: brandTwitter
        },
        {
            text: 'YouTube',
            href: '/Dashboard/Guild/[[GUILD_ID]]/feature/social/youtube',
            category: 'Social'
        },
        {
            text: 'Rewards',
            href: '/Dashboard/Guild/[[GUILD_ID]]/feature/xp/reward',
            category: 'XP'
        },
        {
            text: 'Message Builder',
            href: '/Dashboard/Guild/[[GUILD_ID]]/tools/messagebuilder',
            category: 'Tools'
        }
    ];
</script>

<div class="ham-button">
    <button on:click={() => toggleMenu()}>
        {#if menuExpanded}
            <svg  xmlns="http://www.w3.org/2000/svg"  width="35"  height="35"  viewBox="0 0 24 24"  fill="none"  stroke="#ffffff"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
        {:else}
            <svg xmlns="http://www.w3.org/2000/svg"  width="35"  height="35"  viewBox="0 0 24 24"  fill="none"  stroke="#fff"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-menu-2"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 6l16 0" /><path d="M4 12l16 0" /><path d="M4 18l16 0" /></svg>
        {/if}
    </button>
</div>

{#if menuExpanded}
    {#if !isMobile}
        <!-- Desktop -->
        <sl-drawer label="Dashboard" placement="start" class="drawer-placement-start sl-theme-dark">
            {#each categorys as category}
                {#if category == 'None'}
                    {#each links as link}
                        {#if link.category == category}
                            <sl-button href={link.href.replace('[[GUILD_ID]]', guildId)} class:navSelected={pathName == link.href.replace('[[GUILD_ID]]', guildId)} style="width: 100%; text-align: center;">
                                <!-- <img src={link.icon} slot="prefix" alt="{link.text} icon"/> -->
                                {link.text}
                            </sl-button>
                        {/if}
                    {/each}
                {:else}
                    <sl-details summary={category} open={currentCategory == category} style="margin-top: 1rem;">
                        {#each links as link}
                            {#if link.category == category}
                                <sl-button href={link.href.replace('[[GUILD_ID]]', guildId)} class:navSelected={pathName == link.href.replace('[[GUILD_ID]]', guildId)} style="width: 100%; text-align: center; margin-top: 0.5em;">
                                    <!-- <img src={link.icon} slot="prefix" alt="{link.text} icon"/> -->
                                    {link.text}
                                </sl-button>
                            {/if}
                        {/each}
                    </sl-details>
                {/if}
            {/each}
        </sl-drawer>
    {/if}
{/if}

<style>
    @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap");

    .ham-button {
        z-index: 50;

        position: fixed;
        top: 1rem;

        display: flex;
        
        /* Show on left side of screen */
        left: 1rem;
    }

    .ham-button button {
        background-color: transparent;
        border: none;
    }

    .ham-button button:hover {
        cursor: pointer;
    }
    
    .navSelected {
        text-decoration: underline !important;
        text-decoration-color: var(--colour-primary) !important;
        text-decoration-thickness: 0.25rem !important;
        text-underline-offset: 0.45rem;
    }

    .drawer-placement-start {
        color: white !important;
        font-family: Poppins, sans-serif;
    }

    @media (max-width: 800px) {
        .ham-button {
            display: none; /* Too little space to add a persistent button */
        }
    }
</style>