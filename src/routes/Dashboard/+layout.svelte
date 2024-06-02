<script>
    // Just code to run on all dashboard pages
    import { onMount } from "svelte";
    import { dismissables } from "$lib/tools";

    onMount(async() => {
        if (window.location.pathname == '/Dashboard' || window.location.pathname == '/Dashboard/Error' || window.location.pathname.startsWith('/Dashboard/Other')) return; // The /Dashboard page already does this and the rest dont require authentication

        // Check if the bearer token is valid
        if (!await dismissables.seen('dashboard_beta_warning')) {
            const confirmed = confirm('Hey! This is a bit of a warning. The dashboard is still in development, and as such, some features may not work as intended. If you\'re okay with this, click OK to continue, or click Cancel to go back.');
            if (!confirmed) return window.location.href = '/';

            dismissables.set('dashboard_beta_warning');
        }

        try {
            // This is where /Dashboard would redirect to /Dashboard/Home but we want to do some other stuff

            // Check if we've already checked the api (thinking about it sending a api request every time the user navigates to a new page is a bit much, so we'll just do it once and store it in sessionStorage)
            // But then again layout pages are only loaded once so this is kinda pointless
            if (!sessionStorage.getItem('dash_layout_apichecked')) {
                // Check if the bearer token is valid by making a request to discords api
                const req = await fetch('https://discord.com/api/users/@me', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accesscode')}`
                    }
                });
    
                // If the request was not successful, throw an error
                if (req.status != 200) { throw new Error('Invalid bearer token') } else {
                    sessionStorage.setItem('dash_layout_apichecked', 'true');
                };
            }
        } catch {
            console.error('[Dashboard] [Layout] Invalid bearer token');

            window.location.href = `/Dashboard/Error?e=invalidBearerToken`;
        }
    })
</script>

<slot/>