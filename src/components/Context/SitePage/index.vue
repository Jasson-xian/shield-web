<template>
<div>
  <div class="row">
    <div class="col-md-12">
        <h4 class="page-head-line">域名管理</h4>
    </div>
  </div>
  <div class="row search-row">
   	<div class="input-group col-md-6">
  		<input type="text" v-model="searchFor" @keyup.enter="setFilter" class="form-control">
  		<span class="input-group-addon btn" @click="setFilter">Search</span>
  	</div> 
  </div>
  <div class="row search-row">
    <div class="table-responsive">
      <vuetable :fields="fields" :tableData="tableData"></vuetable>
    </div>
  	<div class="pagination-meun">
  		<vuetable-pagination :pages="pages" :page="page" @change-page="onChangePage"></vuetable-pagination>
  	</div>
  </div>
  <router-view></router-view>
</div>
</template>
<script>
import Vuetable from 'components/Common/Vuetable'
import VuetablePagination from 'components/Common/VuetablePagination'
import siteService from 'services/siteService'
let tableColumns = [
	{
		name:'u_domain',
		title:'域名'
	},
  {
    name:'port',
    title:'端口'
  },
  {
    name:'rip',
    title:'指向'
  },
	{
		name:'v_domain',
		title:'CNAME别名'
	},
  {
		name:'status',
		title:'状态'
	},
  {
		name:'user',
		title:'关联用户'
	},
  {
		name:'registered_time',
		title:'创建时间'
	},
  {
    name:'__opration:id:detail:查看报表',
    title:'操作'
  }
]
export default {
  data: function() {
    return {
      fields: tableColumns,
      tableData: [],
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
      siteService.getList(this.filter)
      .then((recvdata) => {
        if(recvdata.success) {
          // this.tableData = recvdata.data.list
          this.tableData = recvdata.data.list.map(function(item){
            switch (item.status) {
              case 0:
                item.status='待审核'
                break;
             case 1:
                item.status='待接入'
                break;
            case 2:
                item.status='正常'
                break;
              default:
                break;
            }
            return item
          })
          this.pages = recvdata.data.pages
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
		}
  },
  computed: {
    filter: function () {
			if(this.searchFor) {
				return {page:this.page,filter:this.searchFor}
			}else {
				return {page:this.page}
			}      
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
.search-row {
	text-align: -webkit-center;
	text-align: -moz-center;
	padding-left: 15px;
	padding-right: 15px;
	margin-bottom: 20px;
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