<template>
  <div id="auth">
    <div class="logo">时光阁楼</div>
    <div class="auth-nav">
      <a v-if="!is_login" href="javascript:void(0)" @click="openLogin">登陆</a>
      <router-link v-if="is_login" :to="'/user/'+user.id">{{user.name}}</router-link>
      <a v-if="!is_login" href="javascript:void(0)" @click="openRegister">注册</a>
      <a v-if="is_login" href="javascript:void(0)" @click="logOut">注销</a>
      <div class="menu-btn" @click="menuStatus">
        <span :class="{ 'menu-toggle': true, 'is-open': show_menu }"></span>
      </div>
    </div>
    <div class="menu-nav" v-show="show_menu">
      <div class="menu">
        <a href="#">首页</a>
        <a href="#">分类</a>
        <a href="#">标签</a>
        <a href="#">足迹</a>
      </div>
      <div class="about">this is about</div>
      <div class="links">
        <a href="http://isujin.com" target="_blank">素錦</a>
        <a href="http://sometime.me" target="_blank">寒塘渡月</a>
        <a href="http://shisanyue.com" target="_blank">拾叁月</a>
        <a href="http://www.lyh2.com" target="_blank">青筑</a>
        <a href="http://mir.no/work" target="_blank">MIR.</a>
        <a href="http://modelo.io" target="_blank">MODELO</a>
        <a href="https://leonax.net" target="_blank">LEONA+</a>
        <a href="http://1416.me" target="_blank">1416教室</a>
        <a href="https://www.fieldevo.com/" target="_blank">Fieldevo</a>
      </div>
      <div class="copyright">{{copyRight}}</div>
    </div>
    <div class="auth-form" v-show="show_login">
      <div class="auth-wrap">
        <div class="auth-close" @click="closeAuth">&times;</div>
        <div class="auth-title">{{auth_title}}</div>
        <form class="user-info" @submit.prevent="auth">
          <input
            type="text"
            id="auth-name"
            :placeholder="user_name_holder[0]"
            class="auth-input"
            v-model="user_name"
            :style="{border:'1px solid ' + user_name_holder[1]}"
          >
          <input
            v-if="show_register"
            type="text"
            id="email-mobile"
            :placeholder="email_mobile_holder[0]"
            class="auth-input"
            v-model="email_mobile"
            :style="{border:'1px solid ' + email_mobile_holder[1]}"
          >
          <input
            type="password"
            id="auth-password"
            :placeholder="user_password_holder[0]"
            class="auth-input"
            v-model="user_password"
            :style="{border:'1px solid ' + user_password_holder[1]}"
          >
          <input
            v-if="show_register"
            type="password"
            id="password_confirmation"
            :placeholder="password_confirmation_holder[0]"
            class="auth-input"
            v-model="password_confirmation"
            :style="{border:'1px solid ' + password_confirmation_holder[1]}"
          >
          <input type="submit" class="auth-submit auth-input" value="提交">
        </form>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'auth',
    data: function () {
      return {
        show_menu: false,
        show_login: false,
        show_register: false,
        copyRight: '',

        //注册/登陆
        user:'',
        is_login: false,

        auth_title:'',
        user_name:'',
        email_mobile:'',
        user_password:'',
        password_confirmation:'',
        //验证,第一个值为验证错误，第二个值为高亮边框颜色
        user_name_holder:['用户', '#999'],
        email_mobile_holder:['邮箱/手机', '#999'],
        user_password_holder:['密码', '#999'],
        password_confirmation_holder:['密码确认', '#999'],
        errors:'',
      }
    },
    methods: {
      menuStatus: function () {
        // 关闭登陆/注册窗口
        this.closeAuth();
        // 菜单按钮
        this.show_menu = !this.show_menu;
      },
      cleanInput: function () {
        // 清空输入
        this.user_name='';
        this.email_mobile='';
        this.user_password='';
        this.password_confirmation='';
      },
      openLogin: function () {
        // 如果菜单开着，则关闭
        this.show_menu = false;
        // 打开登录窗
        this.cleanInput();
        this.cleanInputStyle();
        this.show_register = false;
        this.show_login = true;
        this.auth_title = '欢迎登陆';
      },
      openRegister: function () {
        // 如果菜单开着，则关闭
        this.show_menu = false;
        // 打开注册窗
        this.cleanInput();
        this.cleanInputStyle();
        this.show_login = true;
        this.show_register = true;
        this.auth_title = '欢迎注册';
      },
      cleanInputStyle: function () {
        // 恢复输入框默认样式
        this.$set(this.user_name_holder, 0, '用户');
        this.$set(this.user_name_holder, 1, '#999');
        this.$set(this.email_mobile_holder, 0, '邮箱/手机');
        this.$set(this.email_mobile_holder, 1, '#999');
        this.$set(this.user_password_holder, 0, '密码');
        this.$set(this.user_password_holder, 1, '#999');
        this.$set(this.password_confirmation_holder, 0, '密码确认');
        this.$set(this.password_confirmation_holder, 1, '#999');
      },
      showValidation: function () {
        this.cleanInputStyle();
        //显示第一条错误
        if(this.errors && this.errors.username) {
          this.user_name='';
          this.$set(this.user_name_holder, 0, this.errors.username[0]);
          this.$set(this.user_name_holder, 1, 'red');
        }
        if(this.errors && this.errors.email) {
          this.email_mobile='';
          this.$set(this.email_mobile_holder, 0, this.errors.email[0]);
          this.$set(this.email_mobile_holder, 1, 'red');
        }
        if(this.errors && this.errors.mobile) {
          this.email_mobile='';
          this.$set(this.email_mobile_holder, 0, this.errors.mobile[0]);
          this.$set(this.email_mobile_holder, 1, 'red');
        }
        if(this.errors && this.errors.password) {
          this.user_password='';
          this.$set(this.user_password_holder, 0, this.errors.password[0]);
          this.$set(this.user_password_holder, 1, 'red');
        }
        if(this.errors && this.errors.password_confirmation) {
          this.password_confirmation='';
          this.$set(this.password_confirmation_holder, 0, this.errors.password_confirmation[0]);
          this.$set(this.password_confirmation_holder, 1, 'red');
        }
      },
      closeAuth: function () {
        // 关闭登录/注册窗
        this.cleanInput();
        this.show_login = false;
      },
      auth: function () {
        // 认证操作
        const that = this;
        let addr;   //ajax地址
        let authInfo;   //ajax参数
        if (that.show_register) {   // 注册
          addr = '/register';
          if (that.email_mobile.indexOf('@')===-1){  // 电话注册
            authInfo = {
              username: that.user_name,
              mobile: that.email_mobile,
              password: that.user_password,
              password_confirmation: that.password_confirmation,
            };
          }else { //邮箱注册
            authInfo = {
              username: that.user_name,
              email: that.email_mobile,
              password: that.user_password,
              password_confirmation: that.password_confirmation,
            };
          }
        }else {  // 登录
          addr = '/login';
          authInfo = {
            username: that.user_name,
            password: that.user_password,
          };
        }
        // 请求数据
        that.axios({
          method: 'post',
          url: addr,  //'http://api/timeloft/register'
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('token'),
          },
          params: authInfo,
        }).then(function (res) {
            // console.log(res.data);
            // that.user=res.data;
            localStorage.setItem('token', res.data.access_token);
            localStorage.setItem('token_type', res.data.token_type);
            //加载用户信息
            that.loadUser();
            // 成功则重置holder，关闭窗口
            that.cleanInputStyle();
            that.closeAuth();

          }).catch(function (error) {
            that.errors = error.response.data.error;
            console.log(that.errors);
            // 验证错误显示
            that.showValidation();
          });
      },
      loadUser: function () {
        const that = this;
        that.axios({
          method: 'get',
          url: '/user',  //'http://api/timeloft/register'
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('token'),
          },
        }).then(function (res) {
          // console.log(res.data.data);
          that.user = res.data.data;
          that.is_login = true;

        }).catch(function (error) {
          console.log(that.errors);
        });
      },
      logOut: function () {
        // 注销
        const that = this;
        that.axios({
          method: 'post',
          url: '/logout',  //'http://api/timeloft/register'
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('token'),
          },
        }).then(function (res) {
          console.log(res.data);
          // localStorage.removeItem('token'); //删除某个
          localStorage.clear();
          that.user = '';
          that.is_login = false;
        }).catch(function (error) {
          console.log(that.errors);
        });
      },
    },
    created: function () {
      // 生成copyRight
      const currentDate = new Date();
      this.copyRight = '© 2012 - ' + currentDate.getFullYear() + ' Couh';
    },
    mounted: function () {
      // 初始化请求数据
      if (localStorage.getItem('token')) {
        //加载用户信息
        this.loadUser();
      }
    }
  }
