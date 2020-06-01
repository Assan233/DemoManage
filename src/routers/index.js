const routes = [
  {
    path: "/time-line",
    name: "TimeLine",
    component: () => import("@/views/time-line"),
    meta: {
      title: "时间线"
    }
  },
  {
    path: "/filter-container",
    name: "FilterContainer",
    component: () => import("@/views/filter-container"),
    meta: {
      title: "过滤组件"
    }
  }
  // {
  //   path: "/components",
  //   redirect: "/components/time-line",
  //   meta: {
  //     title: "组件"
  //   },
  //   children: [
  //     {
  //       path: "/time-line",
  //       name: "TimeLine",
  //       component: () => import("@/views/time-line"),
  //       meta: {
  //         title: "时间线"
  //       }
  //     },
  //     {
  //       path: "/filter-container",
  //       name: "FilterContainer",
  //       component: () => import("@/views/filter-container"),
  //       meta: {
  //         title: "过滤组件"
  //       }
  //     }
  //   ]
  // }

]

export { routes }
export default { routes }