<script>
    import Header from "../components/Header.svelte";
    import Navbar from "../components/Navbar.svelte";
</script>

<svelte:head>
    <title>DaalBot - The only discord bot you need</title>
</svelte:head>
<Navbar />
<Header title="DaalBot" buttons={[
    { text: "Home", href: "/" },
    { text: "Invite", href: "https://lnk.daalbot.xyz/Invite" }
]} />

<div class="page">
    <div class="introduction">
        <center>
            <img src="https://media.piny.dev/DaalBotSquare.png" alt="DaalBot Logo" style="border-radius: 50%; width: 150px; height: 150px; border: 3px solid black"/>
        </center>
        <h1 style="text-align: center; color: white;">About DaalBot</h1>
        <p style="text-align: center; color: white;">DaalBot is a <a href='https://github.com/DaalBot/Discord'>open source</a> multipurpose discord bot with features to help make your server better</p>
    </div>
    <div class="introduction-features-transfer"/>
    <div class="features">
        <center>
            <h1 style="font-size: 5rem; margin-bottom: 0;">Features</h1>
            <p>A (incomplete) list of features within daalbot</p>

            <h2 class="feature-title">Self Roles</h2>
            <p class="feature-description">Allow members to give themselves roles in the server with customizable menus</p>
            <img class="feature-image" src="https://media.piny.dev/daalbot/website/SelfRole.png" alt="DaalBot Self Roles"/>

            <h2 class="feature-title">Welcome Messages</h2>
            <p class="feature-description">Welcome new members to your server with customizable messages</p>
            <img class="feature-image" src="https://media.piny.dev/daalbot/website/Welcome.png" alt="DaalBot Welcome Messages"/>

            <h2 class="feature-title">Social Feeds</h2>
            <p class="feature-description">Get updates from your favorite social media accounts* in your server</p>
            <img class="feature-image" style="margin-bottom: 0;" src="https://media.piny.dev/daalbot/website/Socials.png" alt="DaalBot Social Feeds"/>
            <p style="font-size: 1rem; margin-top: 0; color: gray; margin-bottom: 10rem;">*Currently only supports Twitch and Youtube</p>
        </center>
    </div>

    <div class="invite-section">
        <center>
            <h1 style="font-size: 5rem; margin-bottom: 0;">Invite DaalBot</h1>
            <p style="font-size: 1.5rem; margin-bottom: 3rem;">Invite DaalBot to your server and start using it's features today!</p>
            <a href="https://lnk.daalbot.xyz/Invite" style="font-size: 1.5rem">Invite DaalBot</a>
        </center>
    </div>

    <div class="footer">
        <p style="font-size: 1.5rem; margin-top: 2rem;" class="footer-made-by-text">Made with ❤️ by <a href="https://piny.dev">Piny</a></p>
        <p><a href="https://github.com/DaalBot/Discord">Github</a> / <a href="https://lnk.daalbot.xyz/Privacy">Privacy Policy</a> / <a href="/feedback">Feedback</a></p>
        <p>Icons from <a href="https://tabler.io/icons">Tabler Icons</a></p>
    </div>
</div>

<style>
    .page {
        background-color: #2f2f2f;

        height: 100%;

        font-family: Poppins, sans-serif;
        color: white
    }

    .introduction {
        padding-top: 2.5rem;
        padding-bottom: 2.5rem;
        background-color: #1e1e1e;
        width: 100%;
        height: 300px;
    }

    .introduction h1 {
        color: white;
        font-size: 2rem;
    }

    .introduction p {
        color: white;
        font-size: 1.2rem;
    }

    a {
        color: #b3b3b3;
    }

    .introduction-features-transfer {
        background: rgb(30,30,30);
        background: linear-gradient(180deg, rgba(30,30,30,1) 0%, rgba(47,47,47,1) 100%);
        width: 100%;
        height: 200px;
        margin-bottom: 15px;
    }

    .feature-title {
        font-size: 3rem;
    }

    .feature-description {
        font-size: 1.5rem;
    }

    .feature-image {
        width: 800px;
        height: 400px;

        border-radius: 10px;
        border: 1px solid white;

        margin-bottom: 10rem;
    }

    @media only screen and (max-width: 800px) {
        .feature-image {
            display: none;
        }
    }

    .invite-section a {
        color: white;
        text-decoration: none;
        border: 1px solid white;
        border-radius: 5px;
        margin: 1rem;
        padding: 1rem;
        font-size: 1.5rem;
    }

    .footer {
        background-color: #1e1e1e;
        margin-top: 5rem;
        width: 100%;
        height: 6rem;

        padding-top: 5rem;
        padding-bottom: 1rem;

        text-align: center;

        position: relative;
    }

    .footer-made-by-text {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
    }

    .footer-made-by-text a {
        text-decoration: none;
    }
</style>