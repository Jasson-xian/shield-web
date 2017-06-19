import xhr from './xhr/'

/**
 * 对应后端涉及到用户认证的 API
 */
class UserService {

  searchList (filter) {
    return xhr({ 
    		url: 'admin/user_list',
			method: 'POST',
			body: {
				page:filter.page,
				filter:filter.filter
			}
    	})
  }

	add (userdata) {
		return xhr({
			url: '/useradd',
			method: 'POST',
			body: userdata,
			other: {contentType: 'application/json; charset=utf-8'}
		})
	}

	del (names) {
		return xhr({
			url: '/userdelete',
			method: 'POST',
			body: names,
			other: {contentType:'application/json; charset=utf-8'}
		})
	}
}

// 实例化后再导出
export default new UserService()