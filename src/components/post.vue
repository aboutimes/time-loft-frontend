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
        url: '/article/'+that.$route.params.id, //'http://api/timeloft/v1/register'
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImNiMTMzMmUxNWY4M2YwZmMxNjFmZGZlYjQ4ZGE3ZWY4MjNjNzJlNjBjMzBiNDMwZTRkMTJiZTBkMzZhNzZiYzU4ZDk3NTk2ZGRkYmZmM2YxIn0.eyJhdWQiOiIyIiwianRpIjoiY2IxMzMyZTE1ZjgzZjBmYzE2MWZkZmViNDhkYTdlZjgyM2M3MmU2MGMzMGI0MzBlNGQxMmJlMGQzNmE3NmJjNThkOTc1OTZkZGRiZmYzZjEiLCJpYXQiOjE1MjY0NTUyNjAsIm5iZiI6MTUyNjQ1NTI2MCwiZXhwIjoxNTI3NzUxMjYwLCJzdWIiOiIxIiwic2NvcGVzIjpbIioiXX0.p-ZJH-HP2ZSCvbS3voyAFhOP4Nk5_sO62QRQmWyrN21YDXWliHhSIOlNIZ4iGr6POitmHFgk-LkPG-v9ffPc-oG5rLEOF9Iv5d1hOR8T4S77josp-NGZn0j1XtOH2FrQ3_NwX-iyTy3dk-n5UEKToWuVtc3pqgzuGih_7tfCJ2S6Z5biUQaYQGZ9k5uiWCd59qowOK5LhWCLgX6TQ0A_KVV_l7waOkB0AghxpklURbDYfdIy073ugYrz0vNk-zbA6PwySOMW3BGZ-zr1LYwIeeItVoEowwo-1W6uTp7NkHhge5tajpBaPF3Itb79EpAGxMyol0VfAf4ZVCNC3DgvG7x0Eln3r5eLfJKGfmHHf92HIjjPWr-VZWulyrKl9WlsKEwATqC7DbSaYL8iFK8ETUQh6D1rXBudxfnjZL2eFceDdyvHdbUKnFo-_70gNmVCA0ItrJhaA8EBev9EwOBvNxZ1COhJZIJjP22WTlDCOs1fNtI0P53HvYZQ4nd9cKcc1h50NPLl3lhtlSPcnauo6Orl52FZoR3gW25uZc4LPjkqlZv87TUiObe3Tyx_c6SwYyHIOPmmAEhw1VzDeU8gc2s3nUMI1r1FHwsll0y4xDB5PUl10P_f4IV2S1lXxEZ99waKa12lXSgWSdFGsmazc5Qyw_ZNhcJtH6rRax_z1NQ',
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

</style>