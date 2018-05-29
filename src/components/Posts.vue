<template>
  <div id="posts">
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
        <a href="#post-list" id="opener"></a>
      </div>
    </div>

    <div id="post-list" v-if="msg.data">
      <div class="post-card" v-for="post in msg.data">
        <!--<span class="post-author">{{post.author}}</span>-->
        <h1 class="post-title">
          <!--<router-link :to="{name: 'article', params:{id:article.id}}">-->
          <router-link :to="'/post/'+post.id">
            {{post.title}}
          </router-link>
        </h1>
        <div class="post-time">
          {{post.write_at | moment("MMMM d, YYYY")}}
        </div>
        <div class="post-content">
          <p>{{post.content_simple }}...</p>
        </div>
        <div class="post-img">
          <img :src="post.background_url" alt="...">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Posts',
    // 接收父组件实时窗口大小数据
    props: ['bgWidth', 'bgHeight'],
    data: function () {
      return {
        msg: '',
        topArticle:'',
        date: '',
        bgSize:{
          width: document.documentElement.clientWidth+'px',
          height: document.documentElement.clientHeight+'px',
          backgroundImage: '',
        },
      }
    },
    methods: {

    },
    mounted: function () {
      const that = this;
      // 初始化请求数据
      that.axios({
        method: 'get',
        url: '/api/articles',
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
    },
    watch: {
      bgWidth: function () {
        this.bgSize.width = this.bgWidth + 'px';
      },
      bgHeight: function () {
        this.bgSize.height = this.bgHeight + 'px';
      }
    }
  }
</script>

<style scoped>
  #posts {
    /*width: 100%;*/
    /*margin-top: 0;*/
    /*margin-bottom: 80px;*/
    /*min-height: calc(100vh - 80px);*/
  }
  .post-simple {
    position: relative;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
  }
  .foreword-bg {
    width: 100%;
    height: 100%;
    background: linear-gradient(to top, rgba(247, 247, 247, 0.9), rgba(255, 255, 255, 0));
  }
  .foreword {
    position: absolute;
    width: 80%;
    height: 40%;
    left: 0;
    right: 0;
    bottom: 10%;
    margin: auto;
    overflow: hidden;
    /*background: linear-gradient(to right, rgba(247, 247, 247, 0.8), transparent);*/
    /*background-color: rgba(247, 247, 247, 0.7);*/
  }
  .foreword a {

  }
  @media only screen and (min-width: 768px) {
    .foreword-bg {
      width: 60%;
      height: 100%;
      background: linear-gradient(to right, rgba(247, 247, 247, 0.9), rgba(255, 255, 255, 0));
    }
    .foreword {
      width: 40%;
      height: 40%;
      margin-left: 5%;
    }
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
  #post-list {
    margin-bottom: 30px;
  }
  .post-card {
    width: 90%;
    margin: 30px auto;
    padding: 20px;
    display: inline-block;
    background-color: #fff;
    /*box-shadow: 5px 5px 20px #888888;*/
  }
  .post-time {
    text-align: left;
  }
  .post-title {
    text-align: left;
    /*margin: 5px auto;*/
  }
  .post-content {
    text-align: left;
    /*min-height: 80px;*/
  }
  .post-img img {
    width: 100%;
    /*max-height: 300px;*/
    /*overflow:hidden;*/
  }
  @media only screen and (min-width: 768px) {
    .post-card  {
      /*width: 50%;*/
    }
  }
</style>