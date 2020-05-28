<script>
	import {setContext} from "svelte"

	import {stores} from "@sapper/app"

	import PreloadingIndicator from "../components/PreloadingIndicator.svelte"
	import RelayNavBar from "../components/relay_navbar.svelte"

	import {token, user} from "../store"

	const {preloading, page} = stores()

	if (typeof window !== "undefined") {
		token.use_local_storage()
		user.use_local_storage()
	}
	setContext("token", token)

	setContext("user", user)
</script>

<svelte:head>
	<title>Relay</title>
</svelte:head>

{#if $preloading}
	<PreloadingIndicator />
{/if}

<RelayNavBar />

<slot />
