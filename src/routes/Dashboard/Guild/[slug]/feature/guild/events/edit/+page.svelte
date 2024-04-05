<script>
    import categoryIcon from '$lib/images/svg/icons/filled/category.svg';
    import codeIcon from '$lib/images/svg/icons/code.svg';
    import { onMount } from 'svelte';

    onMount(() => {
        document.body.style.backgroundImage = 'linear-gradient(to right bottom, #6200ff, #6c0bf9, #7514f4, #7d1cee, #8323e9, #8724e4, #8b25df, #8e26da, #9022d4, #921fcf, #941bc9, #9517c4)';
        document.body.style.fontFamily = 'Poppins, sans-serif';
        document.body.style.height = '91.5vh';
    });

    /**
     * @param {string} editor
     */
    async function openEditor(editor) {
        if (editor === 'visual') {
            window.location.href = window.location.href.replace('edit', 'builder').replace('#', '?id=');
        } else if (editor === 'code') {
            window.location.href = window.location.href.replace('edit', 'editor').replace('#', '?id=');
        }
    }
</script>

<main>
    <h1 style="margin-bottom: 0.1rem;">Pick a editor</h1>
    <p style="margin-bottom: 5rem;">Please select a editor to use for modifying this event</p>

    <div class="button-split">
        <button on:click={() => openEditor('visual|')} style="cursor: not-allowed">
            <img class="editor-icon" src={categoryIcon} alt="3 Squares with one circle" /><br/>
            <span class="button-label">Visual Editor <br/>(Coming soon)</span>
        </button>
        <button on:click={() => openEditor('code')}>
            <img class="editor-icon" src={codeIcon} alt="3 Squares with one circle" /><br/>
            <span class="button-label">Code Editor</span>
        </button>
    </div>
</main>

<style>
    * {
        font-family: Poppins, sans-serif;
        color: white;
    }

    main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        width: 75%;
        height: 80%;

        margin-top: 5rem;

        margin-left: auto;
        margin-right: auto;

        background-color: #1a1b1f;

        border-radius: 10px;

        padding: 2rem;
    }

    .button-split {
        display: flex;
        flex-direction: row;
        gap: 1rem;
    }

    button {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        align-items: center;

        padding: 1rem;

        background-color: #353636;
        border-radius: 10px;

        border: none;

        cursor: pointer;
    }

    .editor-icon {
        width: 5rem;
        height: 5rem;

        filter: invert(1);
    }

    .button-label {
        font-size: 1.2rem;
    }
</style>