<script>
    import { browser } from "$app/environment";
    import { onMount } from "svelte";

    export let menuExpanded = true;

    function toggleMenu() {
        menuExpanded = !menuExpanded;
    }

    async function checkMobile() {
        if (!browser) return;
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
    }

    checkMobile();

    onMount(() => {
        window.addEventListener("resize", checkMobile);
    });
</script>

<div class="navbar">
    <div class="ham-button">
        <button on:click={() => toggleMenu()}>
            <svg xmlns="http://www.w3.org/2000/svg"  width="35"  height="35"  viewBox="0 0 24 24"  fill="none"  stroke="#fff"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-menu-2"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 6l16 0" /><path d="M4 12l16 0" /><path d="M4 18l16 0" /></svg>
        </button>
    </div>
    {#if menuExpanded}
    <div class="navbar-button-container">
        <a href="/">Home</a>
        <a href="https://lnk.daalbot.xyz/Invite">Invite</a>
        <a href="https://lnk.daalbot.xyz/HQ">Support</a>
        <a href="/Dashboard">Dashboard</a>
    </div>
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

    .ham-button button {
        background-color: transparent;
        border: none;
    }

    .ham-button button:hover {
        cursor: pointer;
    }

    @media only screen and (max-width: 800px) {
        /* Add background to navbar if user is on mobile */
        .navbar {
            position: absolute;
            background-color: #2f2f2f;
            top: 0;
            left: 0;

            margin: 0;
            padding: 1rem;

            display: contents;

            z-index: 0 !important;
        }
    }
</style>