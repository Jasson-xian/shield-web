<template>
  <div>
    <div class="row">
      <div class="col-md-12">
          <h4 class="page-head-line">Logs</h4>
      </div>
    </div>
    <fluxchart></fluxchart>
    <dnslog></dnslog>
  </div>
</template>
<script>
import fluxchart from 'components/Common/FluxChart'
import dnslog from 'components/Common/DnsLog'
export default {
  created () {
    console.info('Logs page loaded!')
  },
  mounted: function() {
    $(function () { 
        $(".footer").removeClass("footer-fix")
    })
  },
  components: {
    fluxchart,
    dnslog
  }
}
</script>
<style>
.page-head-line {
    font-weight: 900;
    padding-bottom: 20px;
    border-bottom: 2px solid #ef2f32;
    text-transform: uppercase;
    color: #ef2f32;
    font-size: 20px;
    margin-bottom: 40px;
}
</style>