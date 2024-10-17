<script>
    export let title = "DaalBot";

    /**
     * @type {{ text: string, href: string }[]}
     */
    export let buttons = [];

    export let subtext = "";
</script>

<div class="page-header-wrapper">
    <center>
        <h1>{title}</h1>
        <div class="page-header-buttons">
            {#each buttons as { text, href }}
                <a {href}>{text}</a>
            {/each}
        </div>
        {#if subtext}
            <p class="page-header-subtext">{subtext}</p>
        {/if}
    </center>
</div>

<style>
    .page-header-wrapper {
        font-family: Poppins, sans-serif;
        color: #fff;

        padding-top: 4rem;
        padding-bottom: 4rem;

        background: rgb(47, 47, 47);
        background-image: radial-gradient(
            circle,
            #2c2c2c,
            #2c2d2c,
            #2d2d2d,
            #2d2e2d,
            #2e2e2e,
            #2e2e2e,
            #2e2e2e,
            #2e2e2e,
            #2d2e2d,
            #2d2d2d,
            #2c2d2c,
            #2c2c2c
        );
    }

    center {
        display: flex;
        flex-direction: column;
        align-items: center;

        /* Center vertical */
        justify-content: center;

        gap: .1rem;
    }

    h1 {
        margin: 0;
        font-size: 100px;
        font-weight: 400;

        /* Add drop shadow */
        text-shadow: 10px 10px 4px #1e1e1e;

        text-align: center;
    }

    .page-header-buttons {
        display: flex;
        align-items: center;
        flex-direction: row;

        /* Center horizontal */
        justify-content: center;
    }

    .page-header-buttons a {
        margin-top: 0;
        margin: 0.5rem;

        color: #fff;
        text-decoration: none;
        font-size: 20px;

        border: 1px solid #1e1e1e;
        border-radius: 10px;
        background-color: #3e3e3e;

        padding: 0.75rem 2rem;
    }
</style>
