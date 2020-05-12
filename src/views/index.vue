<template>
  <div class="index">
    <filter-container
      :data-json="dataJson"
      :title-info="titleInfo"
      :span="span"
      :has-clear="true"
      @change="handleFilterChange"
      @filterClear="handleClear"
    >
      <!-- 表单元素-slot
      <template v-slot:formSlot>
        <div class="form-slot">
          <span class="slot-label">form插槽：</span>
          <el-input
            v-model="input"
            size="small"
            class="slot-content"
            placeholder="请输入内容"
          ></el-input>
        </div>
      </template> -->

      <!-- 操作功能-slot -->
      <template v-slot:operateSlot="slotProps">
        <el-button size="small" type="primary" @click="onClick(slotProps)"
          >Create</el-button
        >
      </template>
    </filter-container>
  </div>
</template>

<script>
import FilterContainer from "@/components/FilterContainer/index";

export default {
  components: { FilterContainer },
  data() {
    return {
      input: "",
      titleInfo: {
        title: "标题",
        summary: "title介绍"
      },
      span: [3, 21], //控制栅格布局
      dataJson: [
        {
          label: "输入框",
          type: "el-input",
          key: "num",
          config: {}
        },
        {
          label: "开关",
          type: "el-switch",
          key: "es",
          config: {}
        },
        {
          label: "单选框",
          isAdvanced: true,
          optionType: "button",
          type: "el-radio-group",
          key: "num2",
          config: {},
          options: [
            {
              label: "checked1",
              name: "选项1"
            },
            {
              label: "checked2",
              name: "选项2",
              disabled: true
            },
            {
              label: "checked3",
              name: "选项3"
            }
          ]
        },
        {
          label: "日期时间选择",
          type: "el-date-picker",
          key: "num3",
          config: {
            type: "datetimerange",
            "range-separator": "至",
            "start-placeholder": "开始日期",
            "end-placeholder": "结束日期",
            "picker-options": {
              shortcuts: [
                {
                  text: "最近一周",
                  onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit("pick", [start, end]);
                  }
                },
                {
                  text: "最近一个月",
                  onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit("pick", [start, end]);
                  }
                },
                {
                  text: "最近三个月",
                  onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    picker.$emit("pick", [start, end]);
                  }
                }
              ]
            }
          }
        },
        {
          label: "选择器",
          type: "el-select",
          isAdvanced: true,
          key: "num4",
          config: {},
          options: [
            {
              value: "checked1",
              label: "选项1"
            },
            {
              value: "checked2",
              label: "选项2",
              disabled: true
            },
            {
              value: "checked3",
              label: "选项3"
            }
          ]
        },
        {
          label: "名称",
          type: "el-cascader", // form类型 (为element的组件名)
          key: "name",
          // optionType: "button",
          // ele配置项
          config: {
            placeholder: "请输入名称",
            props: {
              multiple: true
            },
            options: [
              {
                value: "zhinan",
                label: "指南",
                children: [
                  {
                    value: "shejiyuanze",
                    label: "设计原则",
                    children: [
                      {
                        value: "yizhi",
                        label: "一致"
                      },
                      {
                        value: "fankui",
                        label: "反馈"
                      },
                      {
                        value: "xiaolv",
                        label: "效率"
                      },
                      {
                        value: "kekong",
                        label: "可控"
                      }
                    ]
                  },
                  {
                    value: "daohang",
                    label: "导航",
                    children: [
                      {
                        value: "cexiangdaohang",
                        label: "侧向导航"
                      },
                      {
                        value: "dingbudaohang",
                        label: "顶部导航"
                      }
                    ]
                  }
                ]
              },
              {
                value: "zujian",
                label: "组件",
                children: [
                  {
                    value: "basic",
                    label: "Basic",
                    children: [
                      {
                        value: "layout",
                        label: "Layout 布局"
                      },
                      {
                        value: "color",
                        label: "Color 色彩"
                      },
                      {
                        value: "typography",
                        label: "Typography 字体"
                      },
                      {
                        value: "icon",
                        label: "Icon 图标"
                      },
                      {
                        value: "button",
                        label: "Button 按钮"
                      }
                    ]
                  },
                  {
                    value: "form",
                    label: "Form",
                    children: [
                      {
                        value: "radio",
                        label: "Radio 单选框"
                      },
                      {
                        value: "checkbox",
                        label: "Checkbox 多选框"
                      },
                      {
                        value: "input",
                        label: "Input 输入框"
                      },
                      {
                        value: "input-number",
                        label: "InputNumber 计数器"
                      },
                      {
                        value: "select",
                        label: "Select 选择器"
                      },
                      {
                        value: "cascader",
                        label: "Cascader 级联选择器"
                      },
                      {
                        value: "switch",
                        label: "Switch 开关"
                      },
                      {
                        value: "slider",
                        label: "Slider 滑块"
                      },
                      {
                        value: "time-picker",
                        label: "TimePicker 时间选择器"
                      },
                      {
                        value: "date-picker",
                        label: "DatePicker 日期选择器"
                      },
                      {
                        value: "datetime-picker",
                        label: "DateTimePicker 日期时间选择器"
                      },
                      {
                        value: "upload",
                        label: "Upload 上传"
                      },
                      {
                        value: "rate",
                        label: "Rate 评分"
                      },
                      {
                        value: "form",
                        label: "Form 表单"
                      }
                    ]
                  },
                  {
                    value: "data",
                    label: "Data",
                    children: [
                      {
                        value: "table",
                        label: "Table 表格"
                      },
                      {
                        value: "tag",
                        label: "Tag 标签"
                      },
                      {
                        value: "progress",
                        label: "Progress 进度条"
                      },
                      {
                        value: "tree",
                        label: "Tree 树形控件"
                      },
                      {
                        value: "pagination",
                        label: "Pagination 分页"
                      },
                      {
                        value: "badge",
                        label: "Badge 标记"
                      }
                    ]
                  },
                  {
                    value: "notice",
                    label: "Notice",
                    children: [
                      {
                        value: "alert",
                        label: "Alert 警告"
                      },
                      {
                        value: "loading",
                        label: "Loading 加载"
                      },
                      {
                        value: "message",
                        label: "Message 消息提示"
                      },
                      {
                        value: "message-box",
                        label: "MessageBox 弹框"
                      },
                      {
                        value: "notification",
                        label: "Notification 通知"
                      }
                    ]
                  },
                  {
                    value: "navigation",
                    label: "Navigation",
                    children: [
                      {
                        value: "menu",
                        label: "NavMenu 导航菜单"
                      },
                      {
                        value: "tabs",
                        label: "Tabs 标签页"
                      },
                      {
                        value: "breadcrumb",
                        label: "Breadcrumb 面包屑"
                      },
                      {
                        value: "dropdown",
                        label: "Dropdown 下拉菜单"
                      },
                      {
                        value: "steps",
                        label: "Steps 步骤条"
                      }
                    ]
                  },
                  {
                    value: "others",
                    label: "Others",
                    children: [
                      {
                        value: "dialog",
                        label: "Dialog 对话框"
                      },
                      {
                        value: "tooltip",
                        label: "Tooltip 文字提示"
                      },
                      {
                        value: "popover",
                        label: "Popover 弹出框"
                      },
                      {
                        value: "card",
                        label: "Card 卡片"
                      },
                      {
                        value: "carousel",
                        label: "Carousel 走马灯"
                      },
                      {
                        value: "collapse",
                        label: "Collapse 折叠面板"
                      }
                    ]
                  }
                ]
              }
            ]
          }
          // 选项data
        }
      ]
    };
  },
  methods: {
    handleFilterChange(filterData, value, key) {
      console.log(filterData, value, key);
    },
    handleClear(nullFilterData) {
      console.log(nullFilterData);
      this.input = "";
    },
    onClick(slotProps) {
      console.log(slotProps);
    },
    onChange(slotProps) {
      console.log(this.input);
    },
    test() {
      setTimeout(() => {
        let dom = document.getElementsByTagName("input");
        dom.forEach(item => {
          if (item.placeholder === "请选择时间段") {
            console.log(item);
          }
        });
      }, 2000);
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
.form-slot {
  padding: 0 12px 8px 0;
  display: inline-block;
  .slot-label {
    display: inline-block;
    font-size: 14px;
    color: #606266;
  }
  .slot-content {
    display: inline-block;
    width: auto;
  }
}
</style>
