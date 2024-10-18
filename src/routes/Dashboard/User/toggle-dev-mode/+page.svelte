<svelte:head>
    <title>Toggle Dev Mode</title>
</svelte:head>

<script>
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';

    let state = false;

    function toggle() {
        if (!browser) return;

        state = !state;
        localStorage.setItem('unstable_dev_toggle', `${state}`);
    }
    
    onMount(async () => {
        state = localStorage.getItem('unstable_dev_toggle') == 'true' || import.meta.env.DEV;
    });
</script>

<main>
    <h1>Super secretive dev mode toggle</h1>
    <p>Current state: {state ? 'on' : 'off'}</p>
    <div class="control_buttons">
        <button on:click={() => toggle()}>Toggle</button>
    </div>
</main>

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
</style>