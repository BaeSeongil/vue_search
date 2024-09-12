<template>
  <div class="nav-side-wrap search">
    <div class="subpage-menu-wrap active">
      <!-- 메뉴 펼친 상태 디폴트 -->
      <div class="menu-head">
        <p class="menu-head-tit">
          {{ getLang(language?.vue_search?.title.document, "문서분류") }}
        </p>
        <button
          type="button"
          class="btn-menu-close"
          title="메뉴 닫기"
          @click="toggleMenu"
        >
          <span class="screen-mode-img3"></span>
        </button>
      </div>
      <div class="lnb-wrap search">
        <ul>
          <li class="depth1">
            <a
              style="cursor: pointer"
              @click="lnbChange('all')"
              :class="{ active: lnbActive === 'all' }"
              >{{ getLang(language?.vue_search?.title.full, "전체 문서") }}</a
            >
          </li>
          <li class="depth1">
            <a
              style="cursor: pointer"
              @click="lnbChange('appro')"
              :class="{ active: lnbActive === 'appro' }"
              >{{
                getLang(language?.vue_search?.title.approval, "전자결재")
              }}</a
            >
          </li>
          <li class="depth1">
            <a
              style="cursor: pointer"
              @click="lnbChange('board')"
              :class="{ active: lnbActive === 'board' }"
              >{{ getLang(language?.vue_search?.title.board, "게시판") }}</a
            >
          </li>
          <li class="depth1">
            <a
              style="cursor: pointer"
              @click="lnbChange('doc1')"
              :class="{ active: lnbActive === 'doc1' }"
              >{{
                getLang(language?.vue_search?.title.centeral, "문서중앙")
              }}</a
            >
          </li>
          <li class="depth1">
            <a
              style="cursor: pointer"
              @click="lnbChange('doc2')"
              :class="{ active: lnbActive === 'doc2' }"
              >{{
                getLang(language?.vue_search?.title.standard, "표준문서")
              }}</a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useMainStore } from "@/stores/main";
import { onMounted, ref, watchEffect } from "vue";
import { storeToRefs } from "pinia";
import { getlangCode } from "@/utils/language";
import { getLang } from "@/utils/common";

const MainStore = useMainStore();
const { langCode, SideMenuVisible, lnbActive, language } =
  storeToRefs(MainStore);
const { spinnerOff, setOption, getLanguage } = MainStore;

const {
  selectRadio,
  scroll,
  pageNo,
  indexType,
  lnbSelect,
  row1,
  row2,
  row3,
  row4,
  checkSearch,
} = storeToRefs(MainStore);
const {
  getSearchedms,
  getSearchnexen,
  getSearchAppro,
  resetData,
  getSearchBoard,
} = MainStore;
const { nexenList, nexenTotal, edmsList, edmsTotal, approTotal, approList } =
  storeToRefs(MainStore);

const toggleMenu = () => {
  SideMenuVisible.value = !SideMenuVisible.value;
};

const lnbChange = async (data) => {
  lnbActive.value = data;
  checkSearch.value === "all";
  indexType.value = "TOTAL";
  pageNo.value = null;
  resetData();
  if (data === "all") {
    lnbSelect.value = false;
    selectRadio.value = true;
    scroll.value = false;
    await getSearchAppro();
    await getSearchedms();
    await getSearchnexen();
    await getSearchBoard();
    row1.value = true;
    row2.value = true;
    row3.value = true;
    row4.value = true;
  } else if (data == "appro") {
    selectRadio.value = false;
    scroll.value = true;
    await getSearchAppro();
    row1.value = true;
    row2.value = false;
    row3.value = false;
    row4.value = false;
  } else if (data == "doc1") {
    selectRadio.value = false;
    scroll.value = false;
    await getSearchnexen();
    row1.value = false;
    row2.value = true;
    row3.value = false;
    row4.value = false;
  } else if (data == "doc2") {
    selectRadio.value = false;
    scroll.value = false;
    await getSearchedms();
    row1.value = false;
    row2.value = false;
    row3.value = true;
    row4.value = false;
  } else if (data == "board") {
    selectRadio.value = false;
    scroll.value = true;
    await getSearchBoard();
    row1.value = false;
    row2.value = false;
    row3.value = false;
    row4.value = true;
  }
};
</script>

<style scoped></style>
