import http from "./http"

let url = {
  search: "/api/bt/search/", // 搜索
};

function search(keyword) {
  return http.get(url.search, {keyword: keyword})
}

function warning(message) {
  this.$notify({
    title: '警告',
    message: message,
    type: 'warning'
  });
}

export default {
  search,
  warning
}
