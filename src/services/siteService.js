import xhr from './xhr/'

/**
 * 对应后端涉及到用户认证的 API
 */
class SiteService {

  searchList (filter) {
    return xhr({ 
    		url: '/sitelist',
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
	detail (siteid) {
		return xhr({url:'/siteinfo?siteid=' + siteid})
	}

}

// 实例化后再导出
export default new SiteService()