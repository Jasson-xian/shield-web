<template>
<div>
  <div class="row">
    <div class="col-md-12">
        <h4 class="page-head-line">Home</h4>
    </div>
  </div>
  <div class="row">
    <div class="col-md-4 col-sm-4 col-xs-6">
      <div class="dashboard-div-wrapper bk-clr-one">
           <i  class="fa dashboard-div-icon" >{{userCount}}</i>
           <div class="block-line-one">用户数</div>
           <h5 class="btn more-btn" @click.prevent="jumpTo('/user')">更多 > </h5>
      </div>
    </div>
    <div class="col-md-4 col-sm-4 col-xs-6">
      <div class="dashboard-div-wrapper bk-clr-two">
           <i  class="fa dashboard-div-icon" >{{siteCount}}</i>
           <div class="block-line-two">域名数</div>
           <h5 class="btn more-btn" @click.prevent="jumpTo('/site')">更多 > </h5>
      </div>
    </div>
    <div class="col-md-4 col-sm-4 col-xs-6">
      <div class="dashboard-div-wrapper bk-clr-three">
           <i  class="fa dashboard-div-icon" >{{dynamicCount}}</i>
           <div class="block-line-three">高防节点数</div>
           <h5 class="btn more-btn" @click.prevent="jumpTo('/node')">更多 > </h5>
      </div>
    </div>
    <div class="col-md-4 col-sm-4 col-xs-6">
      <div class="dashboard-div-wrapper bk-clr-four">
           <i  class="fa dashboard-div-icon" >{{siteCount}}</i>
           <div class="block-line-four">DNS服务器数</div>
           <h5 class="btn more-btn" @click.prevent="jumpTo('/node')">更多 > </h5>
      </div>
    </div>
    <div class="col-md-4 col-sm-4 col-xs-6">
      <div class="dashboard-div-wrapper bk-clr-five">
            <i  class="fa dashboard-div-icon" >{{staticCount}}</i>
            <div class="block-line-four">清洗设备数目</div>
            <h5 class="btn more-btn" @click.prevent="jumpTo('/site')">更多 > </h5>
      </div>
    </div> 
    <div class="col-md-4 col-sm-4 col-xs-6">
      <div class="dashboard-div-wrapper bk-clr-six">
            <i  class="fa dashboard-div-icon" >{{staticCount}}</i>
            <div class="block-line-four">报表统计</div>
            <h5 class="btn more-btn" @click.prevent="jumpTo('/site')">更多 > </h5>
      </div>
    </div> 
  </div>
  <!--<div class="row">
    <div class="col-md-12">
      <div class="panel panel-default">
        <div class="panel-heading">
          System flux limit rate
          <a role="button" v-on:click="editrate">
            <i class="fa fa-edit pull-right text-success"></i>
          </a>
        </div>
        <div class="panel-body flux-board">
          <ul>
            <li>
              <div>Top limit <span class="pull-right">{{h_rate + '%'}}</span></div>
              <div class="progress progress-striped active">
                <div class="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" :style="{width: h_rate + '%'}">
                {{h_rate}}
                </div>                                   
              </div>
            </li>
            <li class="editform">
              <div> <input id="hrate" class="form-control" data-toggle="tooltip" step="0.1" data-placement="top" title="Min:20，Max:100" 
                      v-model="h_rate" type="number" max="100" min="20" placeholder="Top limit"> </div>
            </li>
            <li>
              <div>Floor limit <span class="pull-right">{{l_rate + '%'}}</span></div>
              <div class="progress progress-striped active">
                <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" :style="{width: l_rate + '%'}">
                {{l_rate}}
                </div>                                                  
              </div>              
            </li>
             <li class="editform">
              <div> <input id="lrate" class="form-control" data-toggle="tooltip" step="0.1" data-placement="top" title="Min:10，Max:90" 
                      v-model="l_rate" type="number" :max=" h_rate-10 " min="10" placeholder="Floor limit"> </div>
            </li>
            <li class="editform">
              <div class="errormsg"></div>
              <div class="submitbtn">
                <button type="button" v-on:click="submitRate" class="btn btn-success btn-sm enterbtn">Enter</button>
                <button type="button" v-on:click="cancelrate" class="btn btn-warning btn-sm ">Cancel</button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>-->
