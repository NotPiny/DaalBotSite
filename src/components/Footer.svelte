<script>
    export let colour = '#1e1e1e';
</script>

<div class="footer" style="background-color: {colour}">
    <p class="footer-made-by-text">Made with ❤️ by <a href="https://piny.dev">Piny</a></p>
    <p><a href="https://github.com/DaalBot/Discord">Github</a> / <a href="/Legal">Legal</a> / <a href="/Contact">Contact</a></p>
    <a href="/Details">Details</a>
</div>

<style>
    .footer {
        margin-top: 5rem;
        width: 100%;
        height: 6rem;

        padding-top: 5rem;
        padding-bottom: 1rem;

        text-align: center;

        position: relative;
        bottom: 0;

        font-family: Poppins, sans-serif;

        color: white;
    }

    .footer a {
        color: #b3b3b3;
    }

    .footer-made-by-text {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);

        font-size: 1.5rem;
        margin-top: 2rem;
    }

    /* .footer-made-by-text a {
        text-decoration: none;
    } */

    @media only screen and (max-width: 800px) {
        .footer-made-by-text {
            font-size: 1.15rem;
        }
    }
</style>