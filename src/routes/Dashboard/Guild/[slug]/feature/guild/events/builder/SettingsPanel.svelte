<script>
    /**
     * @type {Array<{name: string, value: string}>}
    */
    export let settings = [];

    export let visible = false;
</script>

<div class="settings-content" style="display: {visible ? 'block' : 'none'}">
    <div class="settings-header">
        <h2>Settings</h2>
        <button on:click={() => {visible = false}}><p>X</p></button>
    </div>
    <div class="settings-body">
        {#each settings as setting}
            <div class="setting">
                <input type="text" bind:value={setting.value} placeholder="{setting.name}"/>
            </div>
        {/each}
    </div>
    <div class="settings-footer">
        <button style="position: relative; bottom: 10px; right: 10px; padding: 1rem 1.5rem; ">Save</button>
    </div>
</div>
<!-- svelte-ignore a11y-click-events-have-key-events -->
 <!-- svelte-ignore a11y-no-static-element-interactions -->
<span class="overlay-bg" style="display: {visible ? 'block' : 'none'}" on:click={() => {visible = false}}/>

<style>
    .overlay-bg {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 1000;
    }

    .settings-content {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #1E1E1E;
        border-color: #3C3C3C;
        border-width: 3px;
        color: white;
        border-radius: 3px;
        z-index: 1001;

        min-width: 350px;
    }

    .settings-header {
        display: flex;
        justify-content: space-between;
        padding: 10px;
        border-bottom: 1px solid #3C3C3C;
    }

    .settings-header button {
        background-color: #2f2f2f;
        height: 50px;
        width: 50px;
        color: white;
        padding: 1rem;
        border: 3px solid #3C3C3C;
        border-radius: 10px;
    }

    .settings-header button p {
        margin: 0;

        position: relative;
        bottom: 3.5px;

        font-size: medium;
    }

    .settings-body {
        padding: 10px;
    }

    .setting {
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .setting input {
        width: 97%;
        padding: 5px;
        height: 30px;
        background-color: #3C3C3C;
        border: none;
        color: white;
        border-radius: 3px;
    }

    .settings-footer {
        display: flex;
        justify-content: flex-end;
        padding-top: 25px !important;
        padding: 10px;
        border-top: 1px solid #3C3C3C;
    }

    .settings-footer button {
        padding: 5px 10px;
        background-color: #3C3C3C;
        border: none;
        color: white;
        border-radius: 3px;
    }

    .settings-footer button:hover {
        background-color: #4C4C4C;
    }

    button {
        cursor: pointer;
    }
</style>