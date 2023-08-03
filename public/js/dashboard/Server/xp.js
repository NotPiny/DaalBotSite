const URLParams = new URLSearchParams(window.location.search);
const guild = URLParams.get('guild');

function buttonClicked(button) {
    if (button === 'NIM') {
        // Not IMplemented
        window.location.href = `/Dashboard/Server/temp`
    } else {
        window.location.href = `/Dashboard/Server/XP/${button}?guild=${guild}`
    }
}

function back() {
    window.location.href = "/Dashboard/Server?guild=" + guild + "&tab=Home";
}