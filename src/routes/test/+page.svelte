<script>
    import DevOnly from '../../components/DevOnly.svelte';
</script>

<main>
    <h1>Test Page</h1>
    <p>This is a test page to test the DevOnly component</p>
    <DevOnly>
        <p>This is only visible in development mode</p>
    </DevOnly>
</main>