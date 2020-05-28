<script>
  import { goto, url } from '@sveltech/routify'
  import { Button } from '../components/shared'

  import { sitemap } from '../dal/'
</script>

<style>
  .heading {
    display: flex;
    align-items: center;
  }

  .heading span {
    margin-left: 15px;
  }

  .children-list {
    margin-left: 50px;
  }

  li {
    margin-bottom: 20px;
  }
</style>

<div class="sitemap">
  <h3 class="heading">
    <Button on:click={() => $goto('/')}>&lt;</Button>
    <span>Sitemap</span>
  </h3>

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
