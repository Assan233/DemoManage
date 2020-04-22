<template>
  <div class="filter-wrap">
    <div
      v-for="(item, index) in filterInfo"
      :key="item.key"
      class="filter-item"
    >
      <div class="item-label">{{ item.label }}</div>
      <!-- input -->
      <el-input
        v-if="item.type === 'el-input'"
        v-model="filterData[item.key]"
        v-bind="item.config"
        class="item-input"
        @change="
          $emit('change', filterData, filterData[item.key], item.key, index)
        "
      ></el-input>

      <!-- radio-->
      <el-radio-group
        v-else-if="item.type === 'el-radio-group'"
        v-model="filterData[item.key]"
        v-bind="item.config"
        class="item-input"
        @change="
          $emit('change', filterData, filterData[item.key], item.key, index)
        "
      >
        <template v-if="item.optionType === 'button'">
          <el-radio-button
            v-for="option in item.options"
            :key="option.label"
            v-bind="option"
            >{{ option.name }}</el-radio-button
          >
        </template>

        <template v-else>
          <el-radio
            v-for="option in item.options"
            :key="option.label"
            v-bind="option"
            >{{ option.name }}</el-radio
          >
        </template>
      </el-radio-group>

      <!-- checkbox-->
      <el-checkbox-group
        v-else-if="item.type === 'el-checkbox-group'"
        v-model="filterData[item.key]"
        v-bind="item.config"
        class="item-input"
        @change="
          $emit('change', filterData, filterData[item.key], item.key, index)
        "
      >
        <template v-if="item.optionType === 'button'">
          <el-checkbox-button
            v-for="option in item.options"
            :key="option.label"
            v-bind="option"
            >{{ option.name }}</el-checkbox-button
          >
        </template>

        <template v-else>
          <el-checkbox
            v-for="option in item.options"
            :key="option.label"
            v-bind="option"
            >{{ option.name }}</el-checkbox
          >
        </template>
      </el-checkbox-group>
      <!-- input-number -->
      <el-input-number
        v-else-if="item.type === 'el-input-number'"
        v-model="filterData[item.key]"
        v-bind="item.config"
        class="item-input"
        @change="
          $emit('change', filterData, filterData[item.key], item.key, index)
        "
      ></el-input-number>

      <!-- select -->
      <el-select
        v-else-if="item.type === 'el-select'"
        v-model="filterData[item.key]"
        v-bind="item.config"
        class="item-input"
        @change="
          $emit('change', filterData, filterData[item.key], item.key, index)
        "
      >
        <el-option
          v-for="option in item.options"
          :key="option.label"
          v-bind="option"
        ></el-option>
      </el-select>

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
        const isArray = item.type === "el-checkbox-group";
        let initValue = isArray ? [] : null;
        this.$set(this.filterData, item.key, initValue);
        // this.filterData[item.key] = null;
      });
    }
    // eventHappened(key) {
    //   console.log(key);
    //   // console.log(this.filterData[key]);
    //   // console.log(this.dataJson[0].config.event.change);
    //   // console.log(self);
    //   this.dataJson[0].config.event.change(key);
    // }
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
