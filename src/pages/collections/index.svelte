<script>
  import { goto } from '@sveltech/routify'
  import { CollectionCardList } from '../../components/collections/'
  import { Button } from '../../components/shared/'
</script>

<style>
  .heading {
    display: flex;
    align-items: center;
  }

  .heading span {
    margin-left: 15px;
  }
</style>

<div class="collections-container">
  <h3 class="heading">
    <Button on:click={() => $goto('/')}>&lt;</Button>
    <span>Collections</span>
  </h3>

  <CollectionCardList />
</div>