</script>

<style scoped>
  #auth {
  }
  .logo {
    position: absolute;
    z-index: 1;
    left: 50px;
    top: 50px;
    font-size: 2em;
  }
  .auth-nav {
    position: absolute;
    right: 20px;
    top: 10px;
    display: inline-block;
    padding: 10px;
    background: rgba(247, 247, 247, 0.4);
    border-radius: 4px 4px 4px 4px;
    z-index: 1;
  }

  .auth-nav:hover {
    background: rgba(247, 247, 247, 0.7);
  }

  .auth-nav a {
    font-size: 14px;
    color: #555;
    padding: 0 10px;
    border-right: 1px solid #ddd;
    text-decoration: none;
    outline: 0;
    font-weight: 500;
  }

  .auth-nav a:hover {
    color: #0071ce;
  }

  .menu-btn {
    display: inline-block;
    padding: 0 10px;
  }

  .menu-toggle {
    display: inline-block;
    position: relative;
    bottom: 3px;
    width: 20px;
    height: 2px;
    background-color: #555;
    transition: background-color .2s linear;
  }

  .menu-toggle::before {
    position: absolute;
    left: 0;
    content: '';
    width: 20px;
    height: 2px;
    background: #555;
    transform: translateY(-6px);
    transition: transform .2s linear;
  }

  .menu-toggle::after {
    position: absolute;
    left: 0;
    content: '';
    width: 20px;
    height: 2px;
    background: #555;
    transform: translateY(6px);
    transition: transform .2s linear;
  }

  .is-open {
    background-color: rgba(255, 255, 255, 0);
  }

  .is-open::before {
    transform: rotate(-45deg);
  }

  .is-open::after {
    transform: rotate(45deg);
  }
  .menu-nav {
    position: absolute;
    top: 0;
    /*display: none;*/
    width: 100%;
    height: 300px;
    background-color: rgba(247, 247, 247, 0.9);
  }
  .menu {
    position: absolute;
    left: 0;
    right: 0;
    top: 57px;
  }
  .menu a {
    text-decoration: none;
    padding: 20px;
    font-size: 1.2em;
    color: #555;
  }
  .menu a:hover {
    color: #1abc9c;
  }
  .about {
    position: absolute;
    left: 0;
    right: 0;
    top: 120px;
  }
  .links {
    position: absolute;
    left: 0;
    right: 0;
    top: 180px;
  }
  .links a {
    text-decoration: none;
    padding: 10px;
    line-height: 2em;
    color: #555;
  }
  .links a:hover {
    color: #1abc9c;
  }
  .copyright {
    position: absolute;
    left: 0;
    right: 0;
    top: 270px;
  }
  .auth-form {
    position: fixed;
    left: 0;
    right: 0;
    margin: auto;
    top: 0;
    bottom: 0;
    width: 400px;
    height: 300px;
    background-color: rgba(247, 247, 247, 0.8);
    border-radius: 10px;
  }
  .auth-wrap {
    position: relative;
  }
  .auth-close {
    position: absolute;
    background-color: #ccc;
    border-radius: 12px;
    width: 24px;
    line-height: 24px;
    font-size: 24px;
    font-weight: 500;
    right: 25px;
    top: 25px;
    z-index: 1;
  }
  .auth-close:hover {
    color: #0071ce;
  }
  .auth-title {
    position: absolute;
    font-size: 30px;
    left: 0;
    right: 0;
    margin: auto;
    top: 20px;
  }
  .user-info {
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    top: 70px;
  }
  .auth-submit {
    background-color: #0071ce;
    color: #fff;
    padding: 0 !important;
    border: 1px solid #0071ce;
    width: 205px !important;
  }
  .auth-input {
    display: block;
    font-size: 1em;
    height: 30px;
    width: 200px;
    border: 0;
    padding: 0 0 0 5px;
    margin: 10px 100px;
    border-radius: 2px;
    outline: none;
  }
  .auth-input::-webkit-input-placeholder { /* WebKit browsers */
    color: #888;
    font-size: 14px;
  }
  .auth-input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #888;
    font-size: 14px;
  }
  .auth-input::-moz-placeholder { /* Mozilla Firefox 19+ but I'm not sure about working */
    color: #888;
    font-size: 14px;
  }
  .auth-input:-ms-input-placeholder { /* Internet Explorer 10+ */
    color: #888;
    font-size: 14px;
  }
</style>