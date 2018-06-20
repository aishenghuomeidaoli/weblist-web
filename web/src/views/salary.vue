<template>
  <div>
    <b-breadcrumb :items="items"/>
    <b-card no-body>
      <b-tabs small card>
        <b-tab title="工资计算器">
          <!--<h1>工资计算器</h1>-->
          <b-form class="form">
            <div class="row">
              <div class="col-sm">
                <b-form-group id="salaryInputGroup"
                              label="税前工资(元)"
                              label-for="salaryInput">
                  <b-form-input id="salaryInput"
                                type="number"
                                v-model="form.salary"
                                required
                                placeholder="税前工资(元)">
                  </b-form-input>
                </b-form-group>
              </div>
              <div class="col-sm">
                <b-form-group id="salaryOutputGroup"
                              label="税后工资(元)"
                              label-for="exampleInput2">
                  <div id="salaryOutput">{{ tax.result }}</div>
                </b-form-group>
              </div>
            </div>
            <div class="row">
              <div class="col-sm">
                <b-form-group id="taxIndividualIncomeGroup"
                              label="个税起征点(元)"
                              label-for="taxIndividualIncomeBase">
                  <b-form-input id="taxIndividualIncomeBase"
                                type="number"
                                v-model="form.taxIndividualIncomeBase"
                                required
                                placeholder="税前工资(元)">
                  </b-form-input>
                </b-form-group>
              </div>
              <div class="col-sm">
                <div style="color: red">
                * 2018年新政：个税起征点预计调整至5000元
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm">
                <b-form-group id="taxSocialSecurityBaseGroup"
                              label="五险基数(元)"
                              label-for="taxSocialSecurityBase">
                  <el-row id="taxSocialSecurityBase">
                    <el-col :span="8">
                      <el-switch
                        v-model="form.fullSocialSecurity"
                        active-text="全额缴纳"
                        active-color="#13ce66">
                      </el-switch>
                    </el-col>
                    <el-col :span="16">
                      <el-input type="number"
                                v-model="form.taxSocialSecurityBase"
                                :disabled="form.fullSocialSecurity"
                                placeholder="五险基数(元)">
                      </el-input>
                    </el-col>
                  </el-row>
                </b-form-group>
              </div>
              <div class="col-sm">
                <b-form-group id="taxProvidentFundBaseGroup"
                              label="公积金基数(元)"
                              label-for="taxProvidentFundBase">
                  <el-row id="taxProvidentFundBase">
                    <el-col :span="8">
                      <el-switch
                        v-model="form.fullProvidentFund"
                        active-color="#13ce66"
                        active-text="全额缴纳">
                      </el-switch>
                    </el-col>
                    <el-col :span="16">
                      <el-input type="number"
                                v-model="form.taxProvidentFundBase"
                                :disabled="form.fullProvidentFund"
                                placeholder="公积金基数(元))">
                      </el-input>
                    </el-col>
                  </el-row>
                </b-form-group>
              </div>
            </div>
            <b-form-group id="taxDetailGroup"
                          label="扣税明细"
                          label-for="taxDetail">
              <div>
                <table class="table">
                  <thead>
                  <tr>
                    <th>项目</th>
                    <th>个人缴纳比例(%)</th>
                    <th>个人缴纳金额(元)</th>
                    <th>企业缴纳比例(%)</th>
                    <th>企业缴纳金额(元)</th>
                  </tr>
                  </thead>
                  <tbody class="input-padding-zero">
                  <tr>
                    <td>
                      养老保险
                    </td>
                    <td>
                      <el-input type="number" v-model="form.person.yanglaoRate"
                                class="pull-right"></el-input>
                    </td>
                    <td>
                      {{ tax.person.yanglao }}
                    </td>
                    <td>
                      <el-input type="number" v-model="form.company.yanglaoRate"
                                class="pull-right"></el-input>
                    </td>
                    <td>
                      {{ tax.company.yanglao }}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      医疗保险
                    </td>
                    <td>
                      <el-input type="number" v-model="form.person.yiliaoRate"
                                class="pull-right"></el-input>
                    </td>
                    <td>
                      {{ tax.person.yiliao }}
                    </td>
                    <td>
                      <el-input type="number" v-model="form.company.yiliaoRate"
                                class="pull-right"></el-input>
                    </td>
                    <td>
                      {{ tax.company.yiliao }}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      失业保险
                    </td>
                    <td>
                      <el-input type="number" v-model="form.person.shiyeRate"
                                class="pull-right"></el-input>
                    </td>
                    <td>
                      {{ tax.person.shiye }}
                    </td>
                    <td>
                      <el-input type="number" v-model="form.company.shiyeRate"
                                class="pull-right"></el-input>
                    </td>
                    <td>
                      {{ tax.company.shiye }}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      工伤保险
                    </td>
                    <td>
                      <el-input type="number" v-model="form.person.gongshangRate"
                                class="pull-right"></el-input>
                    </td>
                    <td>
                      {{ tax.person.gongshang }}
                    </td>
                    <td>
                      <el-input type="number" v-model="form.company.gongshangRate"
                                class="pull-right"></el-input>
                    </td>
                    <td>
                      {{ tax.company.gongshang }}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      生育保险
                    </td>
                    <td>
                      <el-input type="number" v-model="form.person.shengyuRate"
                                class="pull-right"></el-input>
                    </td>
                    <td>
                      {{ tax.person.shengyu }}
                    </td>
                    <td>
                      <el-input type="number" v-model="form.company.shengyuRate"
                                class="pull-right"></el-input>
                    </td>
                    <td>
                      {{ tax.company.shengyu }}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      公积金
                    </td>
                    <td>
                      <el-input type="number" v-model="form.person.gongjijinRate"
                                class="pull-right"></el-input>
                    </td>
                    <td>
                      {{ tax.person.gongjijin }}
                    </td>
                    <td>
                      <el-input type="number" v-model="form.company.gongjijinRate"
                                class="pull-right"></el-input>
                    </td>
                    <td>
                      {{ tax.company.gongjijin }}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      个人所得税
                    </td>
                    <td>{{ this.form.taxIndividualIncomeRate }}</td>
                    <td>
                      {{ form.taxIndividualIncome }}
                    </td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>
                      合计
                    </td>
                    <td>
                      {{ tax.person_rate }}
                    </td>
                    <td>
                      {{ tax.person_sum }}
                    </td>
                    <td>
                      {{ tax.company_rate }}
                    </td>
                    <td>
                      {{ tax.company_sum }}
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </b-form-group>
          </b-form>
        </b-tab>
        <b-tab title="实习工资计算器">
          待开放
        </b-tab>
      </b-tabs>
    </b-card>
    <br/>
    <div style="display: none">
      <img :src="monitorUrl">
    </div>
  </div>
