import { createRouter, createWebHistory } from "vue-router";
import { useMainStore } from "@/stores/main";
import { useOrgStore } from "@/stores/org";
import { storeToRefs } from "pinia";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/vsearch",
    },
    {
      path: "/vsearch",
      name: "search",
      component: () => import("../views/HomeView.vue"),
      children: [
      ],
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const MainStore = useMainStore();

  const { loginCheck } = MainStore;

  const condition = await loginCheck();

  if (condition) {
    const OrgStore = useOrgStore();
    const { myInfo } = storeToRefs(OrgStore);
    if (!myInfo.value) {
      const { getMyInfo } = OrgStore;
      getMyInfo();
    }

    next();
  } else {
    window.open(
      "/dwp/com/sys/webservice.nsf/sessioncheck?open",
      "login",
      "_blank"
    );
  }
});

export default router;
