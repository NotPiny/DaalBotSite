<script>
    /**
     * @type {{name: string, value: string}[]}
     */
    export let options = [];

    export let selected = '';
    
    /**
     * @param {{value: string}} option
     */
    const selectOption = (option) => {
        selected = option.value;
    };
</script>

<style>
    div {
        display: inline-block;
        padding: 5px;
        border: 1px solid #fff;
        border-radius: 5px;
    }
    
    .option {
        display: inline-block;
        padding: 10px;
        cursor: pointer;
        margin: 5px;
    }

    button {
        background-color: #2c2e31;
        color: #fff;
        border: none;
        border-radius: 5px;
        padding: 10px;
        cursor: pointer;
        margin: 5px;
    }

    .selected {
        background-color: #222427;
    }
</style>

<div>
    {#each options as option (option.value)}
        <button 
            class="option {selected === option.value ? 'selected' : ''}" 
            on:click={() => selectOption(option)}
        >
            {option.name}
        </button>
    {/each}
</div>