<template>
  <div>
    <el-row class="wrap">
      <el-col :span="6" class="left">
        <h3>{{ titleInfo.title }}</h3>
        <el-tooltip
          effect="dark"
          :content="titleInfo.summary"
          placement="top"
          class="title-tips"
        >
          <i class="el-icon-question"></i>
        </el-tooltip>
      </el-col>
      <el-col :span="18" class="right">
        <filter-form
          :data-json="dataJson"
          :has-clear="true"
          @change="handleFilterChange"
        >
          <template v-slot="slotProps">
            <slot :filterData="slotProps.filterData"></slot>
          </template>
        </filter-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import FilterForm from "@/components/FilterBlock/FilterForm";

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
        summary: undefined
      })
    },
    // 是否显示clear按钮
    hasClear: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  methods: {
    handleFilterChange(filterData, value, key, index) {
      this.$emit("change", filterData, value, key, index);
    }
  }
};
</script>

<style scoped lang="scss">
.wrap {
  display: flex;
  border: 1px dashed darkgray;
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
