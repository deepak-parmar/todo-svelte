<script>
  export let filter = "all"
  // export let onClick = (clicked) => {}
  // $: onClick(filter)
</script>


<div class="filters btn-group stack-exception">
  <!-- All -->
  <button class="btn toggle-btn" class:btn__primary={filter === "all"} on:click={() => filter = "all"} aria-pressed={filter === "all"}>
    <span class="visually-hidden">Show</span>
    <span>All</span>
    <span class="visually-hidden">tasks</span>
  </button>
  
  <!-- Active -->
  <button class="btn toggle-btn" class:btn__primary={filter === "active"} on:click={() => filter = "active"} aria-pressed={filter === "active"}>
    <span class="visually-hidden">Show</span>
    <span>Active</span>
    <span class="visually-hidden">tasks</span>
  </button>
  
  <!-- Completed -->
  <button class="btn toggle-btn" class:btn__primary={filter === "completed"} on:click={() => filter = "completed"} aria-pressed={filter === "completed"}>
    <span class="visually-hidden">Show</span>
    <span>Completed</span>
    <span class="visually-hidden">tasks</span>
  </button>
</div>