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
		path: '/node', 
		component: resolve => require(['components/Context/NodePage/'], resolve),
		children: [
			{
				path: 'detail/:id',
				component: resolve => require(['components/Context/NodePage/detail'],resolve)
			}			
		]
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
		path: '/logs', 
		component: resolve => require(['components/Context/Logs/'], resolve)
	},
	{
		path: '/profile', 
		component: resolve => require(['components/Context/Profile/'], resolve)
	}
]

export default routes