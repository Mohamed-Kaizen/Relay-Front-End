<script>
	export let segment, drawer

	import {match_path} from "../utils"

	import {user} from "../store"

	const links = [
		{link: "General", route: "/profile/"},
		{link: "Settings", route: "profile/settings/"},
	]
	const protected_links = [
		{link: "Applied", route: "profile/applied/"},
		{link: "Accepted", route: "profile/accepted/"},
	]
</script>

<div
	class="{drawer ? 'block fixed z-30 ' : 'hidden'} lg:block w-64 px-8 py-4
	bg-white border-r overflow-auto h-full">
	<a href="/">
		<img
			class="h-9 w-9"
			src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Svelte_Logo.svg/512px-Svelte_Logo.svg.png"
			alt="svelte logo" />
	</a>
	<nav class="mt-8">

		<div class="mt-2 -mx-3">

			{#each links as {link, route}}
				<a
					href="{route}"
					class="mb-1 flex justify-between items-center px-3 py-2 {match_path(segment, route) ? 'bg-gray-200 rounded-lg' : 'hover:bg-gray-200 rounded-lg'}">

					<span
						class=" text-sm font-medium {match_path(segment, route) ? 'text-gray-900' : 'text-gray-700 hover:text-gray-900'}
						">
						{link}
					</span>

				</a>
			{/each}
			{#if $user && $user.isCampany}
				{#each protected_links as {link, route}}
					<a
						href="{route}"
						class="mb-1 flex justify-between items-center px-3 py-2 {match_path(segment, route) ? 'bg-gray-200 rounded-lg' : 'hover:bg-gray-200 rounded-lg'}">

						<span
							class=" text-sm font-medium {match_path(segment, route) ? 'text-gray-900' : 'text-gray-700 hover:text-gray-900'}
							">
							{link}
						</span>

					</a>
				{/each}
			{/if}
		</div>
	</nav>

</div>
