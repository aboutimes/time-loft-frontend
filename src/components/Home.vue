<template>
  <div class="homepage">
    <div class="login">
      <a href="#">登陆</a>
      <a href="#">注册</a>
      <span class="language"></span>
    </div>
    <div class="post-simple" v-bind:style="bgSize">
      <div class="foreword-bg">
        <div class="foreword"  v-if="msg.data">
          <h1><a href="#">{{msg.data[0].title}}</a></h1>
          <h3>{{msg.data[0].content_simple}}...</h3>
        </div>
      </div>
    </div>
    <div>dsfagwedasdfas</div>
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
        height: ''
      },
    }
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
  .language {
    background-image: url('../assets/16px_11px_1.png');
    display: inline-block;
    margin: 0 8px;
    background-position: -16px 0;
    background-repeat: no-repeat;
    width: 16px;
    height: 11px;
  }

  .post-simple {
    background-image: url('../assets/bg4.jpg');
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
</style>