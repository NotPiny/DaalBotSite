const URLParams = new URLSearchParams(window.location.search);
const guild = URLParams.get('guild');
const configTab = URLParams.get('tab');

if (configTab != null) {
    window.location.href = `/Dashboard/Server/Config/${configTab}?guild=${guild}`
}

function buttonClicked(button, tab) {
    if (button === 'NIM') {
        // Not IMplemented
        window.location.href = `/Dashboard/Server/temp`
    } else if (button === 'Config') {
        window.location.href = `/Dashboard/Server/${button}?guild=${guild}${tab ? `&tab=${tab}` : ''}`
    } else {
        window.location.href = `/Dashboard/Server/Config/${button}?guild=${guild}${tab ? `&tab=${tab}` : ''}`
    }
}

function back() {
    window.location.href = "/Dashboard/Server?guild=" + guild + "&tab=Home";
}