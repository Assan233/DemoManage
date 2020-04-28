<template>
  <div class="filter-wrap">
    <div
      v-for="(item, index) in filterInfo"
      :key="item.key"
      class="filter-item"
    >
      <div class="item-label">{{ item.label }}</div>
      <!-- Radio-->
      <el-radio-group
        v-if="item.type === 'el-radio-group'"
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

      <!-- Checkbox-->
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

      <!-- Input  -->
      <el-input
        v-else-if="item.type === 'el-input'"
        v-model="filterData[item.key]"
        v-bind="item.config"
        class="item-input"
        @change="
          $emit('change', filterData, filterData[item.key], item.key, index)
        "
      ></el-input>

      <!-- InputNumber  -->
      <el-input-number
        v-else-if="item.type === 'el-input-number'"
        v-model="filterData[item.key]"
        v-bind="item.config"
        class="item-input"
        @change="
          $emit('change', filterData, filterData[item.key], item.key, index)
        "
      ></el-input-number>

      <!-- Select -->
      <el-select
        v-else-if="item.type === 'el-select'"
        v-model="filterData[item.key]"
        v-bind="item.config"
        class="item-input"
        @change="
          $emit('change', filterData, filterData[item.key], item.key, index)
        "
      >
        <div v-for="group in item.options" :key="group.label">
          <template v-if="!group.options">
            <el-option v-bind="group"></el-option>
          </template>
          <template v-else>
            <el-option-group v-bind="group">
              <el-option
                v-for="option in group.options"
                :key="option.label"
                v-bind="option"
              >
              </el-option>
            </el-option-group>
          </template>
        </div>
      </el-select>

      <!-- Cascader -->
      <el-cascader
        v-else-if="item.type === 'el-cascader'"
        v-model="filterData[item.key]"
        v-bind="item.config"
        class="item-input"
        @change="
          $emit('change', filterData, filterData[item.key], item.key, index)
        "
      >
      </el-cascader>

      <!-- Switch -->
      <el-switch
        v-else-if="item.type === 'el-switch'"
        v-model="filterData[item.key]"
        v-bind="item.config"
        class="item-input"
        @change="
          $emit('change', filterData, filterData[item.key], item.key, index)
        "
      >
      </el-switch>

      <!-- TimePicker   -->
      <el-time-select
        v-else-if="item.type === 'el-time-select'"
        v-model="filterData[item.key]"
        v-bind="item.config"
        @change="
          $emit('change', filterData, filterData[item.key], item.key, index)
        "
      >
      </el-time-select>

      <el-time-picker
        v-else-if="item.type === 'el-time-picker'"
        v-model="filterData[item.key]"
        v-bind="item.config"
        @change="
          $emit('change', filterData, filterData[item.key], item.key, index)
        "
      >
      </el-time-picker>

      <!-- DatePicker    -->
      <el-date-picker
        v-else-if="item.type === 'el-date-picker'"
        v-model="filterData[item.key]"
        v-bind="item.config"
        @change="
          $emit('change', filterData, filterData[item.key], item.key, index)
        "
      >
      </el-date-picker>
      <slot></slot>
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
      filterInfo: null
    };
  },
  created() {
    this.initFilter();
  },
  methods: {
    // 组件初始化
    initFilter() {
      this.filterInfo = JSON.parse(JSON.stringify(this.dataJson));
      this.dataJson.map(item => {
        const initData = this.initData(item);
        this.$set(this.filterData, item.key, initData);
      });
    },
    // 确定初始数据类型
    initData(data) {
      const isArray =
        data.type === "el-checkbox-group" ||
        data.type === "el-cascader" ||
        data.type === "el-time-select" ||
        data.type === "el-time-picker" ||
        data.type === "el-date-picker" ||
        (data.config && data.config.multiple === true);
      return isArray ? [] : undefined;
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
