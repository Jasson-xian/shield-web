import xhr from './xhr/'

/**
 * 对应后端涉及到用户认证的 API
 */
class LogsService {

  getflux(filter){
    return xhr({
			url: '/fluxsinfo',
			method: 'POST',
			body: filter,
			other: { contentType: 'application/json; charset=utf-8' }
		})
  }
	getdns(filter){
		return xhr({
			url: '/dnsloginfo',
			method: 'POST',
			body: filter,
			other: { contentType: 'application/json; charset=utf-8' }
		})
	}
}

// 实例化后再导出
export default new LogsService()