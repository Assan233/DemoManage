<template>
  <div class="filter-wrap">
    <transition-group name="fade">
      <div
        v-for="(item, index) in filterInfo"
        v-show="
          item.isAdvanced ? isAdvancedFrom : item.config && item.config.show
        "
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
    </transition-group>

    <!-- form-slot -->
    <slot :filterData="filterData" name="formSlot"></slot>

    <!-- 操作区 -->

    <!-- 高级搜索按钮 -->
    <el-link
      v-if="isAdvancedBtn"
      :underline="false"
      size="small"
      type="primary"
      class="advanced-link"
      @click="isAdvancedFrom = !isAdvancedFrom"
      >高级搜索</el-link
    >

    <!-- 清空按钮 -->
    <el-button v-if="hasClear" size="small" type="primary" @click="handleClear"
      >重置</el-button
    >

    <!-- operate-Slot -->
    <slot :filterData="filterData" name="operateSlot"></slot>
  </div>
</template>

<script>
function deepClone(obj, cache = []) {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }
  const hit = cache.filter(c => c.original === obj)[0];
  if (hit) {
    return hit.copy;
  }
  const copy = Array.isArray(obj) ? [] : {};
  cache.push({
    original: obj,
    copy
  });
  Object.keys(obj).forEach(key => {
    copy[key] = deepClone(obj[key], cache);
  });
  return copy;
}
export default {
  name: "FilterBlock",
  components: {},
  props: {
    // filter表单配置项
    dataList: {
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
      nullFilterData: {}, //初始筛选数据对象-用于数据清空
      filterData: {}, // 筛选数据对象
      filterInfo: null,
      isAdvancedBtn: false, // 是否显示高级按钮
      isAdvancedFrom: false // 控制显示高级表单元素
    };
  },
  watch: {
    dataList: {
      handler(newVal) {
        this.initFilter(newVal);
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    // 数据初始化
    initFilter(dataList) {
      dataList.map(item => {
        // 如果表单元素配置信息为高级, 显示高级按钮
        if (item.isAdvanced) this.isAdvancedBtn = true;

        // 设置默认值
        item.config.size =
          item.config && item.config.size ? item.config.size : "small";
        item.config.show =
          item.config && item.config.show ? item.config.size : true;

        const initData = this.initData(item);
        this.$set(this.filterData, item.key, initData);
        // 备份一份初始过滤数据, 方便清空
        this.nullFilterData[item.key] = Array.isArray(initData)
          ? []
          : undefined; // 防止引用同一个initData, 产生对象引用问题
      });
      this.filterInfo = deepClone(dataList);
      // 重新排序, 高级选项排在最后
      this.filterInfo.sort((a, b) => {
        if (a.isAdvanced === true && !b.isAdvanced) {
          return 1;
        } else if (b.isAdvanced === true && !a.isAdvanced) {
          return -1;
        } else {
          return 0;
        }
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
    },
    // 重置搜索条件
    handleClear() {
      this.filterData = { ...this.nullFilterData };
      this.$emit("filterClear", { ...this.nullFilterData });
    }
  }
};
</script>
<style scoped lang="scss">
.filter-wrap {
  width: 100%;
  text-align: right;
  .filter-item {
    padding: 0 12px 8px 0;
    display: inline-block;
    .item-label {
      display: inline-block;
      font-size: 14px;
      color: #606266;
    }
    .item-input {
      display: inline-block;
      width: auto;
    }
  }
  .advanced-link {
    margin: 0 10px;
  }
}
// 动画
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
