<script>
    import { browser } from "$app/environment";

    /**
     * @param {number} length
     */
    function generateRandomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';

        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        return result;
    }

    export let id = generateRandomString(10);
</script>

<div class="popup" id="popup-{id}">
    <div class="popup-box">
            <button on:click={() => {
                const popup = document.getElementById(`popup-${id}`);
                if (popup) {
                    popup.style.display = 'none';
                }
            }}>Close</button>
        <div class="popup-content">
            <slot />
        </div>
    </div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="popup-overlay" id="popup-overlay-{id}" on:click={() => {
            const popup = document.getElementById(`popup-${id}`);
            if (popup) {
                popup.style.display = 'none';
            }
        }}>
    </div>
</div>

<style>
    .popup {
        display: none;
    }

    .popup-box {
        position: absolute;
        z-index: 1000;
        background-color: rgb(43, 40, 40);
        border-radius: 5px;
        padding: 1rem;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

        /* Center */
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .popup-overlay {
        position: fixed;
        z-index: 999;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.534);
    }

    .popup button {
        padding: 0.5rem 1rem;
        font-size: 1.3rem;
        color: white;
        background-color: rgb(45, 45, 45);
        border: none;
        border-radius: 5px;
        cursor: pointer;

        position: absolute;
        top: 0;
        right: 0;
    }

    .popup-content {
        padding: 1rem;
    }
</style>