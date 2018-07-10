<template>
  <div id="PostEdit">
    <div class="post-card" v-if="postDetail">
      <!--<h1>PostEdit</h1>-->
      <textarea class="post-content" cols="30" rows="10" v-model="postDetail.content"></textarea>
      <vue-markdown class="markdown-content"
        :watches="['show','html','breaks','linkify','emoji','typographer','toc']"
        :source="postDetail.content" :show="show" :html="html" :breaks="breaks" :linkify="linkify"
        :emoji="emoji" :typographer="typographer" :toc="toc" toc-id="toc"
      >
        {{postDetail.content}}
      </vue-markdown>
      <div class="save-button">
        <button @click="submitEdit">保存</button>
      </div>
    </div>
  </div>
</template>

<script>
  import VueMarkdown from 'vue-markdown'
  export default {
    name: 'PostEdit',
    components: {
      VueMarkdown
    },
    data: function () {
      return {
        postDetail:'',
        //markdown 配置选项
        source: "",
        show: true,
        html: false,
        breaks: true,
        linkify: false,
        emoji: true,
        typographer: true,
        toc: false
      }
    },
    mounted () {
      setInterval(() => {
        this.source = new Date().toLocaleTimeString();
      }, 1000);
    },
    methods: {
      submitEdit: function () {
        const that = this;
        // 请求数据
        that.axios({
          method: 'patch',
          data: {
            content: that.postDetail.content,
          },
          // url: '/article/'+that.$route.params.id, //'http://api/timeloft/v1/register'
          url: '/api/article/'+that.$route.params.id + '/update', //'http://api/timeloft/v1/register'
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('token'),
          },
        }).then(function (res) {
            // console.log(res);
            // that.postDetail=res.data.data;
            const status = res.status;
            if (status === 200) {
              that.$router.push('/post/' + that.$route.params.id);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    mounted: function () {
      const that = this;
      // 请求数据
      that.axios({
        method: 'get',
        // url: '/article/'+that.$route.params.id, //'http://api/timeloft/v1/register'
        url: '/api/article/' + that.$route.params.id + '/edit', //'http://api/timeloft/v1/register'
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
  .post-card {
    position: relative;
    width: 100%;
    min-height: calc(100vh - 200px);
    margin: 0 auto;
    padding: 20px;
    display: inline-block;
    background-color: #fff;
  }
  .save-button {
    position: absolute;
    bottom: 20px;
    margin: 0 auto;
    left: 0;
    right: 0;
  }
  .save-button button {
    border-radius: 4px;
    padding: 3px 10px;
    background-color: #eee;
  }
  .save-button button:hover {
    cursor:pointer;
    color: #fff;
    background-color: #25283D;
  }
  .post-content {
    position: absolute;
    display: inline-block;
    top: 10px;
    left: 10px;
    margin: 0 ;
    padding: 5px;
    width: 48%;
    height: 300px;
    border: 1px solid #999;
    outline: none;
  }
  .markdown-content {
    position: absolute;
    display: inline-block;
    top: 10px;
    right: 10px;
    margin: 0 ;
    padding: 5px;
    width: 48%;
    height: 300px;
    overflow: auto;
    text-align: left;
    border: 1px solid #999;
  }

  @media only screen and (min-width: 768px) {
    .post-card {
      /*width: 90%;*/
      /*margin: 0 auto;*/
      min-height: calc(100vh - 200px);
    }
  }
</style>