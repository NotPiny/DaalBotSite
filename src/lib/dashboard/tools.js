import { browser } from "$app/environment";

/**
 * @param {string} url
*/
async function extractGuildIDFromURL(url) {
    if (!browser) return '';

    let GuildID = url.split("/Dashboard/Guild/")[1];
    GuildID = GuildID.split("/")[0];

    return GuildID;
}

/**
 * @param {number} ms 
 * @returns {Promise<void>}
*/
async function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * @param {string} addr
 * @returns {Promise<string>}
*/
async function api_func_call_get(addr) {
    if (!browser) return '';
    
    try {
        const res = await fetch(`${addr}?guild=${await extractGuildIDFromURL(window.location.href)}`, {
            headers: {
                'Authorization': `${localStorage.getItem("accesscode")}`
            }
        })
        
        return await res.text()
    } catch {
        window.location.search = '?error=1'
        alert('An error occured while trying to fetch data from the API. Chances are this is a rate limit issue but if this persists now that the information is cached, please contact the developer.')
        // @ts-ignore
        return window.location.reload();
    }
}

/**
 * @param {string} addr
 * @param {Array<{name: string, value: string}>} headers
*/
async function api_func_call_post(addr, headers = []) {
    if (!browser) return '';

    let reqHeaders = {}

    reqHeaders['Authorization'] = `${localStorage.getItem("accesscode")}` // Required for all requests (unless you want a error)

    headers.forEach(header => {
        // @ts-ignore
        reqHeaders[`${header.name}`] = header.value
    });
    
    try {
        const headers = new Headers(Object.entries(reqHeaders));

        const res = await fetch(`${addr}?guild=${await extractGuildIDFromURL(window.location.href)}`, {
            method: 'POST',
            headers: headers
        })
        
        return await res.text()
    } catch {
        // window.location.search = '?error=1'
        alert('An error occured while trying to fetch data from the API. Chances are this is a rate limit issue but if this persists now that the information is cached, please contact the developer.')
        // window.location.reload();
    }

}

/**
 * @returns {Promise<{id: string, name: string, icon: string?, roles: Array<{name: string, id: string}>}>}
*/
async function api_func_call_get_guild_current() {
    if (!browser) return {
        id: '',
        name: '',
        icon: '',
        roles: []
    };
    
    const res = await api_func_call_get('https://api.daalbot.xyz/dashboard/guilds/guild')

    let data = await JSON.parse(res);

    await timeout(1000); // Rate limit fix

    data.roles = await api_func_call_get_guild_current_roles();

    return data;
}

async function api_func_call_get_guild_current_roles() {
    if (!browser) return [];
    
    const res = await api_func_call_get('https://api.daalbot.xyz/dashboard/guilds/roles')

    return await JSON.parse(res);
}

const api = {
    get: api_func_call_get,
    post: api_func_call_post
}

const guild = {
    getCurrent: api_func_call_get_guild_current,
    getRoles: api_func_call_get_guild_current_roles
}

export default {
    api,
    guild
}