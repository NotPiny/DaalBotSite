<script>
    import { browser } from "$app/environment";

    if (browser) {
        const accesscode = localStorage.getItem('accesscode');

        if (!accesscode) {
            window.location.href = window.location.search.includes('test') ? 'https://discord.com/api/oauth2/authorize?client_id=1016086353085222993&response_type=code&redirect_uri=https%3A%2F%2Fbot.daalbot.xyz%2Fget%2Fauth%2Ftest%3Fmode%3Dvercel&scope=identify+guilds' : 'https://discord.com/oauth2/authorize?client_id=1016086353085222993&redirect_uri=https%3A%2F%2Fbot.daalbot.xyz%2Fget%2Fauth%2FaccessCode&response_type=code&scope=identify%20guilds';
        }

        // Check if the bearer token is valid
        (async() => {
            try {
                const request = await fetch(`https://discord.com/api/users/@me`, {
                    headers: {
                        Authorization: `Bearer ${accesscode}`
                    }
                })

                window.location.href = '/Dashboard/Home'
            } catch {
                window.location.href = window.location.search.includes('test') ? 'https://discord.com/api/oauth2/authorize?client_id=1016086353085222993&response_type=code&redirect_uri=https%3A%2F%2Fbot.daalbot.xyz%2Fget%2Fauth%2Ftest%3Fmode%3Dvercel&scope=identify+guilds' : 'https://discord.com/oauth2/authorize?client_id=1016086353085222993&redirect_uri=https%3A%2F%2Fbot.daalbot.xyz%2Fget%2Fauth%2FaccessCode&response_type=code&scope=identify%20guilds';
            }
        })();
    }
</script>