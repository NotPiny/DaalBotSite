<script>
    // @ts-nocheck
    import { onMount } from 'svelte';
    import dashTools from '$lib/dashboard/tools';
    import usersSVG from '$lib/images/svg/icons/users.svg';
    import Tie from '@tabler/icons-svelte/IconTie.svelte';

    let guild = {};

    onMount(async() => {
        guild = JSON.parse(await fetch(`https://api.daalbot.xyz/get/guilds/lookup?guild=${window.location.pathname.replace('/Dashboard/Global/guilds/', '')}`, {
            headers: {
                'Authorization': `${localStorage.getItem('accesscode')}`
            }
        }).then(res => res.text()));

        guild.roleCount = guild.roles.length;
    })
</script>

<svelte:head>
    <title>{guild.name} - DaalBot</title>
</svelte:head>

<main>
    <img src="{guild.icon}" alt="{guild.name}"/>
    <h1>
        {guild.name}
    </h1>

    <div class="guild-info">
        <sl-card>
            <img slot="image" src={guild.ownerAvatar} alt="Avatar of guild owner"/>
            <h3>Owner</h3>
            <strong>{guild.ownerName}</strong><br/>
            <a href="https://discordlookup.com/user/{guild.owner}" target="_blank"><small>{guild.owner}</small></a>
        </sl-card>
        <sl-card>
            <h3><strong>Stats</strong><br/></h3>
            <span><img src={usersSVG} alt="Member Icon" style="height: 15px; width: 15px;"/> <b>{guild.memberCount}</b></span><br/>
            <span><Tie style="height: 15px; width: 15px;"/> <b>{guild.roleCount}</b></span>
        </sl-card>
    </div>
</main>

<style>
    * {
        color: white;
    }

    h1 {
        font-size: 2rem;
    }

    sl-card {
        margin: 10px;
        padding: 10px;
        width: 300px;
    }

    sl-card h3 {
        text-align: center;

        margin: 0;
    }

    sl-card img {
        width: 150px;
        height: 150px;

        margin: auto;
    }

    sl-card small {
        color: var(--sl-color-neutral-500);
    }

    sl-card a {
        text-decoration: none;
    }
</style>