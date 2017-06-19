<template>
<div class="table-responsive">
       <div class="pic_wrap">           
            <ul  class="pic_wrap_body">
                <!--网站数据-->
                <li class="web_data">
                    <div class="pic_head">
                        <h4>网站数据</h4>
                    </div> 
                     <!--http、https-->
                    <el-tabs v-if="type!='port'" v-model="now_history" type="card">
                        <el-tab-pane label="今日网站数据" name="today">
                            <table>
                                <tr>
                                    <td>总请求数</td>
                                    <td>总流量</td>
                                    <td>缓存请求次数</td>
                                </tr>
                                <tr class="data">
                                    <td>269</td>
                                    <td>66.66KB</td>
                                    <td>5</td>
                                </tr>
                            </table>                 
                        </el-tab-pane>
                        <el-tab-pane label="历史网站数据" name="history">
                            <table >
                                <tr>
                                    <td>总请求数</td>
                                    <td>总流量</td>
                                    <td>缓存请求次数</td>
                                </tr>
                                <tr class="data">
                                    <td>666666</td>
                                    <td>6666.66KB</td>
                                    <td>15</td>
                                </tr>
                            </table>        
                        </el-tab-pane>
                    </el-tabs>
                    <!--端口-->
                     <el-tabs v-else  v-model="now_history" type="card">
                        <el-tab-pane label="今日网站数据" name="today">
                            <table>
                                <tr>
                                    <td>总请求数</td>
                                    <td>总流量</td>                                
                                </tr>
                                <tr class="data">
                                    <td>269</td>
                                    <td>66.66KB</td>                                
                                </tr>
                            </table>                 
                        </el-tab-pane>
                        <el-tab-pane label="历史网站数据" name="history">
                            <table >
                                <tr>
                                    <td>总请求数</td>
                                    <td>总流量</td>        
                                </tr>
                                <tr class="data">
                                    <td>666666</td>
                                    <td>6666.66KB</td>
                                </tr>
                            </table>        
                        </el-tab-pane>
                    </el-tabs>
                </li>
                <!--访问概况-->
                <li class="condition">                
                    <div class="pic_head">
                        <h4>网站访问概况</h4>                                             
                        <el-date-picker 
                        v-model="visit_time" 
                        type="daterange" 

                        align="right"  
                        placeholder="选择时间范围" 
                        :picker-options="pickerOptions">
                        </el-date-picker>
                       
                    </div>  
                    <table>
                        <tr>
                            <td>时间范围</td>
                            <td>总请求次数</td>
                            <td>请求流量</td>
                            <td>网站浏览人数（IP）</td>
                        </tr>
                        <tr  class="data">
                            <td>{{time_range}}</td>
                            <td>242526次</td>
                            <td>5.53M</td>
                            <td>520</td>
                        </tr>
                    </table>                 
                    <div id="web_visit"></div> 
                </li>
                <!--历史攻击拦截-->
                <li>
                     <div class="pic_head">
                        <h4>历史攻击拦截</h4>
                        <div class="block">
                            <el-date-picker
                             v-model="holdup_time" 
                             type="daterange" 
                             align="right" 
                             placeholder="选择日期范围" 
                             :picker-options="pickerOptions">
                            </el-date-picker>
                        </div>
                    </div>  
                    <div id="holdup"></div>                             
                </li>

            </ul>  
        </div> 
