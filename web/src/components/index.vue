<template>
  <div class="container">
    <div>
      <h1>Web List</h1>
      <!--<p>Store And Share<br/>存储与分享</p>-->
    </div>
    <b-form-group
      label="<code>Store And Share<br/>存储与分享</code>">
      <!--<b-form-checkbox-group buttons-->
      <!--button-variant="success"-->
      <!--size="md"-->
      <!--name="engines"-->
      <!--:options="options" v-model="selected">-->
      <!--</b-form-checkbox-group>-->
      <b-form-radio-group buttons
                          button-variant="success"
                          v-model="selected"
                          :options="options"
                          name="engine"/>
    </b-form-group>
    <b-input-group>
      <input type="text" class="form-control" @keyup.enter="search" v-model="keyword">
      <!--<b-form-input @keyup.enter="search"></b-form-input>-->
      <b-input-group-append>
        <b-btn variant="outline-success" @click="search">搜索</b-btn>
      </b-input-group-append>
    </b-input-group>
    <br/>
    <b-tabs class="gallery">
      <b-tab title="工具" active>
        <br>
        <a href="/tools/salary" target="_blank">
          <img src="../assets/wallet_icon.jpg" width="30" height="30"><span>工资计算器</span>
        </a>
      </b-tab>
      <b-tab title="待开放" disabled>
      </b-tab>
    </b-tabs>
  </div>
</template>
<script>
  export default {
    name: 'index',
    methods: {
      search: function () {
        if (this.keyword != null && this.keyword != '') {
          if (this.selected in this.engines) {
            window.open(this.engines[this.selected] + this.keyword)
          }
          else {
            window.location.href = '/'
          }
        }
      }
    },
    data() {
      return {
        options: [
          {text: '百度', value: 'baidu'},
          {text: '必应', value: 'bing'},
          {text: '搜狗', value: 'sougou'},
          {text: '360', value: '360'},
          {text: '知乎', value: 'zhihu'},
          {text: '谷歌', value: 'google'},
        ],
        selected: 'baidu',
        engines: {
          baidu: 'https://www.baidu.com/s?wd=',
          bing: 'https://cn.bing.com/search?q=',
          sougou: 'https://www.sogou.com/web?query=',
          '360': 'https://www.so.com/s?q=',
          zhihu: 'https://www.zhihu.com/search?type=content&q=',
          google: 'https://www.google.com/search?q='
        },
        keyword: '',
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .gallery {
    text-align: left;
  }

  .btn-success:not(:disabled):not(.disabled).active {
    color: #fff;
    background-color: #28a745;
    border-color: #1c7430;
  }

  .btn-success {
    color: #28a745;
    background-color: #fff;
    border-color: #28a745;
  }
</style>
