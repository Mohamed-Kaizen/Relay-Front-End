<script>
	import {goto} from "@sapper/app"
	import custom_axios from "../axios"
	import {token, user} from "../store"
	import {Datefield, Textfield, Button, Icon} from "svelte-mui/src"
	import Spinner from "../components/spinner.svelte"

	if ($token) {
		goto("/")
	}

	let first_name,
		loading = false,
		last_name,
		email,
		password,
		confirm_password,
		handle,
		gender,
		dob,
		eduction,
		major,
		nationality,
		address,
		current_work,
		experience,
		bio,
		message,
		snackbar_color,
		visible = false

	async function sign_up() {
		loading = true
		const data = {
			firstname: first_name,
			lastname: last_name,
			email: email,
			password: password,
			confirmPassword: confirm_password,
			handle: `@rlu-${handle}`,
			gender: gender,
			dob: new Date(),
			eduction: eduction,
			major: major,
			nationality: nationality,
			address: address,
			current_work: current_work,
			experince: experience,
			bio: bio,
		}

		try {
			const response = await custom_axios.post("signup/signup_user", data)
			message = "Account has been created"
			snackbar_color = "green"
			visible = true
			loading = false
			token.set(response.data.token)
			user.set(response.data.userInfo)
			location.reload()
		} catch (e) {
		    console.log(e.response)
			message = e.response
			snackbar_color = "red"
			visible = true
			loading = false
		}
	}
	const onchange = ({detail}) => {
		dob = detail
	}
</script>

<form on:submit|preventDefault="{sign_up}">
	<div class="bg-white shadow rounded-lg p-6">
		<div class="grid lg:grid-cols-2 gap-6">

			<Textfield
				filled
				label="First Name"
				required
				bind:value="{first_name}"
				type="text" />

			<Textfield
				filled
				label="Last Name"
				required
				bind:value="{last_name}"
				type="text" />

			<Textfield
				filled
				label="Username"
				required
				bind:value="{handle}"
				type="text" />

			<Textfield
				filled
				label="Email"
				required
				bind:value="{email}"
				type="email" />

			<Textfield
				filled
				label="Password"
				required
				minlength="8"
				maxlength="16"
				bind:value="{password}"
				type="password" />

			<Textfield
				filled
				label="Confirm Password"
				required
				minlength="8"
				maxlength="16"
				bind:value="{confirm_password}"
				type="password" />

			<Textfield
				filled
				label="Gender"
				required
				bind:value="{gender}"
				type="text" />

			<Datefield
				value="{dob}"
				label="Date of Birth"
				format="D.MM.YYYY"
				message="D.MM.YYYY"
				locale="ar"
				icon
				on:date-change="{onchange}" />

			<Textfield
				filled
				label="Eduction"
				required
				bind:value="{eduction}"
				type="text" />

			<Textfield
				filled
				label="Major"
				required
				bind:value="{major}"
				type="text" />

			<Textfield
				filled
				label="Nationality"
				required
				bind:value="{nationality}"
				type="text" />

			<Textfield
				filled
				label="Address"
				required
				bind:value="{address}"
				type="text" />

			<Textfield
				filled
				label="Current Work"
				required
				bind:value="{current_work}"
				type="text" />

			<Textfield
				filled
				label="Experience"
				required
				bind:value="{experience}"
				type="number" />

			<Textfield
				filled
				label="Bio"
				required
				bind:value="{bio}"
				type="text" />

		</div>
		<div class="border-t mt-6 pt-3">
			{#if loading}
				<Spinner />
			{:else}
				<Button fullWidth color="#00796b" raised type="submit">
					submit
					<Icon path="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
				</Button>
			{/if}

		</div>
	</div>
</form>
