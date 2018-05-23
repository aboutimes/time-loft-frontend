<template>
  <div id="post">
    <h2>{{postDetail.title}}</h2>
    <span>{{postDetail.author}}</span>
    <span>{{postDetail.category}}</span>
    <p>{{postDetail.content}}</p>
  </div>
</template>

<script>
  export default {
    name: 'post',
    data: function () {
      return {
        postDetail:''
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
  }

</style>