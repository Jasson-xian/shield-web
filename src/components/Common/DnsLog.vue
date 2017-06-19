<template>
  <div class="row">
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title">DNS Log</h3>
        </div>
        <div class="panel-body">
          <div class="screening row">
            <!--input-group start-->
            <div class="input-group col-md-5 col-sm-5 col-xs-12 searcher">
              <span class="input-group-btn ">
					      <button type="button" class="btn btn-primary">
                  Domain  
                </button>
              </span>
              <input type="text" v-model="domain" class="form-control">
            </div>
            <!--input-group end-->
            <!--time-space start-->
            <div class="time-space col-md-7 col-sm-7 col-xs-12 row">
              <div class="col-md-2 col-sm-2 col-xs-2 tag">
                <b>From</b>
              </div>
              <div class="col-md-4 col-sm-4 col-xs-4 timer">
                <input id="start" v-model="start" type="text" class="datetimepicker" placeholder="Start Time." readonly>
              </div>
              <div class="col-md-2 col-sm-2 col-xs-2 tag">
               <b>to</b>
              </div>
              <div class="col-md-4 col-sm-4 col-xs-4 timer">
                <input id="end" v-model="end" type="text" class="datetimepicker" placeholder="End Time." readonly>
              </div>
            <!--time-space end-->
             </div>
          </div>
          <div class="screening tableblock">
            <table id="dnstable" class="table table-hover table-striped table-bordered">
              <thead>
                <tr>
                  <td>
                    <b>Domain</b>
                  </td>
                  <td>
                    <b>Node IP</b>
                  </td>
                  <td>
                    <b>Time</b>
                  </td>
                </tr>
              </thead>
              <tbody class="error-tbody" v-if=" status == 'error' ? true : false ">
                <tr style='text-align:left'>
                  <td colspan='3'>
                    <b>Search For " {{domain}} " No data !</b>
                  </td>
                </tr>
              </tbody>
              <tbody class="real-tbody" v-if=" status == 'success' ? true : false ">
                <tr v-for="log in logs">
                  <td >
                    {{ log.domain }}
                  </td>
                  <td >
                    {{ log.ip }}
                  </td>
                  <td>
                    {{ log.time }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="foot">
            <div class="pageteg">
                <b>Showing</b> {{ page }} <b>page of</b> {{ pages }} <b>pages</b>
            </div>
            <div class="pagebtn">
              <button type="button" v-if=" page > 1 ? true : false " v-on:click="onChangePage('prev')" class="btn btn-sm btn-danger ">Prev</button>
              <button type="button" v-if=" pages <= 1 || pages == page ? false : true " v-on:click="onChangePage('next')" class="btn btn-sm btn-danger ">Next</button>
            </div>
            <div class="pagejump" v-if=" status == 'success' ? true : false ">
              <div class="input-group">
                <input type="number" v-model="pagejump"  class="page-input form-control">
                <span class="input-group-btn">
                  <button class="btn btn-default btn-sm btn-jump" v-on:click="jump()" type="button">
                    <b>Go!</b>
                  </button>
                </span>
              </div>
            </div>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import logsService from 'services/logsService'
  export default {
    data: function () {
      return {
        term: "Domain",
        domain:"",
        start: "",
        end: "",
        pages:0,
        page:1,
        pagejump:"",
        status:"",
        logs:[]
      }
    },
    computed: {
      filter: function () {
        return JSON.stringify({domain:this.domain,start:this.start,end:this.end,page:this.page})
      }
      
    },
    created() {

    },
    mounted() {
      $('.datetimepicker').datetimepicker({
        format: 'yyyy-mm-dd hh:ii',
        language: 'zh-CN',
        startDate: '2016-1-1 00:00',
        autoclose: true,
        todayHighlight: true,
      })
      $("#start").datetimepicker().on('hide', this.timevalidater)
      $("#end").datetimepicker().on('hide', this.timevalidater)
      this.getlogs()
    },
    methods: {
      timevalidater() {
        if ($("#start").val() != "" && $("#end").val() != "" && $("#start").val() > $("#end").val()) {
          $("#start").css("background-color", "rgba(242, 22, 8, 0.28)")
          $("#end").css("background-color", "rgba(242, 22, 8, 0.28)")
          alert("The start time must be less than end time !");
        } else {
          this.start = $("#start").val()
          this.end = $("#end").val()
          $("#start").css("background-color", "#FFFFFF")
          $("#end").css("background-color", "#FFFFFF")
          this.getlogs()
        }
      },
      getlogs(){
        logsService.getdns(this.filter)
        .then((recvdata) => {
          if(recvdata.status == 'success') {
            this.status = recvdata.status;
            this.logs = recvdata.data.logs
            this.pages = recvdata.data.count
          }else if(recvdata.status == 'error'){
            this.status = recvdata.status;
            this.logs = []
            this.page = 1
            this.pages = 0
            this.pagejump = ""
          }
        })
      },
      getlogslater: _.debounce(
        function (){
          this.getlogs()
        },
        400
      ),
      chkpagejump: _.debounce(
        function (){
          this.pagejump()
        },
        400
      ),
      jump(){
        if(this.pagejump == ""){
          this.pagejump = 1
        }
        this.page = this.pagejump
        this.getlogs()
      },
      onChangePage(page) {
        if(page === 'next' && this.page < this.pages) {
          this.page = this.page + 1
          this.getlogs()
        }else if ( page === 'prev' && this.page >1) {
          this.page = this.page - 1
          this.getlogs()
        }
      }
    },
    watch: {
      domain: function() {
        this.getlogslater()
      },
      pagejump:function(){
        if(this.pagejump > this.pages){
          this.pagejump = this.pages
        }else if(this.pagejump == 0){
          this.pagejump = 1
        }
      }
    }
  }
</script>
<style scoped>

.panel-body{
  max-height: 660px;
}
.panel-default>.panel-heading {
  color: #FFFFFF;
  background-color: #CE191E;
  border-color: #FBE1A6;
}
.screening{
  border-bottom: 1px #CE191E solid;
}
.btn-primary {
    color: #fff;
    background-color: rgb(206, 25, 30);
    border-color: rgb(206, 25, 30);
}
.btn-primary.active, .btn-primary:active, .open>.dropdown-toggle.btn-primary {
    color: #fff;
    background-color: rgba(245, 12, 12, 0.54);
    border-color: rgba(245, 12, 12, 0.54);
}
.input-group[class*=col-] {
    float: left;
}
.dropdown-menu {
  min-width: 100px;
}
.dropdown-menu > li {
  padding-left: 10px;
  margin-top: 3px;
  cursor:pointer;
}
.dropdown-menu > li:hover{
  background: rgba(245, 12, 12, 0.54)
}
.time-space{
  padding: 0 15px 15px 15px ;
}
.datetimepicker{
  width: 100%;
}
.searcher{
  padding: 0 15px 15px 15px;
}
.tag{
  text-align: center;
  padding: 7px;
}
.timer{
  padding: 0;
}
.tableblock{
  margin-top: 15px;
}
.tableblock > table > thead > tr > td{
  text-align: center;
  color: rgb(206, 25, 30);
  width: 30%;
}
.tableblock > table{
  text-align: center;
}
.pageteg{
  float: left;
  padding-top: 20px;
}
.pageteg > b{
  color: rgb(206, 25, 30);
}
.pagejump{
  width: 120px;
  float: right;
  padding-top: 15px;
  padding-left: 20px;
  margin-right: 20px;
}
.page-input{
  height: 30px;
  border: 1px rgb(206, 25, 30) solid;
  min-width: 30px;
  padding-right:5px; 
  padding-left:5px;
  z-index: 0;
}
.input-group-btn:last-child>.btn, .input-group-btn:last-child>.btn-group {
    z-index: 0;
}
.btn-jump{
  border: 1px rgb(206, 25, 30) solid;
  z-index: 0px;
}
.btn-jump > b {
  color: rgb(206, 25, 30);
}
.pagebtn{
  float: right;
  padding-top: 15px;
}
.btn-danger {
    color: #fff;
    background-color: rgb(206, 25, 30);
    border-color: rgb(206, 25, 30);
}
</style>