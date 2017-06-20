<template>
    <div class="wrap table-responsive">              
        <h3>{{ '控制面板:'+InfoData_ip}}</h3>
        <div>

            <table class="table">
                <tr>
                    <td>更改安全组</td>
                    <td>
                       <el-select v-model="group" placeholder="请选择">
                            <el-option
                             v-for="item in groupData"
                            :label="item.group_name"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </td>
                    <td><button class="btn btn-sm btn-success" @click="setGroup">确定</button> </td>
                </tr>            
            </table>     
        </div>
              
    </div>
</template>
<script>
import nodeService from 'services/nodeService'
export default {
    created() {
        this.loadData()
    },
    data: function () {
        return {
            InfoData_ip:'',
            group:'',
            groupData:''
        }
    },
    methods: {
        loadData () {
            nodeService.nodeInfo(this.$route.params.id)
            .then((recvdata) => {
                if(recvdata.success) {
                   this.InfoData_ip = recvdata.data.ip
                   this.group = recvdata.data.group_id
                }
            })
            nodeService.getSafegroup()
            .then((recvdata) => {
                if(recvdata.success) {         
                    this.groupData = recvdata.data
                }
            })
        },
        setGroup(){
             nodeService.setGroup(this.$route.params.id,this.group)
            .then((recvdata) => {
                if(recvdata.success) {
                   this.$notify.success({
                        title: '成功',
                        message: '修改成功',
                        offset: 100,
                        duration: 1000
                    });
                }else{
                    this.$notify.success({
                        title: '警告',
                        message:  recvdata.errorMessage,
                        type: 'warning',
                        offset: 100,
                        duration: 1000
                    });
                }
            })
        }
    },
	// watch: {
	// 	$route:function() {
	// 		this.loadData()
	// 	}
	// }
}
</script>
</script>
<style scoped lang="scss">
   .wrap{
       background: #ffffff;
       margin-top: 40px;
       border-top: .2em solid #ef2f32;
       padding: 10px;
   }
   .table {
	    border:1px solid #D4D4D5;
        text-align: center;
        margin-top: 20px;
    }
    .table tr th, .table tr td {
        border-left: 1px dashed rgba(34,36,38,.1); 
        padding:5px 0;
    }
   h3{
       font-size: 16px;
   }
</style>