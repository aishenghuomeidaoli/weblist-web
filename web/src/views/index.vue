<template>
  <div class="container">
    <!--<auth></auth>-->
    <feedback></feedback>
    <div>
      <h1>Web List</h1>
    </div>
    <b-form-group
      label="<code>Store And Share<br/>存储与分享</code>">
      <div>
        <b-form-radio-group buttons
                            button-variant="success"
                            v-model="typeSelectedCode"
                            :options="result.typeOptions"
                            name="engine"/>
      </div>
      <br/>
      <div>
        <b-form-radio-group buttons
                            button-variant="success"
                            v-model="siteSelectedCode"
                            :options="result.siteOptions"
                            name="site"/>
      </div>
    </b-form-group>
    <b-input-group>
      <input type="text" class="form-control" @keyup.enter="search" v-model="keyword" :autofocus="true">
      <b-input-group-append>
        <b-btn variant="outline-success" @click="search">搜索</b-btn>
      </b-input-group-append>
    </b-input-group>
    <hr>
    <div class="gallery">
      <a href="/tools/salary" target="_blank">
        <img src="../assets/wallet_icon.jpg" width="30" height="30"><span>工资计算器</span>
      </a>
      <a href="/tools/bus-monitor" target="_blank">
        <img src="../assets/vehicle_ico2.png" width="30"
             height="30"><span>实时公交</span>
      </a>
    </div>
    <div class="footer">
      <span>京ICP证030173号&nbsp;</span>
      <img width="13" height="16"
           src="https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/copy_rignt_24.png">
    </div>
    <div style="display: none">
      <img :src="monitorUrl">
    </div>
  </div>
</template>
<script>
  import auth from "../components/auth"
  import feedback from "../components/feedback";

  export default {
    name: 'index',
    components: {
      auth,
      feedback
    },
    methods: {
      search: function () {
        if (this.keyword != null && this.keyword != '') {
          for (let engine of this.engines) {
            if (engine.code == this.typeSelectedCode) {
              for (let site of engine.sites) {
                if (site.code == this.siteSelectedCode) {
                  let url = site.url + '?' + site.keywordParameter + '=' + this.keyword
                  window.open(url);
                }
              }
            }
          }
        }
      },
      initSites: function () {
        for (let engine of this.engines) {
          if (engine.code == this.typeSelectedCode) {
            this.siteSelectedCode = engine.sites[0].code
          }
        }
      }
    },
    watch: {
      typeSelectedCode: function () {
        for (let engine of this.engines) {
          if (engine.code == this.typeSelectedCode) {
            this.siteSelectedCode = engine.sites[0].code
          }
        }
      }
    },
    data() {
      let engines = [
        {
          name: '搜索引擎',
          code: 'engine',
          sites: [
            {name: '百度', code: 'baidu', url: 'https://www.baidu.com/s', keywordParameter: 'wd'},
            {name: '必应', code: 'bing', url: 'https://cn.bing.com/search', keywordParameter: 'q'},
            {name: '搜狗', code: 'sougou', url: 'https://www.sogou.com/web', keywordParameter: 'query'},
            {name: '360', code: '360', url: 'https://www.so.com/s', keywordParameter: 'q'},
          ]
        },
        {
          name: 'IT相关',
          code: 'it',
          sites: [
            {name: 'GitHub', code: 'github', url: 'https://github.com/search', keywordParameter: 'q'},
            {
              name: 'StackOverflow',
              code: 'stackoverflow',
              url: 'https://stackoverflow.com/search',
              keywordParameter: 'q'
            },
            {name: '掘金', code: 'juejin', url: 'https://juejin.im/search', keywordParameter: 'query'},
            {
              name: 'SegmentFault',
              code: 'segmentfault',
              url: 'https://segmentfault.com/search',
              keywordParameter: 'q'
            },
          ]
        },
        {
          name: '视频',
          code: 'video',
          sites: [
            {name: '腾讯视频', code: 'tengxun', url: 'https://v.qq.com/x/search/', keywordParameter: 'q'},
            {name: '哔哩哔哩', code: 'bilibili', url: 'https://search.bilibili.com/all', keywordParameter: 'keyword'},
            {name: 'AcFun', code: 'acfun', url: 'http://www.acfun.cn/search/', keywordParameter: 'query'},
            {name: '乐视视频', code: 'leshi', url: 'http://so.le.com/s', keywordParameter: 'wd'},
          ]
        },
        {
          name: '问答',
          code: 'question',
          sites: [
            {name: '知乎', code: 'zhihu', url: 'https://www.zhihu.com/search', keywordParameter: 'q'},
            {name: '百度知道', code: 'zhidao', url: 'https://zhidao.baidu.com/search', keywordParameter: 'word'},
            {name: '分答', code: 'fenda', url: 'https://fd.zaih.com/search', keywordParameter: 'key'},
          ]
        },
      ];
      let typeSelected = engines[0];
      let typeSelectedCode = typeSelected.code;
      let siteSelectedCode = typeSelected.sites[0].code
      return {
        engines: engines,
        typeSelectedCode: typeSelectedCode,
        siteSelectedCode: siteSelectedCode,
        keyword: '',
        monitorUrl: 'http://106.14.193.52:8080/v1/access_log?app=weblist&path=/',
        meta: {
          title: 'WebList',
          description: 'Web List致力于提供便捷的网站保存与分享，多引擎搜索，在线书签服务',
          keywords: '多引擎,双引擎,搜索,在线书签,网站保存,搜索引擎,百度,bing,必应,知乎'
        }
      }
    },
    computed: {
      result: function () {
        let typeOptions = [];
        let siteOptions = [];
        for (let engine of this.engines) {
          typeOptions.push({value: engine.code, text: engine.name});
          if (engine.code == this.typeSelectedCode) {
            for (let site of engine.sites) {
              siteOptions.push({value: site.code, text: site.name});
            }
          }
        }
        return {
          typeOptions: typeOptions,
          siteOptions: siteOptions,
        }
      }
    },
    mounted: function () {
      document.title = this.meta.title;
      document.getElementById('description').content = this.meta.description;
      document.getElementById('keywords').content = this.meta.keywords;
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
