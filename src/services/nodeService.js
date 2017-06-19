import xhr from './xhr/'

/**
 * 对应后端涉及到用户认证的 API
 */
class NodeService {

  searchList (filter) {
    return xhr({ 
    		url: '/nodelist',
    		method: 'POST',
    		body: filter,
    		other: {contentType: 'application/json; charset=utf-8'}
    	})
  }
	getList(filter){
		 return xhr({ 
    		url: 'admin/domain_list',
				method: 'POST',
				body: {
					page:filter.page,
					filter:filter.filter
				}
    	})
	}
	detail (nodeid) {
		return xhr({url:'/nodeinfo?nodeid=' + nodeid})
	}

}

// 实例化后再导出
export default new NodeService()