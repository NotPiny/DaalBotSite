<svelte:head>
    <title>Event Builder - Dashboard</title>
</svelte:head>
<script>
  // @ts-nocheck
    import { writable } from 'svelte/store';
    export const noNav = true; // Hide the navbar
    import {
        SvelteFlow,
        Controls,
        Background,
        MiniMap,
        SvelteFlowProvider
    } from '@xyflow/svelte';

    import '@xyflow/svelte/dist/style.css'

    import SendNode from './Send.svelte';

    const nodes = writable([
        {
            id: '1',
            data: { label: 'Trigger' },
            position: { x: 0, y: 0 }
        },
        {
            id: '2',
            data: { label: 'World' },
            position: { x: 250, y: 150 },
            type: 'custom'
        }
    ]);

    const edges = writable([
        {
            id: '1-2',
            source: '1',
            target: '2',
        }
    ]);

    const nodeTypes = {
        custom: SendNode
    }
</script>

<div style:height="100vh">
    <SvelteFlowProvider>
        <SvelteFlow {nodes} {edges} {nodeTypes} fitView colorMode="system">
            <Controls />
            <Background />
            <MiniMap />
        </SvelteFlow>
    </SvelteFlowProvider>
</div>