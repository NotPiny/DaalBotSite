<script>
    import { browser } from "$app/environment";

    if (browser) {
        document.body.style.backgroundColor = "#2F3136";
    }

    let ifStatements = [
        {
            input: "",
            operator: "",
            value: ""
        }
    ];

    /**
     * @type {Array<{
     *    action: string,
     *    data: any
     * }>}
     */
    let actions = [
        {
            action: "",
            data: {}
        }
    ];

    $: {
        if (ifStatements.length >= 1) {
            // Check if the last if statement has a value
            if (ifStatements[ifStatements.length - 1].input != "" && ifStatements[ifStatements.length - 1].operator != "" && ifStatements[ifStatements.length - 1].value != "" && ifStatements.length <= 10) {
                ifStatements.push({
                    input: "",
                    operator: "",
                    value: ""
                });
            }
        }

        if (actions.length >= 1) {
            // Check if the last action has a value
            if (actions[actions.length - 1].action != "" && Object.keys(actions[actions.length - 1].data).length === 0 && actions.length <= 10) {
                actions.push({
                    action: "",
                    data: {}
                });
            }

            const currentAction = actions[actions.length - 1];

            if (currentAction.action == "Send Message") {
                currentAction.data = {
                    content: ""
                }
            } else if (currentAction.action == "Send Reaction") {
                currentAction.data = ""
            } else if (currentAction.action == "Create Channel") {
                currentAction.data = {
                    name: ""
                }
            } else if (currentAction.action == "Kick Member") {
                currentAction.data = {
                    reason: ""
                }
            } else if (currentAction.action == "Ban Member") {
                currentAction.data = {
                    reason: ""
                }
            }
        }
    }
</script>

<h1>Event Builder</h1>
<main>
    <h2>On:</h2><br/>
    <select id="on-type">
        <option disabled selected>Select a option...</option>
        <option>Message</option>
        <option>Reaction</option>
        <option>Channel</option>
        <option>Member</option>
        <option>Role</option>
        <option>Emoji</option>
    </select>
    <select id="on-event">
        <option disabled selected>Select a option...</option>
        <option>Create</option>
        <option>Update</option>
        <option>Delete</option>
    </select>

    <h2>If:</h2><br/>
    {#each ifStatements as ifStatement}
    <select id="if-input" bind:value={ifStatement.input}>
        <option disabled selected>Select a option...</option>
        <option>Message Content</option>
        <option>Message Author</option>
        <option>Message Channel</option>
        <option>Member Username</option>
        <option>Member Nickname</option>
        <option>Member Roles</option>
    </select>
    <select id="if-operator" bind:value={ifStatement.operator}>
        <option disabled selected>Select a option...</option>
        <option>Equal to</option>
        <option>Not equal to</option>
        <option>Contains</option>
        <option>Does not contain</option>
        <option>Starts With</option>
        <option>Ends With</option>
        <option>Match</option>
    </select>
    <input id="if-value" type="text" placeholder="Value..." bind:value={ifStatement.value}/><br/>
    {/each}
    <input id="if-advanced" type="text" placeholder="Advanced if control (overrides if section)" /><br/>
    <h2>Then:</h2><br/>
    {#each actions as action}
    <select id="then-action" bind:value={action.action}>
        <option disabled selected>Select a option...</option>
        <option>Send Message</option>
        <option>Send Reaction</option>
        <option>Create Channel</option>
        <option>Kick Member</option>
        <option>Ban Member</option>
    </select>
    {#if action.action == "Send Message"}
    <input id="then-data" type="text" placeholder="Message content..." bind:value={action.data.content}/>
    {/if}
    {#if action.action == "Send Reaction"}
    <input id="then-data" type="text" placeholder="Emoji (unicode or escaped)" bind:value={action.data}/>
    {/if}
    {#if action.action == "Create Channel"}
    <input id="then-data" type="text" placeholder="Channel name..." bind:value={action.data.name}/>
    {/if}
    {#if action.action == "Kick Member"}
    <input id="then-data" type="text" placeholder="Reason..." bind:value={action.data.reason}/>
    {/if}
    {#if action.action == "Ban Member"}
    <input id="then-data" type="text" placeholder="Reason..." bind:value={action.data.reason}/>
    {/if}
    {/each}
</main>

<style>
    * {
        font-family: Poppins, sans-serif;
        color: white;
    }

    h1 {
        font-size: 2.5rem;
        font-weight: 600;
        margin-bottom: 1rem;

        text-align: center;

        margin-top: 0rem;
        padding-top: 1rem;
    }

    main {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr;

        width: 75%;
        height: 50%;

        margin-top: 5rem;

        margin-left: auto;
        margin-right: auto;

        background-color: #3f4d68;

        border-radius: 10px;

        padding: 2rem;
    }
    
    select {
        border: 1px solid #3f4d68;
        border-radius: 5px;
        background-color: #2F3136;
        color: white;

        padding: 0.5rem;
    }

    input {
        border: 1px solid #3f4d68;
        border-radius: 5px;
        background-color: #2F3136;
        color: white;

        padding: 0.5rem;
    }
</style>