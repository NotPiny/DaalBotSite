<script>
    import { browser } from "$app/environment";
    import tools from '$lib/dashboard/tools';
    import Switch from "../../../../components/Switch.svelte";
    import placeholderImg from '$lib/images/placeholder.png';

    if (browser) document.body.style.height = '100%';
    if (browser) document.body.style.backgroundColor = '#2f2f2f';

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
</script>

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

        font-family: Poppins, sans-serif;

        width: 75%;
        height: 50%;

        color: white;

        margin-top: 5rem;

        margin-left: auto;
        margin-right: auto;

        background-color: #3f4d68;

        border-radius: 10px;

        padding: 2rem;
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