<svelte:head>
    <title>Legal - DaalBot</title>
</svelte:head>

<script>
    import { onMount } from 'svelte';
    onMount(() => {
        document.body.style.backgroundColor = '#1f1f1f';
        document.body.style.margin = '0';
    });
</script>

<div class="content">


Welcome to the spooky legal page where I have all the stuff that discord and that require me to have but no one really reads.<br/><br/>

Links:
<ul>
    <li>
        <a href="/Legal/Privacy">Privacy Policy</a>
    </li>
    <li>
        <a href="/Legal/TOS">Terms of Service</a>
    </li>
    <li>
        <a href="/Acknowledgements">Acknowledgements</a>
    </li>
    <li>
        <a href="/Contact">Contact</a>
    </li>
</ul>


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
</style>