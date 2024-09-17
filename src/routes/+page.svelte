<script>
    import Footer from "../components/Footer.svelte";
    import Header from "../components/Header.svelte";
    import Navbar from "../components/Navbar.svelte";

    import DaalBotLogo from '$lib/images/assets/DaalBotSquare.svg';
</script>

<svelte:head>
    <title>DaalBot - The only Discord bot you need</title>
    <meta name="description" content="DaalBot is a multipurpose Discord bot with features to help make your server better">
</svelte:head>
<Navbar />
<Header title="DaalBot" buttons={[
    { text: "Dashboard", href: "/Dashboard" },
    { text: "Invite", href: "https://go.daalbot.xyz/Invite" }
]} />

<div class="page">
    <div class="introduction">
        <center>
            <img src={DaalBotLogo} alt="DaalBot Logo" style="border-radius: 50%; width: 150px; height: 150px; border: 3px solid black"/>
        </center>
        <h1 style="text-align: center; color: white;">About DaalBot</h1>
        <p style="text-align: center; color: white;">DaalBot is an <a href='https://github.com/DaalBot/Discord'>open source</a> multipurpose Discord bot with features to help make your server better</p>
    </div>
    <div class="introduction-features-transfer"/>
    <div class="features">
        <center>
            <h1 style="font-size: 5rem; margin-bottom: 0;">Features</h1>
            <p>An (incomplete) list of features within DaalBot</p>

            <h2 class="feature-title">Self Roles</h2>
            <p class="feature-description">Allow members to give themselves roles in the server with customizable menus</p>
            <picture>
                <source srcset="https://media.piny.dev/daalbot/website/SelfRole.webp" type="image/webp"/>
                <img class="feature-image" src="https://media.piny.dev/daalbot/website/SelfRole.png" alt="DaalBot Self Roles"/>
            </picture>

            <h2 class="feature-title">Welcome Messages</h2>
            <p class="feature-description">Welcome new members to your server with customizable messages</p>
            <picture>
                <source srcset="https://media.piny.dev/daalbot/website/Welcome.webp" type="image/webp"/>
                <img class="feature-image" src="https://media.piny.dev/daalbot/website/Welcome.png" alt="DaalBot Welcome Messages"/>
            </picture>

            <h2 class="feature-title">Social Feeds</h2>
            <p class="feature-description">Get updates from your favorite social media accounts* in your server</p>
            <picture>
                <source srcset="https://media.piny.dev/daalbot/website/Socials.webp" type="image/webp"/>
                <img class="feature-image" style="margin-bottom: 0;" src="https://media.piny.dev/daalbot/website/Socials.png" alt="DaalBot Social Feeds"/>
            </picture>
            <p style="font-size: 1rem; margin-top: 0; color: #b3b3b3; margin-bottom: 10rem;">*Currently only supports Twitch</p>
        </center>
    </div>

    <div class="invite-section">
        <center>
            <h1>Invite DaalBot</h1>
            <p style="font-size: 1.5rem; margin-bottom: 3rem;">Invite DaalBot to your server and start using its features today!</p>
            <a href="https://go.daalbot.xyz/Invite" style="font-size: 1.5rem">Invite DaalBot</a>
        </center>
    </div>

    <Footer />
</div>

<style>
    .page {
        background-color: #2f2f2f;

        height: 100%;

        font-family: Poppins, sans-serif;
        color: white;
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

        .feature-title {
            font-size: 2rem;
        }

        .feature-description {
            font-size: 1rem;
        }

        p {
            margin: 1rem;
        }

        .invite-section h1 {
            font-size: 3rem !important;
        }

        .introduction-features-transfer {
            height: 100px;
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

    .invite-section h1 {
        font-size: 5rem;
        margin-bottom: 0;
    }
</style>