<script>
    import tools from '$lib/dashboard/tools';
    import Popup from '../../../../../../../components/Popup.svelte';
    import { browser } from '$app/environment';

    /**
     * @typedef {{
     *    id: string,
     *   name: string,
     *   description: string,
     *   on: string,
     *   enabled: boolean,
     * }} Event
    */

    /**
     * @type {Array<Event>}
     */
    let events = [];

    (async () => {
        if (!browser) return;
        const response = await tools.api.get('https://api.daalbot.xyz/dashboard/events/entires')

        const data = JSON.parse(response);

        events = data;
    })()

    /**
     * @param {Event} event
     */
    async function showInfo(event) {
        if (!browser) return;
        const infoPopup = document.getElementById('popup-info');

        selectedEvent = event;

        if (!infoPopup) return;
        infoPopup.style.display = 'block';
    }

    /**
     * @type {Event | null}
    */
    let selectedEvent = null;

    async function deleteEvent() {
        if (!browser) return;
        const confirmation = confirm('Are you sure you want to delete this event?');

        if (confirmation) {
            console.log('Deleting event');
        }

        // Tell API to delete event
        console.log('Deleting event...')
        await fetch(`https://api.daalbot.xyz/dashboard/events/remove?guild=${await tools.guild.extractURL(window.location.href)}&id=${selectedEvent?.id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `${localStorage.getItem('accesscode')}`
            }
        });

        window.location.reload();
    }
</script>

<svelte:head>
    <title>Events - Dashboard</title>
</svelte:head>

<Popup id="info">
    <h1>{selectedEvent?.name}</h1>
    <p>{selectedEvent?.description}</p>
    <p>Enabled: {selectedEvent?.enabled ? 'Yes' : 'No'}</p>
    <p>On: {selectedEvent?.on}</p>

    <p style="text-align: center">
        <button class="popup-button" on:click={async() => {
            if (!browser) return;
    
            const currentState = selectedEvent?.enabled;
            // @ts-ignore
            selectedEvent.enabled = !currentState;

            // Tell API to update event
            console.log('Toggling event state...')
            await fetch(`https://api.daalbot.xyz/dashboard/events/toggle?guild=${await tools.guild.extractURL(window.location.href)}&id=${selectedEvent?.id}&state=${selectedEvent?.enabled}`, {
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
                window.location.href += `/edit#${selectedEvent?.id}`
            }
        }}>Edit</button><br/>
    
        <button class="popup-button" on:click={() => deleteEvent()}>Delete</button>
    </p>
</Popup>

<main>
    <h1>Events</h1>

    <!-- <button on:click={() => {
        if (browser) {
            window.location.href += '/variables'
        }
    }} class="variable-view">
        Variables
    </button> -->

    <div class="event-list">
        {#each events as event}
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div class="event enabled-indicator-{event.enabled}" id="event-{event.id}" on:mousedown={() => showInfo(event)}>
                <h3 style="margin-right: 1em">{event.name}</h3>
                <p class="on-text">on {event.on}</p>
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
        height: 100%;
    }

    .event-list {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: flex-start;
        align-content: center;
        gap: 1rem;
    }

    .event {
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

    .enabled-indicator-false {
        background-color: #3b2929;
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