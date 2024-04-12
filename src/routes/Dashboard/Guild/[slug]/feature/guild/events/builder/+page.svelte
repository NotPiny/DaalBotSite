<script>
    import { onMount } from "svelte";
    import Node from "./Node.svelte";

    onMount(() => {
        document.body.style.backgroundColor = '#1e1e1e'
    })
</script>

<Node>
    <h2>Hello World</h2>
    <p></p>
</Node>

<style>
    h2 {
        display: contents;

        font-family: Poppins, sans-serif;
    }
</style>