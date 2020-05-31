<script>
  import M from 'materialize-css'
  import { onMount, createEventDispatcher } from 'svelte'
  import { compareModes } from '../../stores/'
  export let type

  const dispatch = createEventDispatcher()

  $: filteredOptions = $compareModes.filter(option => option.types.includes(type))

  let compare_mode = undefined

  onMount(async () => {
    const elems = document.querySelectorAll('.mat-select')
    M.FormSelect.init(elems)
    elems.forEach(el => {
      el.classList.remove('mat-select')
    })
  })

  const changeMode = function () {
    const option = $compareModes.find(o => o.shortName === compare_mode)
    const { shortName, longName } = option
    dispatch('change', { shortName, longName })
  }
</script>

<div class="input-field">
  <select class="mat-select" bind:value={compare_mode} on:change={changeMode}>
    <option value="" disabled selected>Choose your option</option>
    {#each filteredOptions as opt}
      <option value={opt.shortName}>{opt.longName}</option>
    {/each}
  </select>
  <label>Compare mode</label>
</div>
