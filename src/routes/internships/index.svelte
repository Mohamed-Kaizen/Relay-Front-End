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
	import {fly} from "svelte/transition"
	import {
		Snackbar,
		Icon,
		Dialog,
		Datefield,
		Textfield,
		Button,
	} from "svelte-mui/src"

	let salarys,
		durations,
		candidates,
		descriptions,
		expired_dates,
		statuss,
		locations,
		types,
		titles,
		field_majors,
		visible = false,
		message,
		snackbar_color,
		snackbar_visible

	async function create() {
		const data = {
			salary: salarys,
			duration: durations,
			number_of_candidates: candidates,
			description: descriptions,
			expiredation: new Date(),
			status: statuss,
			location: locations,
			type: types,
			title: titles,
			field_major: field_majors,
		}
		try {
			const response = await custom_axios.post("posts/internship", data)
			const res = await custom_axios.get("posts/internships")
			internships = res.data
			message = "internship has been created"
			snackbar_color = "green"
			snackbar_visible = true
		} catch (e) {
			console.log(e.response)
			message = e.response.data.error
			snackbar_color = "red"
			snackbar_visible = true
		}
	}
</script>

<svelte:head>
	<title>List of Internships | Relay</title>
</svelte:head>

<Snackbar bind:visible="{snackbar_visible}" bg="{snackbar_color}" bottom>
	{message}
	<span slot="action">
		<Button color="#ff0" on:click="{() => (snackbar_visible = false)}">
			Close
		</Button>
	</span>
</Snackbar>

<Dialog width="1000" bind:visible>
	<div slot="title">Create New Internship!</div>

	<form on:submit|preventDefault="{create}">
		<Textfield
			fill
			type="text"
			required
			bind:value="{titles}"
			label="Title" />
		<Textfield
			fill
			type="number"
			required
			bind:value="{salarys}"
			label="Salary" />
		<Textfield
			fill
			type="text"
			required
			bind:value="{durations}"
			label="Duration" />
		<Textfield
			fill
			type="number"
			required
			bind:value="{candidates}"
			label="candidates" />
		<Datefield
			value="{expired_dates}"
			label="DeadLine"
			format="D.MM.YYYY"
			message="D.MM.YYYY"
			locale="ar"
			icon />
		<Textfield
			fill
			type="text"
			required
			bind:value="{statuss}"
			label="Status" />
		<Textfield
			fill
			type="text"
			required
			bind:value="{locations}"
			label="Location" />
		<Textfield fill type="text" required bind:value="{types}" label="Type" />
		<Textfield
			fill
			type="text"
			required
			bind:value="{field_majors}"
			label="Major" />
		<Textfield
			fill
			type="text"
			required
			bind:value="{descriptions}"
			label="Description" />
		<Button raised shaped type="submit" color="primary">
			Submit
			<Icon
				path="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"
				style="margin: 0 -4px 0 8px;" />
		</Button>
	</form>
</Dialog>

<section
	transition:fly="{{x: 200, duration: 2000}}"
	class="text-gray-700 body-font">
	<div class="container px-5 py-24 mx-auto">

		<Button raised on:click="{() => (visible = true)}">Create new</Button>

		{#each internships as {type, title, status, number_of_candidates, location, expiredation, duration, id, likes}}
			<div class="bg-white shadow-lg rounded-lg overflow-hidden my-4">
				<div class="flex items-center px-6 py-3 bg-gray-900">
					<svg
						class="h-6 w-6 text-white fill-current"
						viewBox="0 0 512 512">
						<path
							d="M256 48C150 48 64 136.2 64 245.1v153.3c0 36.3 28.6
							65.7 64 65.7h64V288h-85.3v-42.9c0-84.7 66.8-153.3
							149.3-153.3s149.3 68.5 149.3
							153.3V288H320v176h64c35.4 0 64-29.3 64-65.7V245.1C448
							136.2 362 48 256 48z"></path>
					</svg>
					<h1 class="mx-3 text-white font-semibold text-lg">
						{status}
					</h1>
				</div>
				<div class="py-4 px-6">
					<a href="/internships/{id}/">
						<h1 class="text-2xl font-semibold text-blue-800">
							{title}
						</h1>
					</a>
					<p class="py-2 text-lg text-gray-700">
						DeadLine: {expiredation}
						<br />
						Duration: {duration}
						<br />
						Likes: {likes}
						<br />
						Type: {type}
					</p>
					<div class="flex items-center mt-4 text-gray-700">
						<svg class="h-6 w-6 fill-current" viewBox="0 0 512 512">
							<path
								d="M239.208 343.937c-17.78 10.103-38.342
								15.876-60.255 15.876-21.909
								0-42.467-5.771-60.246-15.87C71.544 358.331 42.643
								406 32
								448h293.912c-10.639-42-39.537-89.683-86.704-104.063zM178.953
								120.035c-58.479 0-105.886 47.394-105.886 105.858
								0 58.464 47.407 105.857 105.886
								105.857s105.886-47.394
								105.886-105.857c0-58.464-47.408-105.858-105.886-105.858zm0
								186.488c-33.671
								0-62.445-22.513-73.997-50.523H252.95c-11.554
								28.011-40.326 50.523-73.997 50.523z"></path>
							<g>
								<path
									d="M322.602
									384H480c-10.638-42-39.537-81.691-86.703-96.072-17.781
									10.104-38.343 15.873-60.256 15.873-14.823
									0-29.024-2.654-42.168-7.49-7.445 12.47-16.927
									25.592-27.974 34.906C289.245 341.354 309.146
									364 322.602 384zM306.545 200h100.493c-11.554
									28-40.327 50.293-73.997 50.293-8.875
									0-17.404-1.692-25.375-4.51a128.411 128.411 0
									0 1-6.52 25.118c10.066 3.174 20.779 4.862
									31.895 4.862 58.479 0 105.886-47.41
									105.886-105.872
									0-58.465-47.407-105.866-105.886-105.866-37.49
									0-70.427 19.703-89.243 49.09C275.607 131.383
									298.961 163 306.545 200z"></path>
							</g>
						</svg>
						<h1 class="px-2 text-sm">{number_of_candidates}</h1>
					</div>
					<div class="flex items-center mt-4 text-gray-700">
						<svg class="h-6 w-6 fill-current" viewBox="0 0 512 512">
							<path
								d="M256 32c-88.004 0-160 70.557-160 156.801C96
								306.4 256 480 256 480s160-173.6 160-291.199C416
								102.557 344.004 32 256 32zm0 212.801c-31.996
								0-57.144-24.645-57.144-56 0-31.357 25.147-56
								57.144-56s57.144 24.643 57.144 56c0 31.355-25.148
								56-57.144 56z"></path>
						</svg>
						<h1 class="px-2 text-sm">{location}</h1>
					</div>
				</div>
			</div>
		{/each}
	</div>
</section>
