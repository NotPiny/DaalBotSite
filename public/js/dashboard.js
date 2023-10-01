// alert('This doesnt exist yet')
// window.location.href = '/'

if (localStorage.getItem('accesscode')) {
    const accesscode = localStorage.getItem('accesscode');
    const guilds = JSON.parse(localStorage.getItem('user')).guilds;
    const manageableGuilds = guilds.filter(guild => guild.permissions & 0x20);

    if (manageableGuilds.length == 0) {
        window.location.href = `/Invite`;
    } else {
        const exampleGuild = manageableGuilds[0].id;

        (async () => {
            try {
                await fetch(`https://api.daalbot.xyz/dashboard/test/bearer?guild=${exampleGuild}`, {
                    method: 'GET',
                    headers: {
                        authorization: accesscode
                    }
                })

                // Bearer is valid
                window.location.href = `/Dashboard/Landing`
            } catch (error) {
                // Bearer invalidated or expired
                localStorage.removeItem('accesscode');
                localStorage.removeItem('user');
                localStorage.removeItem('userraw');

                window.location.href = '/Dashboard/Login';
            }
        })();
    }
} else {
    window.location.href = '/Dashboard/Login';
}