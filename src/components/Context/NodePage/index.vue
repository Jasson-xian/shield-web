<template>
<div>
  <div class="row">
    <div class="col-md-12">
        <h4 class="page-head-line">高防节点管理</h4>
    </div>
  </div>
  <el-tabs v-model="activeTab" @tab-click="pullRoute">
      <!--节点列表-->     
      <el-tab-pane label="节点列表" name="list">
          <div class="row search-row">
              <div class="table-responsive">
                <vuetable :fields="fields_list" :tableData="tableData"></vuetable>
              </div>
              <div class="pagination-meun">
                <vuetable-pagination :pages="pages" :page="page" @change-page="onChangePage"></vuetable-pagination>
              </div>
          </div>
          <router-view></router-view>        
      </el-tab-pane>
      <!--安全策略配置-->
      <el-tab-pane label="安全策略配置" name="config">
          <div class="btns">
              <el-button type="success" size="mini">创建安全组</el-button>
              <el-button type="warning" size="mini">删除安全组</el-button>
          </div>       
          <div class="row search-row">
              <div class="table-responsive">
                <vuetable :fields="fields_cong" :tableData="groupData"></vuetable>
              </div>
              <div class="pagination-meun">
                <vuetable-pagination :pages="pages" :page="page" @change-page="onChangePage"></vuetable-pagination>
              </div>
          </div>
          <router-view></router-view>    
      </el-tab-pane>
      <!--报表信息-->
       <el-tab-pane label="报表信息" name="report">
          <div class="row search-row">
              报表信息
          </div>
      </el-tab-pane>
  </el-tabs>
</div>
</template>
<script>
import Vuetable from 'components/Common/Vuetable'
import VuetablePagination from 'components/Common/VuetablePagination'
import nodeService from 'services/nodeService'
let tableColumns_list = [
	{
		name:'ip',
		title:'IP地址'
	},
  {
    name:'disk',
    title:'硬盘'
  },
  {
    name:'memory',
    title:'内存'
  },
	{
		name:'bandwidth',
		title:'带宽'
	},
   {
		name:'group',
		title:'安全组'
	},
  {
    name:'__opration:id:detail_list:控制面板',
    title:'操作'
  }
]
let tableColumns_cong = [
  {
		name:'__checkbox:group_id',
		title:''
	},
	{
		name:'group_id',
		title:'组ID'
	},
  {
    name:'group_name',
    title:'组名'
  },
  {
    name:'description',
    title:'描述'
  },
  {
    name:'__opration:id:detail_cong:编辑',
    title:'操作'
  }
]
export default {
  data: function() {
    return {
      fields_list: tableColumns_list,
      fields_cong:tableColumns_cong,
      activeTab:'list',
      tableData: [],
      groupData:[],
      pages: 0,
      page: 1,
      searchFor: ''
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
    loadData () {
      nodeService.getList(this.page)
      .then((recvdata) => {
        if(recvdata.success) {       
          this.tableData = recvdata.data.list
          this.pages = recvdata.data.pages
        }
      })
      nodeService.getSafegroup()
        .then((recvdata) => {
          if(recvdata.success) {     
            this.groupData = recvdata.data
          }
        })
    },
		setFilter () {
			this.page = 1
			this.loadData()
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
    pullRoute(){
      this.$router.push("/node")
    }
  },
 
  // computed: {
  //   filter: function () {
	// 		if(this.searchFor) {
	// 			return {page:this.page,filter:this.searchFor}
	// 		}else {
	// 			return {page:this.page}
	// 		}      
  //   }
  // }
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
.search-row {
	text-align: -webkit-center;
	text-align: -moz-center;
	padding-left: 15px;
	padding-right: 15px;
	margin-bottom: 20px;
}
.btns{
  margin:10px 0;
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
</style>