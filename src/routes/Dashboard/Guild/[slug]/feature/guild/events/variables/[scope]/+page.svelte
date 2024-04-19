
    <script>
    import tools from '$lib/dashboard/tools';
    import { onMount } from 'svelte';
    import Popup from '../../../../../../../../../components/Popup.svelte';
    import { browser } from '$app/environment';

    onMount(() => {
        document.body.style.backgroundImage = 'linear-gradient(to right bottom, #6200ff, #6c0bf9, #7514f4, #7d1cee, #8323e9, #8724e4, #8b25df, #8e26da, #9022d4, #921fcf, #941bc9, #9517c4)';
        document.body.style.height = '91.5vh';
    });

    /**
     * @typedef {{
     *    id: string,
     *   name: string,
     *   description: string,
     *   on: string,
     *   enabled: boolean,
     * }} variable
    */

    /**
     * @type {Array<variable>}
     */
    let variables = [];

    (async () => {
        if (!browser) return;
        const response = await tools.api.get('https://api.daalbot.xyz/dashboard/events/variables')

        const data = JSON.parse(response);

        variables = data;
    })();

    /**
     * @param {variable} variable
     */
    async function showInfo(variable) {
        if (!browser) return;
        const infoPopup = document.getElementById('popup-info');

        selectedVariable = variable;

        if (!infoPopup) return;
        infoPopup.style.display = 'block';
    }

    /**
     * @type {variable | null}
    */
    let selectedVariable = null;

    async function deletevariable() {
        if (!browser) return;
        const confirmation = confirm('Are you sure you want to delete this variable?');

        if (confirmation) {
            console.log('Deleting variable');
        }

        // Tell API to delete variable
        console.log('Deleting variable...')
        await fetch(`https://api.daalbot.xyz/dashboard/events/removevar?guild=${await tools.guild.extractURL(window.location.href)}&id=${selectedVariable?.id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `${localStorage.getItem('accesscode')}`
            }
        });

        window.location.reload();
    }
</script>

<Popup id="info">
    <h1>{selectedVariable?.name}</h1>
    <p>{selectedVariable?.description}</p>
    <p>Enabled: {selectedVariable?.enabled ? 'Yes' : 'No'}</p>
    <p>On: {selectedVariable?.on}</p>

    <p style="text-align: center">
        <button class="popup-button" on:click={async() => {
            if (!browser) return;
    
            const currentState = selectedVariable?.enabled;
            // @ts-ignore
            selectedVariable.enabled = !currentState;

            // Tell API to update variable
            console.log('Toggling variable state...')
            await fetch(`https://api.daalbot.xyz/dashboard/variables/toggle?guild=${await tools.guild.extractURL(window.location.href)}&id=${selectedVariable?.id}&state=${selectedVariable?.enabled}`, {
                method: 'POST',
                headers: {
                    'Authorization': `${localStorage.getItem('accesscode')}`
                }
            });
            console.log('Got response')

            // Refresh page
            window.location.reload();
        }}>Toggle</button>
    
        <button class="popup-button" on:click={async() => {
            if (browser) {
                window.location.href += `/edit#${selectedVariable?.id}`
            }
        }}>Edit</button><br/>
    
        <button class="popup-button" on:click={() => deletevariable()}>Delete</button>
    </p>
</Popup>

<main>
    <h1>Variables</h1>

    <div class="variable-list">
        {#each variables as variable}
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div class="variable" id="variable-{variable.id}" on:mousedown={() => showInfo(variable)}>
                <span class="enabled-indicator enabled-indicator-{variable.enabled}" />
                <h3 style="margin-right: 1em">{variable.name}</h3>
                <p class="on-text">on {variable.on}</p>
            </div>
        {/each}
    </div>

    <button class="add-button" on:click={() => {
        if (browser) {
            window.location.href += '/create'
        }
    }} style="margin-top: 1rem;">+</button>
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

    .variable-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .variable {
        display: flex;
        flex-direction: row;
        gap: 0.5rem;

        padding: 1rem;

        background-color: #353636;
        border-radius: 10px;
    }

    .on-text {
        font-size: 0.8rem;

        /* Center vertically */
        display: flex;
        align-items: center;

        /* Push to right side of UI */
        margin-left: auto;
    }

    .enabled-indicator {
        width: 1rem;
        height: 1rem;
        border-radius: 50%;

        position: relative;
        top: 37%;
    }

    .enabled-indicator-true {
        background-color: lime;
    }

    .enabled-indicator-false {
        background-color: red;
    }

    .popup-button {
        padding: 0.5rem 1rem;
        margin: 0.1em;
        font-size: 1.3rem;
        color: white;
        background-color: #2c3e50;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    .add-button {
        padding: 0.5rem 1rem;
        margin: 0.1em;
        font-size: 1.3rem;
        color: white;
        background-color: #444444;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    .variable-view {
        padding: 0.5rem 1rem;
        margin: 0.1em;
        font-size: 1.3rem;
        color: white;
        background-color: #444444;
        border: none;
        border-radius: 5px;
        cursor: pointer;

        margin-top: -1rem;
        margin-bottom: 2rem;
    }
</style>
