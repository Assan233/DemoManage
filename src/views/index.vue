<template>
  <div>
    <el-row>
      <el-col :span="6">
        <el-menu class="el-menu-demo" @select="handleSelect">
          <template v-for="item in routes">
            <el-menu-item
              v-if="!item.children"
              :key="item.path"
              :index="item.path"
              >{{ item.meta.title }}</el-menu-item
            >
          </template>
          <!-- <el-submenu
            v-if="item.children && item.children.length !== 0"
            :index="item.path"
          >
            <template slot="title">{{ item.meta.title }}</template>
            <template v-for="menu in item.children">
              <el-menu-item :key="menu.path" :index="menu.path">{{
                menu.meta.title
              }}</el-menu-item>
            </template>
          </el-submenu> -->
        </el-menu>
      </el-col>
      <!-- 内容区 -->
      <el-col :span="18">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { routes } from "@/routers";
export default {
  components: {},
  data() {
    return {
      routes,
      currentRouter: ""
    };
  },
  mounted() {
    // console.log(this.$router);
  },
  methods: {
    handleSelect(current) {
      this.$router.push({ path: current });
    }
  }
};
</script>

<style>
</style>
