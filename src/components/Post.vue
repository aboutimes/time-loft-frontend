<template>
  <div id="post">
    <div class="post-card" v-if="postDetail">
      <h1 class="post-title">
          {{postDetail.title}}
      </h1>
      <div class="post-info">
        <span>
          ——
          <a href="javascript:void(0)">
            {{postDetail.author}}
          </a>
        </span>
        <span>{{postDetail.wrote_at | moment("MMMM d, YYYY")}}</span>
        <span>
          <router-link :to="'/post/' + $route.params.id + '/edit'">
            <icon name="edit"></icon>
          </router-link>
        </span>
      </div>
      <div class="post-content">
        <p>{{postDetail.content }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'post',
    data: function () {
      return {
        postDetail:'',

      }
    },
    mounted: function () {
      const that = this;
      // 请求数据
      that.axios({
        method: 'get',
        // url: '/article/'+that.$route.params.id, //'http://api/timeloft/v1/register'
        url: '/api/article/'+that.$route.params.id, //'http://api/timeloft/v1/register'
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('token'),
        }})
        .then(function (res) {
          console.log(res.data.data);
          that.postDetail=res.data.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
</script>

<style scoped>
  #post {
    /*margin-top: 100px;*/
    /*margin: 80px auto 0;*/
    /*padding: 20px;*/
    /*min-height: calc(100vh - 160px);*/
    /*padding: 20px;*/
    /*min-height: calc(100vh - 180px);*/
    margin-bottom: 30px;
  }
  .post-card {
    /*position: relative;*/
    width: 100%;
    min-height: calc(100vh - 200px);
    margin: 0 auto;
    padding: 20px;
    display: inline-block;
    background-color: #fff;
    /*box-shadow: 5px 5px 20px #888888;*/
  }
  .post-info {
    text-align: center;
  }
  .post-info span{
    margin-right: 10px;
    color: #999;
  }
  .post-info a {
    color: #999;
  }
  .post-info a:hover {
    color: #0071cb;
  }
  .post-title {
    text-align: center;
    /*margin: 5px auto;*/
  }
  .post-content {
    text-align: left;
    /*min-height: 80px;*/
  }
  .post-content p {
    /*两端对齐*/
    text-align: justify;
    font-size: 1em;
    line-height: 1.8em;
    /*字间距*/
    /*word-spacing: 0.1em;*/
    /*letter-spacing: 1px;*/
  }
  @media only screen and (min-width: 768px) {
    .post-card {
      /*width: 90%;*/
      /*margin: 0 auto;*/
      min-height: calc(100vh - 200px);
    }
  }

</style>