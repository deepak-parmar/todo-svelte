<script>
  import { createEventDispatcher, tick } from "svelte"
  import selectOnFocus, { focusOnInit } from "../action"
  export let todo
  let editing = false
  let name = todo.name
  let editButtonPressed = false
  // let nameEl

  const dispatch = createEventDispatcher()

  const onCancel = () => {
    name = todo.name
    editing = false
  }
  
  const onSave = () => {
    update({name: name})
    editing = false
  }

  const onEdit = () => {
    editing = true
    editButtonPressed = true
    // await tick()
    // nameEl.focus()
  }

  const focusEditButton = (node) => editButtonPressed && node.focus()

  
  const onToggle = () => update({completed: !todo.completed})
  
  const onRemove = () => dispatch("remove", todo)

  const update = (updatedTodo) => {
    todo = {...todo, ...updatedTodo}
    dispatch("update", todo)
  }
</script>

<li class="todo">
  {#if editing}
    <div class="stack-small">
      <form class="stack-small" on:submit|preventDefault={onSave} on:keydown={e => e.key === 'Escape' && onCancel()}>
        <div class="form-group">
          <label for="todo-{todo.id}" class="todo-label">
            New name for '{todo.name}'
          </label>
          <input class="todo-text" id="todo-{todo.id}" type="text" use:selectOnFocus use:focusOnInit bind:value={name} autocomplete="off" />
        </div>
        <div class="btn-group">
          <button class="btn todo-cancel" type="button" on:click={onCancel}>
            Cancel
            <span class="visually-hidden">renaming {todo.name}</span>
          </button>
          <button class="btn btn__primary todo-edit" type="submit">
            Save
            <span class="visually-hidden">new name for {todo.name}</span>
          </button>
        </div>
      </form>
    </div>

  {:else}

    <div class="stack-small">
      <div class="c-cb">
        <input type="checkbox" id="todo-{todo.id}"
          on:click={onToggle}
          checked={todo.completed}
        />
        <label for="todo-{todo.id}" class="todo-label">{todo.name}</label>
      </div>
      <div class="btn-group">
        <button type="button" class="btn" on:click={onEdit} use:focusEditButton>
          Edit <span class="visually-hidden">{todo.name}</span>
        </button>
        <button type="button" class="btn btn__danger" on:click={onRemove}>
          Delete <span class="visually-hidden">{todo.name}</span>
        </button>
      </div>
    </div>
  {/if}
</li>