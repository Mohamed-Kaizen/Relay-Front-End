<script>
	export let drawer

	import TopBar from "./top_bar.svelte"
</script>

<div class="flex-shrink-0 border-b-2 border-gray-200">
	<header>
		<div class="px-6">

			<TopBar bind:drawer />
		</div>
	</header>
</div>
