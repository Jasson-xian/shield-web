<template>
<div>
  <div class="row">
    <div class="col-md-12">
        <h4 class="page-head-line">用户管理</h4>
    </div>
  </div>
  <div class="row search-row">
  	<div class="input-group col-md-6">
  		<input type="text" v-model="searchFor" @keyup.enter="setFilter" class="form-control">
  		<span class="input-group-addon btn" @click="setFilter">搜 索</span>
  	</div>
  </div>
  <div class="row search-row">
  	<div class="table-responsive">
  		<vuetable :fields="fields" :tableData="tableData"></vuetable>
  	</div>
  	<!--<div class="pagination-meun">
  		<div class="menu-items">
  			<button class="btn btn-sm btn-success" @click="showAddModal">
  				<i class="fa fa-plus"></i>
  				Add
  			</button>
  			<button class="btn btn-sm btn-warning" :class="[usersToDel.length === 0 ? 'disabled' : '']" @click="showDelWarning">
  				<i class="fa fa-minus"></i>
  				Del
  			</button>
  		</div>
  	</div>-->
	  <vuetable-pagination :pages="pages" :page="page" @change-page="onChangePage"></vuetable-pagination>
  </div>
  <!--<div class="modal fade" id="addModal" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  	<div class="modal-dialog">
  		<div class="modal-content">
  			<div class="modal-header">
  				<h4 class="modal-title" id="myModalLabel">Add new user</h4>
  			</div>
  			<div class="modal-body">
				<form class="form-horizontal" role="form">
				  <div class="form-group">
				    <label for="firstname" class="col-sm-2 control-label">Username</label>
				    <div class="col-sm-6">
				      <input v-model="username" type="text" class="form-control" id="username" @blur="blurCheck('username')">
				    </div>
						<label v-if="checkParams.username" class="warn-tip">* username is invalid!</label>
				  </div>
				  <div class="form-group">
				    <label for="firstname" class="col-sm-2 control-label">Email</label>
				    <div class="col-sm-6">
				      <input v-model="email" type="text" class="form-control" id="email" @blur="blurCheck('email')">
				    </div>
						<label v-if="checkParams.email" class="warn-tip">* email is invalid!</label>
				  </div>				  
				  <div class="form-group">
				    <label for="firstname" class="col-sm-2 control-label">Password</label>
				    <div class="col-sm-6">
				      <input v-model="password" type="password" class="form-control" id="password" @blur="blurCheck('password')">
				    </div>
						<label v-if="checkParams.password" class="warn-tip">* password is invalid!</label>
				  </div>
				  <div class="form-group">
				    <label for="fir stname" class="col-sm-2 control-label">Confirm</label>
				    <div class="col-sm-6">
				      <input v-model="passcheck" type="password" class="form-control" id="confirm_password" @blur="blurCheck('passcheck')">
				    </div>
						<label v-if="checkParams.passcheck" class="warn-tip">* password not match!</label>
				  </div>				  
				</form> 			
  			</div>
  			<div class="modal-footer">
  				<button type="button" class="btn btn-primary" @click="addNewUser">Add</button>
  				<button type="button" class="btn btn-default" @click="hideAddModal">cancel</button>
  			</div>
  		</div>
  	</div>
  </div>
  <div class="modal fade" id="warnModal" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  	<div class="modal-dialog modal-sm">
  		<div class="modal-content">
  			<div class="modal-body">
				  <div style="text-align: center">
				    <label for="firstname">sure to delete ?</label>
				  </div>
					<div style="text-align: center">
				      <button class="btn btn-success btn-xs" style="margin:10px" @click="delUser">delete</button>
				      <button class="btn btn-xs" style="margin:10px" @click="hideDelWarning">cancel</button>
					</div>				  			   			
  			</div>
  		</div>
  	</div>
  </div> -->
 </div>
