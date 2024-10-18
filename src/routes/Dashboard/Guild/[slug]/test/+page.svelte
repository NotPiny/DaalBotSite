<script>
    import tools from '$lib/dashboard/tools';
    import { onMount } from 'svelte';

    let guildId = '';

    onMount(async() => {
        guildId = await tools.guild.extractURL(window.location.href);

        const response = await fetch(`http://localhost:3000/dashboard/test/ping?guild=${guildId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('accesscode')}`
            },
            body: JSON.stringify({
                guild: guildId
            })
        });

        console.log(await response.json());
    })
</script>

<svelte:head>
    <title>DaalBot Dashboard Testing</title>
</svelte:head>