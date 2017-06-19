<template> 
  <ul class="nav navbar-nav navbar-right">
    <li class="dropdown">
      <a
        class="dropdown-toggle"
        href="javascript:;"
        data-toggle="dropdown">
        欢迎您，admin
        <strong class="caret"></strong>
      </a>
      <ul class="dropdown-menu">
        <li @click="handleLogout">
          <a href="/logout">
            注销登录
          </a>
        </li>
      </ul>
    </li>
  </ul>
</template>
<script>
export default {
  methods: {
    handleLogout () {
      console.info('[LogoutDropdown:XHR] 注销登录，立即清空 $root.userData 的 session')
    }
  }
}
</script>
<style scope>
a {
  color:#fff;
}
.nav .open a{
  background-color: #c36464;
}
.nav .open a:hover, .nav a:hover{
  background-color: #ae0918;
  color: #fff;
}
.nav > li > a:focus, .nav > li > a:hover {
  background-color: #c36464;
  color: #fff;
}
.nav .open > a:focus, .nav .open > a:hover {
  background-color: #c36464;
  color: #fff;
}
.dropdown-menu > li > a {
  color: #fff;
}
</style>