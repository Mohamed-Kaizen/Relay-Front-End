<script>
	export let drawer
	import {Button, Icon} from "svelte-mui/src"
	import {user} from "../store"
</script>

<svelte:head>
	{#if $user}
		<title>{$user.username} | Relay</title>
	{/if}
</svelte:head>

<div class="flex justify-between items-center py-3">
	<div class="flex-1 min-w-0 flex">
		<div class="lg:hidden">
			<Button on:click="{() => (drawer = !drawer)}">
				<Icon path="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
			</Button>
		</div>

	</div>

	<div class="ml-6 flex-shrink-0 flex items-center">
		{#if $user}
			<img
				class="ml-6 h-9 w-9 rounded-full object-cover"
				src="{$user.avatarImg}"
				alt="{$user.fullname} Profile" />
		{/if}
	</div>

</div>
