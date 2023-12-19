<script>
    import { browser } from "$app/environment";
    /**
     * @type {Array<{ id: string, name: string, iconURL: string | null, icon: string | null }>}
    */
    let guilds = [];

    if (browser) {
        const userData = JSON.parse(localStorage.getItem('user') ?? '{}');

        if (userData.guilds) {
            guilds = userData.guilds;
        }

        document.body.style.backgroundColor = '#2f2f2f';
    }
</script>

<div class="guilds">
    {#each guilds as guild}
        {#if !(guild.iconURL?.includes('null'))}
            <a href="/Dashboard/Guild/{guild.id}" class="guild" style="background-image: url('{guild.iconURL}')">
                <h2>{guild.name}</h2>
            </a>
        {:else}
            <a href="/Dashboard/Guild/{guild.id}" class="guild" style="background-image: url('https://cdn.discordapp.com/embed/avatars/0.png')">
                <h2>{guild.name}</h2>
            </a>
        {/if}
    {/each}
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
        font-size: 1.5rem;

        -webkit-text-stroke: 1px black;

        font-family: Poppins, sans-serif;

        /* background-color: black;
        opacity: 0.5; */
    }
</style>