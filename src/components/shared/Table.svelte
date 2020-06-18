<script>
  import { createEventDispatcher } from 'svelte'
  import { SortableArray } from '../../utils/'
  import Button from './Button.svelte'

  export let tableHeaders
  export let tableRows
  export let activeSort
  export let hasImage = false;

  const dispatch = createEventDispatcher()

  $: sortedRows = SortableArray.from(tableRows).sortBy(activeSort.header, 'str', activeSort.sortAsc)

  const changeSort = headerName => {
    if (activeSort.header === headerName) {
      activeSort.sortAsc = !activeSort.sortAsc
    } else {
      activeSort.header = headerName
      activeSort.sortAsc = true
    }
  }
</script>

<style>
  thead tr {
    text-transform: capitalize;
  }

  thead th p {
    display: inline-flex;
    padding: 5px 10px;
    cursor: pointer;
    height: 35px;
    align-items: center;
  }

  thead th p i {
    width: 20px;
  }

  tbody tr {
    border: 1px solid #d5d5d5;
    cursor: pointer;
  }

  tbody tr td {
    border-right: 1px solid #d5d5d5;
  }

  tbody tr:nth-child(2n) {
    background-color: #ebe9e9;
  }

  tbody tr:hover {
    background: #e57373;
    border: 1px solid black;
  }
  tbody tr:hover td {
    border: 1px solid black;
  }
</style>

<table class="striped highlight">
  <thead>
    <tr>
      {#if hasImage}
        <th></th>
      {/if}
      {#each tableHeaders as tableHeader}
        <th>
          <Button on:click={() => changeSort(tableHeader)}>
            <p>
              {tableHeader}
              {#if tableHeader.toLowerCase() === activeSort.header.toLowerCase()}
                {#if activeSort.sortAsc}
                  <i class="material-icons">arrow_drop_down</i>
                {:else}
                  <i class="material-icons">arrow_drop_up</i>
                {/if}
              {:else}
                <i />
              {/if}
            </p>
          </Button>
        </th>
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each sortedRows as tableRow}
      <tr
        on:click={() => {
          dispatch('clickItem', tableRow.__id)
        }}>
        {#if hasImage}
          <td>
            <img
              width="300"
              src={tableRow['__image_path']}
              alt={`An image of ${tableRow['weapon']} | ${tableRow['name']}`} />
          </td>
        {/if}
        {#each tableHeaders as tableHeader}
          <td>{tableRow[tableHeader]}</td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>
