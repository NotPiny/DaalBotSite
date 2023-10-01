const URLParams = new URLSearchParams(window.location.search);
const guild = URLParams.get('guild');

function back() {
    window.location.href = `${'/Dashboard/Server/Config/alertChannel/'.replace('/alertChannel', '')}?guild=` + guild; // Go back to the previous page
}

async function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function updateChannelSelector() {
    const alertChannelSelector = document.getElementById('alert-channel-selector')
    alertChannelSelector.style.display = 'inline-block'; // Show the channel selector element
    
    // Get guild channels
    const guildChannels = await fetch(`https://api.daalbot.xyz/dashboard/guilds/channels?guild=${guild}`, {
        method: 'GET',
        headers: {
            'Authorization': localStorage.getItem('accesscode')
        }
    });
    
    await wait(1000); // Discord ratelimits are a bitch
    
    const currentChannel = await fetch(`https://api.daalbot.xyz/dashboard/config/alertChannel?guild=${guild}`, {
        method: 'GET',
        headers: {
            'Authorization': localStorage.getItem('accesscode')
        }
    })
    const currentChannelID = await currentChannel.text();
    
    // Convert the response to JSON
    const guildChannelsJSON = await guildChannels.json();
    
    // Filter out all non-text channels
    const textChannels = guildChannelsJSON.filter((channel) => channel.type === 0);
    
    // Loop through all text channels and add them to the selector
    textChannels.forEach((channel) => {
        const channelOptionElement = document.createElement('option');
        channelOptionElement.value = channel.id;
        channelOptionElement.innerText = channel.name;
    
        if (channel.id === currentChannelID) {
            channelOptionElement.selected = true;
        }
    
        alertChannelSelector.add(channelOptionElement)
    });
}

updateChannelSelector();