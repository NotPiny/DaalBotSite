const URLParams = new URLSearchParams(window.location.search);
const guild = URLParams.get('guild');

function back() {
    window.location.href = `${'{{htmlPath}}'.replace('/{{pageName}}', '')}?guild=` + guild; // Go back to the previous page
}