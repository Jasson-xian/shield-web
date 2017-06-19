<template>
<div class="table-responsive">
    <table class="table">
        <thead>
            <tr>
                <th colspan="2" style="text-align: center">{{ 'Detail for '+site_domain}}</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Site domian</td>
                <td>{{site_domain}}</td>
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
                <td>Sys domain</td>
                <td>{{sys_domain}}</td>
            </tr>
            <tr>
                <td>Proxy ip</td>
                <td>{{pip}}</td>
            </tr>
            <tr>
                <td>Real ip</td>
                <td>{{rip}}</td>
            </tr>
            <tr>
                <td>Proxy status</td>
                <td>{{status}}</td>
            </tr>
            <tr>
                <td>Site flux</td>
                <td>{{flux}}</td>
            </tr>
        </tbody>
    </table>
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
            user: '',
            days: '',
            hours: '',
            mins: '',
            secs: '',
            capacity: '',
            sys_domain: '',
            pip: '',
            rip: '',
            status: '',
            flux: ''
        }
    },
    methods: {
        loadData () {
            console.log(this.$route)
            siteService.detail(this.$route.params.id)
            .then((recvdata) => {
                if(recvdata.status === 'success') {
                    this.site_domain = recvdata.data.sdomain
                    this.days = recvdata.data.stime.days
                    this.hours = recvdata.data.stime.hours
                    this.mins = recvdata.data.stime.mins
                    this.secs = recvdata.data.stime.secs
                    this.capacity = recvdata.data.scapacity
                    this.sys_domain = recvdata.data.sys_domain
                    this.pip = recvdata.data.spip
                    this.rip = recvdata.data.srip
                    this.status = recvdata.data.slevel == 1 ? "static proxy" : "dynamic proxy"
                    this.flux = recvdata.data.straffic
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