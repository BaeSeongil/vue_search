<template>
  <header id="headerWrap">
    <div class="right-block">
      <div class="flex-con search-checkbox">
        <div class="search-area">
          <label for="headerSearchValue"></label>
          <input
            type="text"
            name="headerSearchValue"
            id="headerSearchValue"
            :placeholder="getLang(language.vue_search?.msg.m001, '')"
            v-model="searchvalue"
            @keyup.enter="search()"
          />
          <button
            type="button"
            class="btn-app-search"
            @click="search()"
          ></button>
        </div>
        <div class="checkbox-area">
          <!-- <div class="checkbox-box">
            <input
              type="checkbox"
              name="check-column1"
              id="check-column1"
              v-model="research"
            />
            <label for="check-column1">{{
              getLang(language.vue_search?.title.research, "결과 내 검색")
            }}</label>
          </div> -->
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useMainStore } from "@/stores/main";
import { onMounted, ref, watchEffect } from "vue";
import { storeToRefs } from "pinia";
import { getlangCode } from "@/utils/language";
import SearchList from "@/components/SearchList.vue";
import Header from "@/components/Header.vue";
import { getLang } from "@/utils/common";
import { useRoute, useRouter } from "vue-router";

const MainStore = useMainStore();
const {
  spinnerOff,
  getSearchedms,
  getSearchnexen,
  getSearchAppro,
  resetData,
  getSearchBoard,
} = MainStore;
const {
  langCode,
  language,
  userInfo,
  checkSearch,
  searchvalue,
  indexType,
  selectRadio,
  scroll,
  pageNo,
  lnbActive,
  row1,
  row2,
  row3,
  row4,
  research,
  reValue,
} = storeToRefs(MainStore);

const route = useRoute();
const router = useRouter();

const search = async (e, bool) => {
  if (searchvalue.value.length >= 2) {
    if (!research.value) {
      reValue.value = searchvalue.value;
    }
    // searchvalue.value = e.target.value;
    lnbActive.value = "all";
    selectRadio.value = true;
    scroll.value = false;
    pageNo.value = null;
    indexType.value = "TOTAL";
    resetData();
    updateSearchQuery(searchvalue.value);
    getData();
  } else {
    alert("2글자 이상 입력해주세요.");
  }
};
const getData = async () => {
  if (checkSearch.value === "row1") {
    row2.value = false;
    row3.value = false;
    row4.value = true;
    row1.value = true;
    await getSearchAppro();
    await getSearchBoard();
  } else if (checkSearch.value === "row2") {
    row2.value = true;
    row4.value = false;
    row3.value = false;
    row1.value = false;
    await getSearchnexen();
  } else if (checkSearch.value === "row3") {
    row2.value = false;
    row3.value = true;
    row4.value = false;
    row1.value = false;
    await getSearchedms();
  } else {
    row2.value = true;
    row3.value = true;
    row1.value = true;
    row4.value = true;
    await getSearchAppro();
    await getSearchedms();
    await getSearchnexen();
    await getSearchBoard();
  }
};
const updateSearchQuery = (newQuery) => {
  router.push({
    path: route.path,
    query: {
      ...route.query,
      search: newQuery,
    },
  });
};

onMounted(async () => {
  searchvalue.value = route.query.search;
  await getSearchAppro();
  await getSearchedms();
  await getSearchnexen();
  await getSearchBoard();
});
</script>

<style>
</style>