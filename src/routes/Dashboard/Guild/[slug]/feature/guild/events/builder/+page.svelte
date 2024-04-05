<script>
    import { onMount } from 'svelte';
    
    onMount(() => {
        document.body.style.height = '100%';
    })

    /**
     * @param {number} node
    */
    async function nodeClicked(node) {
        console.log('Node clicked:', node);
    }
</script>

<div class="space">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="Node-cluster">
        <div class="Node Node-1" on:click={() => nodeClicked(1)}>
            <h3 style="text-align: center; margin-bottom: 0;">If</h3>
            <h1>TODO</h1>
        </div><br/>
        <br/>
        <div class="Node Node-2" on:click={() => nodeClicked(2)}>
            <h3 style="text-align: center; margin-bottom: 0;">Then</h3>
            <h1>TODO</h1>
        </div><br/>
        <br/>
        <div class="Node Node-3" on:click={() => nodeClicked(3)}>
            <h3 style="text-align: center; margin-bottom: 0;">Otherwise</h3>
            <h1>TODO</h1>
        </div>
    </div>
</div>

<style>
    .space {
        height: 100vh;
        color: white;
        font-family: Poppins, sans-serif;
    }

    .Node-cluster {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        justify-content: center;
        align-items: center;

        height: 100%;
    }

    .Node {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        padding: 1rem;

        background-color: #353636;
        border-radius: 10px;

        cursor: pointer;
    }
</style>