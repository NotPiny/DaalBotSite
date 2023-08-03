const URLParams = new URLSearchParams(window.location.search);
const guild = URLParams.get('guild');

const guildRoles = [];

async function getGuildRoles() {
    const response = await fetch(`https://api.daalbot.xyz/dashboard/guilds/roles?guild=${guild}`, {
        headers: {
            'authorization': localStorage.getItem('accesscode')
        }
    });
    const data = await response.json();

    return data;
}

let addPopupPopulated = false;
async function populateAddPopupSelectMenu() {
    // Dont populate if already populated
    if (addPopupPopulated) return;
    addPopupPopulated = true;

    // Fetch the guild roles
    const roles = await getGuildRoles();

    // Get the select menu
    const selectMenu = document.getElementById('addRewardPopupRole');

    // Iterate over the roles
    roles.forEach(role => {
        // Create a new option element
        const option = document.createElement('option');

        // Set the text and value of the option element
        option.text = role.name; // Replace 'name' with the role property you want to display
        option.value = role.id; // Replace 'id' with the role property you want to use as the value

        // Append the option to the select menu
        selectMenu.add(option);
    });
}

let selectedAction = null;

async function wait(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    })
}

function back() {
    window.location.href = "/Dashboard/Server/XP?guild=" + guild;
}

async function getCurrentRewardsRaw(guild) {
    const response = await fetch(`https://api.daalbot.xyz/dashboard/xp/rewards?guild=${guild}`, { // Backup: http://localhost:3000/dashboard/xp/rewards?guild=${guild}
        headers: {
            'authorization': localStorage.getItem('accesscode')
        }
    });
    const data = await response.json();
    
    return data;
}

async function extractRewardData(data) {
    let rewards = [];

    data.forEach(reward => {
        // Format: { name: 'LEVEL.reward', value: 'roleID' }
        const rewardLevel = reward.name.split('.')[0];
        const rewardRole = reward.value;

        rewards.push({ level: rewardLevel, role: rewardRole });
    })

    return rewards;
}

async function updateRewardText() {
    const data = await getCurrentRewardsRaw(guild);
    const rewards = await extractRewardData(data);

    const rewardTable = document.getElementById('rewards');

    let rewardsLeft = rewards.length

    for (const reward of rewards) {
        await wait(0.75 * 1000)

        const row = document.createElement('tr');
        const level = document.createElement('td');
        const role = document.createElement('td');

        // Make row clickable
        row.addEventListener('click', () => {
            if (selectedAction == 'remove') {
                removeReward(reward.level, row);
            } else if (selectedAction == 'edit') {
                editReward(reward.level, reward.role, row);
            }
        })

        level.innerText = reward.level;
        row.appendChild(level);

        const name = await convertIDToName(reward.role); // Await the name conversion
        role.innerText = `@${name}`;
        row.appendChild(role);

        rewardTable.appendChild(row);

        rewardsLeft -= 1

        if (rewardsLeft <= 0) {
            console.log('Sorting table')
            sortTable();
        }
    }
}

function addRow(level, role) {
    const rewardTable = document.getElementById('rewards');

    const row = document.createElement('tr');
    const levelCell = document.createElement('td');
    const roleCell = document.createElement('td');

    levelCell.innerText = level;
    row.appendChild(levelCell);

    roleCell.innerText = role;
    row.appendChild(roleCell);

    rewardTable.appendChild(row);
}

async function convertIDToName(id) {
    const response = await fetch(`https://api.daalbot.xyz/dashboard/roles/fetch?guild=${guild}&role=${id}`, {
        headers: {
            'authorization': localStorage.getItem('accesscode')
        }
    })
    const data = await response.json();

    return data.name;
}

// Function to sort the table by the first column (level)
function sortTable() {
    const table = document.getElementById('rewards');
    
    let rows, switching, i, x, y, shouldSwitch;
    switching = true;

    while (switching) {
        switching = false;
        rows = table.rows;

        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;

            x = parseInt(rows[i].getElementsByTagName('td')[0].innerText);
            y = parseInt(rows[i + 1].getElementsByTagName('td')[0].innerText);

            if (x > y) {
                shouldSwitch = true;
                break;
            }
        }

        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}

