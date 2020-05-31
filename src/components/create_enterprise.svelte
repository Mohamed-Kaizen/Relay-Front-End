<script>
	import {goto} from "@sapper/app"
	import custom_axios from "../axios"
	import {token, user} from "../store"
	import {Datefield, Textfield, Button, Icon} from "svelte-mui/src"
	import Spinner from "../components/spinner.svelte"

	if ($token) {
		goto("/")
	}
let name,
		email,
		password,
		confirm_password,
		handle,
		enterprise_type,
		date,
		social_link,
		enterprise_size,
		address,
		website,
		description,
		message,
		snackbar_color,
		visible = false,
        loading = false

	async function sign_up() {
		loading = true
		const data = {
			enterprise_name: name,
			email: email,
			password: password,
			confirmPassword: confirm_password,
			handle: `@rle-${handle}`,
			enterprise_type: enterprise_type,
			enterprise_startedDate: new Date(),
			social_link: social_link,
			enterprise_size: enterprise_size,
			address: address,
			website: website,
			description: description,
		}

		try {
			const response = await custom_axios.post("signup/signup_enterprise", data)
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
		date = detail
	}
</script>

<form on:submit|preventDefault="{sign_up}">
	<div class="bg-white shadow rounded-lg p-6">
		<div class="grid lg:grid-cols-2 gap-6">

			<Textfield
				filled
				label="Name"
				required
				bind:value="{name}"
				type="text" />

			<Textfield
				filled
				label="Type"
				required
				bind:value="{enterprise_type}"
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
				label="social links"
				required
				bind:value="{social_link}"
				type="text" />

			<Datefield
				value="{date}"
				label="Founded date"
				format="D.MM.YYYY"
				message="D.MM.YYYY"
				locale="ar"
				icon
				on:date-change="{onchange}" />

			<Textfield
				filled
				label="Size"
				required
				bind:value="{enterprise_size}"
				type="text" />

			<Textfield
				filled
				label="Website"
				required
				bind:value="{website}"
				type="text" />

			<Textfield
				filled
				label="Address"
				required
				bind:value="{address}"
				type="text" />

			<Textfield
				filled
				label="Description"
				required
				bind:value="{description}"
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
