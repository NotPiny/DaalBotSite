const URLParams = new URLSearchParams(window.location.search);
const guild = URLParams.get('guild');

import tools from '../../tools.js';

let enabled = false;

function back() {
    window.location.href = `${'/Dashboard//Server/Analytics/'.replace('/Analytics', '')}?guild=` + guild; // Go back to the previous page
}

// Add event listeners
document.getElementById('analytics-enabled-switch').addEventListener('click', toggle);
document.getElementById('not-setup-page-enable').addEventListener('click', enable);

async function enable() {
    if (enabled) return;

    await tools.apiCall({
        category: 'analytics',
        item: 'enable',
        method: 'POST',
        dashboard: true
    })

    enabled = true; // Set the setup to true

    window.location.reload(); // Reload the page
}

async function disable() {
    if (!enabled) return;

    await tools.apiCall({
        category: 'analytics',
        item: 'disable',
        method: 'DELETE',
        dashboard: true
    })

    enabled = false; // Set the setup to false

    window.location.reload(); // Reload the page

}

async function isEnabled() {
    const res = await tools.apiCall({
        category: 'analytics',
        item: 'enabled',
        method: 'GET',
        dashboard: false
    });

    enabled = res.enabled;

    return res.enabled;
}

async function toggle() {
    // Switch the analytics state
    if (enabled) {
        await disable();
    } else {
        await enable();
    }
}

async function main() {
    // Get current analytics state
    await isEnabled();

    if (enabled) {
        document.getElementById('analytics-enabled-switch').checked = true;
    } else {
        document.getElementById('analytics-enabled-switch').checked = false;

        document.getElementById('not-setup-page').style.display = 'block';
    }
}

main();