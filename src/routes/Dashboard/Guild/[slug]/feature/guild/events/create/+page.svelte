<script>
    import tools from '$lib/dashboard/tools';
    import { onMount } from 'svelte';

    onMount(async() => {
        document.body.style.backgroundImage = 'linear-gradient(to right bottom, #6200ff, #6c0bf9, #7514f4, #7d1cee, #8323e9, #8724e4, #8b25df, #8e26da, #9022d4, #921fcf, #941bc9, #9517c4)';
        document.body.style.height = '91.5vh';

        const urlSearchParams = new URLSearchParams(window.location.search);

        const name = urlSearchParams.get('name');
        const description = urlSearchParams.get('description');
        const on = urlSearchParams.get('on');

        if (name && description && on) {
            // Send the data to the api
            const response = await tools.api.post(`https://api.daalbot.xyz/dashboard/events/create?name=${encodeURIComponent(name)}&description=${encodeURIComponent(description)}&on=${encodeURIComponent(on)}`)

            const resJson = JSON.parse(response ?? '{ "message": "An error occurred while creating the event", "id": "Error" }');

            if (resJson.id === 'Error') {
                alert(resJson.message);
            } else {
                alert('Event created successfully (ID: ' + resJson.id + ')');

                window.location.href = window.location.href.replace('/create', '').replace(window.location.search, '')
            }
        }
    });

    const eventTypes = [
        {
            name: 'Message Create',
            value: 'messageCreate'
        },
        {
            name: 'Message Update',
            value: 'messageUpdate'
        },
        {
            name: 'Message Delete',
            value: 'messageDelete'
        },
        {
            name: 'Channel Create',
            value: 'channelCreate'
        },
        {
            name: 'Channel Update',
            value: 'channelUpdate'
        },
        {
            name: 'Channel Delete',
            value: 'channelDelete'
        },
        {
            name: 'Guild Update',
            value: 'guildUpdate'
        },
        {
            name: 'Guild Ban Add',
            value: 'guildBanAdd'
        },
        {
            name: 'Guild Ban Remove',
            value: 'guildBanRemove'
        },
        {
            name: 'Guild Member Add',
            value: 'guildMemberAdd'
        },
        {
            name: 'Guild Member Remove',
            value: 'guildMemberRemove'
        },
        {
            name: 'Guild Member Update',
            value: 'guildMemberUpdate'
        },
        {
            name: 'Guild Role Create',
            value: 'guildRoleCreate'
        },
        {
            name: 'Guild Role Update',
            value: 'guildRoleUpdate'
        },
        {
            name: 'Guild Role Remove',
            value: 'guildRoleRemove'
        }
    ]
</script>

<svelte:head>
    <title>
        Create Event - Dashboard
    </title>
</svelte:head>

<main>
    <h1>Create Event</h1>
    <form>
        <label for="name">Name</label>
        <input type="text" id="name" name="name" required maxlength="30"><br/>

        <label for="description">Description</label>
        <input type="text" id="description" name="description" required maxlength="120"><br/>

        <label for="on">On</label>
        <select id="on" name="on" required>
            {#each eventTypes as eventType}
                <option value={eventType.value}>{eventType.name}</option>
            {/each}
        </select><br/>

        <button type="submit" on:click={
            () => {
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
        }>Create</button>
    </form>
</main>

<style>
    * {
        font-family: Poppins, sans-serif;
        color: white;
    }

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

        border-radius: 10px;

        padding: 2rem;
    }

    button {
        padding: 0.5rem 1rem;
        margin: 0.1em;
        font-size: 1.3rem;
        color: white;
        background-color: #1e1e1e;
        border: none;
        border-radius: 5px;
        cursor: pointer;

        display: block;
        margin: auto;
    }

    button:hover {
        background-color: #2e2e2e;
    }

    label {
        display: block;
        margin-top: 1rem;
        margin-bottom: 0.25rem;
        text-align: center;

        font-size: 1.5rem;
        font-weight: bold;
    }

    input[type="text"] {
        padding: 0.5rem 1rem;
        margin: 0.1em;
        font-size: 1.3rem;
        color: white;
        background-color: #1e1e1e;
        border: none;
        border-radius: 5px;
    }

    input[type="text"]:focus {
        background-color: #2e2e2e;
    }

    select {
        padding: 0.5rem 1rem;
        margin: 0.1em;
        font-size: 1.3rem;
        color: white;
        background-color: #1e1e1e;
        border: none;
        border-radius: 5px;

        margin: auto;
        display: block;

        text-align: center;
    }
</style>