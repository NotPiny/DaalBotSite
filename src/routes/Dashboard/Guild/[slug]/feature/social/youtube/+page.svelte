<script>
    import { browser } from "$app/environment";
    import tools from "$lib/dashboard/tools";

    // Icons
    import IconPencil from "$lib/images/svg/icons/pencil.svg"
    import IconPlus from "$lib/images/svg/icons/plus.svg"
    import IconCross from "$lib/images/svg/icons/cross.svg"

    browser ? document.body.style.backgroundColor = '#2f2f2f' : null;
    browser ? document.body.style.height = '100%' : null;

    /**
     * @type {{id: string, name: string, icon: string?, roles: Array<{name: string, id: string}>}}
    */
    let guild = {
        id: '',
        name: '',
        icon: '',
        roles: [
            {
                name: 'Placeholder',
                id: '1'
            }
        ]
    };

    (async () => {
        guild = await tools.guild.getCurrent();
    })();
</script>

<main>
    <h1>Youtube Feeds</h1>

    <!-- TODO: Implement custom table -->
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
        height: 50%;

        margin-top: 5rem;

        margin-left: auto;
        margin-right: auto;

        background-color: #3f4d68;

        border-radius: 10px;

        padding: 2rem;
    }
</style>