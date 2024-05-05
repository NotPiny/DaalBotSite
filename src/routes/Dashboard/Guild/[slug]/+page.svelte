<script>
    import { browser } from "$app/environment";
    import tools from '$lib/dashboard/tools';
    import { dismissables } from '$lib/tools.js';
    import { onMount } from 'svelte';
    import Switch from "../../../../components/Switch.svelte";
    import placeholderImg from '$lib/images/placeholder.png';
    
    // This is all like super old and im lowkey scared to touch it
    tools.page.applyStyles();

    let selectedCategory = '';
    let selectedFeature = '';

    /**
     * @type {{ id: string, name: string, iconURL: string | null, icon: string | null, memberCount: number }}
    */
    let guild = {
        id: '1234',
        name: 'Loading...',
        iconURL: placeholderImg,
        icon: placeholderImg,
        memberCount: 0
    };

    (async() => {
        if (browser) guild = JSON.parse(await tools.api.get('https://api.daalbot.xyz/dashboard/guilds/guild'));
    })();

    $: {
        if (selectedCategory != '' && selectedFeature != '') {
            if (browser) window.location.href = `/Dashboard/Guild/${guild.id}/feature/${selectedFeature}`; // selectedFeature should include the category as well (e.g. guild/autorole)
        }
    }

    // Okay this code should be somewhat nicer
    onMount(async() => {
        const isMobile = window.navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i); // This works i guess first iteration of mobile detection used innerWidth but i moreso want to know if they have a keyboard not a small screen
        
        if (!isMobile && !(await dismissables.seen('dashboard-search'))) {
            alert('Hey, You can use Ctrl + K to search through features now on any dashboard page!')
            dismissables.set('dashboard-search')
        }
    });
</script>

<svelte:head>
    <title>{guild.name} - Dashboard</title>
</svelte:head>

<main>
    <div class="guild-info">
        <div class="middle">
            <center><img src="{guild.iconURL?.includes('null') ? 'https://cdn.discordapp.com/embed/avatars/0.png' : guild.iconURL}" alt="{guild.name} Icon" class="guild-icon"/></center>
            <h1>{guild.name}</h1>
        </div>
    </div>

    <center>
        <h2>Categories: </h2>
        <Switch options={[
            { name: 'Server', value: 'guild' },
            { name: 'Socials', value: 'social' },
            { name: 'XP', value: 'xp' }
        ]} bind:selected={selectedCategory} /><br/><br/>

        {#if selectedCategory === 'guild'}
            <Switch options={[
                { name: 'Auto Role', value: 'guild/autorole' },
                { name: 'Config', value: 'guild/config' },
                { name: 'Logs', value: 'guild/logs' },
                { name: 'Tickets', value: 'guild/ticket' },
                { name: 'Welcoming', value: 'guild/welcome' },
                { name: 'Events', value: 'guild/events' }
            ]} bind:selected={selectedFeature}/>
        {:else if selectedCategory === 'social'}
            <Switch options={[
                { name: 'Twitter', value : 'social/twitter' },
                { name: 'Twitch', value: 'social/twitch' },
                { name: 'YouTube', value: 'social/youtube' }
            ]} bind:selected={selectedFeature}/>
        {:else if selectedCategory === 'xp'}
            <Switch options={[
                { name: 'Rewards', value: 'xp/reward' }
            ]} bind:selected={selectedFeature}/>
        {:else}
            <h2>Nothing Selected.</h2>
        {/if}
    </center>
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        width: 75%;
        height: 80%;

        margin-top: 5rem;

        margin-left: auto;
        margin-right: auto;

        background-color: #1a1b1f;
        color: white;

        border-radius: 10px;

        padding: 2rem;

        font-family: Poppins, sans-serif;
    }

    .guild-info {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        width: 75%;
    }

    .guild-info img {
        width: 10rem;
        height: 10rem;

        border-radius: 50%;
    }

    /* .left {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: start;
    } */

    .middle {
        margin: auto;
    }

    /* .right {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: end;
    } */
</style>