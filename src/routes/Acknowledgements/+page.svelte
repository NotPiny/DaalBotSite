<script>
    import { onMount } from 'svelte';
    onMount(() => {
        document.body.style.backgroundColor = '#1f1f1f';
        document.body.style.margin = '0';
    });
</script>

<div class="content">


Well hello traveler! Welcome to the Acknowledgements page where I give credit to all the amazing people and projects who made this site possible
<ul>
    <li>
        <a href="https://svelte.dev/">Svelte (Kit)</a> - The best framework ive used i mean ive only used one but its pretty damn good
    </li>
    <li>
        <a href="https://shoelace.style">Shoelace</a> - Used mostly on the dashboard for the buttons, drawers and whatever else
    </li>
    <li>
        <a href="https://tabler.io/icons">Tabler icons</a> - If you see a icon on the site its probably from here
    </li>
    <li>
        <a href="https://microsoft.github.io/monaco-editor/">Monaco editor</a> - Used for the code editor on the dashboard
    </li>
    <li>
        <a href="https://glitchii.github.io/embedbuilder">Embed Builder</a> - Used for message builder tool on the dashboard (glitchii is awesome &lt;3)
    </li>
    <li>
        <a href="https://www.npmjs.com/package/svelte-markdown">svelte-markdown</a> - Used for rendering markdown on the site
    </li>
</ul>
If you believe that something is missing from this list please <a href="/Contact">contact me</a> and ill add it


</div>
<div class="footer">
    oh and who can forget you, the user. Thanks for using DaalBot and keep being awesome or something like that :)
</div>

<style>
    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        margin-bottom: 1rem;
    }

    a {
        color: #b1add4;
        text-decoration: none;
    }

    a:visited {
        color: #846e9e;
    }

    a:hover {
        color: #9690c9;
        text-decoration: underline;
    }

    div {
        color: white;
        font-family: Poppins, sans-serif;
        font-size: 1.5rem;
    }

    .content {
        padding: 2rem;
    }

    .footer {
        height: 2em;
        width: 100%;

        padding-top: 5rem;
        padding-bottom: 1rem;

        text-align: center;

        position: absolute;
        bottom: 0;
    }
</style>