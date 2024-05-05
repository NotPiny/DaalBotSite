<script>
    import { browser } from "$app/environment";
    import { dismissables } from "$lib/tools";

    if (browser) {

        const accesscode = localStorage.getItem('accesscode');

        if (!accesscode) {
            window.location.href = import.meta.env.DEV ? 'https://discord.com/api/oauth2/authorize?client_id=1016086353085222993&response_type=code&redirect_uri=https%3A%2F%2Fbot.daalbot.xyz%2Fget%2Fauth%2Ftest%3Fmode%3Dvercel&scope=identify+guilds' : 'https://discord.com/oauth2/authorize?client_id=1016086353085222993&redirect_uri=https%3A%2F%2Fbot.daalbot.xyz%2Fget%2Fauth%2FaccessCode&response_type=code&scope=identify%20guilds';
        }

        // Check if the bearer token is valid
        (async() => {
            if (!await dismissables.seen('dashboard_beta_warning')) {
                const confirmed = confirm('Hey! This is a bit of a warning. The dashboard is still in development, and as such, some features may not work as intended. If you\'re okay with this, click OK to continue, or click Cancel to go back.');
                if (!confirmed) return window.location.href = '/';

                dismissables.set('dashboard_beta_warning');
            }

            try {
                const request = await fetch(`https://discord.com/api/users/@me`, {
                    headers: {
                        Authorization: `Bearer ${accesscode}`
                    }
                })

                if (request.status == 200) {
                    window.location.href = '/Dashboard/Home';
                } else {
                    throw new Error('Invalid bearer token'); // This will be caught by the catch block
                }
            } catch {
                window.location.href = import.meta.env.DEV ? 'https://discord.com/api/oauth2/authorize?client_id=1016086353085222993&response_type=code&redirect_uri=https%3A%2F%2Fbot.daalbot.xyz%2Fget%2Fauth%2Ftest%3Fmode%3Dvercel&scope=identify+guilds' : 'https://discord.com/oauth2/authorize?client_id=1016086353085222993&redirect_uri=https%3A%2F%2Fbot.daalbot.xyz%2Fget%2Fauth%2FaccessCode&response_type=code&scope=identify%20guilds';
            }
        })();
    }
</script>