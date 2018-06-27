<template>
  <div>
    <feedback></feedback>
    <b-breadcrumb :items="items"/>
    <h1 class="title">工资计算器</h1>
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
                          placeholder="税前工资(元)"
            >
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
                        label="个税起征点"
                        label-for="taxIndividualIncomeBase">
            <el-row>
              <el-col :span="23">
                <b-form-select id="taxIndividualIncomeBase" v-model="form.taxIndividualSelector.selected"
                               :options="form.taxIndividualSelector.options" class="mb-3"/>
              </el-col>
              <el-col :span="1">
                <a href="#info">
                      <span style="font-size: 24px;text-align: center">
                      <i class='el-icon-question'></i>
                      </span>
                </a>
              </el-col>
            </el-row>
          </b-form-group>
        </div>
        <div class="col-sm">
          <!--<div style="color: red">-->
          <!--* 个税起征点拟调整至5000元<a href="#info">查看详情</a>-->
          <!--</div>-->
        </div>
      </div>
      <hr>
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
              <el-col :span="15">
                <el-input type="number"
                          v-model="form.taxSocialSecurityBase"
                          :disabled="form.fullSocialSecurity"
                          placeholder="五险基数(元)">
                </el-input>
              </el-col>
              <el-col :span="1">
                      <span style="font-size: 24px;text-align: center">
                      <i class='el-icon-question' @click="changeDescriptionShow()"></i>
                      </span>
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
              <el-col :span="15">
                <el-input type="number"
                          v-model="form.taxProvidentFundBase"
                          :disabled="form.fullProvidentFund"
                          placeholder="公积金基数(元))">
                </el-input>
              </el-col>
              <el-col :span="1">
                      <span style="font-size: 24px;text-align: center">
                      <i class='el-icon-question' @click="changeDescriptionShow()"></i>
                      </span>
              </el-col>
            </el-row>
          </b-form-group>
        </div>
      </div>
      <div v-if="descriptionShow" style="font-size: 12px;">
        <p>
          <a style="color: #007bff;" target="_blank"
             href="http://www.bjrbj.gov.cn/csibiz/home/static/articles/catalog_75200/2018-06-04/article_ff808081583de24e0163c85ce890038e/ff808081583de24e0163c85ce890038e.html">2018年社保政策：</a>
          存缴基数上限：25401元，养老、失业基数下限：3387元，医疗、工伤、生育基数下限：5080元。
        </p>
        <p>
          <a style="color: #007bff;" target="_blank"
             href="http://www.zzz.gov.cn/html/zcfg/jc/14021.html">2017公积金政策：</a>
          存缴基数上限：23118元，下限：2148元。
        </p>
      </div>
      <hr>
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
    <!--</b-tab>-->
    <!--<b-tab title="实习工资计算器">-->
    <!--待开放-->
    <!--</b-tab>-->
    <!--</b-tabs>-->
    <b-card no-body>
      <b-tabs small card>
        <b-tab title="2018个税信息">
          <div>
            <h3><a id="info" name="info" href="#info">2018最新个人所得税政策</a></h3>
            <b-alert show variant="secondary">
              <h4 class="alert-heading">
                <a href="http://npc.people.com.cn/n1/2018/0620/c14576-30067269.html" target="_blank">
                  《十三届全国人大常委会第三次会议审议多部法律草案》--人大新闻网
                </a>
              </h4>
              <h5>个人所得税法修正案草案初次审议</h5>
              <h6>个税起征点拟由每月3500元提至5000元</h6>
              <p>
                本报北京6月19日电
                （记者彭波）19日，十三届全国人大常委会第三次会议审议了《中华人民共和国个人所得税法修正案（草案）》。财政部部长刘昆在作说明时表示，草案综合考虑人民群众消费支出水平增长等各方面因素，将工资、薪金、劳务报酬、稿酬等所得的基本减除费用标准提高到5000元/月（6万元/年）...
              </p>
              <a href="http://npc.people.com.cn/n1/2018/0620/c14576-30067269.html" target="_blank">
                点击查看
              </a>
            </b-alert>
            <hr>
            <h5>应纳税所得额计算公式</h5>
            <p>
              应纳税所得额(m) = 税前工资(s) - 五险一金缴纳数额(t) - 起征点5000元(b)
            </p>
            <hr>
            <h5>个人所得税税率表</h5>
            <span style="font-size: 12px;color: red">注：15000、25000阶梯待确认</span>
            <table style="width: 100%">
              <tbody align="center">
              <tr>
                <th>
                  级数
                </th>
                <th>
                  应纳税所得额(m)
                </th>
                <th style="width: 80px;">
                  税率(%)
                </th>
              </tr>
              <tr>
                <td>
                  1
                </td>
                <td>
                  m <= 4500
                </td>
                <td>
                  3
                </td>
              </tr>
              <tr>
                <td>
                  2
                </td>
                <td>
                  4500 < m <= 15000
                </td>
                <td>
                  10
                </td>
              </tr>
              <tr>
                <td>
                  3
                </td>
                <td>
                  15000 < m <= 25000
                </td>
                <td>
                  20
                </td>
              </tr>
              <tr>
                <td>
                  4
                </td>
                <td>
                  25000 < m <= 35000
                </td>
                <td>
                  25
                </td>
              </tr>
              <tr>
                <td>
                  5
                </td>
                <td>
                  35000 < m <= 55000
                </td>
                <td>
                  30
                </td>
              </tr>
              <tr>
                <td>
                  6
                </td>
                <td>
                  55000 < m <= 80000
                </td>
                <td>
                  35
                </td>
              </tr>
              <tr>
                <td>
                  7
                </td>
                <td>
                  m > 80000
                </td>
                <td>
                  45
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </b-tab>
        <b-tab title="历史个税信息">
          <div>
            <h4>个人所得税计算公式</h4>
            <p>
              应纳税所得额(m) = 税前工资(s) - 五险一金缴纳数额(t) - 起征点3500元(b)
            </p>
            <table style="width: 100%">
              <tbody align="center">
              <tr>
                <th>
                  级数
                </th>
                <th>
                  应纳税所得额(m)
                </th>
                <th style="width: 80px;">
                  税率(%)
                </th>
              </tr>
              <tr>
                <td>
                  1
                </td>
                <td>
                  m <= 1500
                </td>
                <td>
                  3
                </td>
              </tr>
              <tr>
                <td>
                  2
                </td>
                <td>
                  1500 < m <= 4500
                </td>
                <td>
                  10
                </td>
              </tr>
              <tr>
                <td>
                  3
                </td>
                <td>
                  4500 < m <= 9000
                </td>
                <td>
                  20
                </td>
              </tr>
              <tr>
                <td>
                  4
                </td>
                <td>
                  9000 < m <= 35000
                </td>
                <td>
                  25
                </td>
              </tr>
              <tr>
                <td>
                  5
                </td>
                <td>
                  35000 < m <= 55000
                </td>
                <td>
                  30
                </td>
              </tr>
              <tr>
                <td>
                  6
                </td>
                <td>
                  55000 < m <= 80000
                </td>
                <td>
                  35
                </td>
              </tr>
              <tr>
                <td>
                  7
                </td>
                <td>
                  m > 80000
                </td>
                <td>
                  45
                </td>
              </tr>
              </tbody>
            </table>
          </div>
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
  import feedback from "../components/feedback";

  export default {
    components: {
      Index,
      ElInput,
      feedback
    },
    name: 'salary',
    created: function () {

    },
    data() {
      return {
        form: {
          salary: null, // 税前工资
          // taxIndividualIncomeBase: 5000, // 个税起征点
          fullSocialSecurity: true, // 是否全额缴纳五险
          fullProvidentFund: true, // 是否全额缴纳公积金
          taxSocialSecurityBase: null, // 社保基数
          MaxTaxSocialSecurityBase: 25401, // 社保基数上限
          taxProvidentFundBase: null, // 公积金基数
          MaxTaxProvidentFundBase: 23118, // 公积金基数上限
          MinTaxProvidentFundBase: 2148, // 公积金基数下限
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
          taxIndividual: [
            {
              version: 2018,
              base: 5000,
              steps: {
                1: {value: 4500, rate: 0.03, differ: 0},
                2: {value: 15000, rate: 0.1, differ: 315},
                3: {value: 25000, rate: 0.2, differ: 1815},
                4: {value: 35000, rate: 0.25, differ: 3065},
                5: {value: 55000, rate: 0.3, differ: 4815},
                6: {value: 80000, rate: 0.35, differ: 7565},
                7: {value: '', rate: 0.45, differ: 15565},
              },
            },
            {
              version: 2011,
              base: 3500,
              steps: {
                1: {value: 1500, rate: 0.03, differ: 0},
                2: {value: 4500, rate: 0.1, differ: 105},
                3: {value: 9000, rate: 0.2, differ: 555},
                4: {value: 35000, rate: 0.25, differ: 1005},
                5: {value: 55000, rate: 0.3, differ: 2755},
                6: {value: 80000, rate: 0.35, differ: 5505},
                7: {value: '', rate: 0.45, differ: 13505},
              },
            },
          ],
          taxIndividualSelector: {
            selected: 0,
            options: [
              {value: 0, text: '2018年-5000元'},
              {value: 1, text: '2011年-3500元'},
            ]
          }
        },
        items: [{
          text: 'WebList',
          href: '/'
        }, {
          text: '工资计算器',
          active: true
        }],
        monitorUrl: 'http://106.14.193.52:8080/v1/access_log?app=weblist&path=/tools/salary',
        meta: {
          title: '2018最新工资计算器',
          description: '2018最新工资计算器，个税起征点上调',
          keywords: '2018,最新,工资计算器,个税,起征点,上调'
        },
        descriptionShow: false,
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

        if (this.form.salary >= 1500) {
          // 全额缴纳社保时，设置上限
          if (this.form.fullSocialSecurity) {
            this.form.taxSocialSecurityBase = Math.min(this.form.salary, this.form.MaxTaxSocialSecurityBase);
          }

          // 全额缴纳公积金时，设置下限，上限
          if (this.form.fullProvidentFund) {
            this.form.taxProvidentFundBase = Math.min(Math.max(this.form.salary, this.form.MinTaxProvidentFundBase), this.form.MaxTaxProvidentFundBase);
          }
        }
        else {
          this.form.taxSocialSecurityBase = 0;
          this.form.taxProvidentFundBase = 0;
        }
        // 设置五险基数下限, 取消下限设置
        // let yanglaoShiyeBase = 0;
        // let yiliaoGongshangShengyuBase = 0;
        // let yiliaoPerson = 0;
        // if (this.form.salary >= 1500) {
        //   yanglaoShiyeBase = (Math.max(this.form.taxSocialSecurityBase, this.form.MaxTaxSocialSecurityBase / 3 * 0.4)).toFixed(2);
        //   yiliaoGongshangShengyuBase = (Math.max(this.form.taxSocialSecurityBase, this.form.MaxTaxSocialSecurityBase / 3 * 0.6)).toFixed(2);
        //   yiliaoPerson = (this.form.taxSocialSecurityBase * p.yiliaoRate / 100 + 3).toFixed(2)
        // }

        let yiliaoPerson = 0;
        if (this.form.salary > 1500) {
          yiliaoPerson = (this.form.taxSocialSecurityBase * p.yiliaoRate / 100 + 3).toFixed(2);
        }

        // 计算个人、公司 五险一金明细
        let person = {
          yanglao: (this.form.taxSocialSecurityBase * p.yanglaoRate / 100).toFixed(2),
          yiliao: yiliaoPerson,
          shiye: (this.form.taxSocialSecurityBase * p.shiyeRate / 100).toFixed(2),
          gongshang: (this.form.taxSocialSecurityBase * p.gongshangRate / 100).toFixed(2),
          shengyu: (this.form.taxSocialSecurityBase * p.shengyuRate / 100).toFixed(2),
          gongjijin: (this.form.taxProvidentFundBase * p.gongjijinRate / 100).toFixed(2),
        };
        let company = {
          yanglao: (this.form.taxSocialSecurityBase * c.yanglaoRate / 100).toFixed(2),
          yiliao: (this.form.taxSocialSecurityBase * c.yiliaoRate / 100).toFixed(2),
          shiye: (this.form.taxSocialSecurityBase * c.shiyeRate / 100).toFixed(2),
          gongshang: (this.form.taxSocialSecurityBase * c.gongshangRate / 100).toFixed(2),
          shengyu: (this.form.taxSocialSecurityBase * c.shengyuRate / 100.).toFixed(2),
          gongjijin: (this.form.taxProvidentFundBase * p.gongjijinRate / 100).toFixed(2),
        };

        // 计算个人社保纳税和
        this.form.taxSocialSecuritySum = [
          parseFloat(person.yanglao),
          parseFloat(person.yiliao),
          parseFloat(person.shiye),
          parseFloat(person.gongshang),
          parseFloat(person.shengyu)
        ].reduce((a, b) => a + b, 0);

        // 计算公积金，并设置存缴上限
        this.form.taxProvidentFundSum = Math.min(
          (this.form.taxProvidentFundBase * p.gongjijinRate / 100).toFixed(2),
          this.form.MaxTaxProvidentFundBase * 0.24);

        // 使用选中的个税方案
        let taxIndividual = this.form.taxIndividual[this.form.taxIndividualSelector.selected];

        // 应纳税所得额
        let left_tax =
          (this.form.salary
            - this.form.taxSocialSecuritySum
            - this.form.taxProvidentFundSum
            - taxIndividual.base).toFixed(2);

        // 计算个税
        if (left_tax <= 0) {
          this.form.taxIndividualIncome = 0;
        }
        else {
          for (let step in taxIndividual.steps) {
            if (step == 7 || left_tax <= taxIndividual.steps[step].value) {
              this.form.taxIndividualIncome = parseFloat(left_tax * taxIndividual.steps[step].rate - taxIndividual.steps[step].differ).toFixed(2);
              break
            }
          }
        }

        // 计算个税平均税率
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
          company_sum: (this.form.taxSocialSecurityBase * c_rate / 100 + this.form.taxProvidentFundBase * c.gongjijinRate / 100).toFixed(2),
          result: (this.form.salary - this.form.taxIndividualIncome - this.form.taxSocialSecuritySum - this.form.taxProvidentFundSum).toFixed(2),
          person: person,
          company: company,
        }
      },
    }
    ,
    mounted: function () {
      document.title = this.meta.title;
      document.getElementById('description').content = this.meta.description;
      document.getElementById('keywords').content = this.meta.keywords;
    },
    methods: {
      changeDescriptionShow: function () {
        this.descriptionShow = !this.descriptionShow
      }
    }
  }

</script>


<style>
  .form {
    text-align: left;
  }

  /*.el-row {*/
  /*margin-bottom: 5px*/
  /*}*/

  /*.el-row:last-child {*/
  /*margin-bottom: 0;*/
  /*}*/

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

  table {
    font-size: 12px;
  }

  .el-input__inner {
    font-size: 12px;
    height: 20px;
  }

  .title {
    font-size: 1.5rem;
    font-weight: 400;
    line-height: 1.5;
    text-align: left;
    margin-bottom: 10px
  }
</style>
