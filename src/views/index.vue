<template>
  <div>
    <el-row class="wrap">
      <el-col :span="4" class="left">
        <h3>Title</h3>
      </el-col>
      <el-col :span="20" class="right">
        <filter-block>
          <h3>{{ str }}</h3>
        </filter-block>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import FilterBlock from "@/components/FilterBlock";

export default {
  components: { FilterBlock },
  data() {
    return {
      str: "Assan",
      filterData: {}
    };
  },
  methods: {}
};
</script>

<style>
.wrap {
  border: 1px dashed darkgray;
}
.right {
  /* border: 1px dashed darkgray; */
}
</style>
