<script>
    import { onMount } from 'svelte';
    import { browser } from '$app/environment'; 
    import ProdOnly from '../../../../components/ProdOnly.svelte';
    import DevOnly from '../../../../components/DevOnly.svelte';

    /**
     * @type {URL | null}
    */
    let returnURL = null;

    /**
     * @type {string}
    */
    let returnName = 'Loading...';

    /**
     * @type {string}
    */
    let hiddenName = 'Loading...';
    
    onMount(async () => {
        const urlSearchParams = new URLSearchParams(window.location.search);

        const returnValue = urlSearchParams.get('return');
        const nameValue = urlSearchParams.get('name');

        returnURL = new URL(returnValue ?? 'https://www.example.com');

        returnName = nameValue ? `${nameValue} (${returnURL.hostname})` : returnURL.hostname;

        hiddenName = nameValue ?? returnURL.hostname; // Dont show the full URL if the name is provided
    });

    /**
     * @param {boolean} allow
    */
    async function returnData(allow) {
        if (!browser) return;

        window.location.href = `${returnURL?.href}&code=${allow ? localStorage.getItem('accesscode') : 'denied'}`
    }
</script>

<ProdOnly>
    <main>
        <h1>This page isnt out yet 💀</h1>
    </main>
</ProdOnly>

<DevOnly>
    <main>
        <h1>{returnName} is requesting access to manage DaalBot</h1>
        <p>Do you want to grant access to this website?</p>
        <p class="warning"><b>Granting access will allow "{hiddenName}" to act on your behalf and manage ALL of your servers</b></p>
        <div class="control_buttons">
            <button on:click={() => returnData(true)}>Grant Access</button>
            <button on:click={() => returnData(false)}>Deny Access</button>
        </div>
        <p class="small"><a href="https://docs.daalbot.xyz/API/auth/learn">Learn More</a></p>
    </main>
</DevOnly>

<style>
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: cornflowerblue;
        height: 100vh;

        font-family: Poppins, sans-serif;
    }

    h1 {
        font-size: 2rem;
        color: white;
    }

    p {
        font-size: 1.5rem;
        color: white;
    }

    .control_buttons {
        display: flex;
        gap: 1rem;
    }

    button {
        padding: 0.5rem 1rem;
        font-size: 1rem;
        color: white;
        background-color: #2c3e50;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    button:hover {
        background-color: #34495e;
    }

    .warning {
        color: #64200b;
    }

    .small {
        font-size: 1rem;
    }

    a {
        color: rgb(207, 197, 197);
    }
</style>