<script>
	export let segment

	import {goto} from "@sapper/app"

	import Drawer2 from "../../components/drawer_2.svelte"
	import NavBar2 from "../../components/nav_bar_2.svelte"
	import {token} from "../../store"

	let drawer = false

	if (typeof window !== "undefined") {
		if (!$token) {
			goto("/signin/")
		}
	}
</script>

<div class="h-screen flex">
	<div
		on:click="{() => (drawer = !drawer)}"
		class="{drawer ? 'block' : 'hidden'} fixed inset-0 bg-black opacity-50
		lg:hidden"></div>

	<Drawer2 {segment} {drawer} />
	<div class="flex-1 min-w-0 flex flex-col bg-white">
		<NavBar2 bind:drawer />
		<slot />
	</div>

</div>
