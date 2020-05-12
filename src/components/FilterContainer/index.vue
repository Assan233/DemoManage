<template>
  <div>
    <el-row class="wrap">
      <el-col :span="span[0]" class="left">
        <h3>{{ titleInfo.title }}</h3>
        <el-tooltip
          v-if="titleInfo.summary"
          effect="dark"
          :content="titleInfo.summary"
          placement="top"
          class="title-tips"
        >
          <i class="el-icon-question"></i>
        </el-tooltip>
      </el-col>
      <el-col :span="span[1]" class="right">
        <filter-form
          :data-json="dataJson"
          :has-clear="hasClear"
          @change="handleFilterChange"
          @filterClear="handleFilterClear"
        >
          <!-- 筛选功能-表单元素slot -->
          <template v-slot:formSlot="slotProps">
            <slot :filterData="slotProps.filterData" name="formSlot"></slot>
          </template>

          <!-- 操作功能-slot -->
          <template v-slot:operateSlot="slotProps">
            <slot :filterData="slotProps.filterData" name="operateSlot"></slot>
          </template>
        </filter-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import FilterForm from "@/components/FilterContainer/FilterForm";

export default {
  components: { FilterForm },
  props: {
    // filter表单配置项
    dataJson: {
      type: Array,
      default: () => []
    },
    // filter表单配置项
    titleInfo: {
      type: Object,
      default: () => ({
        title: "",
        summary: ""
      })
    },
    // 是否显示clear按钮
    hasClear: {
      type: Boolean,
      default: false
    },
    // 控制组件栅格布局
    span: {
      type: Array,
      default: () => [3, 21]
    }
  },
  data() {
    return {};
  },
  methods: {
    handleFilterChange(filterData, value, key, index) {
      this.$emit("change", filterData, value, key, index);
    },
    handleFilterClear(nullFilterData) {
      this.$emit("filterClear", nullFilterData);
    }
  }
};
</script>

<style scoped lang="scss">
.wrap {
  display: flex;
  padding: 20px 25px 12px;
  background-color: #fff;
  border-bottom: 1px solid #e9e9e9;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
}
.left {
  .title-tips,
  h3 {
    top: calc(50% - 12px);
    position: relative;
    display: inline-block;
    margin: 0 4px;
  }
  .title-tips {
    color: #ccc;
  }
}
</style>
