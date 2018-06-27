<template>
  <div>
    <mp-cell-group title="表单">
      <mp-field
        placeholder="税前工资(元)"
        v-model="form.salary"
        type="number"
        required
        label="税前工资(元)"
      />
      <mp-field
        label="税前工资(元)"
        :value="tax.result"
        disabled
        type="number"
      />
    </mp-cell-group>
    <mp-radio
      v-model="selected"
      :options="options"
      :title="单选列表项"
    />
    <mp-radio
      v-model="form.taxIndividualSelector.selected"
      :options="form.taxIndividualSelector.options"
      :title="form.taxIndividualSelector.title"
    />
  </div>
</template>

<script>
  import MpField from 'mp-weui/packages/field'
  import MpRadio from 'mp-weui/packages/field'



  export default {
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
            title: '个税起征点',
            selected: '0',
            options: [
              {value: '0', label: '2018年-5000元'},
              {value: '1', label: '2011年-3500元'},
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
        selected: 'A',
        options: [
          {
            label: '被禁用',
            value: 'A',
            disabled: true
          },
          {
            label: '选项B',
            value: 'B'
          },
          {
            label: '选项C',
            value: 'C'
          }
        ]
      }
    },
    components: {
      MpField,
      MpRadio
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
    },
    methods: {
      changeDescriptionShow: function () {
        this.descriptionShow = !this.descriptionShow
      }
    }
  }
</script>

<style scoped>
</style>
