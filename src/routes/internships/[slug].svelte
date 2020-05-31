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
	import {Button, Icon, Snackbar, Textfield} from "svelte-mui/src"
	import {user} from "../../store"
	import Spinner from "../../components/spinner.svelte"

	export let internship
	let visible = false,
		loading = false,
		message,
		snackbar_color, promise, comment

    promise = get_comments()

	async function get_comments() {
		try {
			const response = await custom_axios.get(
				`posts/internship/${internship.id}/comments`
			)

			if (response.status === 200 || response.status === 201) {
			    return response.data
			}
		} catch (e) {
			message = `${e.response.data}`
			snackbar_color = "red"
			visible = true
		}
	}

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

		async function post_comment() {
		try {
			loading = true
            const data = {comment: comment}
			const response = await custom_axios.post(
				`posts/internship/${internship.id}/comment`, data
			)
            console.log(response)
			if (response.status === 200 || response.status === 201) {
				message = "comment created Successfully"
				snackbar_color = "green"
				visible = true
				loading = false
                promise = get_comments()
			}
		} catch (e) {
		    console.log(e.response)
			message = e.response
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
<br />
<br />
<br />
<br />
<h1>Applied</h1>
<hr />
<section class="text-gray-700 body-font">
	<div class="container px-5 py-24 mx-auto">
		<div class="flex flex-wrap -m-4">
			{#each internship.applied_users as {avatarImg, email, username, fullname}}
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
							alt="{fullname} Profile" />
						<div
							class="text-center absolute w-full"
							style="bottom: 4rem">
							<p
								class="text-white tracking-wide uppercase text-lg
								font-bold">
								{fullname}
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
							{email}
						</p>
						<a href="users/{username}/">
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
						<p>Fullstack Developer</p>
						<p class="text-sm">Coding from Planet Earth</p>
					</div>

					<div
						class="pb-10 uppercase text-center tracking-wide flex
						justify-around">
						<div class="posts">
							<p class="text-gray-400 text-sm">Posts</p>
							<p class="text-lg font-semibold text-blue-300">76</p>
						</div>
						<div class="followers">
							<p class="text-gray-400 text-sm">Followers</p>
							<p class="text-lg font-semibold text-blue-300">
								964
							</p>
						</div>
						<div class="following">
							<p class="text-gray-400 text-sm">Following</p>
							<p class="text-lg font-semibold text-blue-300">34</p>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<br />
<h1>Accepted</h1>
<hr />
<section class="text-gray-700 body-font">
	<div class="container px-5 py-24 mx-auto">
		<div class="flex flex-wrap -m-4">
			{#each internship.accepted_users as {avatarImg, email, username, fullname}}
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
							alt="{fullname} Profile" />
						<div
							class="text-center absolute w-full"
							style="bottom: 4rem">
							<p
								class="text-white tracking-wide uppercase text-lg
								font-bold">
								{fullname}
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
							{email}
						</p>
						<a href="users/{username}/">
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
						<p>Fullstack Developer</p>
						<p class="text-sm">Coding from Planet Earth</p>
					</div>

					<div
						class="pb-10 uppercase text-center tracking-wide flex
						justify-around">
						<div class="posts">
							<p class="text-gray-400 text-sm">Posts</p>
							<p class="text-lg font-semibold text-blue-300">76</p>
						</div>
						<div class="followers">
							<p class="text-gray-400 text-sm">Followers</p>
							<p class="text-lg font-semibold text-blue-300">
								964
							</p>
						</div>
						<div class="following">
							<p class="text-gray-400 text-sm">Following</p>
							<p class="text-lg font-semibold text-blue-300">34</p>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<br />
<h1>Comments</h1>
<hr />
<section class="text-gray-700 body-font">
	<div class="container px-5 py-24 mx-auto">
        <div class="flex">
        <Textfield
            filled
            autocomplete="on"
            label="Comment"
            required
            bind:value="{comment}"
            type="text" />

            <Button icon on:click={post_comment}>
            <Icon
                path="M2.01 21L23 12 2.01 3 2
                10l15 2-15 2z"/>
        </Button>
        </div>
        <br/>
        {#await promise}
        <h1>Loading.......</h1>
            {:then data}
            {#each data.comments as {comment, userId}}
        <div
			class="flex flex-col bg-white px-8 py-6 max-w-sm mx-auto rounded-lg
			shadow-lg">
			<div class="mt-4">
				<a class="text-lg text-gray-700 font-medium" href="/">
                    {comment}
				</a>
			</div>
                    <div class="flex justify-between items-center mt-4">
            <div class="flex items-center">
                <img src="https://images.unsplash.com/photo-1502791451862-7bd8c1df43a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                     class="w-8 h-8 object-cover rounded-full" alt="avatar">
                <a class="text-gray-700 text-sm mx-3" href="/users/{userId}">{userId}</a>
            </div>
            <span class="font-light text-sm text-gray-600">Mar 10, 2018</span>
        </div>
		</div>
		<br />
    {/each}
        {/await}

	</div>
</section>
