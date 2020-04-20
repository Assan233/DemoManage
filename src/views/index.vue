<template>
  <div>
    <el-row class="wrap">
      <el-col :span="4" class="left">
        <h3>Title</h3>
      </el-col>
      <el-col :span="20" class="right">
        <filter-block :data-json="dataJson" @change="handleFilterChange">
        </filter-block>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import FilterBlock from "@/components/FilterBlock";

export default {
  components: { FilterBlock },
  data() {
    return {
      str: "Assan",
      dataJson: [
        {
          label: "名称",
          type: "el-radio-group", // form类型 (为element的组件名)
          optionType: "button",
          // ele配置项
          config: {
            placeholder: "请输入名称",
            type: "", // 表单组件名称, 如. textarea
            clearable: true,
            disabled: false,
            maxlength: false,
            minlength: false,
            autosize: false,
            autocomplete: false,
            size: "",
            rows: 4, // 默认1
            "show-password": false,
            "suffix-icon": false,
            "prefix-icon": false
            // 所有slot配置项
            // slot: {
            //   prepend: "", //复合型输入框-前置
            //   append: "" //复合型输入框-后置
            // }
          },
          // 选项data
          options: [
            {
              label: "选项一",
              value: "1"
            },
            {
              label: "选项二",
              value: "2"
            },
            {
              label: "选项三",
              value: "3"
            },
            {
              label: "选项四",
              value: "4"
            }
          ]
        }
      ]
    };
  },
  methods: {
    handleFilterChange(filterData, value, key) {
      console.log(filterData, value, key);
    }
  }
};
</script>

<style>
.wrap {
  border: 1px dashed darkgray;
}
.right {
  /* border: 1px dashed darkgray; */
}
</style>
