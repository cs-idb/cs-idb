<script>
  import { goto } from '@sveltech/routify'
  import { Button } from '../../components/shared/'
  import { skins } from '../../stores'
  import { SkinCard } from "../../components/skins/"

  $: all_skins = $skins;
  $: filtered_skins = all_skins.filter(s => s.weapon.tag === "M4A4");

  // let pagination_current_page = 0;
  // const pagination_amount_options = [10, 25, 50, 100, Infinity];
  // let pagination_amount_per_page = 50;
  // $: pagination_page_count = filtered_skins.length / pagination_amount_per_page;

  $: paginated_skins = filtered_skins;
</script>

<style>
  .skins-container {
    margin: 2rem 0;
  }

  .heading {
    display: flex;
    align-items: center;
  }

  .heading span {
    margin-left: 15px;
  }

  .skin-list {
    display: flex;
    flex-wrap: wrap;
  }
</style>

<div class="skins-container">
  <h3 class="heading">
    <Button on:click={() => $goto('/')}>&lt;</Button>
    <span>Skins</span>
  </h3>

  <div class="skin-list">
    {#each paginated_skins as skin}
      <SkinCard {skin}/>
    {/each}
  </div>
</div>
