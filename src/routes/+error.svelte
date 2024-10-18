<svelte:head>
    <title>Error - DaalBot</title>
</svelte:head>

<script>
    import { page } from '$app/stores';

    const conversionTable = {
        'Not Found': 404,
        'Internal Error': 500,
    };

    let error = $page.error?.message ?? 'UNKNOWN_ERR';

    // @ts-ignore
    let httpErrorCode = conversionTable[error] ?? 69420;
</script>

<main>
    <h1>
        {#if error == 'UNKNOWN_ERR' || error == 'Internal Error'}
            Something went wrong 😭
        {:else if error == 'Not Found'}
            404 Not Found
        {/if}
    </h1>
    {#if error == 'UNKNOWN_ERR'}
        <p>Something went wrong, but we don't know what it is</p>
    {:else if error == 'Not Found'}
        <p>Hey buddy, friend, pal, that page doesnt exist</p>
    {:else if error == 'Internal Error'}
        <p>You broke the actual code behind the site chances are this page is gonna be broken until next update in the mean while:</p>
    {:else}
        <p>{error}</p>
    {/if}

    <div class="control_buttons">
        <button on:click={() => window.location.href = '/'}>Go Home</button>
    </div>

    <p class="footer">HTTP {httpErrorCode}</p>
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: blueviolet;
        background-image: linear-gradient(to right bottom, #6200ff, #6c0bf9, #7514f4, #7d1cee, #8323e9, #8724e4, #8b25df, #8e26da, #9022d4, #921fcf, #941bc9, #9517c4);
        height: 100vh;

        font-family: Poppins, sans-serif;
        text-align: center;
    }

    h1 {
        font-size: 2rem;
        color: white;
    }

    p {
        font-size: 1.5rem;
        color: white;
    }

    .control_buttons {
        display: flex;
        gap: 1rem;
    }

    button {
        padding: 0.5rem 1rem;
        font-size: 1.3rem;
        color: white;
        background-color: #2c3e50;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    button:hover {
        background-color: #326597;
    }

    .footer {
        font-size: 1rem;
        color: rgb(177, 174, 174);

        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 1rem;
    }
</style>