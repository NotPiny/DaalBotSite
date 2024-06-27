<!-- <script>
    import { browser } from "$app/environment";

    let feedbackDetails = '';
    let userID = '';

    function submitFeedback() {
        // Send the feedback to the server or perform any other necessary actions
        console.log(feedbackDetails);
    }

    async function discordLogin() {
        if (browser) {
            window.location.href = "https://go.daalbot.xyz/DiscordOAuth";
        }
    }

    if (browser) {
        document.body.style.backgroundColor = '#2f2f2f';

        if (!localStorage.getItem('accesscode')) {
            // @ts-ignore
            document.getElementById('feedback-form').style.display = 'none';
            // @ts-ignore
            document.getElementById('login-prompt').style.display = 'flex';
        }
    }
</script>

<main id="feedback-form">
    <h1>Feedback Form</h1>
    <textarea bind:value={feedbackDetails} placeholder="Enter your feedback"></textarea>
    <button on:click={submitFeedback}>Submit</button>
</main>
<div id="login-prompt" style="display: none;">
    <h1>Login required</h1>
    <p>You need to be logged in to submit feedback</p>
    <button on:click={() => discordLogin}>
        Login with Discord
    </button>
</div>

<style>
    * {
        color: white;
        font-family: Poppins, sans-serif;
    }

    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
    }

    #login-prompt {
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;

        z-index: 100;
    }

    h1 {
        margin-bottom: 1rem;
    }

    textarea {
        width: 300px;
        height: 150px;
        margin-bottom: 1rem;
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        resize: vertical;

        color: black;
    }

    button {
        padding: 0.5rem 1rem;
        background-color: #007bff;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
</style> -->

<h1>
    Temporary placeholder
</h1>
<p>
    This page is a work in progress and i have no clue how you got here. But that must mean you are a very special person. Thank you for being here.
</p>
<a href="/">Go home</a>