<script>
  import M from 'materialize-css';
  import { onMount } from 'svelte';
  import { PageHeader } from '../components/shared';
  import { raw_changelog } from '../stores';

  $: sortedChangelogs = $raw_changelog.sort((a, b) => (a.time > b.time ? -1 : 1));

  onMount(() => {
    const collapsibleElems = document.querySelectorAll('.collapsible');
    M.Collapsible.init(collapsibleElems);
  });
</script>

<style lang="scss">
  .collection {
    border: none;
  }

  .collection-item {
    border: 1px solid var(--color-secondary);
    border-radius: 2px;
    margin-bottom: 5px;
    background-color: var(--color-background3);

    .version {
      color: var(--color-heading);
    }

    .time {
      color: var(--color-secondary);
    }

    .content {
      color: var(--color-primary);
    }
  }
</style>

<div class="changelog">
  <PageHeader>
    <i class="material-icons">history</i>
    Changelog
  </PageHeader>

  <ul class="changelog-list collection">
    {#each sortedChangelogs as changelog}
      <li class="collection-item">
        <h4 class="version">v{changelog.version} - {changelog.header}</h4>
        <h6 class="time">{new Date(changelog.time).toDateString()}</h6>
        <p class="content">{changelog.content}</p>
      </li>
    {/each}
  </ul>
</div>
