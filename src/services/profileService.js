import xhr from './xhr/'

/**
 * 对应后端涉及到用户认证的 API
 */
class ProfileService {
	getemail() {
		return xhr({
			url: '/admininfo'
		})
	}
	confirmpwd(newpswd) {
		return xhr({
			url: '/chgpswd',
			method: 'POST',
			body: newpswd,
			other: { contentType: 'application/json; charset=utf-8' }
		})
	}
}

// 实例化后再导出
export default new ProfileService()