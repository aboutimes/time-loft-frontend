<template>
  <div id="posts" class="posts" :style="marginTop">
    <div class="post-simple" v-if="currentPage===1 && topArticle" :style="bgSize">
      <div class="foreword-bg">
        <div class="foreword">
          <h1><router-link :to="'/post/'+ topArticle.id">
            {{topArticle.title}}
          </router-link></h1>
          <div class="post-info">
            <span>——{{topArticle.author}}</span>
            <span>{{topArticle.wrote_at | moment("MMMM d, YYYY")}}</span>
          </div>
          <div class="post-content">
            <p>{{topArticle.content_simple}}...</p>
          </div>
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
        <div class="post-info">
          <span>——{{post.author}}</span>
          <span>{{post.wrote_at | moment("MMMM d, YYYY")}}</span>
        </div>
        <div class="post-content">
          <p>{{post.content_simple }}...</p>
        </div>
        <div class="post-img">
          <img :src="post.background_url" alt="...">
        </div>
      </div>
    </div>
    <div id="pagination" v-if="msg.meta"><!-- .分页 -->
      <ul>
        <li v-if="currentPage>1"><!-- .前一页 -->
          <router-link :to="'/?page=' + (currentPage-1)">
            Prev
          </router-link>
        </li>
        <li><!-- .第一页 -->
          <router-link :to="'/'">
            1
          </router-link>
        </li>
        <li v-if="currentPage>=4">
          <a href="javascript:void(0)">...</a>
        </li>
        <li v-if="(currentPage-2)>=1"><!-- .当前页上一页 -->
          <router-link :to="'/?page=' + (currentPage-1)">
            {{currentPage-1}}
          </router-link>
        </li>
        <li class="current-page" v-if="currentPage!==1"><!-- .当前页 -->
          <router-link :to="'/?page=' + currentPage">
            {{currentPage}}
          </router-link>
        </li>
        <li v-if="currentPage<(msg.meta.last_page-1)"><!-- .当前页下一页 -->
          <router-link :to="{path: '/', query:{'page': (currentPage+1)}}">
            {{currentPage+1}}
          </router-link>
        </li>
        <li v-if="(msg.meta.last_page-currentPage)>2">
          <a href="javascript:void(0)">...</a>
        </li>
        <li v-if="currentPage < msg.meta.last_page"><!-- .最后一页 -->
          <router-link :to="'/?page=' + msg.meta.last_page">
            {{msg.meta.last_page}}
          </router-link>
        </li>
        <li v-if="currentPage < msg.meta.last_page"><!-- .下一页 -->
          <router-link :to="{path: '/', query:{'page': (currentPage+1)}}">
            Next
          </router-link>
        </li>
      </ul>
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
        //置顶文章
        topArticle:'',
        //当前页
        currentPage: 1,
        bgSize:{
          width: document.documentElement.clientWidth+'px',
          height: document.documentElement.clientHeight+'px',
          backgroundImage: '',
        },
        marginTop: {
          margin:0
        }
      }
    },
    methods: {
      loadArticle: function () {
        const that = this;
        const page = this.$route.query.page ? this.$route.query.page : null;
        // console.log('page='+page);
        let addr = '/api/articles';
        if (page) {
          addr = '/api/articles?page=' + page;
        }
        // 初始化请求数据
        that.axios({
          method: 'get',
          url: addr,
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
          }})
          .then(function (res) {
            console.log(res.data);

            that.msg=res.data;
            that.currentPage = res.data.meta.current_page;
            console.log('currentPage='+that.currentPage);
            // 设置置顶文章
            const len = res.data.data.length;
            for (let i = 0; i < len; i++){
              if(res.data.data[i]['is_top']){
                console.log('is_top');
                that.topArticle = res.data.data[i];
                that.bgSize.backgroundImage = 'url('+res.data.data[i]['background_url']+')';
              }
            }
            //没有置顶文章则设置顶部边距
            if (that.topArticle==='') {
              that.marginTop.margin = '80px auto 0';
            }else {
              that.marginTop.margin = '0';
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    mounted: function () {
      this.loadArticle();
    },
    watch: {
      bgWidth: function () {
        this.bgSize.width = this.bgWidth + 'px';
      },
      bgHeight: function () {
        this.bgSize.height = this.bgHeight + 'px';
      },
      '$route': function (to, from) {
        this.loadArticle();
      },
      currentPage: function () {
        //只有第一页显示满屏背景
        if (this.currentPage!==1) {
          this.marginTop.margin = '80px auto 0';
        }else {
          this.marginTop.margin = '0';
        }
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
    height: 42%;
    left: 0;
    right: 0;
    bottom: 10%;
    margin: auto;
    overflow: hidden;
    text-align: left;
    /*background: linear-gradient(to right, rgba(247, 247, 247, 0.8), transparent);*/
    /*background-color: rgba(247, 247, 247, 0.7);*/
  }
  .foreword div > span {
    /*color: #25283D;*/
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
    margin-top: 30px;
    margin-bottom: 30px;
  }
  #pagination {
    margin-bottom: 30px;
  }
  #pagination ul {
    /*display: inline-block;*/
  /*padding-left: 0;*/
    /*margin: 20px 0;*/
    margin: 0 auto;
    font-size: 0;
  }
  #pagination ul > li {
    display: inline-block;
    padding: 0;
    margin: 5px auto;
    border: 1px solid #325d72;
    border-right: none;
    width: 30px;
    height: 32px;
    /*background-color: #325d72;*/
    /*float: left;*/
    /*white-space: nowrap;*/
  }
  .current-page{
    /*当前页码高亮*/
    background-color: #ffc107;
  }
  #pagination ul > li:first-child {
    border-radius: 4px 0 0 4px;
    width: 42px;
    /*background-color: #325d72;*/
  }
  #pagination ul > li:last-child {
    border-radius: 0 4px 4px 0;
    border-right: 1px solid #325d72;;
    width: 42px;
  }
  #pagination ul > li > a {
    /*color: #fff;*/
    line-height: 32px;
    font-size: 14px;
  }
  .post-card {
    width: 90%;
    margin: 30px auto;
    padding: 20px;
    display: inline-block;
    background-color: #fff;
    /*box-shadow: 5px 5px 20px #888888;*/
  }
  .post-info {
    text-align: left;
  }
  .post-info span{
    margin-right: 10px;
    color: #999;
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