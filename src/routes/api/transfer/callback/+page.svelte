<script>
    import { browser } from "$app/environment";

    if (browser) {
        const urlParams = new URLSearchParams(window.location.search);
        const accessToken = urlParams.get('accesscode');
        const guildId = urlParams.get('guild');

        if (!accessToken) {
            window.location.href = '/';
        }

        let user = {
            username: '',
            id: '',
            avatar: '',
            avatarURL: '',
            guilds: []
        }
    
        let raw = {
            user: {},
            guilds: []
        }
    
        const userReq = fetch('https://discord.com/api/users/@me', {
            headers: {
                authorization: `Bearer ${accessToken}`
            }
        })
        .then(res => res.json())
        .then(response => {
            console.table([
                { name: 'Username', value: response.username },
                { name: 'ID', value: response.id }
            ])
        
            user.username = response.username;
            user.id = response.id;
            user.avatar = response.avatar;
            user.avatarURL = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=4096`;
    
            raw.user = response;
        })

        const guildReq = fetch('https://discord.com/api/users/@me/guilds', {
            headers: {
                authorization: `Bearer ${accessToken}`
            }
        })

        /**
         * @type {Object[]}
         */
        let guilds = [];

        const guildRes = guildReq.then(res => res.json())
        .then(response => {
            console.table(response);

            // @ts-ignore
            response.forEach(guild => {
                guilds.push({
                    id: guild.id,
                    name: guild.name,
                    icon: guild.icon,
                    // @ts-ignore
                    iconURL: `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png?size=4096`,
                    permissions: guild.permissions
                })
            })
    
            // @ts-ignore
            user.guilds = guilds;
            raw.guilds = response;
        })

        Promise.all([userReq, guildRes]).then(() => {
            // Set user and raw data in local storage
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('userraw', JSON.stringify(raw));

            // Add access token to local storage for future use
            localStorage.setItem('accesscode', accessToken ?? '');

            // Redirect to dashboard
            if (guildId !== 'none') {
                window.location.href = `/Dashboard/Guild/${guildId}`;
            } else {
                window.location.href = '/Dashboard/Home';
            }
        })
    }
</script>