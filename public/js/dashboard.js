let validCode = true;

const URLParams = new URLSearchParams(window.location.search);
const beta = URLParams.get('beta');

if (!beta) {
    alert('This is a beta version of the dashboard so expect some "i\'m not like the other sites" behaviour lmao');
}

setTimeout(() => {
    if (validCode) {
        const reloadMessage = document.getElementById('reload-message');

        reloadMessage.style.display = 'block'; // Show reload message after 5 seconds
    }
}, 5 * 1000);

if (localStorage.getItem('accesscode')) {
    const accesscode = localStorage.getItem('accesscode');
    const guilds = JSON.parse(localStorage.getItem('user')).guilds;
    const manageableGuilds = guilds.filter(guild => guild.permissions & 0x20);

    if (manageableGuilds.length == 0) {
        window.location.href = `/Invite`;
    } else {
        const exampleGuild = manageableGuilds[0].id;

        (async () => {
            async function invalidBearer() {
                validCode = false; // Set validCode to false so that the reload message doesn't show

                const alert = document.getElementById('alert');
                alert.style.display = 'block';

                const loginButton = document.getElementById('login');

                const loading = document.getElementById('loading-icon');
                loading.style.display = 'none';

                loginButton.addEventListener('click', () => {
                    localStorage.removeItem('accesscode');
                    localStorage.removeItem('user');
                    localStorage.removeItem('userraw');

                    window.location.href = '/Dashboard/Login';
                })
            }

            try {
                const response = await fetch(`https://api.daalbot.xyz/dashboard/test/bearer?guild=${exampleGuild}`, {
                    method: 'GET',
                    headers: {
                        authorization: accesscode
                    }
                })

                if (response.status != 200) {
                    return invalidBearer();
                } else {
                    window.location.href = `/Dashboard/Landing`
                }
            } catch (error) {
                // Bearer invalidated or expired
                invalidBearer();
            }
        })();
    }
} else {
    window.location.href = '/Dashboard/Login';
}