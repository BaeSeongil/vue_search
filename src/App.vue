<template>
  <div>
    <side-bar v-if="SideMenuVisible" />
    <RouterView />
  </div>
</template>

<script setup>
import SideBar from "./components/common/SideBar.vue";
import { useMainStore } from "@/stores/main";
import { onMounted, ref, watchEffect } from "vue";
import { storeToRefs } from "pinia";
import { getlangCode } from "@/utils/language";

const MainStore = useMainStore();
const { langCode, SideMenuVisible } = storeToRefs(MainStore);
const { spinnerOff, setOption, getLanguage, getMydrive } = MainStore;

// const SideMenuVisible = ref(true);

langCode.value = getlangCode();
getLanguage();
setOption();
// getMydrive();
const loadTheme = async () => {
  const theme = localStorage.getItem("NEXENTIRE-THEME");
  if (theme === "dark-mode") {
    await import("./assets/css/layout_dark.css");
    await import("./assets/css/style_guide_dark.css");
    await import("./assets/css/subpage_dark.css");
  } else {
    await import("./assets/css/layout.css");
    await import("./assets/css/style_guide.css");
    await import("./assets/css/subpage.css");
  }
};

onMounted(async () => {
  loadTheme();
  spinnerOff();

  const isTabletOrIPad = /x11|macintosh|ipad|android|tablet/.test(
    navigator.userAgent.toLowerCase()
  );
  if (isTabletOrIPad) {
    SideMenuVisible.value = true;
  }
});

import { useRoute } from "vue-router";
const route = useRoute();

watchEffect(() => {
  // URL에서 Query String 추출
  const queryString = window.location.search;
  // Query String을 파싱하여 파라미터 객체로 변환
  const urlParams = new URLSearchParams(queryString);
  // 특정 파라미터 가져오기
  const parameterValue = urlParams.get("pre");
  // if (parameterValue === "1" || route.query?.pre === "1") {
  //   SideMenuVisible.value = false;
  // } else if (lnbid.value && boardid.value) {
  //   SideMenuVisible.value = true;
  // } else if (!lnbid.value) {
  //   SideMenuVisible.value = false;
  // }
  const isTabletOrIPad = /macintosh|ipad|android|tablet/.test(
    navigator.userAgent.toLowerCase()
  );
  if (isTabletOrIPad) {
    console.log(SideMenuVisible.value);
  }
});
</script>

<style scoped>
/* securiy spinner css */
.loader {
  width: 64px;
  height: 44px;
  position: absolute;
  border: 5px solid #7e41dc;
  border-radius: 8px;
  top: 20%;
  left: calc(50% - 32px);
  z-index: 3000;
}

.loader::before {
  content: "";
  position: absolute;
  border: 5px solid #7e41dc;
  width: 32px;
  height: 28px;
  border-radius: 50% 50% 0 0;
  left: 50%;
  top: 0;
  transform: translate(-50%, -100%);
}

.loader::after {
  content: "";
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #7e41dc;
  box-shadow: 16px 0 #7e41dc, -16px 0 #7e41dc;
  animation: flash 0.5s ease-out infinite alternate;
}

@keyframes flash {
  0% {
    background-color: rgba(255, 85, 68, 0.25);
    box-shadow: 16px 0 rgba(255, 85, 68, 0.25), -16px 0 rgba(255, 85, 68, 1);
  }

  50% {
    background-color: rgba(255, 85, 68, 1);
    box-shadow: 16px 0 rgba(255, 85, 68, 0.25), -16px 0 rgba(255, 85, 68, 0.25);
  }

  100% {
    background-color: rgba(255, 85, 68, 0.25);
    box-shadow: 16px 0 rgba(255, 85, 68, 1), -16px 0 rgba(255, 85, 68, 0.25);
  }
}
</style>
