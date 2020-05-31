<script>
  import { goto } from '@sveltech/routify'
  import { Button, Table } from '../../components/shared/'
  import { weapons } from '../../stores'

  $: tableHeaders = ['name', 'type', 'desc']
  $: tableRows = $weapons.map(function (weapon) {
    return {
      name: weapon.tag,
      type: weapon.type,
      desc: weapon.desc,
    }
  })

  const activeSort = {
    header: 'name',
    sortAsc: true,
  }
</script>

<style>
  .weapons-container {
    margin: 2rem 0;
  }

  .heading {
    display: flex;
    align-items: center;
  }

  .heading span {
    margin-left: 15px;
  }
</style>

<div class="weapons-container">
  <h3 class="heading">
    <Button on:click={() => $goto('/')}>&lt;</Button>
    <span>Weapons</span>
  </h3>

  <Table {tableHeaders} {tableRows} {activeSort} />
</div>