function selectAction(action) {
    selectedAction = action;

    alert('This feature is not yet implemented. Please check back later.')
    // switch (action) {
    //     case 'add':
    //         openAddRewardModal();
    //         break;
    //     case 'remove':
    //         document.getElementById('add').classList.remove('selected');
    //         document.getElementById('remove').classList.add('selected');
    //         document.getElementById('edit').classList.remove('selected');
    //         break;
    //     case 'edit':
    //         document.getElementById('add').classList.remove('selected');
    //         document.getElementById('remove').classList.remove('selected');
    //         document.getElementById('edit').classList.add('selected');
    //         break;
    //     case null:
    //         document.getElementById('add').classList.remove('selected');
    //         document.getElementById('remove').classList.remove('selected');
    //         document.getElementById('edit').classList.remove('selected');
    //         break;
    // }
}

function openAddRewardModal() {
    document.getElementById('addpopup').style.display = 'block';

    populateAddPopupSelectMenu();
}

function addPopupSubmit(event) {
    event.preventDefault(); // Prevent reloading
    document.getElementById('addpopup').style.display = 'none';
    const level = document.getElementById('addRewardPopupLevel').value;
    const role = document.getElementById('addRewardPopupRole').value;

    addReward(level, role);
}

function addReward(level, role) {
    const reward = {
        name: `${level}`,
        value: `${role}`
    }

    fetch(`https://api.daalbot.xyz/dashboard/xp/rewards?guild=${guild}`, {
        method: 'POST',
        headers: {
            'authorization': localStorage.getItem('accesscode'),
            'data': JSON.stringify(reward) // Yes, I know this is bad practice, but I'm lazy and its just a string so it should be fine
        }
    })
}

/**
 * @param {String} level 
 * @param {HTMLTableRowElement} row
*/
function removeReward(level, row) {
    // Role isnt needed because were just deleting the whole reward
    const options = {
        method: 'DELETE', 
        headers: {
            authorization: localStorage.getItem('accesscode') // No leaking my access token insomia >:(
        }
    };

    fetch(`https://api.daalbot.xyz/dashboard/xp/reward?guild=${guild}&level=${level}`, options) // Send the request

    // Remove the row from the table
    row.remove();
}

function editReward(level) {
    openEditRewardModal(level); // Open the modal with the level pre-filled
}

function openEditRewardModal(level) {
    document.getElementById('editpopup').style.display = 'block';
    document.getElementById('edit').classList.remove('selected');
    selectAction(null)

    populateEditPopupSelectMenu(level);
}

async function populateEditPopupSelectMenu(level) {
    const roles = await getGuildRoles();

    document.getElementById('editPopupTitle').innerText = document.getElementById('editPopupTitle').innerText.replace('{LEVEL}', level);

    const levelSelectMenu = document.getElementById('editRewardPopupLevel');
    levelSelectMenu.value = level;

    const selectMenu = document.getElementById('editRewardPopupRole');

    roles.forEach(role => {
        const option = document.createElement('option');
        option.innerText = role.name;
        option.value = role.id;

        selectMenu.add(option);
    });
}

function editPopupSubmit(event) {
    event.preventDefault(); // Prevent reloading
    document.getElementById('editpopup').style.display = 'none';
    const role = document.getElementById('editRewardPopupRole').value;
    const level = document.getElementById('editRewardPopupLevel').value;

    fetch(`https://api.daalbot.xyz/dashboard/xp/reward?guild=${guild}&level=${level}`, {
        method: 'POST',
        headers: {
            'authorization': localStorage.getItem('accesscode'),
            'data': JSON.stringify({name: level, value: role})
        }
    })
    .then(() => {
        const table = document.getElementById('rewards');
        table.innerHTML = `<tr><th>Level</th><th>Role</th></tr>`; // Clear the table
        updateRewardText();
    })
}

updateRewardText();