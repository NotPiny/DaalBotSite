const URLParams = new URLSearchParams(window.location.search);
const guild = URLParams.get('guild');

function back() {
    // Why tf is this so weird well i guess it works and i dont have to write a new function for every page
    window.location.href = `${'/Dashboard/Server/XP/Members/'.replace('/Members', '')}?guild=` + guild; // Go back to the previous page
}

let memberXP = 0;
/**
 * @type {{id: string, username: string, nickname: string | null, avatar: string, raw: {user: any, member: any}} | null}
 */
let memberObj = null;

if (URLParams.get('member') == null) {
    document.getElementById('no-member').style.display = 'block'; // Show the member search bar
} else {
    // Member is specified
    updateMemberVariables();
    document.getElementById('member').style.display = 'block'; // Show the member page
}

function search() {
    // Check if the key is enter
    if (event.keyCode == 13) {
        // Check if the input is empty
        if (document.getElementById('member-search').value == '') {
            return;
        }

        const member = document.getElementById('member-search').value;
        window.location.href += `&member=${member}`;
    }
}

async function getMember() {
    const memberResponse = await fetch(`https://api.daalbot.xyz/dashboard/guilds/member?guild=${guild}&member=${URLParams.get('member')}`, {
        method: 'GET',
        headers: {
            'Authorization': localStorage.getItem('accesscode')
        }
    });
    await wait(750); // Discord rate limits are fucking annoying
    const userResponse = await fetch(`https://api.daalbot.xyz/dashboard/users/user?guild=${guild}&user=${URLParams.get('member')}`, {
        method: 'GET',
        headers: {
            'Authorization': localStorage.getItem('accesscode')
        }
    });

    const userData = await userResponse.json();
    const memberData = await memberResponse.json();

    const member = {
        /**
         * @type {string}
         */
        id: URLParams.get('member'),
        /**
         * @type {string}
         */
        username: userData.username,
        /**
         * @type {string | null}
         */
        nickname: memberData.nickname, // Either nickname or username idk discord is dumb
        /**
         * @type {string}
         */
        avatar: userData.displayAvatarURL,
        raw: {
            user: userData,
            member: memberData
        }
    };

    memberObj = member
    return member;
}

async function getMemberXP() {
    await wait(750);
    const response = await fetch(`https://api.daalbot.xyz/dashboard/xp/amount?guild=${guild}&user=${URLParams.get('member')}`, {
        method: 'GET',
        headers: {
            'Authorization': localStorage.getItem('accesscode')
        }
    });

    const data = parseInt(await response.text());

    return data;
}

async function wait(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

async function updateMemberVariables() {
    const body = document.getElementsByTagName('body')[0];
    const member = memberObj === null ? await getMember() : memberObj; // Use the memberObj variable if it is not null, otherwise get the member from the API
    const xp = memberXP === 0 ? await getMemberXP() : memberXP; // Same as above but for the xp
    const level = Math.floor(xp / 1000);
    memberXP = xp; // Set the memberXP variable to the xp of the member so we can use it in the xpButtonClicked function

    const variables = [
        {
            name: '{MEMBER_NAME}',
            value: member.nickname == null ? member.username : member.nickname
        },
        {
            name: '{MEMBER_XP}',
            value: xp
        },
        {
            name: '{MEMBER_LEVEL}',
            value: level
        }
    ]

    variables.forEach(variable => {
        body.innerHTML = body.innerHTML.replace(variable.name, variable.value);
    });

    const avatar = document.getElementById('member-avatar');

    avatar.src = member.avatar;
}

function setXP(xp) {
    memberXP = xp;

    const options = {method: 'POST', headers: {Authorization: localStorage.getItem('accesscode')}};

    fetch(`https://api.daalbot.xyz/dashboard/xp/set?guild=${guild}&user=${memberObj.id}&xp=${xp}`, options);

    window.location.reload(); // Reload the page to update the variables and stuff
}

/**
 * @param {string} button 
 * @returns 
 */
function xpButtonClicked(button) {
    const amountString = prompt('Please enter amount of XP', '0');
    if (amountString == null) return;
    const amount = parseInt(amountString);

    if (isNaN(amount)) {
        alert('Invalid amount');
        return;
    }

    if (amount < 0) {
        alert('Amount cannot be less than 0');
        return;
    }

    let xp = memberXP;

    switch (button) {
        case 'add':
            xp += amount;
            break;
        case 'remove':
            xp -= amount;
            break;
        case 'set':
            xp = amount;
            break;
    }

    setXP(xp);
}