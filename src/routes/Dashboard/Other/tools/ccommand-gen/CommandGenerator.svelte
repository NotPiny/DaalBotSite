<script>
    let tCommandName = 'command';
    let tCommandDescription = 'description';
    export let commandName = 'command';
    export let commandDescription = 'description';

    $: {

    }
</script>

<div class="command-gen">
    <div class="header">
        <div class="popover">
            <p>Command Generator</p>
        </div>
    </div>
    <div class="base-options">
        <label for="icname">Command Name (/command)</label>
        <input id="icname" type="text" bind:value={commandName}/>
        <input type="text" value={commandDescription}/>
    </div>
</div>

<style>
    .command-gen input {
        background-color: #2f2f2f;
        color: white;
        border: 2px solid #fff;
        border-radius: 0.5rem;
        padding: 0.5rem 1rem;
        text-decoration: underline;
        font-size: 1.5rem;
        width: 25em;
        font-family: sans-serif;
    }

    .popover {
        font-family: sans-serif;
        background-color: #2A2C30;
        color: white;
        padding: .5rem 1rem;
        border-radius: 0.5rem;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
    }
</style>