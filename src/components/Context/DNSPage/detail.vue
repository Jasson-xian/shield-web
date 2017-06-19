<template>
<div class="table-responsive">
    <table class="table">
        <thead>
            <tr>
                <th colspan="2" style="text-align: center">{{ 'Detail for '+ip}}</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>IP</td>
                <td>{{ip}}</td>
            </tr>
            <tr>
                <td>Uptime</td>
                <td>{{days+' d '+hours+' h '+mins+' m '+secs+' s '}}</td>
            </tr>
            <tr>
                <td>Network capacity</td>
                <td>{{capacity}}</td>
            </tr>
            <tr>
                <td>Node type</td>
                <td>{{type}}</td>
            </tr>
            <tr>
                <td>Proxy site list</td>
                <td>
                    <span v-for="item in site_list">{{item.u_domain+' '}}</span>
                </td>
            </tr>
            <tr>
                <td>Proxy flux</td>
                <td>{{flux}}</td>
            </tr>
        </tbody>
    </table>
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
            ip: '',
            days: '',
            hours: '',
            mins: '',
            secs: '',
            capacity: '',
            type: '',
            site_list: [],
            flux: ''
        }
    },
    methods: {
        loadData () {
            nodeService.detail(this.$route.params.id)
            .then((recvdata) => {
                if(recvdata.status === 'success') {
                    this.ip = recvdata.data.node_ip
                    this.days = recvdata.data.node_time.days
                    this.hours = recvdata.data.node_time.hours
                    this.mins = recvdata.data.node_time.mins
                    this.secs = recvdata.data.node_time.secs
                    this.capacity = recvdata.data.node_capacity
                    this.type = recvdata.data.node_type == 1 ? 'dynamic' : 'static'
                    this.site_list = recvdata.data.site_list
                    this.flux = recvdata.data.node_traffic
                }
            })
        }
    },
	watch: {
		$route:function() {
			this.loadData()
		}
	}
}
</script>
<style scoped>
.table {
	border:1px solid #D4D4D5;
	border-top: .2em solid #ef2f32;
}
.table tr th, .table tr td {
	border-left: 1px solid rgba(34,36,38,.1); 
}
</style>