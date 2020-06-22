<script>
  import { Card, CardList, PageHeader } from '../../components/shared/'
  import { rarities } from '../../stores'
</script>

<div class="rarities-container">
  <PageHeader>Rarities</PageHeader>

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
