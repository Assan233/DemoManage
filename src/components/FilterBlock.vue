<template>
  <div class="filter-wrap">
    <div class="filter-item">
      <div class="item-label">label:</div>
      <el-input
        v-model="input"
        placeholder="请输入内容"
        class="item-input"
      ></el-input>
    </div>
    <div class="filter-item">
      <div class="item-label">label:</div>
      <el-input
        v-model="input"
        placeholder="请输入内容"
        class="item-input"
      ></el-input>
    </div>
    <div class="filter-item">
      <div class="item-label">label:</div>
      <el-input
        v-model="input"
        placeholder="请输入内容"
        class="item-input"
      ></el-input>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "FilterBlock",
  components: {},
  props: {
    dataJson: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      input: "",
      filterData: [
        {
          type: ""
        }
      ]
    };
  },
  methods: {}
};
</script>
<style scoped lang="scss">
.filter-wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 100%;
  .filter-item {
    padding: 8px;
    .item-label {
      display: inline-block;
      margin-right: 8px;
    }
    .item-input {
      display: inline-block;
      width: auto;
    }
  }
}
</style>
