<script>
	import {onMount} from "svelte"
	import {
		fly,
		draw,
		fade,
		scale,
		slide,
		blur,
		crossfade,
	} from "svelte/transition"

	let show = false

	onMount(() => {
		show = true
	})
</script>

{#if show}
	<div in:blur="{{duration: 2200}}" out:fly="{{y: 200, duration: 500}}">
		<slot />
	</div>
{/if}

<style>
	div {
		position: relative;
	}
</style>
