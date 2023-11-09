const URLParams = new URLSearchParams(window.location.search);
const guild = URLParams.get('guild');

function back() {
    window.location.href = `${'/Dashboard//Server/Analytics/'.replace('/Analytics', '')}?guild=` + guild; // Go back to the previous page
}