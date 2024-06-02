<script>
    import tools from '$lib/dashboard/tools';
    import { onMount } from 'svelte';
    import discordIcon from '$lib/images/svg/icons/discord.svg';

    let error = 'unknownError';

    onMount(async() => {
        await tools.page.applyStyles();

        const params = new URLSearchParams(window.location.search);
        const errorParam = params.get('e');

        if (errorParam) {
            error = errorParam;
        }
    })

    // Redirect to the login page
    const Login = () => window.location.href = `https://discord.com/oauth2/authorize?client_id=1016086353085222993&redirect_uri=https%3A%2F%2Fbot.daalbot.xyz%2Fget%2Fauth%2FaccessCode${import.meta.env.DEV ? '%3Fdev%3D1' : ''}&response_type=code&scope=identify%20guilds`;
</script>

<svelte:head>
    <script type="module" src="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.15.0/cdn/shoelace.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.15.0/cdn/themes/dark.css" />
</svelte:head>

<main class="sl-theme-dark">
    <h1>Error</h1>
    <p>
        {#if error == 'invalidBearerToken'}
        Your session has expired. Please log in again. <br/>
        <center>
            <br/>
            <!-- Svelte chill shoelace has this figured out i think -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <sl-button size="large" on:click={Login}>
                <!-- <img src={discordIcon} alt="Discord" width="20" height="20" style="margin-left: 5px;" slot="prefix"/> -->
                Log in with Discord
            </sl-button>
        </center>
        {:else if error == 'pasteExpired'}
            The paste you're trying to view has expired.
        {:else}
            An unknown error occurred. Please try again later.
        {/if}
    </p>
</main>

<style>
    main {
        color: white; /* Why doesnt applyStyles do this? */
    }
</style>