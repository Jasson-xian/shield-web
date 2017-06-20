<template>
    <div class="wrap table-responsive">
        <h3>{{ '安全组:'+tableData.group_id}}</h3>
        <div>
            <el-tabs v-model="activeName" type="card">
                <el-tab-pane label="描述" name="description">
                    <table class="table">
                        <tr>
                            <td>组名</td>
                            <td>组ID</td>
                            <td>组描述</td>
                        </tr>
                        <tr>
                            <td>{{tableData.group_name}}</td>
                            <td>{{tableData.group_id}}</td>
                            <td>{{tableData.description}}</td>
                        </tr>
                    </table>
                </el-tab-pane>
                <el-tab-pane label="入站" name="inbound">
                    <el-button class="btn" type="success" size="mini">编辑规则</el-button>
                    <vuetable :fields="fields" :tableData="inData"></vuetable>
                </el-tab-pane>
                <el-tab-pane label="出站" name="outbound">
                    <el-button class="btn" type="success" size="mini">编辑规则</el-button>
                    <vuetable :fields="fields" :tableData="outData"></vuetable>
                </el-tab-pane>
            </el-tabs>
        </div>

    </div>
</template>
<script>
import Vuetable from 'components/Common/Vuetable'
import nodeService from 'services/nodeService'
let tableColumns = [
    {
        name: 'type',
        title: '类型'
    },
    {
        name: 'deal',
        title: '协议'
    },
    {
        name: 'port',
        title: '端口范围'
    },
    {
        name: 'ip',
        title: '来源'
    }
]
export default {

    created() {
        this.loadData()
    },
     components: {
        Vuetable
    },
    data: function () {
        return {
            activeName: 'inbound',
            fields:tableColumns,
            tableData:[],
            inData:[],
            outData:[]
        }
    },
    methods: {
        loadData() {
            nodeService.congInfo(this.$route.params.id)
                .then((recvdata) => {
                    if (recvdata.success) {
                          this.tableData = recvdata.data
                          this.inData = recvdata.data.enter_rules
                          this.outData = recvdata.data.out_rules
                     }
                })
        },
        // setCong() {
        //     nodeService.setCong(this.$route.params.id, this.group)
        //         .then((recvdata) => {
        //             if (recvdata.success) {
        //                 this.$notify.success({
        //                     title: '成功',
        //                     message: '修改成功',
        //                     offset: 100,
        //                     duration: 1000
        //                 });
        //             } else {
        //                 this.$notify.success({
        //                     title: '警告',
        //                     message: recvdata.errorMessage,
        //                     type: 'warning',
        //                     offset: 100,
        //                     duration: 1000
        //                 });
        //             }
        //         })
        // }
    },
    // watch: {
    //     $route: function () {
    //         this.loadData()
    //     }
    // }
}
</script>
</script>
<style scoped lang="scss">
.wrap{
    background: #ffffff;
    margin-top: 40px;
    border-top: .2em solid #ef2f32;
    padding:20px 40px;
}
.table {
    border:1px solid #D4D4D5;
    text-align: center;
    margin-top: 10px;
}
.table tr th, .table tr td {
    border-left: 1px solid rgba(34,36,38,.1); 
    border-bottom: 1px dashed  rgba(34,36,38,.1); 
    padding:10px 0;
}
h3{
    font-size: 16px;
    margin-bottom:10px;
}
.btn{
    margin-bottom: 10px;
}
</style>