<script>

</script>

<div class="node">
    <div class="node__content">
        <slot />
    </div>
    <center><div class="node__handle"></div></center>
</div>

<style>
    .node__content {
        background-color: #2f3136;
        color: white;
        border-radius: 15px;
        margin: 10px;
        padding: 10px;
    }

    .node__handle {
        position: relative;
        background-color: #fff;
        width: 1em;
        height: 1em;
        border-radius: 50%;

        margin-top: -1em;
        z-index: -1;
    }
</style>