<script context="module">
	import custom_axios from "../../axios"

	export async function preload() {
		const res = await custom_axios.get("posts/internships")
		const internships = res.data
		return {internships}
	}
</script>

<script>
	export let internships
</script>

<svelte:head>
	<title>List of Internships | Relay</title>
</svelte:head>

<section class="text-gray-700 body-font">
	<div class="container px-5 py-24 mx-auto">
		{#each internships as {type, title, status, number_of_candidates, location, expiredation, duration, id, likes}}
			<div class="lg:flex shadow rounded-lg border border-gray-400">
				<div
					class="bg-red-600 rounded-lg lg:w-2/12 py-4 block h-full
					shadow-inner">
					<div class="text-center tracking-wide">
						<div class="text-white font-bold text-2xl ">
							DeadLine
						</div>
						<div class="text-white font-normal text-2xl">
							{expiredation}
						</div>
					</div>
				</div>
				<div
					class="w-full lg:w-11/12 xl:w-full px-1 bg-white py-5 lg:px-2
					lg:py-2 tracking-wide">
					<div class="flex flex-row lg:justify-start justify-center">
						<div
							class="text-gray-700 font-medium text-sm text-center
							lg:text-left px-2">
							<i class="far fa-clock"></i>
							<strong>Duration</strong>
							: {duration}
						</div>
						<div
							class="text-gray-700 font-medium text-sm text-center
							lg:text-left px-2">
							<strong>Likes</strong>
							: {likes}
						</div>
						<div
							class="text-gray-700 font-medium text-sm text-center
							lg:text-left px-2">
							<strong>Candidates</strong>
							: {number_of_candidates}
						</div>
					</div>
					<a href="internships/{id}/">
						<div
							class="font-semibold text-blue-800 text-xl
							text-center lg:text-left px-2">
							{title}
						</div>
					</a>

					<div
						class="text-gray-600 font-medium text-sm pt-1 text-center
						lg:text-left px-2">
						{location}
					</div>
					<div
						class="text-gray-600 font-medium text-sm pt-1 text-center
						lg:text-left px-2">
						{type}
					</div>
				</div>
				<div
					class="flex flex-row items-center w-full lg:w-1/3 bg-white
					lg:justify-end justify-center px-2 py-4 lg:px-0">
					<span
						class="tracking-wider text-gray-600 bg-gray-200 px-2
						text-sm rounded leading-loose mx-2 font-semibold">
						{status}
					</span>

				</div>
			</div>
			<br />
		{/each}
	</div>
</section>
