const routes = [
	{
		path: '/', 
		component: resolve => require(['components/Context/HomePage/'],resolve)
	},
	{
		path: '/home', 
		component: resolve => require(['components/Context/HomePage/'],resolve)
	}, 
	{
		path: '/user', 
		component: resolve => require(['components/Context/UserPage/'], resolve)
	},
	{
		path: '/site', 
		component: resolve => require(['components/Context/SitePage/'], resolve),
		children: [
			{
				path: 'detail/:id',
				component: resolve => require(['components/Context/SitePage/detail'],resolve)
			}
		]
	},
	{
		path: '/dns', 
		component: resolve => require(['components/Context/DNSPage/'], resolve),
		children: [
			{
				path: 'detail/:id',
				component: resolve => require(['components/Context/DNSPage/detail'],resolve)
			}			
		]
	},
	
	{
		path: '/node', 
		component: resolve => require(['components/Context/Node/'], resolve)
	},
	{
		path: '/clean', 
		component: resolve => require(['components/Context/CleanPage/'], resolve)
	},
	{
		path: '/report', 
		component: resolve => require(['components/Context/ReportPage/'], resolve)
	},
	{
		path: '/profile', 
		component: resolve => require(['components/Context/Profile/'], resolve)
	}
]

export default routes