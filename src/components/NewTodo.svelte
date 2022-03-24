<script>
  import { onMount } from 'svelte';
  import { createEventDispatcher } from 'svelte'
  import selectOnFocus from "../action"
  const dispatch = createEventDispatcher()

  let name = '', nameEl
  export let autofocus

  const addTodo = () => {
    dispatch('addTodo', name)
    name = ''
    nameEl.focus()
  }

  const onCancel = () => name = ''

  onMount( () => autofocus && nameEl.focus())

</script>


<form on:submit|preventDefault={addTodo} on:keydown={e => e.key === 'Escape' && onCancel()}>
  <h2 class="label-wrapper">
    <label for="todo-0" class="label__lg">
      What needs to be done?
    </label>
  </h2>

  <!--
    It's slow if addded a console stmt after the element below , response it slooww
    <input type="text" id="todo-0" value={newTodoName} on:keydown={(event) => newTodoName = event.target.value} autocomplete="off" class="input input__lg" />
    that's why bind: is better, ig.
  -->

  <input class="input input__lg" id="todo-0" type="text" use:selectOnFocus bind:this={nameEl} bind:value={name} autocomplete="off" required />
  <button class="btn btn__primary btn__lg" type="submit" disabled={!name}>Add</button>
</form>