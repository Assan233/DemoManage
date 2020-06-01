<template>
  <div>
    <el-timeline>
      <el-timeline-item
        v-for="(item, index) in initData"
        :key="index"
        :type="currentId === item.id && currentId ? 'primary' : ''"
        :hide-timestamp="true"
        :timestamp="item.time"
      >
        <!-- 一级 -->
        <template v-if="!item.isChildren">
          <span
            class="time-line"
            :class="currentId === item.id && currentId ? 'is-current' : ''"
            @click="onClickNode(item)"
            >{{ item.month }}</span
          >
        </template>
        <!-- 二级 -->
        <template v-else>
          <span
            class="line-text time-line"
            :class="currentId === item.id && currentId ? 'is-current' : ''"
            @click="onClickNode(item)"
            >{{ item.week }} <br />
            {{ item.weekRange }}</span
          >
        </template>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
let data = [
  {
    id: 1,
    time: "1580528939000",
    week: "第 1 周",
    weekRange: "2.1-2.7",
    month: "二月"
  },
  {
    id: 12,
    time: "1580528940000",
    week: "第 2 周",
    weekRange: "2.1-2.7",
    month: "二月"
  },
  {
    id: 13,
    time: "1580528941000",
    week: "第 3 周",
    weekRange: "2.1-2.7",
    month: "二月"
  },
  {
    id: 14,
    time: "1580528942000",
    week: "第 1 周",
    weekRange: "2.1-2.7",
    month: "三月"
  },
  {
    id: 15,
    time: "1580528943000",
    week: "第 2 周",
    weekRange: "2.1-2.7",
    month: "三月"
  },
  {
    id: 16,
    time: "1580528944000",
    week: "第 3 周",
    weekRange: "2.1-2.7",
    month: "三月"
  },
  {
    id: 17,
    time: "1580528945000",
    week: "第 1 周",
    weekRange: "2.1-2.7",
    month: "四月"
  },
  {
    id: 18,
    time: "1580528946000",
    week: "第 2 周",
    weekRange: "2.1-2.7",
    month: "四月"
  },
  {
    id: 19,
    time: "1580528947000",
    week: "第 3 周",
    weekRange: "2.1-2.7",
    month: "五月"
  }
];
export default {
  components: {},
  data() {
    return {
      currentId: null,
      allData: [],
      initData: []
    };
  },
  mounted() {
    this.allData = data;
    this.getInitData(this.allData, "三月");
  },
  methods: {
    getInitData(data, month) {
      let dataCopy = JSON.parse(JSON.stringify(data));
      this.initData = [];
      // 根据时间排序
      dataCopy.sort((a, b) => {
        let rst = 0;
        if (a.time - b.time > 0) rst = -1;
        if (a.time - b.time < 0) rst = 1;
        return rst;
      });

      // 添加首月自定义数据
      this.initData[0] = { month: dataCopy[0].month };
      this.currentId = dataCopy[0].id;

      dataCopy.map(item => {
        if (
          item.month === month ||
          item.month !== this.initData[this.initData.length - 1].month
        ) {
          // 首次遍历详情月, 插入一个自定义父级月份数据
          if (
            item.month === month &&
            item.month !== this.initData[this.initData.length - 1].month
          ) {
            // 默认选中第一项子级
            this.currentId = item.id;
            item.isChildren = false;
            this.initData.push({
              month: item.month
            });
          }
          // 插入子级数据
          if (item.month === month) item.isChildren = true;

          this.initData.push({
            ...item
          });
        }
      });
    },
    onClickNode(node) {
      if (node.id) this.currentId = node.id;
      // 点击父级, 更新数据
      if (!node.isChildren) this.getInitData(this.allData, node.month);
      // console.log(this.allData, node.month);
    },
    // 获取当前时间周的日期范围
    printWeek() {
      let now = new Date();
      let nowDayOfWeek = now.getDay();
      let nowDay = now.getDate();
      let nowMonth = now.getMonth();
      let nowYear = now.getYear();
      nowYear += nowYear < 2000 ? 1900 : 0;
      let weekStartDate = new Date(
        nowYear,
        nowMonth,
        nowDay - nowDayOfWeek + 1
      );
      let weekEndDate = new Date(
        nowYear,
        nowMonth,
        nowDay + (7 - nowDayOfWeek),
        23,
        59,
        59
      );
      return [weekStartDate, weekEndDate];
    }
  }
};
</script>

<style lang="scss" scoped>
::v-deep .el-timeline-item__tail {
  left: 70px;
}
::v-deep .el-timeline-item__node--normal {
  left: 65px;
}
.line-text {
  position: relative;
  left: 65px;
}
.time-line {
  cursor: pointer;
}
.is-current {
  color: #409eff;
}
</style>
