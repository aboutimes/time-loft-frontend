<template>
  <div class="homepage">
    <div class="post-simple" v-bind:style="bgSize">
      <div class="foreword-bg">
        <div class="foreword"  v-if="msg.data">
          <h1><a href="#">{{msg.data[0].title}}</a></h1>
          <h3>{{msg.data[0].content_simple}}...</h3>
        </div>
      </div>
      <div class="more">
        <a href="#" id="opener"></a>
      </div>
    </div>
    <div class="logo">时光阁楼</div>

    <div id="nav"  v-bind:style="nav">
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
      <div class="copyright">{{loftTime}}</div>
    </div>
    <div class="login">
      <a href="#">登陆</a>
      <a href="#">注册</a>
      <div class="menu-btn" v-on:click="menuStatus()">
        <span class="btn"></span>
      </div>
    </div>
    <div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore, quos, voluptate, sunt, in suscipit quibusdam quis dignissimos eligendi repellendus ipsam exercitationem adipisci nostrum fugit accusamus quae cum nisi accusantium eaque.
      </p>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur, dolore, impedit eveniet necessitatibus voluptate distinctio quam repellendus voluptates voluptatum inventore rem sapiente minus esse saepe iste harum architecto numquam quis vero dignissimos beatae est id libero adipisci enim odio natus commodi explicabo modi similique nesciunt deserunt vel consectetur velit omnis quaerat corrupti. Cumque, perspiciatis, culpa, reprehenderit laboriosam obcaecati deleniti soluta tempora ipsum ipsam iure temporibus dolore modi quidem cum doloribus ex vel suscipit sapiente ut esse optio voluptates molestias natus nostrum illo nihil quisquam facilis hic atque voluptas quae pariatur placeat officia doloremque quia ea recusandae rem iste asperiores iusto debitis quod incidunt id nemo repellendus itaque. Iure, vel, expedita quam repellendus aliquam fugit autem obcaecati libero reiciendis excepturi officia voluptate molestiae quis itaque consequatur nulla ea sunt facilis cupiditate tempora sequi nam in asperiores! Sunt, maxime at id eaque debitis quasi a possimus eveniet eum velit tempore quidem voluptates expedita quibusdam officiis. Ipsum, quaerat, vero, adipisci enim autem inventore eum maiores consectetur culpa molestiae cumque sed qui dolorem. Placeat, quae deleniti molestiae minima cupiditate quaerat sit est perspiciatis error iste. Ratione, minus, commodi, magni laborum doloribus libero ullam quos tenetur quis molestias ipsam consequuntur harum asperiores culpa nostrum omnis.
      </p>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur, dolore, impedit eveniet necessitatibus voluptate distinctio quam repellendus voluptates voluptatum inventore rem sapiente minus esse saepe iste harum architecto numquam quis vero dignissimos beatae est id libero adipisci enim odio natus commodi explicabo modi similique nesciunt deserunt vel consectetur velit omnis quaerat corrupti. Cumque, perspiciatis, culpa, reprehenderit laboriosam obcaecati deleniti soluta tempora ipsum ipsam iure temporibus dolore modi quidem cum doloribus ex vel suscipit sapiente ut esse optio voluptates molestias natus nostrum illo nihil quisquam facilis hic atque voluptas quae pariatur placeat officia doloremque quia ea recusandae rem iste asperiores iusto debitis quod incidunt id nemo repellendus itaque. Iure, vel, expedita quam repellendus aliquam fugit autem obcaecati libero reiciendis excepturi officia voluptate molestiae quis itaque consequatur nulla ea sunt facilis cupiditate tempora sequi nam in asperiores! Sunt, maxime at id eaque debitis quasi a possimus eveniet eum velit tempore quidem voluptates expedita quibusdam officiis. Ipsum, quaerat, vero, adipisci enim autem inventore eum maiores consectetur culpa molestiae cumque sed qui dolorem. Placeat, quae deleniti molestiae minima cupiditate quaerat sit est perspiciatis error iste. Ratione, minus, commodi, magni laborum doloribus libero ullam quos tenetur quis molestias ipsam consequuntur harum asperiores culpa nostrum omnis.
      </p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data () {
    return {
      msg: '',
      bgSize:{
        width: '',
        height: '',
        backgroundImage: 'url(' + 'http://home/bg4.jpg' + ')',
      },
      nav: {
        display: 'none',
      },
      loftTime: '© 2012 - 2018 Couh'
    }
  },
  methods: {
    menuStatus: function () {
      // 菜单按钮
      const node = document.getElementsByClassName('btn')[0];
      if (node.classList && node.classList.contains('is-open')) {
        // 隐藏
        node.classList.remove('is-open');
        this.nav.display = 'none';
      }
      else {
        // 显示
        node.classList.add('is-open');
        this.nav.display = '';
      }
    },
  },
  created: function () {
    const currentDate = new Date();
    const copyRight = '© 2012 - ' + currentDate.getFullYear() + ' Couh';
    this.loftTime = copyRight;
  },
  mounted: function() {
    const that = this;
    // 请求数据
    that.axios.get('/v1/articles')
      .then(function (res) {
        console.log(res.data);
        that.msg=res.data;
      })
      .catch(function (error) {
        console.log(error);
      });

    // 取得初始窗口大小
    that.bgSize.width = document.documentElement.clientWidth+'px';
    that.bgSize.height = document.documentElement.clientHeight+'px';
    // 取得调整后窗口大小
    window.onresize = function windowResize() {
      that.bgSize.width = document.documentElement.clientWidth+'px';
      that.bgSize.height = document.documentElement.clientHeight+'px';
    };
  },
}
</script>

