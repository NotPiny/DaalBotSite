<svelte:head>
    <title>XP Rewards - Dashboard</title>
</svelte:head>

<script>
// @ts-nocheck
// ^ I tried fixing this but type checking is a pain and was complaining about guild possibly being null

    import { browser } from "$app/environment";
    import tools from "$lib/dashboard/tools";

    // Icons
    import IconPencil from "$lib/images/svg/icons/pencil.svg"
    import IconPlus from "$lib/images/svg/icons/plus.svg"
    import IconCross from "$lib/images/svg/icons/cross.svg"
    import { APIGuild } from "$lib/dashboard/types";
    import { onMount } from "svelte";

    /**
     * @type {APIGuild | null}
    */
    let guild = null;

    /**
     * @type {{name: string, value: string, roleName: string}[]}
     */
    let xpRewardJSON = [];

    /**
     * @type {{level: number, role: string, roleID: string}[]}
    */
    let xpRewardData = [
        {
            level: 1,
            role: 'Test',
            roleID: '123456789'
        }
    ];

    async function fetchXPData() {
        const res = tools.api.get('https://api.daalbot.xyz/dashboard/xp/rewards')

        xpRewardJSON = JSON.parse(await res)

        // @ts-ignore
        xpRewardData = xpRewardJSON.map(xpReward => {
            return {
                level: parseInt(xpReward.name.replace('.reward', '')),
                role: xpReward.roleName,
                roleID: xpReward.value
            }
        })
    }

    if (browser) {
        fetchXPData()
        submitRewardData()

        const editForm = document.getElementById('edit-form')
        editForm?.addEventListener('submit', () => {
            setTimeout(() => window.location.reload(), 1 * 1000);
        })

        const addForm = document.getElementById('add-form')
        addForm?.addEventListener('submit', () => {
            if (xpRewardData.find(xpReward => xpReward.level == parseInt(new URLSearchParams(window.location.search).get('level') ?? '0'))) {
                alert('A reward for this level already exists, please edit the existing reward instead.')
                return;
            } else {
                console.log(`Level ${new URLSearchParams(window.location.search).get('level') ?? '0'} does not exist, creating...`)
                setTimeout(() => window.location.reload(), 1 * 1000);
            }
        })
    }

    async function submitRewardData() {
        const urlParams = new URLSearchParams(window.location.search);
        const level = urlParams.get('level'); // Level number
        const role = urlParams.get('role'); // Role ID

        if (!level || !role) return; // If no level or role is provided form is not submitted, return

        // Tell API to update reward (or create if it doesnt exist)
        const resRaw = await fetch(`https://api.daalbot.xyz/dashboard/xp/rewards?guild=${window.location.href.split("/Dashboard/Guild/")[1].split("/")[0]}`, {
            method: 'POST',
            headers: {
                'Authorization': `${localStorage.getItem('accesscode')}`,
                data: `{ "name": "${level}", "value": "${role}"  }`,
            }
        })

        const res = await resRaw.text()

        // If API returns 200, reload page
        if (res === 'OK') {
            console.log('success: ' + res)
            // window.location.reload()
        } else {
            // If API returns anything else, log error
            alert('Something went wrong while submitting the form, please try again.')
            console.error('error: ' + res)
        }
    }

    // Data wont always be stored in here but will be loaded alongside the popup menu
    let currentLevelEdit = 0;
    let currentRoleEdit = '';

    /**
     * @param {number} level
     * @param {string} roleID
    */
    function popup_menu_edit_xp_reward(level, roleID) {
        if (!browser) return;

        const editPopup = document.getElementById('popup_edit-menu')
        currentLevelEdit = level;
        currentRoleEdit = roleID;

        // @ts-ignore
        editPopup.style.display = 'block'
    }

    function popup_menu_add_xp_reward() {
        if (!browser) return;

        const addPopup = document.getElementById('popup_add-menu')

        // @ts-ignore
        addPopup.style.display = 'block'
    }

    /**
     * @param {number} level
     */
    async function delete_xp_reward(level) {
        if (!browser) return;

        async function deleteReward() {
            const resRaw = await fetch(`https://api.daalbot.xyz/dashboard/xp/reward?guild=${window.location.href.split("/Dashboard/Guild/")[1].split("/")[0]}&level=${level}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `${localStorage.getItem('accesscode')}`
                }
            })

            const res = await resRaw.text()

            // If API returns 200, reload page
            if (res === 'Success') { // Why does it return Success instead of OK? Idk i blame past me
                console.log('success: ' + res)
                window.location.reload()
            } else {
                // If API returns anything else, log error
                alert('Something went wrong while deleting the reward, please try again.')
                console.error('error: ' + res)
            }
        }

        if (confirm(`Are you sure you want to delete the reward for level ${level}?`)) {
            deleteReward()
        }
    }

    onMount((async () => {
        guild = await tools.guild.getCurrent(false, true);
    }))
</script>
<div class="popup" id="popup_edit-menu" style="display: none">
    <br/>
    <h1>Edit reward</h1>
    <form id="edit-form">
        <label for="level"><h2><b>Level</b></h2></label>
        <input type="number" id="level" name="level" min="1" value="{currentLevelEdit}" disabled required/>
        <br/><br/>
        <label for="role"><h2><b>Role</b></h2></label>
        <select id="role" name="role" required value="{currentRoleEdit}">
            {#if guild?.roles}
                {#each guild?.roles as role}
                    {#if role.name != '@everyone'}
                        <option value={role.id}>{role.name}</option>
                    {/if}
                {/each}
            {:else}
                <option value="123456789">Loading...</option>
            {/if}
        </select>
        <br/><br/>
        <button type="submit">Submit</button>
    </form>
</div>

<div class="popup" id="popup_add-menu" style="display: none">
    <br/>
    <h1>Add reward</h1>
    <form id="add-form">
        <label for="level"><h2><b>Level</b></h2></label>
        <input type="number" id="level" name="level" min="1" required/>
        <br/><br/>
        <label for="role"><h2><b>Role</b></h2></label>
        <select id="role" name="role" required>
            {#if guild?.roles}
                {#each guild.roles as role}
                    {#if role.name != '@everyone'}
                        <option value={role.id}>{role.name}</option>
                    {/if}
                {/each}
            {:else}
                <option value="123456789">Loading...</option>
            {/if}
        </select>
        <br/><br/>
        <button type="submit">Submit</button>
    </form>
</div>
<!-- TODO: Redo this page using tabler -->
<main>
    <h1>XP Rewards</h1>
    <button class="action-reward-extended" on:click={() => popup_menu_add_xp_reward()}><img src={IconPlus} alt="Add item"/> <span style="margin: auto; margin-bottom: 0.25rem; color: black; text-align:center;">Add reward</span></button>
    <table>
        <thead>
            <tr>
                <th>Level</th>
                <th>Name</th>
                <th>ID</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {#if xpRewardData[0].roleID != '123456789'}
                {#each xpRewardData as xpReward}
                    <tr class="gapped">
                        <td><pre>{xpReward.level} </pre></td>
                        <td class="has_line"><pre> @{xpReward.role} </pre></td>
                        <td class="has_line"><pre> {xpReward.roleID} </pre></td>
                        <td class="has_line"><span class="action-buttons"><button class="action-reward bg_pencil" on:click={() => popup_menu_edit_xp_reward(xpReward.level, xpReward.roleID)}></button><button class="action-reward bg_cross" on:click={() => delete_xp_reward(xpReward.level)}></button></span></td>
                    </tr>
                {/each}
            {:else}
                <tr>
                    <td colspan="2">No XP Rewards</td>
                </tr>
            {/if}
    </table>
</main>

<style>
    * {
        font-family: Poppins, sans-serif;
        color: white;
    }

    /**
    main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        width: 75%;
        height: 50%;

        margin-top: 5rem;

        margin-left: auto;
        margin-right: auto;

        background-color: #3f4d68;

        border-radius: 10px;

        padding: 2rem;
    }
    */

    table {
        max-height: 5rem;

        margin-top: 2.5rem;

        margin-left: auto;
        margin-right: auto;

        background-color: #2f3746;

        border-radius: 10px;

        padding: 2rem;
    }

    tbody {
        overflow-y: scroll;
    }

    /* Add lines between each collumn */
    .has_line {
        border-left: 1px solid white;
    }

    tr {
        text-align: center;
    }

    .action-reward {
        background-color: white;
        color: black;
        border: 3px solid black;
        border-radius: 5px;
        padding: 0.5rem;
        margin: 0.5rem;
        margin-right: 0;

        margin-top: auto;
        margin-bottom: auto;

        height: 2rem;
        width: 2rem;

        /* Center content inside */
        display: flex;
        justify-content: center;

        cursor: pointer;
    }

    .action-reward-extended {
        background-color: white;
        color: black;
        border: 3px solid black;
        border-radius: 5px;
        padding: 0.25rem;
        margin: 0.5rem;
        margin-right: 0;

        margin-top: auto;
        margin-bottom: auto;

        height: 2rem;
        min-width: 2rem;

        /* Center content inside */
        display: flex;
        justify-content: center;

        cursor: pointer;
    }

    .popup {
        position: fixed;
        top: 50%;
        left: 50%;

        transform: translate(-50%, -50%);

        width: 50%;
        height: 50%;

        background-color: #141922;

        border-radius: 10px;

        text-align: center;

        z-index: 5;
    }

    .popup input {
        background-color: #2f3746;
        color: white;
        border: 3px solid white;
        border-radius: 5px;
        padding: 0.5rem;
        margin: 0.5rem;
        margin-right: 0;

        margin-top: auto;
        margin-bottom: auto;

        height: 1rem;
        width: 3rem;
    }

    .popup select {
        background-color: #2f3746;
        color: white;
        border: 3px solid white;
        border-radius: 5px;
        padding: 0.5rem;
        margin: 0.5rem;
        margin-right: 0;

        margin-top: auto;
        margin-bottom: auto;

        height: 3rem;
        min-width: 5rem;
    }

    .popup option {
        background-color: #2f3746;
        color: white;
        border: 3px solid white;
        border-radius: 5px;
        padding: 0.5rem;
        margin: 0.5rem;
        margin-right: 0;

        margin-top: auto;
        margin-bottom: auto;

        height: 3rem;
        min-width: 5rem;
    }

    .popup button {
        background-color: #2f3746;
        color: white;
        border: 3px solid white;
        border-radius: 5px;
        padding: 0.5rem;
        margin: 0.5rem;
        margin-right: 0;

        margin-left: auto;
        margin-right: auto;

        height: 2.5rem;
        width: 8rem;

        /* Center content inside */
        display: flex;
        justify-content: center;

        cursor: pointer;
    }

    .bg_pencil {
        background-image: url('$lib/images/svg/icons/pencil.svg');
        background-repeat: no-repeat;
        background-size: 1.5rem;
        background-position: center;

        margin: 0;
        margin-right: 0.5rem;
    }

    .bg_cross {
        background-image: url('$lib/images/svg/icons/cross.svg');
        background-repeat: no-repeat;
        background-size: 1.5rem;
        background-position: center;

        margin-left: 0;
    }

    .gapped {
        margin-bottom: 1rem;
    }

    .action-buttons {
        display: flex;
        justify-content: space-around;
        align-items: center;

        margin-left: 0.25rem;
    }
</style>