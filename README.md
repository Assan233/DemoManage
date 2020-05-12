
# FilterContainer文档
事件:
1.	@change: filter-item的change事件触发, 触发change事件
返回参数:  filterData, value, key, index

2.	@filterClear: 点击重置filterData时, 触发filterClear, 
返回参数:  值为空的filterData
## 配置:
(*)为必配置项
### 1.	dataJson: 表单元素的配置详情(Array)
1)	label(*): 表单元素label
值: String
2)	key(*): 表单元素绑定的key
值: String
3)	type(*): 表单element一级组件名, 共有10种, 如下表.
值: String, 枚举
[el-radio-group, 
el-checkbox-group, 
el-input, 
el-input-number, 
el-select, 
el-cascader, 
el-switch, 
el-time-select, 
el-time-picker, 
el-date-picker ]
4)	optionType: 表单元素的二级组件类型为button时, 如el-checkbox-button/ el-radio-button
值: String, 枚举[ button ]
5)	itemWidth: 自定义表单元素的宽度
值: Number, 单位px
6)	isAdvanced: 是否为高级表单元素
值: Boolean, true/是
7)	config: 表单元素一级的element UI 配置项,配置项与ele文档相同, 函数类型的配置项和事件未做支持, 如果有特殊需求, 可以使用formSlot插槽来自定义表单元素
值: Object
8)	options: 表单元素二级的elementUI配置项, 如果需要设置option分组, 可以options嵌套options, 如<el-select>的option分组
值: Array
### 注意: 
1.	option配置选中值和名称的key必须和ele文档一致, 如 {label: “名称”, value: “name”}
2.	如果dataJson中有异步获取的内容(如option),建议将dataJson定义为计算属性, 这样依赖更新的时候, dataJson也会自动更新
## 2.	titleInfo: 标题的配置项
值: Object, { title:标题 summary: 说明内容}
## 3.	span: 组件栅格占比
值: Array, [left, right]
## 4.	has-clear: 是否需要重置按钮
值: Boolean, true/是

 


## Slot
1.	operateSlot: 
1)	筛选区域右侧slot, 一般是操作类按钮, 可通过v-slot: operateSlot ="slotProps" 获取当前filterData
2.	formSlot: 
1)	筛选表单slot, 可通过v-slot: formSlot ="slotProps" 获取当前filterData

## 注意事项
Radio单选
1.	配置radio的options时, 需要注意配置label为radio的绑定值, name为radio的名称(见Ele Radio Attributes文档)

Checkbox 多选
1.	配置Checkbox的options时, 需要注意配置label为Checkbox的绑定值, name为Checkbox的名称(见Ele Checkbox Attributes文档)
Select 选择
1.	options可以嵌套options, 实现分组展示option, 与ele文档一致; 例如:  

Cascader 级联选择器
1.	根据ele文档, options应该在config配置


# filter-container

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
