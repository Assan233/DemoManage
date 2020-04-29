<template>
  <div class="filter-wrap">
    <div
      v-for="(item, index) in filterInfo"
      :key="item.key"
      class="filter-item"
    >
      <div class="item-label">{{ item.label }}：</div>
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

      <!-- <h3>
        {{ filterData[item.key] }}
      </h3> -->
    </div>

    <!-- 操作区 -->

    <!-- 清空按钮 -->
    <el-button
      v-if="hasClear"
      class="el-icon-refresh-right"
      type="primary"
      @click="handleClear"
    ></el-button>

    <!-- slot内容 -->
    <slot :filterData="filterData"></slot>
  </div>
</template>

<script>
function deepClone(data) {
  return JSON.parse(JSON.stringify(data));
}
export default {
  name: "FilterBlock",
  components: {},
  props: {
    // filter表单配置项
    dataJson: {
      type: Array,
      default: () => []
    },
    // 是否显示clear按钮
    hasClear: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      nullFilterData: {},
      filterData: {}, // 筛选数据对象
      filterInfo: null
    };
  },
  created() {
    this.initFilter();
  },
  methods: {
    // 数据初始化
    initFilter() {
      this.dataJson.map(item => {
        // 设置默认值
        item.config.size =
          item.config && item.config.size ? item.config.size : "small";

        const initData = this.initData(item);
        this.$set(this.filterData, item.key, initData);
        // 备份一份初始过滤数据, 方便清空
        this.nullFilterData[item.key] = Array.isArray(initData)
          ? []
          : undefined; // 防止引用同一个initData, 产生对象引用问题
      });
      this.filterInfo = deepClone(this.dataJson);
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
    },
    // 重置搜索条件
    handleClear() {
      this.filterData = { ...this.nullFilterData };
    }
  }
};
</script>
<style scoped lang="scss">
.filter-wrap {
  width: 100%;
  text-align: right;
  .filter-item {
    padding: 0 8px 8px 0;
    display: inline-block;
    .item-label {
      display: inline-block;
      // margin-right: 8px;
    }
    .item-input {
      display: inline-block;
      width: auto;
    }
  }
}
</style>
