<script>
  import NewTodo from "./NewTodo.svelte"
  import FilterButton from "./FilterButton.svelte"
  import TodoStatus from "./TodoStatus.svelte"
  import Todo from "./Todo.svelte"
  import MoreActions from "./MoreActions.svelte"
  import { alert } from "../stores"
  
  export let todos = []
  let newTodoName = ''
  let todoStatus

  
  const removeTodo = (todoItem) => {
    todos = todos.filter(todo => todo.id !== todoItem.id)
    todoStatus.focusOnHeading()
    $alert = `${todoItem.name} removed`
  }
  
  let totalTodos = todos.length
  let idCount = todos.length
  const addTodo = (name) => {
    /*
      reassignment causes reactivity so, pushing won't work
      todos.push({id: totalTodos.length+1, name: newTodoName, completed: false})
      
      this'll do.
      todos = [{id: (totalTodos >0 ? totalTodos+1 : 1), name: newTodoName, completed: false}, ...todos]
      the line above causes duplicate id error after removing a todo

    */

    // todos = [...todos, {id: (totalTodos > 0 ? todos[0].id+1 : 1), name: newTodoName, completed: false}]

    ++idCount
    // todos = [{id: (totalTodos > 0 ? idCount : 1), name: newTodoName, completed: false}, ...todos]
    todos = [{id: (totalTodos > 0 ? idCount : 1), name, completed: false}, ...todos]
    // newTodoName = ''
    $alert = `"${name}" created.`
  }

  let filter = "all"
  
  $: {
    if (filter === 'all')               $alert = 'Browsing all to-dos'
    else if (filter === 'active')       $alert = 'Browsing active to-dos'
    else if (filter === 'completed')    $alert = 'Browsing completed to-dos'
  }

  const filterTodos = (filter, todos) => {
    return filter === "active" ? todos.filter(todo => !todo.completed) :
    filter === "completed" ? todos.filter(todo => todo.completed) :
    todos
  }

  const updateTodo = (todo) => {
    const i = todos.findIndex(t => t.id === todo.id)

    if (todos[i].name !== todo.name)
      $alert = `todo '${todos[i].name}' has been renamed to '${todo.name}'`

    if (todos[i].completed !== todo.completed)
      $alert = `todo '${todos[i].name}' marked as ${todo.completed ? 'completed' : 'active'}`
    
    todos[i] = { ...todos[i], ...todo }
  }

  // const checkAllTodos = (completed) => {
  //   todos.forEach(todo => todo.completed = completed)
  //   todos = todos
  // }

  const checkAllTodos = (completed) => {
    todos = todos.map(t => ({...t, completed}))
    $alert = `${completed ? 'Checked' : 'Unchecked'} ${todos.length} to-dos`
  }
  
  const removeCompletedTodos = () => {
    todos = todos.filter(todo => !todo.completed)
    $alert = `Removed ${todos.filter(t => t.completed).length} to-dos`  
  }
</script>

<!-- Todos.svelte -->
<div class="todoapp stack-large">

  <!-- NewTodo -->
  <NewTodo autofocus on:addTodo={event => addTodo(event.detail)} />

  <!-- Filter -->
  <!-- <FilterButton {filter} onClick={(clicked) => filter = clicked} /> -->
  <FilterButton bind:filter /> <!-- prop and attr both are named 'filter' -->

  <!-- TodosStatus -->
  <!-- <h2 id="list-heading">{completedTodos} out of {totalTodos} items completed</h2> -->
  <TodoStatus {todos} bind:this={todoStatus} />

  <!-- Todos -->

  <!-- svelte-ignore a11y-no-redundant-roles -->
  <ul role="list" class="todo-list stack-large" aria-labelledby="list-heading">

    {#each filterTodos(filter, todos) as todo (todo.id) }
      <!-- updateTodos todos[i] and todo (arg.) would be same if todo is binded here -->
      <Todo
        {todo}
        on:update={(event) => updateTodo(event.detail)}
        on:remove={(event) => removeTodo(event.detail)}
      />
    {:else}
      <li>Got nothin' to do!</li>
    {/each}

  </ul>

  <hr />

  <!-- MoreActions -->
  <MoreActions
    {todos}
    on:checkAll={event => checkAllTodos(event.detail)}
    on:removeCompleted={removeCompletedTodos}
  />

</div>