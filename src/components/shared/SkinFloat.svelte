<script>
  import M from 'materialize-css'
  import { onMount } from 'svelte'
  export let min
  export let max
  export let style = ''

  $: tooltip = `Float range: ${min} - ${max}`

  onMount(() => {
    const elems = document.querySelectorAll('.needs-tooltip')
    const tooltipOptions = {
      exitDelay: 0,
      enterDelay: 0,
      inDuration: 300,
      outDuration: 200,
      position: 'top',
    }
    M.Tooltip.init(elems, tooltipOptions)
    elems.forEach(el => {
      el.classList.remove('needs-tooltip')
    })
  })
</script>

<style>
  .float {
    border: 1px solid black;
    max-width: 750px;
  }

  .represent-floats {
    display: flex;
  }
  .represent-floats,
  .represent-floats div {
    height: 20px;
  }

  .max {
    background-color: green;
  }

  .ranges {
    display: flex;
  }
  .range {
    display: flex;
    justify-content: center;
    border-top: 1px solid black;
  }
  .range span {
    color: white;
    padding: 5px;
  }

  #fn {
    width: 7%;
  }
  #mw {
    width: 8%;
  }
  #ft {
    width: 23%;
  }
  #ww {
    width: 7%;
  }
  #bs {
    width: 55%;
  }
</style>

<div class="float" {style}>
  <div class="represent-floats red lighten-2 needs-tooltip" data-tooltip={tooltip}>
    <div class="min" style={'width: ' + min * 100 + '%;'} />
    <div class="max green accent-3" style={'width: ' + max * 100 + '%;'} />
  </div>
  <div class="ranges">
    <div class="range grey needs-tooltip" id="fn" data-tooltip="Factory New: 0.00 - 0.07">
      <span>FN</span>
    </div>
    <div class="range grey darken-1 needs-tooltip" id="mw" data-tooltip="Minimal Wear: 0.07 - 0.15">
      <span>MW</span>
    </div>
    <div class="range grey darken-2 needs-tooltip" id="ft" data-tooltip="Field-Tested: 0.15 - 0.38">
      <span>FT</span>
    </div>
    <div class="range grey darken-3 needs-tooltip" id="ww" data-tooltip="Well-Worn: 0.38 - 0.45">
      <span>WW</span>
    </div>
    <div class="range grey darken-4 needs-tooltip" id="bs" data-tooltip="Battle-Scarred: 0.45 - 1.00">
      <span>BS</span>
    </div>
  </div>
</div>
