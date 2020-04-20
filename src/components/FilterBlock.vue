<template>
  <div class="filter-wrap">
    <div
      v-for="(item, index) in filterInfo"
      :key="item.key"
      class="filter-item"
    >
      <div class="item-label">{{ item.label }}</div>
      <el-input
        v-if="item.type === 'el-input'"
        v-model="filterData[item.key]"
        v-bind="item.config"
        class="item-input"
        @change="
          $emit('change', filterData, filterData[item.key], item.key, index)
        "
      ></el-input>
      <el-radio-group
        v-else-if="item.type === 'el-radio-group'"
        v-model="filterData[item.key]"
        v-bind="item.config"
        class="item-input"
        @change="
          $emit('change', filterData, filterData[item.key], item.key, index)
        "
      >
        <el-radio
          v-for="option in item.options"
          :key="option.label"
          :label="option.value"
          >{{ option.label }}</el-radio
        >
      </el-radio-group>
      <h3>
        {{ filterData[item.key] }}
      </h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "FilterBlock",
  components: {},
  props: {
    dataJson: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      filterData: {}, // 筛选数据对象
      filterInfo: null,
      types: [
        "el-radio-group",
        "el-checkbox-group",
        "el-input",
        "el-input-number",
        "el-select",
        "el-cascader",
        "el-switch",
        "el-slider",
        "el-time-picker",
        "el-date-picker",
        "el-rate"
      ]
    };
  },
  created() {
    this.initFilter();
  },
  methods: {
    initFilter() {
      this.filterInfo = JSON.parse(JSON.stringify(this.dataJson));
      this.dataJson.map(item => {
        this.$set(this.filterData, item.key, null);
        // this.filterData[item.key] = null;
      });
    },
    eventHappened(key) {
      console.log(key);
      // console.log(this.filterData[key]);
      // console.log(this.dataJson[0].config.event.change);
      // console.log(self);
      this.dataJson[0].config.event.change(key);
    }
  }
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
