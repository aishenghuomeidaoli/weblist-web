<template>
  <div>
    <div v-if="showBreadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><a href="/">BT-搜索</a></el-breadcrumb-item>
        <el-breadcrumb-item>{{keyword}}</el-breadcrumb-item>
      </el-breadcrumb>
      <hr>
    </div>
    <div v-else>
      <h1>
        <a href="http://weblist.site/" class="web-name ">
          WebList
        </a> - BT搜索
      </h1>
    </div>
    <el-input
      @keyup.enter.native="search"
      spellcheck="false"
      :autofocus="true"
      placeholder="请输入搜索内容"
      v-model="keyword">
      <el-button
        slot="append"
        type="primary"
        @click="search"
        icon="el-icon-search"
        v-loading.fullscreen.lock="fullscreenLoading">
      </el-button>
    </el-input>
    <div class="block" v-if="results.length">
      <span class="demonstration">页数较少时的效果</span>
      <el-pagination
        layout="prev, pager, next"
        :current-page="page"
        :total="total"
        @current-change=""
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import services from '../http/services'

  export default {
    data() {
      return {
        keyword: '',
        results: [],
        showResults: [],
        select: 1,
        fullscreenLoading: false,
        showBreadcrumb: false,
        total: 1,
        page: 1,
      }
    },
    methods: {
      search() {
        if (this.keyword) {
          window.location.href = '/?keyword=' + this.keyword;
        }
        else {
          window.location.href = '/';
        }
      },
      fetchData() {
        let self = this;
        let keyword = self.$route.query.keyword;
        if (keyword) {
          self.showBreadcrumb = true;
          self.keyword = keyword;
          // let results = [];
          self.fullscreenLoading = true
          services.search(keyword).then(function (data) {
            if (data.code == 200) {
              self.results = data.data.results;
              self.total = data.data.total;
              self.page = data.data.page;
              self.fullscreenLoading = false
            }
            else{
              self.fullscreenLoading = false
              self.$notify({
                title: '警告',
                message: data.msg,
                duration: 1000,
                type: 'warning'
              });
            }
          });
        }
      }
    },
    created: function () {
      this.fetchData();
    },
    mounted: function () {
      if (this.keyword) {
        document.title = 'BT搜索-' + this.keyword;
      }
    },
  }
</script>
<style>
  .web-name {
    text-decoration: none;
    color: #67c23a;
  }
</style>
