<script context="module">
	import custom_axios from "../../axios"

	export async function preload() {
		const res = await custom_axios.get("users")
		const enterprises = res.data.enterprises
		return {enterprises}
	}
</script>

<script>
	export let enterprises
	console.log(enterprises)
</script>

<svelte:head>
	<title>List of Enterprises | Relay</title>
</svelte:head>

<section class="text-gray-700 body-font">
	<div class="container px-5 py-24 mx-auto">
		<div class="flex flex-wrap -m-4">
			{#each enterprises as {enterprise_name, username, emai, avatarImg}}
				<div
					class="container mx-auto max-w-sm rounded-lg overflow-hidden
					shadow-lg my-2 bg-white">
					<div
						class="relative z-9"
						style="clip-path: polygon(0 0, 100% 0, 100% 100%, 0
						calc(100% - 5vw));">
						<img
							class="w-full"
							src="{avatarImg}"
							alt="{enterprise_name} Profile" />
						<div
							class="text-center absolute w-full"
							style="bottom: 4rem">
							<p
								class="text-white tracking-wide uppercase text-lg
								font-bold">
								{enterprise_name}
							</p>
							<p class="text-gray-400 text-sm">{username}</p>
						</div>
					</div>
					<div
						class="relative flex justify-between items-center
						flex-row px-6 z-11 -mt-10">
						<p class="flex items-center text-gray-400">
							<span
								class="inline-block w-3 h-3 bg-green-500
								rounded-full mr-2"></span>
							{emai}
						</p>
						<a href="enterprises/{username}/">
							<button
								class="p-4 bg-red-600 rounded-full
								hover:bg-red-500 focus:bg-red-700 transition
								ease-in duration-200 focus:outline-none">
								<svg
									viewBox="0 0 20 20"
									enable-background="new 0 0 20 20"
									class="w-6 h-6">
									<path
										fill="#FFFFFF"
										d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
								</svg>
							</button>
						</a>
					</div>
					<div class="pt-6 pb-8 text-gray-600 text-center">
						<p>{enterprise_name}</p>
						<p class="text-sm">{username}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
