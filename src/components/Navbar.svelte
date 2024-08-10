<script>
    import { browser } from "$app/environment";
    import { onMount } from "svelte";

    export let menuExpanded = true;
    let pathName = '/';

    function toggleMenu() {
        menuExpanded = !menuExpanded;
    }

    async function checkMobile() {
        if (!browser) return false;
        // Check if the user is on a mobile device using the user agent
        let isMobile = /iPhone|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 800;

        // If the user is on a mobile device, set the menuExpanded variable to false
        menuExpanded = !isMobile;

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

    onMount(() => {
        window.addEventListener("resize", checkMobile);
        pathName = window.location.pathname;
    });

    const links = [
        { href: "/", text: "Home" },
        { href: "https://go.daalbot.xyz/Invite", text: "Invite" },
        { href: "https://go.daalbot.xyz/HQ", text: "Support" },
        { href: "/Dashboard", text: "Dashboard" }
    ];
</script>

<div class="navbar">
    <div class="ham-button">
        <button on:click={() => toggleMenu()} title="Toggle navigation bar">
            {#if isMobile && menuExpanded}
                <svg  xmlns="http://www.w3.org/2000/svg"  width="35"  height="35"  viewBox="0 0 24 24"  fill="none"  stroke="#ffffff"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
            {:else}
                <svg xmlns="http://www.w3.org/2000/svg"  width="35"  height="35"  viewBox="0 0 24 24"  fill="none"  stroke="#fff"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-menu-2"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 6l16 0" /><path d="M4 12l16 0" /><path d="M4 18l16 0" /></svg>
            {/if}
        </button>
    </div>

    {#if menuExpanded}
        {#if !isMobile}
            <!-- Desktop -->
            <div class="navbar-button-container">
                {#each links as link}
                <a href={link.href}>{link.text}</a>
                {/each}
            </div>
        {:else}
            <!-- Mobile -->
            <div class="nav-overlay">
                <div class="nav-overlay-content">
                    <img src="https://media.piny.dev/DaalBotTransparent.png" alt="DaalBot Logo">
                    {#each links as link}
                        <a href={link.href} class:navSelected={pathName == link.href}><pre style="margin: 0; margin-bottom: 0.5rem; font-family: Poppins, sans-serif;"> {link.text} </pre></a>
                    {/each}
                </div>
                <div class="nav-overlay-bg"></div>
            </div>
        {/if}
    {/if}
</div>

<style>
    @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap");

    .navbar {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: start;

        position: fixed;

        margin: 1rem;

        z-index: 1;

        font-family: Poppins, sans-serif;
    }

    .navbar-button-container a {
        color: white;
        text-decoration: none;

        margin: 0.5rem;

        font-size: 1.5rem;

        font-family: Poppins, sans-serif;
    }

    .navbar-button-container a:hover {
        color: #b3b3b3;

        transition: 0.5s;
    }

    .ham-button {
        z-index: 3;
    }

    .ham-button button {
        background-color: transparent;
        border: none;
    }

    .ham-button button:hover {
        cursor: pointer;
    }

    .nav-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
    }

    .nav-overlay-content {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 2;

        gap: 0.4rem;
        font-family: Poppins, sans-serif;
    }

    .nav-overlay-content img {
        width: 50px;
        height: 50px;

        margin-bottom: 1rem;
    }

    .nav-overlay-content a {
        color: white;
        text-decoration: none;
        font-size: 1.5rem;
    }

    .nav-overlay-bg {
        /* Radial gradient background */
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;

        background: rgb(7,0,0);
        /* background: radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(71,23,182,0.5) 90%); */

        opacity: 0.7;
    }

    .navSelected {
        text-decoration: underline !important;
        text-decoration-color: var(--colour-primary) !important;
        text-decoration-thickness: 0.25rem !important;
        text-underline-offset: 0.45rem;
    }
</style>