<script>
    import { onMount } from 'svelte';
    import dashTools from '$lib/dashboard/tools';
    import usersSVG from '$lib/images/svg/icons/users.svg';
    import crownSVG from '$lib/images/svg/icons/crown.svg';
    import '$lib/dashboard/global.css';

    /**
     * @type {Array<{name: string, id: string, icon: string, owner: string, ownerName: string, memberCount: number}>}
     */
    let guilds = [];

    onMount(async() => {
        guilds = JSON.parse(await fetch('https://api.daalbot.xyz/get/guilds/all', {
            headers: {
                'Authorization': `${localStorage.getItem('accesscode')}`
            }
        }).then(res => res.text()));

        // Sort guilds by member count
        guilds.sort((a, b) => b.memberCount - a.memberCount);
    })
</script>

<svelte:head>
    <title>Guilds - DaalBot</title>
</svelte:head>

<main>
    <h1>
        Guilds
    </h1>

    <div class="guilds">
        {#each guilds as guild}
            <sl-card>
                <img slot="image" src="{guild.icon ?? 'https://cdn.discordapp.com/embed/avatars/0.png'}" alt="Icon of guild" />
                <strong><a href="/Dashboard/Global/guilds/{guild.id}">{guild.name}</a></strong><br />
                <span><img src={crownSVG} alt="Crown Icon" style="height: 15px; width: 15px;"/> <b>{guild.ownerName}</b></span><br />
                <span><img src={usersSVG} alt="Member Icon" style="height: 15px; width: 15px;"/> <b>{guild.memberCount}</b></span><br />
                <small>{guild.id}</small>
            </sl-card>
        {/each}
    </div>
</main>

<style>
    * {
        color: white;
    }

    h1 {
        font-size: 2rem;
    }

    .guilds {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;

        gap: 1rem;

        overflow-y: scroll;
    }

    sl-card img {
        width: 150px;
        height: 150px;

        margin: auto;
    }

    sl-card small {
        color: var(--sl-color-neutral-500);
    }
</style>