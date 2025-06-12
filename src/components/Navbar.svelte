<script>
    import { browser } from "$app/environment";
    import { onMount } from "svelte";

    export let menuExpanded = true;
    let menuAnimState = "expanded";
    let pathName = '/';
    let userToggle = false;

    function toggleMenu() {
        if (isMobile) {
            const mobileNavBlock = document.getElementById("mobile-nav-block");
            if (!mobileNavBlock) return;

            if (mobileNavBlock.style.display === "none") {
                mobileNavBlock.style.display = "flex";
                for (let i = 0; i <= 100; i++) {
                    setTimeout(() => {
                        if (mobileNavBlock.style.display === "none") return; // If the user closes the menu before the animation is done, stop the animation
                        mobileNavBlock.style.opacity = `${i}%`;
                    }, i * 5);
                }
                document.body.style.overflowY = "hidden";
            } else {
                mobileNavBlock.style.display = "none";
                mobileNavBlock.style.opacity = "0%";
                document.body.style.overflowY = "auto";
            }
        } else {
            menuExpanded = !menuExpanded;
            menuAnimState = menuExpanded ? "opening" : "closing";
            setTimeout(() => {
                menuAnimState = menuExpanded ? "expanded" : "closed";
            }, 500);
        }
        userToggle = true; // User has toggled the menu manually so we dont want to override it
    }

    async function checkMobile() {
        if (!browser) return false;
        // Check if the user is on a mobile device using the user agent
        let isMobile = /iPhone|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 800;

        // If the user is on a mobile device, set the menuExpanded variable to false
        menuExpanded = !isMobile;
        if (isMobile) userToggle = true; // User is on mobile so we dont want to override it

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

        window.addEventListener("scroll", () => {
            if (isMobile) return;
            if (window.scrollY > 150 && menuExpanded && !userToggle) {
                menuAnimState = "closing";
                setTimeout(() => {
                    menuExpanded = false;
                    menuAnimState = "closed";
                }, 500);
            } else if (window.scrollY < 150 && !menuExpanded && !userToggle) {
                menuExpanded = true;
                menuAnimState = "opening";

                setTimeout(() => {
                    menuAnimState = "expanded";
                }, 500);
            }

            const logo = document.getElementById("nav-logo-svg");
            if (!logo) return;

            logo.style.transition = "all .5s";
            if (window.scrollY > 150) {
                // Change the logo to pure white
                logo.style.filter = "grayscale(100%)";
            } else if (logo.style.filter !== "") {
                // Reset the logo to its original state
                logo.style.filter = "";
            }
        });
    });

    const links = [
        { href: "/", text: "Home" },
        { href: "https://go.daalbot.xyz/Invite", text: "Invite" },
        { href: "https://go.daalbot.xyz/HQ", text: "Support" },
        { href: "https://dashboard.daalbot.xyz/", text: "Dashboard", highlight: true }
    ];
</script>

<div id="mobile-nav-block" style="display: none; opacity: 0%;">
    <div class="mobile-nav-contents">
        {#each links as link}
            <a href={link.href} class:mobile-nav-highlight={link?.highlight}>{link.text}</a>
        {/each}
    </div>
</div>

<div class="navbar">
    <div class="ham-button">
        <button on:click={() => toggleMenu()} title="Toggle navigation bar" style="height: 44px;">
            <!-- DaalBot Logo (backgroundless) -->
            <svg id="nav-logo-svg" class="menu-anim-state-{menuAnimState}" width="39.75" height="44" viewBox="0 0 158 176" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_d_48_43)">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M154 0.631836H106.955L85.4014 13.7309V154.269L107.474 167.368H154V0.631836ZM116.893 25.5048H130.2V142.731H117.432L109.858 138.512V30.1672L116.893 25.5048Z" fill="url(#paint0_linear_48_43)"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.99998 0.631836H51.0452L72.5986 13.7309V154.269L50.5259 167.368H3.99998V0.631836ZM41.1063 25.5048H27.7994V142.731H40.567L48.141 138.512V30.1672L41.1063 25.5048Z" fill="url(#paint1_linear_48_43)"/>
                </g>
                <defs>
                <filter id="filter0_d_48_43" x="0" y="0.631836" width="158" height="174.736" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="4"/>
                <feGaussianBlur stdDeviation="2"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_48_43"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_48_43" result="shape"/>
                </filter>
                <linearGradient id="paint0_linear_48_43" x1="119.701" y1="0.631836" x2="119.701" y2="167.368" gradientUnits="userSpaceOnUse">
                <stop stop-color="#6C60D0"/>
                <stop offset="0.48" stop-color="#826AE3"/>
                <stop offset="1" stop-color="#6E4BB2"/>
                </linearGradient>
                <linearGradient id="paint1_linear_48_43" x1="38.2993" y1="0.631836" x2="38.2993" y2="167.368" gradientUnits="userSpaceOnUse">
                <stop stop-color="#6C60D0"/>
                <stop offset="0.48" stop-color="#826AE3"/>
                <stop offset="1" stop-color="#6E4BB2"/>
                </linearGradient>
                </defs>
            </svg>
        </button>
    </div>

    {#if !isMobile}
    <div class="navbar-button-container" class:drift-out-top={menuAnimState == 'closing' || menuAnimState == 'closed' || menuAnimState == 'opening'} class:drift-in-top={menuAnimState == 'opening'}>
        {#each links as link}
            <a href={link.href} class:desktop-nav-highlight={link?.highlight}>{link.text}</a>
        {/each}
    </div>
    {/if}
</div>

<style>
    .navbar {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

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

        height: 44px;
    }

    .ham-button button {
        background-color: transparent;
        border: none;
    }

    .ham-button button:hover {
        cursor: pointer;
    }

    #mobile-nav-block {
        z-index: 1 !important;
        position: fixed;
        top: 0;
        left: 0;

        height: 100vh;
        width: 100vw;

        background: rgb(5,5,5);
        background: radial-gradient(circle, rgba(5,5,5,1) 0%, rgba(0,0,0,0.7175245098039216) 100%);

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .mobile-nav-contents {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        gap: 1rem;

        font-family: Poppins, sans-serif;
    }

    .mobile-nav-contents a {
        color: black;
        text-decoration: none;

        font-size: 1.5rem;

        background-color: white;

        padding: 0.5rem 1rem;
        border-radius: 10px;

        width: 80%;

        text-align: center;
    }

    .mobile-nav-highlight {
        background-color: #826ae3 !important;
        color: white !important;
    }

    .desktop-nav-highlight {
        background-color: #826ae3;
        color: white;
        border-radius: 50px;
        padding: 0.5rem 1rem;
    }

    .desktop-nav-highlight:hover {
        color: white !important;

        /* Slowly change its background to white and its colour to black */
        transition: .5s;

        background-color: white;
        color: black !important;
    }

    .desktop-nav-highlight:not(:hover) {
        background-color: #826ae3;
        color: white !important;

        transition: .75s;
    }

    .drift-out-top {
        /* Slowly move the bar upward until it is at -100px */
        transition: 0.5s;
        transform: translateY(-100px);
    }

    .drift-in-top {
        /* Slowly move the bar downward until it is at 0px */
        transform: translateY(0px) !important;
    }

    *[class="menu-anim-state-*"] {
        transition: all 0.5s;
    }

    svg.menu-anim-state-expanded {
        filter: none !important;
    }

    svg.menu-anim-state-closed {
        filter: grayscale(100%);
    }

    svg.menu-anim-state-opening {
        filter: none;
    }

    svg.menu-anim-state-closing {
        filter: grayscale(100%);
    }
</style>