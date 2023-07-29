const URLParams = new URLSearchParams(window.location.search);
const page = URLParams.get('tab');
const guild = URLParams.get('guild');

window.location.href = `/Dashboard/Server/${page}?guild=${guild}`