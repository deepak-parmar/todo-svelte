<script>
	import Todos from "./components/Todos.svelte"
  import Alert from "./components/Alert.svelte"

  import { todos } from "./stores"
</script>

<Alert/>

<!--
	Omitting "todos=" because
	attribute and prop has the same name
  <Todo todos={todos} />
-->


<Todos bind:todos={$todos} />