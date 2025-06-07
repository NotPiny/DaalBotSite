<svelte:head>
    <title>Details - DaalBot</title>

    <style>
        body {
            background-color: #1f1f1f;
            margin: 0;
        }
    </style>
</svelte:head>

<script>
    import { onMount } from "svelte";

    onMount(() => {
        if (window.location.hash) {
            const element = document.querySelector(window.location.hash);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
    });
</script>

<div class="content">


Welcome to the details of how DaalBot works, from how certain features get their data to how the <a href="https://api.daalbot.xyz">APIs</a> and bot all communicate. To be clear all of this is simplifed, if you're looking to implement these yourself I would advise looking at the source code instead<br/><br/>

<h1>The infrastructure</h1>
<p>
    This is gonna be a bit of a long read, so grab a cup of tea <b>NOT COFFEE</b> and get ready to learn about how DaalBot works.
</p>

<h2>The server</h2>
<p>
    DaalBot as of June 2025 runs on a single server, it is equipped with 8GB of RAM and a AMD EPYC processor (4 cores) running Ubuntu Server 20.04 LTS.
    The server is located in Quebec, Canada and is hosted by OVHcloud connected to a 300Mbps (dualway) connection.
    The server is running Node.js 18.16.0 and uses PM2 to manage the bot and API processes.
    We only have one IP address that the bot, and internal / public APIs use, instead of having multiple IPs we use subdomains to differentiate between the bot and APIs.
    In order to map these subdomains we use Nginx as a reverse proxy.
</p>

<h2>The bot</h2>
<p>
    The bot mostly operates by itself, it is fully capable of running without the API, meaning that even if the API were to go down the bot would still be able to function.
    The only thing the bot needsto transmit data to the API is the data displayed on <a href="https://bot.daalbot.xyz">bot.daalbot.xyz</a>.
</p>

<h2>The APIs</h2>
<h3>Internal</h3>
<p>
    The internal API is used by the public API to communicate with the filesystem on the bots server, this comes from when the public API used to be hosted on a different server, but now that the public API is hosted on the same server as the bot, so this could be considered redundant, but it is still kept for backwards compatibility.
</p>
<h3>External</h3>
<p>
    The public API is used by the dashboard and any applications that want to interact with it, because this isn't just public facing for our own sites but also for third party applications, if you want to learn more here's the <a href="https://docs.daalbot.xyz/docs/api">API documentation</a>.
    As for the actual details for how it works, refer to <a href="https://api.daalbot.xyz">the source code</a>.
</p>

<h1>Logging</h1>
<div id="message-deletion-attribution">
    <h2>Message Deletion Attribution</h2>
    <p>
        DaalBot uses discords audit log feature to determine who deleted a message, whenever a message is deleted, DaalBot will ask Discord for the latest entries in the audit log.
        For this example, we are going to say that the message was sent by <code>Alice</code> now if the audit log has an entry that says that <code>Bob</code> had deleted a message sent by <code>Alice</code> then DaalBot will attribute the deletion to <code>Bob</code>; however, if <code>Alice</code> or a bot had deleted it, Discord doesn't add a entry for it, so we instead just say that the message was deleted by "<code>Alice</code> or a bot".<br/>
        To be clear, this is not a perfect system, theoretically if <code>Bob</code> deleted a message sent by <code>Alice</code> and then a bot or <code>Alice</code> deleted a message sent by <code>Alice</code> it would also be attributed to <code>Bob</code>, but that's why this note is here, There is no perfect way to find out who deleted a message, we're just taking a educated guess based on the data Discord provides us.
    </p>
</div>


</div>

<style>
    a {
        color: #b1add4;
    }

    a:visited {
        color: #826ae3;
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