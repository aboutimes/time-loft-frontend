<template>
  <div class="homepage">
    <div class="post-simple" v-if="msg.data" :style="bgSize">
      <div class="foreword-bg">
        <div class="foreword">
          <h1><router-link :to="'/post/'+ topArticle.id">
            {{topArticle.title}}
          </router-link></h1>
          <h3>{{topArticle.content_simple}}...</h3>
        </div>
      </div>
      <div class="more">
        <a href="javascript:void(0)" id="opener"></a>
      </div>
    </div>

    <div class="post-list" v-if="msg.data">
      <div v-for="post in msg.data">
        <h2>
          <!--<router-link :to="{name: 'article', params:{id:article.id}}">-->
          <router-link :to="'/post/'+post.id">
            {{post.title}}
          </router-link>
        </h2>
        <p>{{post.content_simple }}</p>
      </div>
    </div>
    <auth/>
  </div>
</template>
<script>
import auth from '@/components/children/auth'

export default {
  name: 'home',
  data: function() {
    return {
      msg: '',
      topArticle:'',
      bgSize:{
        width: '',
        height: '',
        // backgroundImage: '',
      },
    }
  },
  components: {
    'auth': auth,
  },
  methods: {

  },
  created: function () {

  },
  mounted: function() {
    const that = this;
    // 初始化请求数据
    // that.axios.get('/articles')
    that.axios({
      method: 'get',
      url: '/articles',//'http://api/timeloft/register'
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      }})
      .then(function (res) {
        // console.log(res.data);
        that.msg=res.data;

        // 设置置顶文章
        const len = res.data.data.length;
        for (let i = 0; i < len; i++){
          if(res.data.data[i]['is_top']){
            that.topArticle = res.data.data[i];
            that.bgSize.backgroundImage = 'url('+res.data.data[i]['background_url']+')';
          }
        }
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