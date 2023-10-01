const URLParams = new URLSearchParams(window.location.search);
const guild = URLParams.get('guild');

const user = JSON.parse(localStorage.getItem('user'));
const guilds = user.guilds;

const guildInfo = guilds.find((g) => g.id === guild);

const guildName = guildInfo.name;

function addModule(module) {
    const moduleList = document.getElementById('module-list');

    const moduleTemplate = `<div class="module" onclick="moduleClicked('${module.page}')"><h2>${module.name}</h2> <p>${module.description}</p></div>`;

    moduleList.innerHTML += moduleTemplate;
}

const modules = [
    {
        name: 'Configuration',
        description: 'Configure the way the bot works in your server.',
        page: 'Config'
    },
    {
        name: 'XP/Levels',
        description: 'Manage XP and Level rewards for your server with ease.',
        page: 'XP'
    }
]

modules.forEach((module) => addModule(module))

function moduleClicked(module) {
    window.location.href = `/Dashboard/Server/${module}?guild=${guild}`
}

// Define an array of variable replacements
const replacements = [
    { search: '{GUILDNAME}', replaceWith: guildName },
    { search: '{VARIABLE2}', replaceWith: 'example.variable2' },
    // Add more replacement mappings as needed
];
  
// Replace placeholders with their corresponding values in the entire page
function replaceVariables() {
    // Get the page's HTML content
    let pageContent = document.body.innerHTML;
  
    // Iterate through the replacements array and replace each placeholder
    replacements.forEach(function(replacement) {
        pageContent = pageContent.replace(
            new RegExp(replacement.search, 'g'),
            replacement.replaceWith
        );
    });
  
    // Update the page with the modified content
    document.body.innerHTML = pageContent;
}

const setupPages = [
    {
        page: 1,
        title: 'Finish setting up {GUILDNAME}',
        description: 'DaalBot is almost ready to go! Just a few more things to do.',
        button1: 'Setup later',
        button2: 'Finish setup'
    },
    {
        page: 2,
        title: 'Alert channel',
        description: 'Please select a channel where you want to receive alerts from the bot.',
        button1: 'Back',
        button2: 'Next'
    },
    {
        page: 3,
        title: 'Setup complete',
        description: 'You have successfully setup DaalBot for your server!',
        button1: 'Back',
        button2: 'Close'
    }
]

const setupPopupExtra = document.getElementById('setup-popup-extra'); // Empty div for extra content on each page

function Button1() {
    const pageIndicatorElement = document.getElementById('setup-popup-page');
    const currentPage = pageIndicatorElement.innerText.split('/')[0];
    const pageAmount = pageIndicatorElement.innerText.split('/')[1];

    if (currentPage === '1') {
        hideSetupPopup();
    }
}

async function Button2() {
    const pageIndicatorElement = document.getElementById('setup-popup-page');
    const currentPage = pageIndicatorElement.innerText.split('/')[0];
    const pageAmount = pageIndicatorElement.innerText.split('/')[1];
    const newPage = parseInt(currentPage) + 1;
    const lastPage = parseInt(pageAmount);

    if (currentPage === pageAmount) {
        return hideSetupPopup(); // Cancel setup
    }

    // Load data for the next page and replace the current page with it
    const newPageData = setupPages.find((p) => p.page === newPage);

    replaceSetupPopupTitle(newPageData.title);
    replaceSetupPopupDescription(newPageData.description);
    replaceSetupPopupButton1(newPageData.button1);
    replaceSetupPopupButton2(newPageData.button2);

    setupPopupExtra.innerHTML = ''; // Clear the extra content div

    // Custom code for each page
    if (newPage === 2) {
        const alertChannelSelector = document.getElementById('alert-channel-selector')
        alertChannelSelector.style.display = 'inline-block'; // Show the channel selector element

        // Get guild channels
        const guildChannels = await fetch(`https://api.daalbot.xyz/dashboard/guilds/channels?guild=${guild}`, {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('accesscode')
            }
        });

        // Convert the response to JSON
        const guildChannelsJSON = await guildChannels.json();

        // Filter out all non-text channels
        const textChannels = guildChannelsJSON.filter((channel) => channel.type === 0);

        // Loop through all text channels and add them to the selector
        textChannels.forEach((channel) => {
            const channelOptionElement = document.createElement('option');
            channelOptionElement.value = channel.id;
            channelOptionElement.innerText = channel.name;

            alertChannelSelector.add(channelOptionElement)
        });
    }

    if (newPage === 3) {
        const alertChannelSelector = document.getElementById('alert-channel-selector')
        alertChannelSelector.style.display = 'none'; // Hide the channel selector element

        const alertChannel = alertChannelSelector.value;
        fetch(`https://api.daalbot.xyz/dashboard/guilds/alertchannel?guild=${guild}&channel=${alertChannel}`, {
            method: 'POST',
            headers: {
                'Authorization': localStorage.getItem('accesscode')
            }
        })
    }

    pageIndicatorElement.innerText = `${parseInt(currentPage) + 1}/${pageAmount}`;
}

function showSetupPopup() {
    const setupPopup = document.getElementById('setup-popup');
    const popupOverlay = document.getElementById('popup-overlay');

    setupPopup.style.display = 'block';
    popupOverlay.style.display = 'block';
}

function hideSetupPopup() {
    const setupPopup = document.getElementById('setup-popup');
    const popupOverlay = document.getElementById('popup-overlay');

    setupPopup.style.display = 'none';
    popupOverlay.style.display = 'none';
}

function replaceSetupPopupTitle(title) {
    const setupPopupTitle = document.getElementById('setup-popup-header');

    setupPopupTitle.innerText = title;
}

function replaceSetupPopupDescription(description) {
    const setupPopupDescription = document.getElementById('setup-popup-paragraph');

    setupPopupDescription.innerText = description;
}

function replaceSetupPopupButton1(text) {
    const setupPopupButton1 = document.getElementById('setup-popup-button1');

    setupPopupButton1.innerText = text;
}

function replaceSetupPopupButton2(text) {
    const setupPopupButton2 = document.getElementById('setup-popup-button2');

    setupPopupButton2.innerText = text;
}

/**
 * @returns {Promise<boolean>} Whether or not the setup is complete
 */
async function isSetupComplete() {
    return new Promise(async (resolve, reject) => {
        const localStorageSetupComplete = guildInfo.setupComplete;

        if (localStorageSetupComplete == true || localStorageSetupComplete == false) return localStorageSetupComplete; // Already know if setup is complete or not so no need to check the api

        try {
            const alertChannel = await fetch(`https://api.daalbot.xyz/dashboard/config/alertChannel?guild=${guild}`, { headers: { authorization: localStorage.getItem('accesscode') } });
            if (alertChannel.status === 404) return resolve(false);

            resolve(true); // If none of the statuses are 404, assume setup is complete
        } catch (error) {
            resolve(false); // If an error occurs, assume setup is not complete
        }
    })
}

replaceVariables();

(async() => {
    if (!(await isSetupComplete())) {
        showSetupPopup();
    }
})()

document.getElementById('setup-popup-button1').addEventListener('click', Button1);
document.getElementById('setup-popup-button2').addEventListener('click', Button2);