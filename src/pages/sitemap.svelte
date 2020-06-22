<script>
  import { url } from '@sveltech/routify';
  import { PageHeader } from '../components/shared';

  import { sitemap } from '../dal/';
</script>

<style>
  .children-list {
    margin-left: 50px;
  }

  li {
    margin-bottom: 20px;
  }
</style>

<div class="sitemap">
  <PageHeader>Sitemap</PageHeader>

  <ul class="links-list">
    {#each sitemap as link}
      <li class="link">
        <p>
          <b>{link.name}:</b>
          <a href={$url(link.url)}>{link.placeholder || link.url}</a>
        </p>

        {#if link.children}
          <ul class="children-list">
            {#each link.children as child}
              <li class="link">
                <p>
                  <b>{child.name}:</b>
                  <a href={$url(child.url)}>{child.placeholder || child.url}</a>
                </p>
              </li>
            {/each}
          </ul>
        {/if}

      </li>
    {/each}
  </ul>
</div>
