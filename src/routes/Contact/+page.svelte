<script>
    import Footer from "../../components/Footer.svelte";
    import Header from "../../components/Header.svelte";
    import Navbar from "../../components/Navbar.svelte";

    import { onMount } from "svelte";

    onMount(() => {
        const body = document.querySelector("body");

        if (body) {
            body.style.backgroundColor = "#2f2f2f";
            body.style.height = "100%";
        }
    });
</script>

<svelte:head>
    <title>DaalBot - Contact</title>
</svelte:head>
<Navbar />
<Header title="Contact" buttons={[
    { text: "Back", href: "/" }
]} />

<div class="page">
    <center>
        <h1 style="text-align: center; color: white;">Contact</h1>
        <p style="text-align: center; color: white;">If you have any questions or concerns, feel free to reach out to us at <a href="mailto:contact@daalbot.xyz" class="link">contact@daalbot.xyz</a> or join the <a href="https://lnk.daalbot.xyz/HQ" class="link">support server</a>
    </center>

    <Footer />
</div>

<style>
    .page {
        background-color: #2f2f2f;

        height: 100%;

        font-family: Poppins, sans-serif;
        color: white;
    }

    .link {
        color: #b3b3b3;
    }
</style>