<style scoped>
  .homepage {
    position: relative;
  }
  .logo {
    position: absolute;
    z-index: 999;
    left: 50px;
    top: 50px;
    font-size: 2em;
  }
  .login {
    position: absolute;
    right: 20px;
    top: 10px;
    display: inline-block;
    padding: 10px;
    background: rgba(247, 247, 247, 0.4);
    border-radius: 4px 4px 4px 4px;
  }
  .login:hover {
    background: rgba(247, 247, 247, 0.7);
  }
  .login a {
    font-size: 14px;
    color: #555;
    padding: 0 10px;
    border-right: 1px solid #ddd;
    text-decoration: none;
    outline: 0;
  }
  .login a:hover {
    color: #0071ce;
  }
  .menu-btn {
    display: inline-block;
    padding: 0 10px;
  }
  .btn {
    display: inline-block;
    position: relative;
    bottom: 3px;
    width: 20px;
    height: 2px;
    background-color: #555;
    transition: background-color .2s linear;
  }
  .btn::before {
    position: absolute;
    left: 0;
    content: '';
    width: 20px;
    height: 2px;
    background: #555;
    transform: translateY(-6px);
    transition: transform .2s linear;
  }
  .btn::after {
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

  #nav {
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
  .copyright {
    position: absolute;
    left: 0;
    right: 0;
    top: 270px;
  }
  .post-simple {
    position: relative;

    background-color: #f7f7f7;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;

  }
  .foreword-bg {
    width: 60%;
    height: 100%;
    background: linear-gradient(to right, rgba(247, 247, 247, 0.9), rgba(255, 255, 255, 0));
  }
  .foreword {
    position: absolute;
    width: 40%;
    height: 36%;
    left: 5%;
    bottom: 10%;
    /*background: linear-gradient(to right, rgba(247, 247, 247, 0.8), transparent);*/
    /*background-color: rgba(247, 247, 247, 0.7);*/
  }
  #opener:hover {
    /*-webkit-transition-delay: 0;*/
    /*transition-delay: 0;*/
    opacity: 1;
  }
  #opener {
    cursor: pointer;
    width: 20px;
    height: 20px;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
    border-bottom: 4px solid rgb(0, 92, 255);
    border-right: 4px solid rgb(0, 92, 255);
    position: absolute;
    bottom: 5%;
    left: 50%;
    -webkit-animation: opener .5s ease-in-out alternate infinite;
    animation: opener .5s ease-in-out alternate infinite;
    /*cursor: pointer;*/
    opacity: 0.5;
    -webkit-transition: opacity .2s ease-in-out, transform .5s ease-in-out .2s;
    transition: opacity .2s ease-in-out, transform .5s ease-in-out .2s;
  }
  @-webkit-keyframes opener {
    100% {
      bottom: 4%
    }
  }
  @keyframes opener {
    100% {
      bottom: 4%
    }
  }
</style>