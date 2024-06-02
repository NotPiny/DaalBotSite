<script>
    import DevOnly from '../../components/DevOnly.svelte';

    import store from '$lib/stores/rateHits';
    import { browser } from '$app/environment';
</script>

<main>
    <h1>Test Page</h1>
    <p>If you cant see anything then you probably shouldnt be here</p>

    <p>
        Store: {$store}
    </p>

    <button on:click={async() => { browser ? store.update((n) => n + 1) : null }}>
        +
    </button>
</main>