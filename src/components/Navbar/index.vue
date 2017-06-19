<template>
  <section class="menu-section">
      <div class="container">
          <div class="row">
              <div class="col-md-12">
                  <div class="navbar-collapse collapse ">
                      <ul id="menu-top" class="nav navbar-nav navbar-left">
                          <li><a :class="{'menu-top-active': $route.path.split('/')[1] === 'home' || $route.path === '/'}" @click.prevent="jumpTo('/home')">主页</a></li>
                          <li><a :class="{'menu-top-active': $route.path.split('/')[1] === 'user'}" @click.prevent="jumpTo('/user')">用户管理</a></li>
                          <li><a :class="{'menu-top-active': $route.path.split('/')[1] === 'site'}" @click.prevent="jumpTo('/site')">域名管理</a></li>
                          <li><a :class="{'menu-top-active': $route.path.split('/')[1] === 'dns'}" @click.prevent="jumpTo('/dns')">DNS服务器管理</a></li>
                          <li><a :class="{'menu-top-active': $route.path.split('/')[1] === 'node'}" @click.prevent="jumpTo('/node')">高防节点管理</a></li>
                          <li><a :class="{'menu-top-active': $route.path.split('/')[1] === 'clean'}" @click.prevent="jumpTo('/clean')">清洗设备管理</a></li>
                          <li><a :class="{'menu-top-active': $route.path.split('/')[1] === 'report'}" @click.prevent="jumpTo('/report')">报表管理</a></li>
                          <li><a :class="{'menu-top-active': $route.path.split('/')[1] === 'profile'}" @click.prevent="jumpTo('/profile')" v-on:click="">个人信息</a></li>
                      </ul>
                  </div>
              </div>
              <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
              </button>
          </div>
      </div>
  </section>
</template>
<script>
export default {
  created () {
  },
  methods: {
    jumpTo: function (page) {
      this.$router.push(page)
    }
  }
}
</script>
<style>
#menu-top a {
  color: #fff;
}
#menu-top a:hover {
  background-color: #ae0918;
}
.menu-top-active {
  background-color: #C36464;
}
.navbar-brand img {
	margin-top:-5px;
	height: 30px;
}
.nav a {
  cursor: pointer;
}
.menu-section {
  background-color: #3D3D3D;
}
.navbar-toggle {
  background-color: #ae0918;
  border: 1px solid #fff;
}
.navbar-toggle .icon-bar {
  background-color: #fff;
}
</style>