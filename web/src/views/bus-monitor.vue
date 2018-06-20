<template>
  <div>
    <b-breadcrumb :items="items"/>
    <div>
      <alert></alert>
      <basic-select :options="options"
                    :selected-option="item"
                    placeholder="选择公交线路"
                    @select="onSelect">
      </basic-select>
      <br/>
      <!--<b-form class="form">-->
      <div class="flex">
        <!--<div>-->
        <table v-if="showD1">
          <thead>
          <tr>
            <th>{{direction1.name}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="stop in direction1.stops">
            <td>
              <li class="flex">
                <ul :data-id="stop.id">
                  <img v-if="showBus(stop.seq, bustime1)" height="50%"
                       src="http://p8aa93zss.bkt.clouddn.com/static/v20180613/vehicle_ico2.png"/>
                </ul>
                <ul :data-id="stop.id">
                  {{stop.name}}
                </ul>
              </li>
              <li class="flex">
                <ul>
                  <img v-if="showBus(stop.seq + 'm', bustime1)" height="50%"
                       src="http://p8aa93zss.bkt.clouddn.com/static/v20180613/vehicle_ico1.png"/>
                </ul>
                <ul>
                </ul>
              </li>
            </td>
          </tr>
          </tbody>
        </table>
        <!--</div>-->
        <!--<div>-->
        <table v-if="showD2">
          <thead>
          <tr>
            <th colspan="2">{{direction2.name}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="stop in direction2.stops">
            <td>
              <li class="flex">
                <ul :data-id="stop.id">
                  <img v-if="showBus(stop.seq, bustime2)" height="50%"
                       src="http://www.bjbus.com/home/images/vehicle_ico2.png"/>
                </ul>
                <ul :data-id="stop.id">
                  {{stop.name}}
                </ul>
              </li>
              <li class="flex">
                <ul>
                  <img v-if="showBus(stop.seq + 'm', bustime2)" height="50%"
                       src="http://www.bjbus.com/home/images/vehicle_ico1.png"/>
                </ul>
                <ul>
                </ul>
              </li>
            </td>
          </tr>
          </tbody>
        </table>
        <!--</div>-->
      </div>
      <!--</b-form>-->
    </div>
    <br/>
    <div style="display: none">
      <img :src="monitorUrl">
    </div>
  </div>
</template>

<script>
  import {BasicSelect} from 'vue-search-select'
  import ElInput from "element-ui/packages/input/src/input";
  import Index from "./index";
  import alert from "../components/alert"
  import services from '@/http/services'

  export default {
    components: {
      Index,
      ElInput,
      alert,
      BasicSelect
    },
    name: 'bus_monitor',
    data() {
      return {
        lines: [],
        direction1: {},
        direction2: {},
        bustime1: [],
        bustime2: [],
        searchText: '', // If value is falsy, reset searchText & searchItem
        item: {
          value: '',
          text: ''
        },
        items: [{
          text: 'WebList',
          href: '/'
        }, {
          text: '实时公交',
          active: true
        }],
        monitorUrl: 'http://106.14.193.52:8080/v1/access_log?app=weblist&path=/tools/bus-monitor',
        meta: {
          title: 'WebList | 北京实时公交',
          description: '北京公交实时查询',
          keywords: '北京,公交,查询,实时'
        }
      }
    },
    methods: {
      updateHistoryLinesCookie(){
        let history_lines  = this.$cookie.get('history');
        if (history_lines == null){
          history_lines = []
        }
        if (history_lines.length > 4){
          history_lines = history_lines.slice(4)
        }
        history_lines = [{text: this.item.text, value: this.item.value}].concat(history_lines)
        this.$cookie.set('history', history_lines, 30);
      },
      fetchLines() { // 获取线路信息
        var self = this;
        services.monitor.fetch_lines().then(function (Data) {
          if (Data.code == 200) {
            self.lines = Data.data
          }
        });
      },
      fetchStops() { // 获取线路信息
        var self = this;
        self.direction1 = {};
        self.direction2 = {};
        // self.updateHistoryLinesCookie();
        services.monitor.fetch_stops(this.item.value).then(function (Data) {
          if (Data.code == 200) {
            if (Data.data.length > 0) {
              self.direction1 = Data.data[0];
              if (Data.data.length > 1) {
                self.direction2 = Data.data[1];
              }
              self.fetchBusTime();
              setInterval(self.fetchBusTime, 15000)
            }
          }
        });
      },
      fetchBusTime() { // 获取线路信息
        var self = this;
        if (Object.keys(self.direction1).length != 0) {
          self.bustime1 = [];
          services.monitor.fetch_bustime(self.direction1.id).then(function (Data) {
            if (Data.code == 200) {
              self.bustime1 = Data.data;
            }
          });
        }
        if (Object.keys(self.direction2).length != 0) {
          self.bustime2 = [];
          services.monitor.fetch_bustime(self.direction2.id).then(function (Data) {
            if (Data.code == 200) {
              self.bustime2 = Data.data;
            }
          });
        }
      },
      onSelect(item) {
        this.item = item;
        this.fetchStops();
      },
      reset() {
        this.item = {}
      },
      selectOption() {
        // select option from parent component
        this.item = this.options[0]
      },
      showBus: function (seq, bustime) {
        let index
        for (index in bustime) {
          if (seq == bustime[index]) {
            return true
          }
        }
        return false
      },
    },
    created: function () {
      this.fetchLines();
    },
    computed: {
      options: function () {
        let index;
        let ops = [];
        for (index in this.lines) {
          ops.push({value: this.lines[index].id, text: this.lines[index].no})
        }
        return ops
      },
      showD1: function () {
        return Object.keys(this.direction1).length != 0
      },
      showD2: function () {
        return Object.keys(this.direction2).length != 0
      },
    },
    mounted: function () {
      document.title = this.meta.title;
      document.getElementById('description').content = this.meta.description;
      document.getElementById('keywords').content = this.meta.keywords;
    }
  }
</script>


<style>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
    height: 24px;
  }

  li ul:first-child{
    width: 20%;
  }

  li ul:last-child{
    width: 80%;
  }

  a {
    color: #42b983;
  }

  .flex {
    display: flex;
  }

  .flex ul {
    margin-bottom: 0;
  }

  table {
    width: 50%;
  }
</style>
