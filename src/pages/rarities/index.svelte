<script>
  import { goto } from '@sveltech/routify'
  import { Button, Card, CardList } from '../../components/shared/'
  import { rarities } from '../../stores'
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

<div class="rarities-container">
  <h3 class="heading">
    <Button on:click={() => $goto('/')}>&lt;</Button>
    <span>Rarities</span>
  </h3>

  <p class="page-desc">Every skin in the game is of a certain quality/ rarity.</p>

  <CardList>
    {#each $rarities as rarity (rarity.id)}
      <Card bgColor={rarity.color} flat={true}>
        <div slot="card-content">
          <h5>Tag: {rarity.tag}</h5>
          <h6>Name: {rarity.name}</h6>
        </div>
        <div slot="card-action">
          <p>
            Color:
            <span>{rarity.color}</span>
          </p>
        </div>
      </Card>
    {/each}
  </CardList>
</div>
