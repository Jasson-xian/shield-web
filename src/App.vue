<template>
  <div id="app">
    <div class="header">
      <headerbar></headerbar>
      <navbar></navbar>
    </div>
    <div class="container content-wrapper">
      <router-view></router-view>
    </div>
    <div class="footer">
      <footerbar></footerbar>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import Footerbar from './components/Footer'
import Headerbar from './components/Header'

export default {
  name: 'app',
  components: {
    Headerbar,
    Navbar,
    Footerbar
  },
  mounted(){
    this.fixfooter()
    window.onresize=function(){
      if($(window).height() > $(document.body).height()){
        $(".footer").addClass("footer-fix");
      }else{
        $(".footer").removeClass("footer-fix")
      }
    },
    $(document).ready(function(){
        if($(window).height() > $(document.body).height()){
          $(".footer").addClass("footer-fix");
        }else{
          $(".footer").removeClass("footer-fix")
        }
    })
  },
  methods: {
    fixfooter(){
      if($(window).height() > $(document.body).height()){
        $(".footer").addClass("footer-fix");
      }else{
        $(".footer").removeClass("footer-fix")
      }
    }
  }
}
</script>
<style>
.content-wrapper {
	margin-top:40px;
	min-height:760px;
	padding-bottom: 60px;
}
.footer{
  width: 100%;
  position:relative;
}
.footer-fix{
  position:fixed;
  bottom:0
}
</style>
