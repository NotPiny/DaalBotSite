<script>
    import { browser } from "$app/environment";
    import { platform } from "$lib/tools";
    import { Guild, LSUser } from "$lib/dashboard/types";
    import tools from "$lib/dashboard/tools";
    import '$lib/dashboard/global.css';

    /**@type {Array<Guild>}*/
    let guilds = [];
    /**@type {Array<Guild>}*/
    let uninvitedGuilds = [];
    /**@type {Array<Guild>}*/
    let guildsUnfiltered = [];

    /**@type {LSUser}*/
    let userDataV = {
        id: '',
        username: '',
        avatar: '',
        avatarURL: '',
        guilds: []
    };

    if (browser) {
        const userData = JSON.parse(localStorage.getItem('user') ?? '{}');
        userDataV = userData;

        if (userData.guilds) {
            // @ts-ignore
            guilds = userData.guilds.filter(guild => guild.permissions & 0x20); // 0x20 = Manage Guild
            guildsUnfiltered = userData.guilds; // For getting other stuff

            (async() => {
                const mutualGuildsReq = await fetch('https://api.daalbot.xyz/get/guilds/mutual', {
                    headers: {
                        'Authorization': `${localStorage.getItem('accesscode')}`
                    }
                });

                /**
                 * @type {Array<string>}
                */
                const mutualGuilds = await mutualGuildsReq.json();

                uninvitedGuilds = guilds.filter(guild => !mutualGuilds.includes(guild.id));
                guilds = guilds.filter(guild => mutualGuilds.includes(guild.id));
            })();
        }

        document.body.style.backgroundColor = '#2f2f2f';
    }
</script>

