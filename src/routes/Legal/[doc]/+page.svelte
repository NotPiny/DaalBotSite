<script>
    import { onMount } from "svelte";
    import Footer from "../../../components/Footer.svelte";
    import Header from "../../../components/Header.svelte";
    import Navbar from "../../../components/Navbar.svelte";
    import SvelteMarkdown from "svelte-markdown";

    let content = `# Loading...`;

    // @ts-ignore
    export let data;

    onMount(async() => {
        const res = await fetch(`https://discord.daalbot.xyz/md/${data.document.toLowerCase()}`).then(res => res.text());

        // Remove any first line that is a title
        content = res.split('\n')[0].startsWith('# ') ? res.split('\n').slice(1).join('\n') : res;

        // @ts-ignore
        document.querySelector('style').innerHTML += `a { color: #00aaff; }`; // Inject on page load because svelte chucks it out when it cant find the a tag
    });

    onMount(async() => {
        document.body.style.backgroundColor = '#2f2f2f';
        document.body.style.margin = '0';
    })
</script>

<svelte:head>
    <title>DaalBot - {data.document}</title>
</svelte:head>

<Navbar />
<Header title="{data.document}" buttons={[
    { text: "Home", href: "/" },
    { text: "View raw", href: `https://api.daalbot.xyz/get/files/md?file=${data.document.toLowerCase()}` }
]} />

<div class="page">
    <div class="content">
        <SvelteMarkdown source={content} options={{ gfm: true }}/>
    </div>
</div>

<Footer />

<style>
    .page {
        background-color: #2f2f2f;

        height: 100%;

        font-family: Poppins, sans-serif;
        color: white;
    }

    .content {
        width: 75%;
        margin-left: auto;
        margin-right: auto;
        margin-top: 5rem;
    }
</style>