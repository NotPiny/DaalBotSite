// Just a bunch of tools
import { browser } from "$app/environment";

/**
 * @type {"server" | "mobile" | "desktop"}
 */
let platform = !browser ? 'server' :
    navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i) ? 'mobile' :
    'desktop';

/**
 * @param {string} noticeName 
 * @returns {Promise<boolean>}
*/
const notices_hasseen = (noticeName) => JSON.parse(localStorage.getItem('notices') ?? '[]').includes(noticeName); // Nice simple function to check if a notice has been seen (using const syntax for one liners)

/**
 * @param {string} noticeName
 * @returns {void}
*/
const notices_seen = (noticeName) => {
    let noticesJson = JSON.parse(localStorage.getItem('notices') ?? '[]');
    noticesJson.push(noticeName);
    localStorage.setItem('notices', JSON.stringify(noticesJson));
}

const dismissables = {
    seen: notices_hasseen,
    set: notices_seen,
    reset: () => localStorage.setItem('notices', '[]')
}

export {
    dismissables,
    platform
};