</template>
<script>
import Vuetable from 'components/Common/Vuetable'
import VuetablePagination from 'components/Common/VuetablePagination'
import userService from 'services/userService'
let tableColumns = [
	// {
	// 	name:'__checkbox:u_id',
	// 	title:''
	// },
	{
		name:'u_email',
		title:'邮箱'
	},
	{
		name:'u_qq',
		title:'QQ'
	},
	{
		name:'u_phone',
		title:'电话'
	},
	{
		name:'registered_time',
		title:'创建时间'
	},
	{
		name:'last_login_time',
		title:'上次登录时间'
	},
	{
		name:'last_login_ip',
		title:'上次登录ip'
	}
]
export default {
	data: function() {
		return {
			fields: tableColumns,
			tableData: [],
			page: 1,
			searchFor: '',
			pages:0,
			username: '',
			email: '',
			password: '',
			passcheck: '',
			checkParams: {
				username: false,
				email: false,
				password: false,
				passcheck: false
			},
			usersToDel: []
		}
	},
	components: {
		Vuetable,
		VuetablePagination
	},
	created () {
		this.loadData()
	},
	mounted: function() {
		$(function () { 
			if($(window).height() > $(document.body).height()){
				$(".footer").addClass("footer-fix");
			}else{
				$(".footer").removeClass("footer-fix")
			}
		})
	},
	methods: {
		showAddModal () {
			$("#addModal").modal({
				backdrop: 'static'
			})
		},
		showDelWarning () {
			if(this.usersToDel.length != 0) {
				$("#warnModal").modal({
					backdrop: 'static'
				})
			}
		},
		hideAddModal () {
			$("#addModal").modal('hide')
			this.setValueDefault()
		},
		hideDelWarning () {
			$("#warnModal").modal('hide')
		},
		loadData () {
			userService.searchList(this.filter)
			.then((recvdata) => {
				if(recvdata.success) {
					// for(let i=0;i<recvdata.data.length;i++){
					// 	this.tableData[i]=recvdata.data[i]
					// }
					this.tableData=recvdata.data.list;
					this.pages = recvdata.data.pages
				}
			})
		},
		onChangePage(page) {
			if(page === 'next'&& this.page < this.pages) {
				this.page = this.page + 1
				this.loadData()
			}else if ( page === 'prev' && this.page >1) {
				this.page = this.page - 1
				this.loadData()
			}else if(page != this.page && (page > 0 && page <= this.pages)) {
				this.page = page
				this.loadData()
			}
		},
		// onChangeSelected(selectedItems) {
		// 	this.usersToDel = selectedItems
		// },
		// addNewUser () {
		// 	userService.add(this.userdata)
		// 	.then((recvdata) => {
		// 		if(recvdata.status === 'success') {
		// 			this.hideAddModal()
		// 			this.loadData()
		// 		}else{
		// 			switch (recvdata.msg) {
		// 				case '用户名重复':
		// 					this.checkParams.username = true
		// 					break
		// 				case '该邮箱已被注册':
		// 					this.checkParams.email = true
		// 					break
		// 			}
		// 		}
		// 	})
		// },
		// delUser () {
		// 	let users = JSON.stringify(this.usersToDel)
		// 	userService.del(users)
		// 	.then((recvdata) => {
		// 		if(recvdata.status === 'success') {
		// 			this.hideDelWarning()
		// 			this.loadData()
		// 		}else {
					
		// 		}
		// 	})
		// },
		// blurCheck (param) {
		// 	let reg = ''
		// 	switch (param) {
		// 		case 'username':
		// 			reg = /^[0-9a-zA-Z_]{4,16}$/g
		// 			this.checkParams.username = !reg.test(this.username)
		// 			break
		// 		case 'email':
		// 			reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
		// 			this.checkParams.email = !reg.test(this.email)
		// 			break
		// 		case 'password':
		// 			reg = /^[0-9a-zA-Z]{6,16}$/g
		// 			this.checkParams.password = !reg.test(this.password)
		// 			break
		// 		case 'passcheck':
		// 			this.checkParams.passcheck = this.password === this.passcheck ? false : true
		// 			break
		// 	}
		// },
		setFilter () {
			this.page = 1
			this.loadData()
		},
		// setValueDefault () {
		// 	this.username = ''
		// 	this.email = ''
		// 	this.password = ''
		// 	this.passcheck = ''
		// 	this.checkParams.username = false
		// 	this.checkParams.email = false
		// 	this.checkParams.password = false
		// 	this.checkParams.passcheck = false
		// }
	},
	computed: {
		filter: function () {
			if(this.searchFor) {
				return {page:this.page,filter:this.searchFor}
			}else {
				return {page:this.page}
			}
		},
		userdata: function () {
			return JSON.stringify({username:this.username,email:this.email,password:this.password})
		}
	}
}
</script>
<style scope>
.page-head-line {
    font-weight: 900;
    padding-bottom: 20px;
    border-bottom: 2px solid #ef2f32;
    text-transform: uppercase;
    color: #ef2f32;
    font-size: 20px;
    margin-bottom: 40px;
}
.search-row {
	text-align: -webkit-center;
	text-align: -moz-center;
	padding-left: 15px;
	padding-right: 15px;
	margin-bottom: 20px;
}
.btn {
    border-radius: 0px;
    -webkit-border-radius: 0px;
    -moz-border-radius: 0px;
}
.pagination-meun {
	border: 1px solid #D4D4D5;
	border-radius: 0 0 .28571429rem .28571429rem;
	border-top:none;
}
.pagination-meun:after {
	content:".";
	display:block;
	height:0;
	clear:both;
	visibility:hidden;
}
.menu-items {
	float: left;
	margin: 2px;
}
.table-responsive {
	margin-bottom: 0;
}
.warn-tip {
	color:#ef2f32;
}
</style>