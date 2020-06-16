<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  export let currentPage = 0;
  export let totalPages;
  export let padding = 2;

  let pages = []

  $: setPages(currentPage, totalPages);

  function setPages() {
    pages = []

    let leftDiff = 0, rightDiff = 0;

    // A: 1 2 3
    // B: 8 9 10
    for(let i = currentPage - padding; i <= currentPage + padding; i++) {
      if (i < 0) {
        rightDiff++;
        continue;
      }
      if (i > totalPages - 1) { 
        leftDiff++;
        continue;
      }
      
      pages.push({ number: i, txt: i+1 })
    }
    // A: ... 4 5
    for(let i = currentPage + padding + 1; i <= currentPage + padding + rightDiff; i++) {
      pages.push({ number: i, txt: i+1 })
    }

    // B: 6 7 ...
    for(let i = currentPage - padding - 1; i >= currentPage - padding - leftDiff; i--) {
      pages.unshift({ number: i, txt: i+1 })
    }

    pages = [{ number: 0, txt: '<<' }, ...pages, { number: totalPages - 1, txt: '>>' }]
  }
  
  function changePage(page) {
    if (page !== currentPage) {
      currentPage = page;
      dispatch('change', page);
    }
  }
</script>

<div class="pagination">
  <ul>
    {#each pages as page}
      <li class={page.number === currentPage && page.txt !== '<<' && page.txt !== '>>' ? 'current red lighten-2' : ''}>
        <a href="javascript:void(0);" on:click="{() => changePage(page.number)}">
          <span aria-hidden="true">{page.txt}</span>
        </a>
      </li>
    {/each}
  </ul>
</div>

<style>
  .pagination {
    margin: 10px 0;
  }

  .pagination li {
    border: 1px solid #c4c4c4;
    margin-right: 5px;
  }

  .pagination li.current {
    border: 1px solid #e14349;
  }
  .pagination li.current a {
    color: white;
  }
</style>