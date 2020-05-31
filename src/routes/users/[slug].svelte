<script context="module">
	import custom_axios from "../../axios"

	export async function preload({params}) {
		const res = await custom_axios.get(`users/user/${params.slug}`)
		if (Object.keys(res.data).length > 1) {
			const user = res.data.userInfo
			return {user}
		}
		this.error(404, "Not found")
	}
</script>

<script>
	export let user
	import {fly} from "svelte/transition"
</script>

<svelte:head>
	<title>{user.handle} | Relay</title>
</svelte:head>

<div
	transition:fly="{{x: 200, duration: 2000}}"
	class="text-gray-800 antialiased">
	<main class="profile-page">
		<section class="relative block" style="height: 500px;">
			<div
				class="absolute top-0 w-full h-full bg-center bg-cover"
				style="background-image: url('./profile_bg.jpeg')">
				<span
					id="blackOverlay"
					class="w-full h-full absolute opacity-50 bg-black"></span>
			</div>
			<div
				class="top-auto bottom-0 left-0 right-0 w-full absolute
				pointer-events-none overflow-hidden"
				style="height: 70px; transform: translateZ(0px);">
				<svg
					class="absolute bottom-0 overflow-hidden"
					xmlns="http://www.w3.org/2000/svg"
					preserveAspectRatio="none"
					version="1.1"
					viewBox="0 0 2560 100"
					x="0"
					y="0">
					<polygon
						class="text-gray-300 fill-current"
						points="2560 0 2560 100 0 100"></polygon>
				</svg>
			</div>
		</section>
		<section class="relative py-16 bg-gray-300">
			<div class="container mx-auto px-4">
				<div
					class="relative flex flex-col min-w-0 break-words bg-white
					w-full mb-6 shadow-xl rounded-lg -mt-64">
					<div class="px-6">
						<div class="flex flex-wrap justify-center">
							<div
								class="w-full lg:w-3/12 px-4 lg:order-2 flex
								justify-center">
								<div class="relative">
									<img
										alt="{user.handle} profile"
										src="{user.avatarImg}"
										class="shadow-xl rounded-full h-auto
										align-middle border-none absolute -m-16
										-ml-20 lg:-ml-16"
										style="max-width: 150px;" />
								</div>
							</div>
							<div
								class="w-full lg:w-4/12 px-4 lg:order-3
								lg:text-right lg:self-center">
								<div class="py-6 px-3 mt-32 sm:mt-0">
									<button
										class="bg-pink-500 active:bg-pink-600
										uppercase text-white font-bold
										hover:shadow-md shadow text-xs px-4 py-2
										rounded outline-none focus:outline-none
										sm:mr-2 mb-1"
										type="button"
										style="transition: all 0.15s ease 0s;">
										send message
									</button>
								</div>
							</div>
							<div class="w-full lg:w-4/12 px-4 lg:order-1">
								<div
									class="flex justify-center py-4 lg:pt-4 pt-8">
									<div class="mr-4 p-3 text-center">
										<span
											class="text-sm font-bold block
											uppercase tracking-wide text-gray-700">
											{user.experince}
										</span>
										<span class="text-sm text-gray-500">
											Experince
										</span>
									</div>
									<div class="mr-4 p-3 text-center">
										<span
											class="text-sm font-bold block
											uppercase tracking-wide text-gray-700">
											{user.dob}
										</span>
										<span class="text-sm text-gray-500">
											Date Of Birth
										</span>
									</div>
									<div class="lg:mr-4 p-3 text-center">
										<span
											class="text-sm font-bold block
											uppercase tracking-wide text-gray-700">
											{user.gender}
										</span>
										<span class="text-sm text-gray-500">
											Gender
										</span>
									</div>
								</div>
							</div>
						</div>
						<div class="text-center mt-12">
							<h3
								class="text-4xl font-semibold leading-normal mb-2
								text-gray-800 mb-2">
								{user.firstname} {user.lastname}
							</h3>
							<h4
								class="text-xl font-semibold leading-normal mb-2
								text-gray-800 mb-2">
								{user.email}
							</h4>
							<h5
								class="text-xl font-semibold leading-normal mb-2
								text-gray-800 mb-2">
								{user.nationality}
							</h5>
							<div
								class="text-sm leading-normal mt-0 mb-2
								text-gray-500 font-bold uppercase">
								<i
									class="fas fa-map-marker-alt mr-2 text-lg
									text-gray-500"></i>
								{user.address}
							</div>
							<div class="mb-2 text-gray-700 mt-10">
								<i
									class="fas fa-briefcase mr-2 text-lg
									text-gray-500"></i>
								{user.current_work}
							</div>
							<div class="mb-2 text-gray-700">
								<i
									class="fas fa-university mr-2 text-lg
									text-gray-500"></i>
								{user.eduction} in {user.major}
							</div>
						</div>
						<div
							class="mt-10 py-10 border-t border-gray-300
							text-center">
							<div class="flex flex-wrap justify-center">
								<div class="w-full lg:w-9/12 px-4">
									<p
										class="mb-4 text-lg leading-relaxed
										text-gray-800">
										{user.bio}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</main>
</div>
