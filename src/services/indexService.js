import xhr from './xhr/'

/**
 * 对应后端涉及到用户认证的 API
 */
class IndexService {

  getInfo () {
    return xhr({ url: 'admin/get_info'})
  }
  adjustrate(rates){
    return xhr({
			url: '/adjustrate',
			method: 'POST',
			body: rates,
			other: { contentType: 'application/json; charset=utf-8' }
		})
  }
}

// 实例化后再导出
export default new IndexService()