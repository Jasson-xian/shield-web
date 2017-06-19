<template>
  <div class="row">
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title">Flux Chart</h3>
        </div>
        <div class="panel-body">
          <div class="screening row">
            <!--input-group start-->
            <div class="input-group search-input col-md-6 col-sm-6 col-xs-12">
              <span class="input-group-btn">
					      <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">{{ term }} 
                <span class="caret"></span>
              </button>
              <ul class="dropdown-menu" role="menu">
                <li v-on:click="getterm('Domain')">Domain</li>
                <li v-on:click="getterm('Node IP')">Node IP</li>
                <li v-on:click="getterm('Real IP')">Real IP</li>
              </ul>
              </span>
              <input type="text" v-model="sub" class="form-control">
            </div>
            <!--input-group end-->
            <!--time-cycle start-->
            <div class="col-md-6 col-sm-6 col-xs-12 time-cycle" >
              <div class="row">
                <div class="col-md-2 col-sm-2 col-xs-2 tag"><b>Cycle:</b></div>
                <div class="col-md-4 col-sm-4 col-xs-4 btngrp">
                  <div class="btn-group">
                    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">{{ rangetime }}
                      <span class="caret"></span>
                    </button>
                    <ul class="dropdown-menu" role="menu">
                      <li>
                        <a v-on:click="getrangetime('Last hour'), setFilter()">Last hour</a>
                      </li>
                      <li>
                        <a v-on:click="getrangetime('Last 3 hours'), setFilter()">Last 3 hours</a>
                      </li>
                      <li>
                        <a v-on:click="getrangetime('Last 6 hours'), setFilter()">Last 6 hours</a>
                      </li>
                      <li>
                        <a v-on:click="getrangetime('Last 12 hours'), setFilter()">Last 12 hours</a>
                      </li>
                      <li>
                        <a v-on:click="getrangetime('Last 24 hours'), setFilter()">Last 24 hours</a>
                      </li>
                      <li>
                        <a v-on:click="getrangetime('Last 3 days'), setFilter()">Last 3 days</a>
                      </li>
                      <li>
                        <a v-on:click="getrangetime('Last week'), setFilter()">Last week</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="col-md-2 col-sm-2 col-xs-2 tag"><b>Freq:</b></div>
                <div class="col-md-4 col-sm-4 col-xs-4 btngrp">
                  <div class="btn-group">
                    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">{{ timespace }}
                      <span class="caret"></span>
                    </button>
                    <ul class="dropdown-menu" role="menu">
                      <li>
                        <a v-on:click="gettimespace('5 minutes'), setFilter()">5 minutes</a>
                      </li>
                      <li>
                        <a v-on:click="gettimespace('15 minutes'), setFilter()">15 minutes</a>
                      </li>
                      <li>
                        <a v-on:click="gettimespace('1 hour'), setFilter()">1 hour</a>
                      </li>
                      <li>
                        <a v-on:click="gettimespace('6 hours'), setFilter()">6 hours</a>
                      </li>
                      <li>
                        <a v-on:click="gettimespace('1 day'), setFilter()">1 day</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <!--time-cycle end-->
          </div>
            <div id="container"></div>
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
        rangetime: "Last hour",
        timespace: "5 minutes",
        sub:"", 
        rangetime_j: "3600",
        timespace_j: "300",
        Time:"",
        In:"",
        Out:"",
        Site:"",
        Count:""
      }
    },
    mounted() {
      this.buildFluxchart()
      this.setFilter()
    },
    methods: {
      getterm(term) {
        this.term = term;
        this.sub = "";
      },
      getfiler: _.debounce(
        function (){
           this.setFilter()
        },
        400
      ),
      setFilter(){
        switch (this.term) {
          case "Domain":
            var filter = JSON.stringify({udomain:this.sub,timespace:this.timespace_j,rangetime:this.rangetime_j})
            break;
          case "Node IP":
            var filter = JSON.stringify({nodeip:this.sub,timespace:this.timespace_j,rangetime:this.rangetime_j})
            break;
          case "Real IP":
            var filter = JSON.stringify({rip:this.sub,timespace:this.timespace_j,rangetime:this.rangetime_j})
            break;
        }
        this.showloading()
        logsService.getflux(filter)
        .then((recvdata) => {
          if(recvdata.status == 'success') {
            this.Time = recvdata.Time
            this.In = recvdata.In 
            this.Out = recvdata.Out 
            this.Site = recvdata.Site
            this.Count = recvdata.Count
            this.buildFluxchart()
          }else{
            this.hideloading()
            alert(this.term + " no data !");
          }
        })
      },
      showloading(){
        var chart = $("#container").highcharts()
        chart.showLoading()
      },
      hideloading(){
        var chart = $("#container").highcharts()
        chart.hideLoading()
      },
      buildFluxchart(){
        var step = Math.floor(this.Count / 5)
        Highcharts.chart('container', {
          chart: {
						zoomType: 'x',
            events: {
                load: function () {
                    this.hideLoading()
                }
            }
					},
          colors: ['#fd4403', 'black'],
          title: {
            text: null,
            x: -20 //center
          },
          exporting: {
						enabled: false
					},
          credits: {
						enabled: false // no copyright
					},
          loading: {
            hideDuration: 1000,
            showDuration: 1000
          },
          xAxis: {
            labels: {
							step: step
						},
						categories: this.Time
          },
          yAxis: {
            title: {
              text: 'Flux (b)'
            },
            plotLines: [{
              value: 0,
              width: 1,
              color: '#808080'
            }]
          },
          tooltip: {
            valueSuffix: 'b'
          },
          legend: {
            layout: 'vertical',
						align: 'right',
						verticalAlign: 'top',
						borderWidth: 0,
						floating: true,
						y: 0,
						layout: "vertical"
          },
          series: [{
            name: 'In',
            data: this.In
          }, {
            name: 'Out',
            data: this.Out
          }],
          responsive: {
						rules: [{
							condition: {
								maxWidth: 500
							},
							// Make the labels less space demanding on mobile
							chartOptions: {
								yAxis: {
									labels: {
										align: 'left',
										x: 0,
										y: -2
									}
								}
							}
						}]
					}
        });
      },
      getrangetime(rangetime) {
        this.rangetime = rangetime;
        switch (rangetime) {
          case "Last hour":
            this.rangetime_j = "3600";
            break;
          case "Last 3 hours":
            this.rangetime_j = "10800";
            break;
          case "Last 6 hours":
            this.rangetime_j = "21600";
             break;
          case "Last 12 hours":
            this.rangetime_j = "43200";
             break;
          case "Last 24 hours":
            this.rangetime_j = "86400";
             break;
          case "Last 3 days":
            this.rangetime_j = "367200";
             break;
          case "Last week":
            this.rangetime_j = "604800";
             break;
          default:
            this.rangetime_j = "3600";
        }
      },
      gettimespace(timespace) {
        this.timespace = timespace;
        switch (timespace) {
          case "5 minutes":
            this.timespace_j = "300";
            break;
          case "15 minutes":
            this.timespace_j = "900";
            break;
          case "1 hour":
            this.timespace_j = "3600";
            break;
          case "6 hours":
            this.timespace_j = "21600";
            break;
          case "1 day":
            this.timespace_j = "86600";
            break;
          default:
            this.udomain = "300";
        }
      }
    },
    watch: {
      sub: function() {
        if(this.sub != ""){
          this.getfiler()
        }
      }
    }
  }
</script>
<style scoped>

.panel-body{
  padding-top: 0px;
}
.panel-default>.panel-heading {
  color: #FFFFFF;
  background-color: #CE191E;
  border-color: #FBE1A6;
}
.screening{
  border-bottom: 1px #CE191E solid;
  padding: 0 15px 15px 15px;
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
.search-input{
  padding-top: 15px;
}
.dropdown-menu {
  min-width: 115%;
  max-width: 115%
}
.dropdown-menu > li {
  padding-left: 10px;
  margin-top: 3px;
  cursor:pointer;
}
.dropdown-menu > li > a {
  color: black;
  padding-left: 5px;
}
.dropdown-menu > li:hover{
  background: rgba(245, 12, 12, 0.54)
}
.time-cycle{
  float: right;
  text-align: center;
  margin: 0 auto;
  padding-top: 15px;
}
.datetimepicker{
  width: 100%;
}
.btn{
 width: 110%;
 text-align: center;
 margin: 0 auto;
}
.tag{
  margin-top: 7px;
  padding-right: 0px;
}
.btngrp{
  padding-left: 0px;
}
#container{
  min-width: 310px; 
  height: 400px; 
  margin: 0 auto
}
</style>