<script>
	import {setContext} from "svelte"

	import {stores} from "@sapper/app"

	import PreloadingIndicator from "../components/PreloadingIndicator.svelte"
	import RelayNavBar from "../components/relay_navbar.svelte"

	import {token, user} from "../store"

	import {get_path} from "../utils"

	const {preloading, page} = stores()

	if (typeof window !== "undefined") {
		token.use_local_storage()
		user.use_local_storage()
	}

	$: path = $page.path

	setContext("token", token)

	setContext("user", user)

	$: path_name = get_path(path)
</script>

{#if $preloading}
	<PreloadingIndicator />
{/if}

{#if path_name === 'profile'}
	<slot />
{:else}
	<RelayNavBar />

	<slot />
{/if}