{#if platform === 'desktop'}
    <div class="guilds">
        {#each guilds as guild}
            <a href="/Dashboard/Guild/{guild.id}" class="guild" style="background-image: url('{guild.iconURL?.includes('null') ? 'https://cdn.discordapp.com/embed/avatars/0.png' : guild?.iconURL}')">
                <h2>{guild.name}</h2>
            </a>
        {/each}
        {#if userDataV.id === '900126154881646634'}
            <a href="/Dashboard/Global" class="guild" style="background-image: url('https://media.piny.dev/DaalBotSquare.png')">
                <h2>Global</h2>
            </a>
        {/if}
    </div>
    {#if uninvitedGuilds.length > 0}
        <h1>Uninvited</h1>
    {/if}
    <div class="guilds">
        {#each uninvitedGuilds as guild}
            <a href="https://lnk.daalbot.xyz/Invite?guild_id={guild.id}" class="guild uninvited" style="background-image: url('{guild.iconURL?.includes('null') ? 'https://cdn.discordapp.com/embed/avatars/0.png' : guild?.iconURL}')">
                <h2>{guild.name}</h2>
            </a>
        {/each}
    </div>
{:else}
    <div class="user-logged-in">
        <p class="start">Logged in as</p><img src="{userDataV.avatarURL}" alt="Profile picture of {userDataV.username}" /><p><b>{userDataV.username}</b></p>
    </div>

    <div class="guilds">
        {#each guilds as guild}
            <a href="/Dashboard/Guild/{guild.id}" class="guild">
                <div class="guild-info">
                    <img src="{guild.iconURL?.includes('null') ? 'https://cdn.discordapp.com/embed/avatars/0.png' : guild?.iconURL}" alt="Icon of {guild.name}" />
                    <h2>{guild.name.length > 13 ? `${guild.name.replace(guild.name.slice(13, guild.name.length), '')}...` : guild.name}</h2>
                </div>
            </a>
        {/each}

        {#each uninvitedGuilds as guild}
            <a href="https://lnk.daalbot.xyz/Invite?guild_id={guild.id}" class="guild uninvited">
                <div class="guild-info">
                    <img src="{guild.iconURL?.includes('null') ? 'https://cdn.discordapp.com/embed/avatars/0.png' : guild?.iconURL}" alt="Icon of {guild.name}" />
                    <h2>{guild.name.length > 13 ? `${guild.name.replace(guild.name.slice(13, guild.name.length), '')}...` : guild.name}</h2>
                </div>
            </a>
        {/each}
    </div>
{/if}
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="something-wrong">
    <p class="subtext">Something don't look right? <span id="cache-clear" class="action-text" on:click={() => {
        if (!browser) return;
        localStorage.removeItem('user');
        localStorage.removeItem('accesscode');
        localStorage.removeItem('userraw');
        window.location.href = '/Dashboard';
    }}>Clear cache</span> or <span id="bug-report" class="action-text" on:click={()=>{
        if (!browser) return;
        alert('This feature is not available yet. Please report the bug in the DaalBot HQ Discord server. (go.daalbot.xyz/HQ)');
    }}>Report bug</span>.</p>
</div>

<style>
    .guilds {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;

        margin: 5rem;
    }

    .guild {
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;

        width: 20rem;
        height: 20rem;

        border-radius: 10px;
        border: 5px solid white;

        margin: 10px;

        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: end;

        text-decoration: none;
        color: white;
    }

    .guild h2 {
        font-family: Poppins, sans-serif;
        font-size: 1.5rem;
        color: white;
        text-align: center;

        /* Outline */
        -webkit-text-stroke: 1px black;
    }

    @media only screen and (max-width: 768px) {
        .guilds {
            position: absolute;
            left: 5.09%;
            right: 5.19%;
            top: 13.49%;
            bottom: 2.97%;

            background: rgba(217, 217, 217, 0.4);
            border-radius: 24px;

            margin: 0;

            height: 85%;
            overflow-y: auto;

            /* Colour the overflow bar */
            scrollbar-color: #2f2f2f #2f2f2f;

            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            /* Overflow to the bottom instead of the right */
            flex-wrap: nowrap;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            height: auto;
            overflow-y: auto;

            gap: 0.25rem;
        }

        .guild {
            position: relative;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            background: rgba(25, 25, 25, 0.4);
            border-radius: 24px;
            border-color: transparent;
            height: 5rem;
            width: 90%;
            align-items: center;
        }

        .guild .guild-info {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;

            gap: 0.5rem;

            /* Truncation */
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .guild img {
            width: 50px;
            height: 50px;
            border-radius: 50%;

            margin-top: 24px;
            margin-bottom: 24px;
        }

        .guild h2 {
            font-size: 1.75rem;

            width: 90%;
        }

        .uninvited {
            background: rgba(87, 11, 11, 0.4) !important;
        }
    }

    /* @media only screen and (min-width: 768px) {
        .uninvited {
            /* Greyscale the background image * /
            filter: grayscale(100%);
        }

        .uninvited h2 {
            /* Outline text * /
            -webkit-text-stroke: 1px black;
        }
    } */

    .user-logged-in {
        /* Generated by figma :D */
        position: absolute;
        left: 5.09%;
        right: 5.19%;
        top: 2.6%;
        bottom: 88.7%;

        background: rgba(217, 217, 217, 0.4);
        border-radius: 24px;

        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .user-logged-in p {
        font-family: Poppins, sans-serif;
        font-size: 1.5rem;
        color: white;

        position: relative;

        text-align: center;
        display: inline;
    }

    .user-logged-in img {
        width: 35px;
        height: 35px;
        border-radius: 50%;

        display: inline;

        margin-top: 24px;
        margin-bottom: 24px;

        margin-left: 5px;
        margin-right: 5px;
    }

    h1 {
        font-family: Poppins, sans-serif;
        font-size: 2rem;
        color: white;
        text-align: center;
    }

    .something-wrong {
        position: relative;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        margin-bottom: 1rem;

        background-color: #1f1f1f;
        padding: 0.25rem 1.5rem;

        border-radius: 10px;
        border: 1px solid #ffffff;

        width: 25%;
    }

    .subtext {
        font-family: Poppins, sans-serif;
        font-size: 1rem;
        color: white;
        text-align: center;

        width: 100%;
    }

    .action-text {
        color: #b2b2b2;

        cursor: pointer;
        text-decoration: underline;
    }
</style>