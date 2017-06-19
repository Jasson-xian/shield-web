<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <h4 class="page-head-line">Profile</h4>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 col-sm-8 col-xs-10">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">Modify the password</h3>
          </div>
          <div class="panel-body">
            Your account :
            <div class="acc-text">{{email}}</div>
          </div>
          <div>
            <table class="table table-hover">
              <tbody>
                <tr>
                  <td class="colpswd" style="vertical-align: middle">
                    <b>New Password</b>
                  </td>
                  <td>
                    <input id="newpaswd" type="password" class="form-control" v-model="npswd" placeholder="Enter your new password here.">
                  </td>
                </tr>
                <tr>
                  <td class="colpswd" style="vertical-align: middle">
                    <b>Confirm Password</b>
                  </td>
                  <td>
                    <input id="confpaswd" type="password" class="form-control" v-model="rpswd" placeholder="Confirming your password.">
                  </td>
                </tr>
                <tr>
                  <td colspan="2">
                    <div class="errormsg"></div>
                    <div class="submitbtn">
                      <button type="button" v-on:click="submitRate" class="btn btn-sm btn-success enterbtn">Enter</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script scope>
  import profileService from 'services/profileService'
  export default {
    created() {
      console.info('Profile page loaded!')
      this.loadData();
    },
    mounted() {
      $("#newpaswd").focus(function(){
         $(".errormsg").text("");
      });
      $("#confpaswd").focus(function(){
         $(".errormsg").text("");
      });
      $(function () { 
          if($(window).height() > $(document.body).height()){
            $(".footer").addClass("footer-fix");
          }else{
            $(".footer").removeClass("footer-fix")
          }
      })
    },
    data: () => {
      return {
        email: "",
        npswd: "",
        rpswd: ""
      }
    },
    methods: {
      loadData () {
			  profileService.getemail()
		  	.then((recvdata) => {
				  if(recvdata.status == 'success') {
				  	this.email = recvdata.data
				  }else{
            alert("Load message error,please relogin !");
          }
			  })
		  },
      submitRate() {
        var fleg = true;
        var reg = /^[0-9a-zA-Z]{6,16}$/g;
        var npaswd = $("#newpaswd").val();
        var rpaswd = $("#confpaswd").val();
        if (npaswd == "" || rpaswd == "") {
          fleg = false;
          $(".errormsg").text("Not null !");
        } else if (!reg.test(npaswd)) {
          fleg = false;
          $(".errormsg").text("The format is wrong !");
        } else if ((npaswd == rpaswd) && fleg) {
          this.npswd = npaswd;
          var pwdfield = JSON.stringify({ newpswd: this.npswd });
          profileService.confirmpwd(pwdfield)
            .then((recvdata) => {
              if (recvdata.status == 'success') {
                $(".errormsg").text("Success !");
              } else {
                if (recvdata.errorCode == "1001") {
                  $(".errormsg").text("The same as the original password !");
                }
                if (recvdata.errorCode == "6001") {
                  $(".errormsg").text("N0 power !");
                }
              }
            })
        }else{
          $(".errormsg").text("The twice importations of passwords are inconsistent !");
        }
      },
    }
  }
</script>
<style>
.page-head-line {
    font-weight: 900;
    padding-bottom: 20px;
    border-bottom: 2px solid #ef2f32;
    text-transform: uppercase;
    color: #ef2f32;
    font-size: 20px;
    margin-bottom: 40px;
}
.table {
	border-top: .2em solid #ef2f32;
	margin: 0 -1px;
}
.table tr td {
	border-left: 1px solid rgba(34,36,38,.1); 
}
.col-md-6{
  float: none;
  margin-right: auto;
  margin-left: auto;
}
.acc-text{
  text-align: center;
  margin: 0 auto;
  font-family: "Arial";
  font-size: 18px;
  color: #ef2f32;
}
.colpswd{
  text-align: right;
}
.submitbtn{
  text-align: center;
  margin: 0 auto;
}
.errormsg{
  color: red;
  margin-left: 20%;
}

</style>