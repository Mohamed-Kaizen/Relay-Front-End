<script context="module">
	import custom_axios from "../../axios"

	export async function preload({params}) {
		const res = await custom_axios.get(`posts/internship/${params.slug}`)
		if (Object.keys(res.data).length > 1) {
			const internship = res.data
			return {internship}
		}
		this.error(404, "Not found")
	}
</script>

<script>
	import {Button, Icon, Snackbar} from "svelte-mui/src"
	import {user} from "../../store"
	import Spinner from "../../components/spinner.svelte"

	export let internship
	let visible = false,
		loading = false,
		message,
		snackbar_color

	async function like() {
		try {
			loading = true

			const response = await custom_axios.post(
				`posts/internship/${internship.id}/like`
			)

			if (response.status === 200 || response.status === 201) {
				message = "Liked Sucessfully"
				snackbar_color = "green"
				visible = true
				loading = false
			}
		} catch (e) {
			message = e.response.data.error
			snackbar_color = "red"
			visible = true
			loading = false
		}
	}

	async function apply() {
		try {
			loading = true

			const response = await custom_axios.post(
				`posts/internship/${internship.id}/apply`
			)
			if (response.status === 200 || response.status === 201) {
				message = "Sucessfully Applied"
				snackbar_color = "green"
				visible = true
				loading = false
			}
		} catch (e) {
			message = e.response.data
			snackbar_color = "red"
			visible = true
			loading = false
		}
	}
</script>

<Snackbar bind:visible bottom bg="{snackbar_color}">
	{message}
	<span slot="action">
		<Button color="#ff0" on:click="{() => (visible = false)}">Close</Button>
	</span>
</Snackbar>

<section class="text-gray-700 body-font overflow-hidden bg-white">
	<div class="container px-5 py-24 mx-auto">
		<div class="mx-auto flex flex-wrap">
			<div class=" w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
				<h2 class="text-sm title-font text-gray-500 tracking-widest">
					{internship.type}
				</h2>
				<h1 class="text-gray-900 text-3xl title-font font-medium mb-1">
					{internship.title}
				</h1>
				<div class="flex mb-4">
					<span class="text-gray-600 ml-3">
						{internship.commentCount} Comments
					</span>
					<span class="text-gray-600 ml-3">
						{internship.duration} Duration
					</span>
				</div>
				<p class="leading-relaxed">{internship.description}</p>
				<br />
				<p class="leading-relaxed">Location: {internship.location}</p>
				<p class="leading-relaxed">status: {internship.status}</p>
				<p class="leading-relaxed">
					candidates: {internship.number_of_candidates}
				</p>
				<p class="leading-relaxed">likes: {internship.likes}</p>
				<p class="leading-relaxed">
					Deadline: {internship.expiredation}
				</p>
				<p class="leading-relaxed">
					From:
					<a
						class="text-blue-400"
						href="enterprises/{internship.enterprice_handle}/">
						{internship.enterprice_handle}
					</a>
				</p>
				<div
					class="flex mt-6 items-center pb-5 border-b-2 border-gray-200
					mb-5"></div>
				<div class="flex justify-between">
					<span class="title-font font-medium text-2xl text-gray-900">
						${internship.salary}
					</span>
					{#if $user && $user.isUser}
						{#if loading}
							<Spinner />
						{:else}
							<div>
								<Button on:click="{apply}" raised>Apply</Button>
								<Button on:click="{like}" icon>
									<Icon
										path="M20.84 4.61a5.5 5.5 0 00-7.78 0L12
										5.67l-1.06-1.06a5.5 5.5 0 00-7.78
										7.78l1.06 1.06L12 21.23l7.78-7.78
										1.06-1.06a5.5 5.5 0 000-7.78z" />
								</Button>
							</div>
						{/if}
					{/if}
				</div>
			</div>
		</div>
	</div>
</section>