</div>
</template>
<script>
import siteService from 'services/siteService'
export default {
    created() {
        this.loadData()
    },
    data: function () {
        return {
            site_domain: '',
            port:'',
            domain_type:null,
            type:null,
            day:'',
            now_history:'today',
            visit_time:'',
            holdup_time:'',
            attack_type:'',
            select_date:'',
            pickerOptions: { }
           
        }
    },
    methods: {
        loadData () {
            console.log(this.$route)
            siteService.detail(this.$route.params.id)
            .then((recvdata) => {
                if(recvdata.status === 'success') {
                    this.site_domain = recvdata.data.sdomain
                    // this.days = recvdata.data.stime.days
                    // this.hours = recvdata.data.stime.hours
                    // this.mins = recvdata.data.stime.mins
                    // this.secs = recvdata.data.stime.secs
                    // this.capacity = recvdata.data.scapacity
                    // this.sys_domain = recvdata.data.sys_domain
                    // this.pip = recvdata.data.spip
                    // this.rip = recvdata.data.srip
                    // this.status = recvdata.data.slevel == 1 ? "static proxy" : "dynamic proxy"
                    // this.flux = recvdata.data.straffic
                }
            })
        },
         computeTime(){
                this.pickerOptions = {
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
                        picker.$emit('pick', [start, end]);
                        }
                    },{
                        text: '最近一周',
                        onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                        }
                    }]
                }
           },
           drawWebVisit(){
                var data = [
                    {type: '请求次数', time: '2017-1-1', value: 600},
                    {type: '请求次数', time: '2017-1-2', value: 502},
                    {type: '请求次数', time: '2017-1-3', value: 635},
                    {type: '请求次数', time: '2017-1-4', value: 809},
                    {type: '请求次数', time: '2017-1-5', value: 947},
                    {type: '请求次数', time: '2017-1-6', value: 1402},
                    {type: '请求次数', time: '2017-1-7', value: 3634},
                    {type: '请求次数', time: '2017-1-8', value: 3634},


                    {type: '请求流量', time: '2017-1-1', value: 300},
                    {type: '请求流量', time: '2017-1-2', value: 106},
                    {type: '请求流量', time: '2017-1-3', value: 107},
                    {type: '请求流量', time: '2017-1-4', value: 111},
                    {type: '请求流量', time: '2017-1-5', value: 133},
                    {type: '请求流量', time: '2017-1-6', value: 221},
                    {type: '请求流量', time: '2017-1-7', value: 767},
                    {type: '请求流量', time: '2017-1-8', value: 3634},


                    {type: '请求IP数', time: '2017-1-1', value: 163},
                    {type: '请求IP数', time: '2017-1-2', value: 163},
                    {type: '请求IP数', time: '2017-1-3', value: 203},
                    {type: '请求IP数', time: '2017-1-4', value: 276},
                    {type: '请求IP数', time: '2017-1-5', value: 408},
                    {type: '请求IP数', time: '2017-1-6', value: 547},
                    {type: '请求IP数', time: '2017-1-7', value: 729},
                    {type: '请求IP数', time: '2017-1-8', value: 3634},
  
                ];
                var Stat = G2.Stat;
                var chart = new G2.Chart({
                    id: 'web_visit',
                    forceFit: true,
                    height: 450,
                     plotCfg: {
                        margin:[40, 140,40, 60],
                    },
                });
                chart.axis('value', {
                    title: null // 不展示坐标轴的标题
                })
                chart.legend('type', {
                    title: null // 不展示图例 title
                });
                chart.source(data, {
                  time: {        
                        type:"time",     
                        mask: 'yyyy-mm-dd'
                    }
                });
                chart.areaStack().position('time*value').color('type');
                chart.render();
           },
           drawHoldback(){
                var data = [
                    {type: 'SYN Flood攻击', time: '2017-1-1', value: 600},
                    {type: 'SYN Flood攻击', time: '2017-1-2', value: 502},
                    {type: 'SYN Flood攻击', time: '2017-1-3', value: 635},
                    {type: 'SYN Flood攻击', time: '2017-1-4', value: 809},
                    {type: 'SYN Flood攻击', time: '2017-1-5', value: 947},
                    {type: 'SYN Flood攻击', time: '2017-1-6', value: 1402},
                    {type: 'SYN Flood攻击', time: '2017-1-7', value: 3634},
                    {type: 'SYN Flood攻击', time: '2017-1-8', value: 3634},


                    {type: 'SYN流量', time: '2017-1-1', value: 300},
                    {type: 'SYN流量', time: '2017-1-2', value: 106},
                    {type: 'SYN流量', time: '2017-1-3', value: 107},
                    {type: 'SYN流量', time: '2017-1-4', value: 111},
                    {type: 'SYN流量', time: '2017-1-5', value: 133},
                    {type: 'SYN流量', time: '2017-1-6', value: 221},
                    {type: 'SYN流量', time: '2017-1-7', value: 767},
                    {type: 'SYN流量', time: '2017-1-8', value: 3634},


                    {type: 'UDP Flood攻击', time: '2017-1-1', value: 163},
                    {type: 'UDP Flood攻击', time: '2017-1-2', value: 163},
                    {type: 'UDP Flood攻击', time: '2017-1-3', value: 203},
                    {type: 'UDP Flood攻击', time: '2017-1-4', value: 276},
                    {type: 'UDP Flood攻击', time: '2017-1-5', value: 408},
                    {type: 'UDP Flood攻击', time: '2017-1-6', value: 547},
                    {type: 'UDP Flood攻击', time: '2017-1-7', value: 729},
                    {type: 'UDP Flood攻击', time: '2017-1-8', value: 3634},

                    {type: 'UDP流量', time: '2017-1-1', value: 300},
                    {type: 'UDP流量', time: '2017-1-2', value: 106},
                    {type: 'UDP流量', time: '2017-1-3', value: 107},
                    {type: 'UDP流量', time: '2017-1-4', value: 111},
                    {type: 'UDP流量', time: '2017-1-5', value: 133},
                    {type: 'UDP流量', time: '2017-1-6', value: 221},
                    {type: 'UDP流量', time: '2017-1-7', value: 767},
                    {type: 'UDP流量', time: '2017-1-8', value: 3634},

                    {type: 'ICMP Flood攻击', time: '2017-1-1', value: 163},
                    {type: 'ICMP Flood攻击', time: '2017-1-2', value: 163},
                    {type: 'ICMP Flood攻击', time: '2017-1-3', value: 203},
                    {type: 'ICMP Flood攻击', time: '2017-1-4', value: 276},
                    {type: 'ICMP Flood攻击', time: '2017-1-5', value: 408},
                    {type: 'ICMP Flood攻击', time: '2017-1-6', value: 547},
                    {type: 'ICMP Flood攻击', time: '2017-1-7', value: 729},
                    {type: 'ICMP Flood攻击', time: '2017-1-8', value: 3634},

                    {type: 'ICMP流量', time: '2017-1-1', value: 300},
                    {type: 'ICMP流量', time: '2017-1-2', value: 106},
                    {type: 'ICMP流量', time: '2017-1-3', value: 107},
                    {type: 'ICMP流量', time: '2017-1-4', value: 111},
                    {type: 'ICMP流量', time: '2017-1-5', value: 133},
                    {type: 'ICMP流量', time: '2017-1-6', value: 221},
                    {type: 'ICMP流量', time: '2017-1-7', value: 767},
                    {type: 'ICMP流量', time: '2017-1-8', value: 3634},

                    {type: '黑名单拦截', time: '2017-1-1', value: 300},
                    {type: '黑名单拦截', time: '2017-1-2', value: 106},
                    {type: '黑名单拦截', time: '2017-1-3', value: 107},
                    {type: '黑名单拦截', time: '2017-1-4', value: 111},
                    {type: '黑名单拦截', time: '2017-1-5', value: 133},
                    {type: '黑名单拦截', time: '2017-1-6', value: 221},
                    {type: '黑名单拦截', time: '2017-1-7', value: 767},
                    {type: '黑名单拦截', time: '2017-1-8', value: 3634},

                    {type: '其他', time: '2017-1-1', value: 300},
                    {type: '其他', time: '2017-1-2', value: 106},
                    {type: '其他', time: '2017-1-3', value: 107},
                    {type: '其他', time: '2017-1-4', value: 111},
                    {type: '其他', time: '2017-1-5', value: 133},
                    {type: '其他', time: '2017-1-6', value: 221},
                    {type: '其他', time: '2017-1-7', value: 767},
                    {type: '其他', time: '2017-1-8', value: 3634},
                ];
                var Stat = G2.Stat;
                var chart = new G2.Chart({
                    id: 'holdup',
                    forceFit: true,
                    height: 450,
                    plotCfg: {
                        margin:[40, 140,40, 60],
                    },
                });
                chart.axis('value', {
                    title: null // 不展示坐标轴的标题
                })
                chart.legend('type', {
                    title: null // 不展示图例 title
                });
                chart.source(data, {
                  time: {   
                      type:"time",     
                      mask: 'yyyy-mm-dd'
                    }
                });
                chart.areaStack().position('time*value').color('type');
                chart.render();
          },
          jumpTo(page) {
			    this.$router.push(page)
		  }
    },
	watch: {
		$route:function() {
			this.loadData()
		}
	}
}
</script>
<style scoped lang="scss">
.table {
	border:1px solid #D4D4D5;
	border-top: .2em solid #ef2f32;
}
.table tr th, .table tr td {
	border-left: 1px solid rgba(34,36,38,.1); 
}  
  .pic_wrap{      
      display: flex;
      justify-content: center;
      background: #ffffff;
  }
  .pic_wrap_body{ 
     width: 100%;
     padding: 40px;
  }
  .pic_wrap_body >li{
       margin-top: 20px;
  }
  h4{
      font-size: 20px;
      height: 36px;
      line-height: 36px;
  }
  .pic_head{
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
  }

  table{
      width: 100%;
      text-align: center;
  }
.web_data{
   
    table{
         border: 1px solid #dddddd; 
    }
    tr{
        border-bottom: none;       
    }
    td{
        font-size: 14px;
        border-left: 1px dashed #dddddd; 
    }
    .data td{
        color: #3e6ff8;
        font-size:28px;
    }

}
.condition{
    table{
         border: 1px solid #dddddd; 
    }
    tr{
        border-bottom: none;       
    }
    td{
        font-size: 12px;
        border-left: 1px dashed #dddddd; 
    }
    .data td{
        color: #3e6ff8;
        font-size:16px;
    }
}

#web_visit,#holdup{
    margin-top: 20px;
}
</style>