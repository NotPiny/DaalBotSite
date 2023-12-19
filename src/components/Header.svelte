<script>
    export let title = "DaalBot";

    /**
     * @type {{ text: string, href: string }[]}
    */
    export let buttons = [];
</script>

<div class="page-header-wrapper">
    <center>
        <h1>{title}</h1>
        <div class="page-header-buttons">
            {#each buttons as { text, href }}
                <a href={href}>{text}</a>
            {/each}
        </div>
    </center>
</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
    
    .page-header-wrapper {
        font-family: Poppins, sans-serif;
        color: #fff;
        
        padding-top: 4rem;
        padding-bottom: 4rem;

        background-image: linear-gradient(to right bottom, #b92ca1, #a72aa1, #9529a0, #82289e, #6e289c, #642a9f, #592ca3, #4c2ea6, #4732b0, #4037bb, #353cc6, #2341d1);
    }

    h1 {
        margin-top: 0;
        font-size: 50px;

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

        border: 1px solid #fff;
        border-radius: 5px;

        padding: 0.5rem 1rem;
    }
</style>