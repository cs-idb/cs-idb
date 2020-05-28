<script>
  import M from 'materialize-css'
  import { onMount } from 'svelte'
  import { changelogs } from '../dal/'
  import { Button } from '../components/shared'
  import { goto, url } from '@sveltech/routify'

  $: sortedChangelogs = changelogs.sort((a, b) => a.time > b.time ? -1 : 1)

  onMount(() => {
    const collapsibleElems = document.querySelectorAll('.collapsible')
    M.Collapsible.init(collapsibleElems)
  })
</script>

<style>
  .heading {
    display: flex;
    align-items: center;
  }

  .heading span {
    margin-left: 15px;
    display: flex;
    align-items: center;
  }

  .heading span i {
    font-size: 40px;
    margin: 0 10px;
  }

  .collection {
    border: none;
  }

  .collection-item {
    border: 1px solid #e0e0e0;
    border-radius: 2px;
    margin-bottom: 5px;
  }
</style>

<div class="changelog">
  <h3 class="heading">
    <Button on:click={() => $goto($url('/'))}>&lt;</Button>
    <span class="grey-text text-darken-2">
      <i class="material-icons">history</i>
      Changelog
    </span>
  </h3>

  <ul class="changelog-list collection">
    {#each sortedChangelogs as changelog}
      <li class="collection-item">
        <h4 class="grey-text text-darken-2">
          v{changelog.version} - {changelog.header}
        </h4>
        <h6 class="grey-text text-darken-1">
          {new Date(changelog.time).toDateString()}
        </h6>
        <p>{changelog.content}</p>
      </li>
    {/each}
  </ul>
</div>
