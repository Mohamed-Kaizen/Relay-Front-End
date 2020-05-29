<script>
	import {goto} from "@sapper/app"
	import {Textfield, Snackbar, Button, Icon} from "svelte-mui/src"
	import custom_axios from "../axios"
	import {token, user} from "../store"
	import Spinner from "../components/spinner.svelte"
	if ($token) {
		goto("/")
	}
	let email,
		password,
		loading = false,
		visible = false

	async function sign_in() {
		loading = true
		const data = {email: email, password: password}
		try {
			const response = await custom_axios.post("login", data)
			token.set(response.data.token)
			user.set(response.data.userInfo)
			loading = false
			goto("/profile/")
		} catch (e) {
			visible = true
			loading = false
		}
	}
</script>

<svelte:head>
	<title>Sign IN | Relay</title>
</svelte:head>

<div class="text-gray-800 antialiased">
	<main>
		<Snackbar bind:visible bg="#f44336" bottom>
			Incorrect Username or Password
			<span slot="action">
				<Button color="#ff0" on:click="{() => (visible = false)}">
					Close
				</Button>
			</span>
		</Snackbar>
		<section class="absolute w-full h-full mt-10">
			<div
				class="absolute top-0 w-full h-full bg-gray-900"
				style="background-image: url('/register_bg_2.png');
				background-size: 100%; background-repeat: no-repeat;"></div>
			<div class="container mx-auto px-4 h-full">
				<div
					class="flex content-center items-center justify-center h-full">
					<div class="w-full lg:w-4/12 px-4">
						<div
							class="relative flex flex-col min-w-0 break-words
							w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
							<div class="rounded-t mb-0 px-6 py-6"></div>
							<div class="flex-auto px-4 lg:px-10 py-10 pt-0">
								<form on:submit|preventDefault="{sign_in}">

									<div class="relative w-full mb-3">
										<Textfield
											filled
											autocomplete="on"
											label="Email"
											required
											bind:value="{email}"
											type="email" />

									</div>

									<div class="relative w-full mb-3">
										<Textfield
											filled
											minlength="8"
											maxlength="16"
											autocomplete="off"
											label="password"
											required
											bind:value="{password}"
											type="password"
											message="mini password lengh is 8" />
									</div>

									<div class="text-center mt-6">
										{#if loading}
											<Spinner />
										{:else}
											<Button
												fullWidth
												color="#00796b"
												raised
												disabled="{!email || !password}"
												type="submit">
												submit
												<Icon
													path="M2.01 21L23 12 2.01 3 2
													10l15 2-15 2z"
													style="margin: 0 -4px 0 8px;" />
											</Button>
										{/if}
									</div>
									<div class="mt-6">

										<a href="/signup/">Need account ?</a>
									</div>

								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</main>
</div>
