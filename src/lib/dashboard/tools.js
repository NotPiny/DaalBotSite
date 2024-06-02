import { browser } from "$app/environment";
import { APIChannel, APIGuild } from './types';

/**
 * @param {string} url
*/
async function extractGuildIDFromURL(url) {
    if (!browser) return '';

    let GuildID = url.split("/Dashboard/Guild/")[1];
    if (GuildID.includes("/")) GuildID = GuildID.split("/")[0];

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
        const res = await fetch(`${addr}${addr.includes('?') ? '&' : '?'}guild=${await extractGuildIDFromURL(window.location.href)}`, {
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

        const res = await fetch(`${addr}${addr.includes('?') ? '&' : '?'}guild=${await extractGuildIDFromURL(window.location.href)}`, {
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
 * @returns {Promise<APIGuild | null>}
*/
async function api_func_call_get_guild_current(includeChannels = false, includeRoles = false) {
    if (!browser) return null;
    
    const res = await api_func_call_get('https://api.daalbot.xyz/dashboard/guilds/guild')

    let data = await JSON.parse(res);
    data.roles = null;
    data.channels = null;

    if (includeRoles) {
        await timeout(1000); // Rate limit fix
        data.roles = await api_func_call_get_guild_current_roles();
    }

    if (includeChannels) {
        await timeout(1000);
        data.channels = await api_func_call_get_guild_current_channels()
    }

    return data;
}

async function api_func_call_get_guild_current_roles() {
    if (!browser) return [];
    
    const res = await api_func_call_get('https://api.daalbot.xyz/dashboard/guilds/roles')

    return await JSON.parse(res);
}

/**
 * @returns {Promise<Array<APIChannel>>}
*/
async function api_func_call_get_guild_current_channels() {
    if (!browser) return [];
    
    const res = await api_func_call_get('https://api.daalbot.xyz/dashboard/guilds/channels')

    return await JSON.parse(res);
}

async function page_apply_styles() {
    if (!browser) return;

    document.body.style.backgroundImage = 'linear-gradient(to right bottom, #6200ff, #6c0bf9, #7514f4, #7d1cee, #8323e9, #8724e4, #8b25df, #8e26da, #9022d4, #921fcf, #941bc9, #9517c4)';
    document.body.style.height = '100vh';
    document.body.style.fontFamily = 'Poppins, sans-serif';

    if (document.getElementsByTagName('style').item(0)) {
        // @ts-ignore
        document.getElementsByTagName('style').item(0).innerHTML += `main {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
    
            width: 75%;
            height: 80%;
    
            margin-top: 5rem;
    
            margin-left: auto;
            margin-right: auto;
    
            background-color: #1a1b1f;
    
            border-radius: 10px;
    
            padding: 2rem;

            color: white;
        }
        `
    }
}

const api = {
    get: api_func_call_get,
    post: api_func_call_post
}

const guild = {
    getCurrent: api_func_call_get_guild_current,
    getRoles: api_func_call_get_guild_current_roles,
    getChannels: api_func_call_get_guild_current_channels,
    extractURL: extractGuildIDFromURL
}

const page = {
    applyStyles: page_apply_styles
}

export default {
    api,
    guild,
    page
}