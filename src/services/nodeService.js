import xhr from './xhr/'

/**
 * 对应后端涉及到用户认证的 API
 */
class NodeService {
	getList(page){
		 return xhr({ 
    		url: 'admin/node_list',
			method: 'POST',
			body: {
				page:page,
				oper:'get'
			}
    	})
	}

	getSafegroup(){
		 return xhr({ 
    		url: 'admin/get_safety_list',
			method: 'POST'
    	})
	}
    
	setGroup(id,group){
        return xhr({ 
    		url: 'admin/node_list',
			method: 'POST',
			body: {
				id:id,
				group:group,
				oper:'set'
			}
    	})
	}

	nodeInfo(nodeid) {
		return xhr({
			url:'admin/node_list',
			method: 'POST',
			body: {
				id:nodeid,
				oper:'get_nm'
			}
	    })
	}

	congInfo(groupid){
		return xhr({
			url:'admin/group_list',
			method: 'POST',
			body: {
				id:groupid,
				oper:'get_nm'
			}
	    })
	}
}

// 实例化后再导出
export default new NodeService()