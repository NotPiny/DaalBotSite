/**
 * Retrieves information about the current guild from the server.
 * @async
 * @function getCurrentGuildInfo
 * @returns {Promise<Object>} An object containing information about the current guild.
 */
async function getCurrentGuildInfo() {
    const guildInfo = await apiCall({
        category: `guilds`,
        item: `guild`,
        method: 'GET',
        dashboard: true
    });

    return guildInfo;
}

/**
 * Makes an API call to the DaalBot API.
 * @async
 * @param {Object} options - The options for the API call.
 * @param {string} options.method - The HTTP method to use for the API call.
 * @param {string} options.category - The category of the API endpoint to call.
 * @param {string} options.item - The item of the API endpoint to call.
 * @param {boolean} options.dashboard - Whether the API call is being made from the dashboard.
 * @returns {Promise<Object>} - The response from the API call.
 */
async function apiCall(options) {
    let url = 'https://api.daalbot.xyz';

    if (options.dashboard) {
        url += '/dashboard';
    } else {
        url += `/${options.method.toLowerCase()}`
    }

    url += `/${options.category}/${options.item}`;

    if (options.dashboard) {
        url += `?guild=${new URLSearchParams(window.location.search).get('guild')}`
    }

    const req = await fetch(url, {
        method: options.method,
        headers: {
            'Authorization': options.dashboard ? localStorage.getItem('accesscode') : undefined,
        }
    });

    const res = await req.json();

    return res;
}

export default {
    getCurrentGuildInfo,
    apiCall
}