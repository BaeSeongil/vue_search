<template>
  <div id="subPage" class="search" :class="{ active: SideMenuVisible }">
    <Header></Header>
    <SearchList></SearchList>
    <button
      type="button"
      title="메뉴 열기"
      class="btn-open"
      @click="toggleMenu"
      v-if="!SideMenuVisible"
    >
      <span class="screen-mode-img2"></span>
    </button>
  </div>
</template>
<script setup>
import router from "@/router";
import { useMainStore } from "@/stores/main";
import { onMounted, ref, watchEffect } from "vue";
import { storeToRefs } from "pinia";
import { getlangCode } from "@/utils/language";
import SearchList from "@/components/SearchList.vue";
import Header from "@/components/Header.vue";

const MainStore = useMainStore();
const { langCode, SideMenuVisible } = storeToRefs(MainStore);
const { spinnerOff, setOption, getLanguage } = MainStore;

const toggleMenu = () => {
  SideMenuVisible.value = !SideMenuVisible.value;
};
</script>
<style scoped></style>