</div>
</template>
<script>
import indexService from 'services/indexService'
export default {
  created () {
    indexService.getInfo()
    .then((recvdata) => {
      if(recvdata.success) {
        this.userCount = recvdata.data.userCount
        this.dynamicCount = recvdata.data.dynamicCount
        this.staticCount = recvdata.data.staticCount
        this.siteCount = recvdata.data.domainCount
        this.h_rate = recvdata.data.h_rate
        this.l_rate = recvdata.data.l_rate
        this.r_hrate = recvdata.data.h_rate
        this.r_lrate = recvdata.data.l_rate
      }
    })
  },
  mounted: function() {
    $(function () { 
      $("[data-toggle='tooltip']").tooltip();
        if($(window).height() > $(document.body).height()){
          $(".footer").addClass("footer-fix");
        }else{
          $(".footer").removeClass("footer-fix")
        }
    })
  },
  methods:{
    jumpTo: function (page) {
      this.$router.push(page)
    },
    editrate(){
      $(".editform").css("display","block");
    },
    submitRate(){
      var f_hrate = parseFloat(this.hrate).toFixed(2);
      var f_lrate = parseFloat(this.lrate).toFixed(2);
      var rates = JSON.stringify({ hrate: f_hrate,lrate: f_lrate });
      indexService.adjustrate(rates)
        .then((recvdata) => {
              if (recvdata.status == 'success') {
                this.r_hrate = f_hrate;
                this.r_lrate = f_lrate;
                alert(recvdata.msg);
              } else {
                this.r_hrate = f_hrate;
                this.r_lrate = f_lrate;
                alert(recvdata.msg);
              }
            })
      $(".editform").css("display","none");
    },
    cancelrate(){
      this.h_rate = this.r_hrate;
      this.l_rate = this.r_lrate;
      $(".editform").css("display","none");
    },
    later: _.debounce(
      function (){
        var fleg = true;
        var hrate = parseFloat($("#hrate").val()).toFixed(2);
        var lrate = parseFloat($("#lrate").val()).toFixed(2);
        this.h_rate = hrate;
        this.l_rate = lrate;
        if(hrate < 20 || hrate > 100){
          $('#hrate').css("background-color","rgba(242, 22, 8, 0.28)");
          $('.errormsg').text("error:Top limit'Min:20，Max:100'");
          fleg = false;
          $(".enterbtn").attr("disabled","true");
        }else{
          $('#hrate').css("background-color","#FFFFFF");
        }
        if (lrate < 10 || lrate > 90){
          $('#lrate').css("background-color","rgba(242, 22, 8, 0.28)");
          $('.errormsg').text("error:Floor limit'Min:10，Max:90'");
          fleg = false;
          $(".enterbtn").attr("disabled","true");
        }else if(hrate <= lrate){
          $('#hrate').css("background-color","rgba(242, 22, 8, 0.28)");
          $('#lrate').css("background-color","rgba(242, 22, 8, 0.28)");
          $('.errormsg').text("error: It must be :'Top limit' > 'Floor limit'");
          fleg = false;
          $(".enterbtn").attr("disabled","true");
        }else if(hrate - lrate < 10){
          $('#hrate').css("background-color","rgba(242, 22, 8, 0.28)");
          $('#lrate').css("background-color","rgba(242, 22, 8, 0.28)");
          $('.errormsg').text("error: 'Top limit' is bigger than 'Floor limit' 10 rates at lest!");
          fleg = false;
          $(".enterbtn").attr("disabled","true");
        }
        if(fleg){
          this.hrate = hrate;
          this.lrate = lrate;
          $('#hrate').css("background-color","#FFFFFF");
          $('#lrate').css("background-color","#FFFFFF");
          $('.errormsg').text("");
          $(".enterbtn").removeAttr("disabled");
      }
      },
      500
    )
  },
  data: () => {
    return {
      userCount: 0,
      dynamicCount: 0,
      staticCount: 0,
      siteCount: 0,
      h_rate: "",
      l_rate: "",
      r_hrate:"",
      r_lrate:""
    }
  },
  watch: {
    h_rate: function() {
      this.later()
    },
    l_rate: function() {
      this.later()
    }
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
.dashboard-div-wrapper {
    border-radius: 5px;
    text-align: center;
    padding: 15px;
    color: #fff;
    margin-bottom: 50px;
}
.dashboard-div-icon {
    height: 75px;
    width: 75px;
    border: 2px solid #fff;
    padding: 20px;
    border-radius: 50%;
    -webkit-border-radius:50%;
    -moz-border-radius:50%;
    font-size: 30px;
    margin-bottom: 15px;
    color: #fff;
}
.bk-clr-one {
    background-color: #b9b739;
}
.bk-clr-two {
    background-color: #f94c4c;
}
.bk-clr-three {
    background-color: #119c7e;
}
.bk-clr-four {
    background-color: #b739b9;
}

.bk-clr-five {
    background-color: #397fb9;
}
.bk-clr-six {
    background-color: #a94442;
}
.block-line-one {
  padding-bottom: 8px;
  border-bottom: 2px solid #f0ad4e;
}
.block-line-two {
  padding-bottom: 8px;
  border-bottom: 2px solid #d9534f;
}
.block-line-three {
  padding-bottom: 8px;
  border-bottom: 2px solid #5cb85c;
}
.block-line-four {
  padding-bottom: 8px;
  border-bottom: 2px solid #337ab7;
}
.more-btn {
  margin-top: 2px;
  padding-top: 5px;
}
.panel-default>.panel-heading {
  color: #FFFFFF;
  background-color: #CE191E;
  border-color: #FBE1A6;
}
.fa-edit{
  color: white;
}
.flux-board ul{
  padding-left:0px;
  list-style: none;
}
.flux-board li{
  padding:10px;
  border-bottom: 1px solid #E5E5E5;
}
.editform{
  display:none;  
}
.submitbtn{
  text-align: center;
  margin: 0 auto;
}
.errormsg{
  color: red;
}
</style>