</template>

<script>
  import ElInput from "element-ui/packages/input/src/input";
  import Index from "./index";

  export default {
    components: {
      Index,
      ElInput
    },
    name: 'salary',
    created: function () {

    },
    data() {
      return {
        form: {
          salary: null, // 税前工资
          taxIndividualIncomeBase: 5000, // 个税起征点
          fullSocialSecurity: true, // 是否全额缴纳五险
          fullProvidentFund: true, // 是否全额缴纳公积金
          taxSocialSecurityBase: null, // 社保基数
          taxProvidentFundBase: null, // 公积金基数
          taxSocialSecuritySum: null, // 社保总计
          taxProvidentFundSum: null, // 公积金
          taxIndividualIncome: null, // 个税
          taxIndividualIncomeRate: null, // 个税税率
          person: { // 个人五险一金比例
            yanglaoRate: 8,
            yiliaoRate: 2,
            shiyeRate: 0.2,
            gongshangRate: 0,
            shengyuRate: 0,
            gongjijinRate: 12,
          },
          company: { // 企业五险一金比例
            yanglaoRate: 20,
            yiliaoRate: 6,
            shiyeRate: 2,
            gongshangRate: 0.5,
            shengyuRate: 1,
            gongjijinRate: 12,
          },
        },
        items: [{
          text: 'WebList',
          href: '/'
        }, {
          text: '工具',
          active: true
        }],
        monitorUrl: 'http://106.14.193.52:8080/v1/access_log?app=weblist&path=/tools/salary',
        meta: {
          title: 'WebList|2018最新工资计算器',
          description: '2018最新工资计算器，个税起征点上调',
          keywords: '2018,最新,工资计算器,个税,起征点,上调'
        }
      }
    },
    computed: {
      tax: function () {
        let p = this.form.person;
        let c = this.form.company;
        let p_rate = (
          parseFloat(p.yanglaoRate) + parseFloat(p.yiliaoRate) + parseFloat(p.shiyeRate) +
          parseFloat(p.gongshangRate) + parseFloat(p.shengyuRate));
        let c_rate = (
          parseFloat(c.yanglaoRate) + parseFloat(c.yiliaoRate) + parseFloat(c.shiyeRate) +
          parseFloat(c.gongshangRate) + parseFloat(c.shengyuRate));

        // 全额缴纳社保、公积金时，基数与税前工资相同
        if (this.form.fullSocialSecurity) {
          this.form.taxSocialSecurityBase = this.form.salary;
        }
        if (this.form.fullProvidentFund) {
          this.form.taxProvidentFundBase = this.form.salary;
        }

        // 计算社保之和
        this.form.taxSocialSecuritySum = (this.form.taxSocialSecurityBase * p_rate / 100).toFixed(2);
        // 公积金
        this.form.taxProvidentFundSum = (this.form.taxProvidentFundBase * p.gongjijinRate / 100).toFixed(2);

        // 计算个税
        let left = this.form.salary - this.form.taxSocialSecuritySum - this.form.taxProvidentFundSum;
        let left_tax = left - this.form.taxIndividualIncomeBase;  // 应纳税所得额
        if (left_tax <= 0) {
          this.form.taxIndividualIncome = 0;
        }
        else if (left_tax <= 1455) {
          this.form.taxIndividualIncome = parseFloat(left_tax * 0.03).toFixed(2);
        }
        else if (left_tax <= 4155) {
          this.form.taxIndividualIncome = parseFloat(left_tax * 0.1 - 105).toFixed(2);
        }
        else if (left_tax <= 7755) {
          this.form.taxIndividualIncome = parseFloat(left_tax * 0.2 - 555).toFixed(2);
        }
        else if (left_tax <= 27255) {
          this.form.taxIndividualIncome = parseFloat(left_tax * 0.25 - 1005).toFixed(2);
        }
        else if (left_tax <= 41255) {
          this.form.taxIndividualIncome = parseFloat(left_tax * 0.3 - 2755).toFixed(2);
        }
        else if (left_tax <= 57505) {
          this.form.taxIndividualIncome = parseFloat(left_tax * 0.35 - 5505).toFixed(2);
        }
        else {
          this.form.taxIndividualIncome = parseFloat(left_tax * 0.45 - 13505).toFixed(2);
        }

        if (this.form.salary != null) {
          this.form.taxIndividualIncomeRate = (this.form.taxIndividualIncome / this.form.salary).toFixed(2)
        }
        else {
          this.form.taxIndividualIncomeRate = 0
        }

        return {
          person_rate: (p_rate + parseFloat(this.form.person.gongjijinRate) + parseFloat(this.form.taxIndividualIncomeRate)).toFixed(2),
          person_sum: (parseFloat(this.form.taxSocialSecuritySum) + parseFloat(this.form.taxProvidentFundSum) + parseFloat(this.form.taxIndividualIncome)).toFixed(2),
          company_rate: c_rate + parseFloat(this.form.company.gongjijinRate),
          company_sum: (this.form.taxSocialSecurityBase * c_rate / 100 +
            this.form.taxProvidentFundBase * c.gongjijinRate / 100).toFixed(2),
          result: (this.form.salary - this.form.taxIndividualIncome - this.form.taxSocialSecuritySum - this.form.taxProvidentFundSum).toFixed(2),
          person: {
            yanglao: (this.form.taxSocialSecurityBase * p.yanglaoRate / 100).toFixed(2),
            yiliao: (this.form.taxSocialSecurityBase * p.yiliaoRate / 100).toFixed(2),
            shiye: (this.form.taxSocialSecurityBase * p.shiyeRate / 100).toFixed(2),
            gongshang: (this.form.taxSocialSecurityBase * p.gongshangRate / 100).toFixed(2),
            shengyu: (this.form.taxSocialSecurityBase * p.shengyuRate / 100).toFixed(2),
            gongjijin: (this.form.taxProvidentFundBase * p.gongjijinRate / 100).toFixed(2),
          },
          company: {
            yanglao: (this.form.taxSocialSecurityBase * c.yanglaoRate / 100).toFixed(2),
            yiliao: (this.form.taxSocialSecurityBase * c.yiliaoRate / 100).toFixed(2),
            shiye: (this.form.taxSocialSecurityBase * c.shiyeRate / 100).toFixed(2),
            gongshang: (this.form.taxSocialSecurityBase * c.gongshangRate / 100).toFixed(2),
            shengyu: (this.form.taxSocialSecurityBase * c.shengyuRate / 100.).toFixed(2),
            gongjijin: (this.form.taxProvidentFundBase * p.gongjijinRate / 100).toFixed(2),
          }
        }
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
  .form {
    text-align: left;
  }

  .el-row {
    margin-bottom: 5px;

  &
  :last-child {
    margin-bottom: 0;
  }

  }
  .el-col {
    border-radius: 4px;
  }

  .bg-white {
    background: white;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

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
  }

  a {
    color: #42b983;
  }

  .pull-right input {
    text-align: right;
  }

  .table th {
    width: 20%;
  }

  .input-padding-zero input {
    padding: 0;
  }
</style>
