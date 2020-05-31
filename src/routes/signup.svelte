<script>
	import Tab, {Label} from "@smui/tab"
	import TabBar from "@smui/tab-bar"
	import CreateStudent from "../components/create_student.svelte"
	import CreateEnterprise from "../components/create_enterprise.svelte"

	let active = "Student"
</script>

<br />
<br />
<br />
<br />
<br />
<br />
<TabBar tabs="{['Student', 'Enterprise']}" let:tab bind:active>
	<Tab {tab}>
		<Label>{tab}</Label>
	</Tab>
</TabBar>
<br />
{#if active === 'Student'}
	<CreateStudent />
{:else}
	<CreateEnterprise />
{/if}
