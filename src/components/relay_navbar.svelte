<script>
	import custom_axios from "../axios"
	import {token, user} from "../store"
	import {goto} from "@sapper/app"

	import TopAppBar, {Row, Section, Title} from "@smui/top-app-bar"
	import Card, {Content} from "@smui/card"
	import Button, {Label} from "@smui/button"
	import Menu from "@smui/menu"
	import List, {Separator, Item, Text} from "@smui/list"

	let menu, image_menu

	async function sign_out() {
		try {
			const response = await custom_axios.post("logout")
			if (response.status === 200) {
				token.set(null)
				user.set(null)
				goto("/")
			}
		} catch (e) {
			console.log(e.response)
		}
	}
</script>

<TopAppBar>
	<Row>

		<Section>
			<Title>
				<a href="/">Relay</a>
			</Title>
		</Section>

		<Section align="end" toolbar>

			<div class="hidden md:block mr-5">

				<a rel="prefetch" href="/internships/">
					<Button color="secondary" class="mr-5">
						<Label>Internship</Label>

					</Button>
				</a>

				<a rel="prefetch" href="/users/">
					<Button color="secondary" class="mr-5">
						<Label>Users</Label>

					</Button>
				</a>

				<a rel="prefetch" href="/enterprises/">
					<Button color="secondary" class="mr-5">
						<Label>Enterprises</Label>

					</Button>
				</a>
			</div>

			<div class="md:hidden mr-5">
				<div style="min-width: 100px;">
					<Button
						color="secondary"
						on:click="{() => menu.setOpen(true)}">
						Menu
					</Button>
					<Menu bind:this="{menu}">
						<List>
							<Item>
								<a rel="prefetch" href="/internships/">
									Internship
								</a>
							</Item>
							<Item>
								<a rel="prefetch" href="/users/">Users</a>
							</Item>
							<Item>
								<a rel="prefetch" href="/enterprises/">
									Enterprises
								</a>
							</Item>
						</List>
					</Menu>
				</div>
			</div>
			{#if $token && $user}
				<div style="min-width: 50px;">

					<img
						on:click="{() => image_menu.setOpen(true)}"
						class="h-10 w-10 rounded-full mr-5"
						src="{$user.avatarImg}"
						alt="{$user.fullname} profile " />
					<Menu bind:this="{image_menu}" anchorCorner="BOTTOM_LEFT">
						<Card style="width: 320px;">
							<div class="flex p-3">
								<img
									class="h-10 w-10 rounded-full p-2"
									src="{$user.avatarImg}"
									alt="{$user.fullname} profile " />
								<div class="pl-3 pt-2">
									<h6>{$user.fullname}</h6>
									<p class="text-gray-800">{$user.email}</p>
								</div>
							</div>
							<Content component="{List}">
								<a href="/profile/">
									<Item>
										<Text>Profile</Text>
									</Item>
								</a>
								<Separator />
								<Item on:click="{sign_out}">
									<Text>Sign Out</Text>
								</Item>
							</Content>
						</Card>
					</Menu>
				</div>
			{:else}
				<a href="/signin/">
					<Button variant="outlined" color="secondary">Sign IN</Button>
				</a>
			{/if}
		</Section>

	</Row>
</TopAppBar>
