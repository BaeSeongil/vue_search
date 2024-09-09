<template>
  <div id="contentWrap" class="search-wrap dwp-contents">
    <div class="default-wrap">
      <div
        class="page-table type2"
        v-if="selectRadio"
        style="margin-bottom: 56px"
      >
        <div class="page-info">
          <div>
            <div class="page-tit">
              <p>
                {{ getLang(language.vue_search?.title.target, "검색대상") }}
              </p>
            </div>
            <div class="page-value">
              <div class="radio-area row">
                <div>
                  <input
                    type="radio"
                    name="radio-row"
                    id="radio-row1"
                    value="all"
                    v-model="checkSearch"
                  />
                  <label for="radio-row1">{{
                    getLang(language.vue_search?.title.all, "전체")
                  }}</label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="radio-row"
                    id="radio-row4"
                    value="row1"
                    v-model="checkSearch"
                  />
                  <label for="radio-row4">{{
                    getLang(language.vue_search?.title.gw, "그룹웨어")
                  }}</label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="radio-row"
                    id="radio-row2"
                    value="row2"
                    v-model="checkSearch"
                  />
                  <label for="radio-row2">{{
                    getLang(language.vue_search?.title.centeral, "문서중앙")
                  }}</label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="radio-row"
                    id="radio-row3"
                    value="row3"
                    v-model="checkSearch"
                  />
                  <label for="radio-row3">{{
                    getLang(language.vue_search?.title.standard, "표준문서")
                  }}</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="page-title type2">
        <p class="title">
          {{ getLang(language.vue_search?.title.result, "검색결과") }}
          <span class="search-total">({{ total }})</span>
        </p>
        <div class="btn-group-wrap">
          <div class="right">
            <ul class="switch-menu">
              <li :class="{ active: sortData }">
                <button type="button" @click="sortList('accurate')">
                  {{ getLang(language.vue_search?.title.accuracy, "정확도순") }}
                </button>
              </li>
              <li :class="{ active: !sortData }">
                <button type="button" @click="sortList('recent')">
                  {{ getLang(language.vue_search?.title.latest, "최신순") }}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="search-result-wrap">
        <!-- 게시판 전자결재 -->

        <template v-if="row1">
          <div
            class="search-result-board"
            v-for="(data, index) in approList"
            :key="'approval' + index"
          >
            <div class="search-title-wrap">
              <p class="search-title">
                {{ getLang(language.vue_search?.title.approval, "전자결재") }}
                <span class="search-total">{{ approTotal }}</span>
              </p>
              <a
                class="btn md line more"
                @click="lnbChange('appro')"
                v-if="selectRadio"
                ><span>{{
                  getLang(language.vue_search?.title.more, "더보기")
                }}</span></a
              >
            </div>
            <div class="search-result-list">
              <ul>
                <li
                  class="search-result-item"
                  v-for="(appro, index) in data.items"
                  :key="'appro' + index"
                >
                  <div class="title-wrap flex-con p-be">
                    [<span v-html="processContent(appro.aprvFormTitle)"></span>]
                    <p
                      @click="openUrl(appro, '결재')"
                      style="cursor: pointer"
                      class="title ellipse"
                      v-html="processContent(appro.subject)"
                    ></p>
                    <div class="info-wrap">
                      <span
                        class="depart"
                        v-html="processContent(Lang(appro.authorName))"
                      ></span>
                      <span class="divider"></span>
                      <span class="date">{{
                        DatetoLocaleString(formatDate(appro.createdDate), {
                          format: "dateonly",
                        })
                      }}</span>
                    </div>
                  </div>
                  <div
                    class="file-wrap"
                    v-for="(file, f) in appro.fileName.split('Ψ')"
                    :key="'file' + f"
                  >
                    <a
                      ><span class="file flex-con jc-left ellipse"
                        ><img
                          src="../assets/images/subpage/icon_file_xls.svg"
                          class="screen-mode-img"
                          alt="" /><span
                          v-html="processContent(file)"
                        ></span></span
                    ></a>
                  </div>
                  <p
                    class="content ellipse lh2"
                    v-html="processContent(appro.body)"
                  ></p>
                  <p class="location flex-con jc-left"></p>
                </li>
              </ul>
            </div>
          </div>
        </template>
        <template v-if="row4">
          <div
            class="search-result-board"
            v-for="(data, index) in boardList"
            :key="'board' + index"
          >
            <div class="search-title-wrap">
              <p class="search-title">
                {{ getLang(language.vue_search?.title.board, "게시판") }}
                <span class="search-total">{{ boardTotal }}</span>
              </p>
              <a
                class="btn md line more"
                @click="lnbChange('board')"
                v-if="selectRadio"
                ><span>{{
                  getLang(language.vue_search?.title.more, "더보기")
                }}</span></a
              >
            </div>
            <div class="search-result-list">
              <ul>
                <li
                  class="search-result-item"
                  v-for="(bbs, index) in data.items"
                  :key="'bbs' + index"
                >
                  <div class="title-wrap flex-con p-be">
                    [<span>{{ Lang(bbs.boardName) }}</span
                    >]
                    <p
                      class="title ellipse"
                      style="cursor: pointer"
                      @click="openUrl(bbs, 'bbs')"
                      v-html="processContent(bbs.subject)"
                    ></p>
                    <div class="info-wrap">
                      <span class="depart">{{ Lang(bbs.authorName) }}</span>
                      <span class="divider"></span>
                      <span class="date">{{
                        DatetoLocaleString(formatDate(bbs.modifiedDate), {
                          format: "dateonly",
                        })
                      }}</span>
                    </div>
                  </div>
                  <div
                    class="file-wrap"
                    v-for="(file, f) in bbs.fileName.split('Ψ')"
                    :key="'file' + f"
                  >
                    <a
                      ><span class="file flex-con jc-left ellipse"
                        ><img
                          src="../assets/images/subpage/icon_file_xls.svg"
                          class="screen-mode-img"
                          alt="" /><span
                          v-html="processContent(file)"
                        ></span></span
                    ></a>
                  </div>
                  <p
                    class="content ellipse lh2"
                    v-html="processContent(bbs.body)"
                  ></p>
                  <p class="location flex-con jc-left"></p>
                </li>
              </ul>
            </div>
          </div>
        </template>
        <template v-if="row2">
          <div
            class="search-result-approval"
            v-for="(data, nexen) in nexenList"
            :key="'nexen' + nexen"
          >
            <template v-if="data.items.length > 0">
              <div class="search-title-wrap">
                <p class="search-title">
                  {{ getLang(language.vue_search?.title.centeral, "문서중앙") }}
                  > {{ data.indexViewName }}
                  <span class="search-total">{{ data.indexTotalCount }}</span>
                </p>
                <a class="btn md line more" @click="detailNexen(data.indexName)"
                  ><span>{{
                    getLang(language.vue_search?.title.more, "더보기")
                  }}</span></a
                >
              </div>
              <div class="search-result-list">
                <ul>
                  <li
                    class="search-result-item"
                    v-for="(item, i) in data.items"
                    :key="'nexen_s' + i"
                  >
                    <div class="title-wrap flex-con p-be">
                      <p
                        class="title ellipse"
                        @click="openUrl(item, '중앙', data.indexName)"
                        style="cursor: pointer"
                      >
                        {{ item.docName }}
                      </p>
                      <div class="info-wrap">
                        <span
                          class="depart"
                          v-html="
                            item[`creatorName_${langCode}`]
                              ? processContent(item[`creatorName_${langCode}`])
                              : processContent(item[`creatorName_ko`])
                          "
                        ></span>
                        <span class="divider"></span>
                        <span class="date">{{
                          DatetoLocaleString(formatDate(item.updatedDate), {
                            format: "dateonly",
                          })
                        }}</span>
                      </div>
                    </div>
                    <div
                      class="file-wrap"
                      @click="openUrl(item, '중앙', data.indexName)"
                      style="cursor: pointer"
                    >
                      <a
                        ><span class="file flex-con jc-left ellipse"
                          ><img
                            src="../assets/images/subpage/icon_file_xls.svg"
                            class="screen-mode-img"
                            alt="" /><span
                            v-html="processContent(item.fileName)"
                          ></span></span
                      ></a>
                    </div>
                    <p
                      class="content ellipse lh2"
                      v-html="processContent(item.content)"
                    ></p>
                    <p class="location flex-con jc-left">
                      <span class="screen-mode-img icon_folder"></span
                      ><span>{{
                        item[`pathName_${langCode}`]
                          ? item[`pathName_${langCode}`].replaceAll("|", " > ")
                          : item[`pathName_ko`].replaceAll("|", " > ")
                      }}</span>
                    </p>
                  </li>
                </ul>
              </div>
            </template>
          </div>
        </template>
        <template v-if="row3">
          <div
            class="search-result-approval"
            v-for="(data, edms) in edmsList"
            :key="'edms' + edms"
          >
            <template v-if="data.items.length > 0">
              <div class="search-title-wrap">
                <p class="search-title">
                  {{ getLang(language.vue_search?.title.standard, "표준문서") }}
                  > {{ data.indexViewName }}
                  <span class="search-total">{{ data.indexTotalCount }}</span>
                </p>
                <a class="btn md line more" @click="detailEdms(data.indexName)"
                  ><span>{{
                    getLang(language.vue_search?.title.more, "더보기")
                  }}</span></a
                >
              </div>
              <div class="search-result-list">
                <ul>
                  <template v-if="data.items.length > 0">
                    <li
                      class="search-result-item"
                      v-for="(item, i) in data.items"
                      :key="'edms_s' + i"
                    >
                      <div class="title-wrap flex-con p-be">
                        <p
                          class="title ellipse"
                          @click="openUrl(item, '표준')"
                          style="cursor: pointer"
                          v-html="processContent(item.title)"
                        ></p>
                        <div class="info-wrap">
                          <span
                            class="depart"
                            v-html="processContent(item.deptName)"
                          ></span>
                          <span class="divider"></span>
                          <span class="date">{{
                            DatetoLocaleString(formatDate(item.chgDate), {
                              format: "dateonly",
                            })
                          }}</span>
                        </div>
                      </div>
                      <div class="file-wrap">
                        <a
                          ><span class="file flex-con jc-left ellipse"
                            ><img
                              src="../assets/images/subpage/icon_file_xls.svg"
                              class="screen-mode-img"
                              alt="" /><span
                              v-html="processContent(item.fileName)"
                            ></span></span
                        ></a>
                      </div>
                      <p
                        class="content ellipse lh2"
                        v-html="processContent(item.fileContent)"
                      ></p>
                      <p class="location flex-con jc-left">
                        <span class="screen-mode-img icon_folder"></span
                        ><span>{{
                          item[`fullPath_${langCode}`]
                            ? item[`fullPath_${langCode}`]
                            : item[`fullPath_ko`]
                        }}</span>
                      </p>
                    </li>
                  </template>
                  <template v-else>
                    <li class="search-result-item"></li
                  ></template>
                </ul>
              </div>
            </template>
          </div>
        </template>
        <div v-show="scroll" ref="sentinel"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import router from "@/router";
import { DatetoLocaleString } from "@/utils/date";
import { useMainStore } from "@/stores/main";
import { onMounted, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { getlangCode, Lang } from "@/utils/language";
import SearchList from "@/components/SearchList.vue";
import Header from "@/components/Header.vue";
import { getLang } from "@/utils/common";
import CryptoJS from "crypto-js";

const MainStore = useMainStore();
const {
  spinnerOff,
  getSearchedms,
  getSearchnexen,
  moreOption,
  getSearchAppro,
  resetData,
  getSearchBoard,
} = MainStore;
const { langCode, userInfo, lnbActive, lnbSelect, language } =
  storeToRefs(MainStore);

const {
  edmsList,
  edmsTotal,
  nexenList,
  nexenTotal,
  selectRadio,
  indexType,
  scroll,
  pageNo,
  approTotal,
  approList,
  boardList,
  boardTotal,
  checkSearch,
  row1,
  row2,
  row3,
  row4,
  sortinfo,
} = storeToRefs(MainStore);

const total = ref(0);

watch([edmsList, nexenList, approList, boardList], () => {
  total.value =
    Number(edmsTotal.value) +
    Number(nexenTotal.value) +
    Number(approTotal.value) +
    Number(boardTotal.value);
});

const formatDate = (input) => {
  const year = input.slice(0, 4);
  const month = input.slice(4, 6);
  const day = input.slice(6, 8);
  const hour = input.slice(8, 10);
  const minute = input.slice(10, 12);
  const second = input.slice(12, 14);

  // 원하는 포맷으로 변환
  return `${year}-${month}-${day}T${hour}:${minute}:${second}Z`;
};

const processContent = (content) => {
  if (content) {
    return content.replace(/<em>/g, '<em class="keyword">');
  } else {
    return content;
  }
};

const sortData = ref(true);
const sortList = async (data) => {
  // sortData.value = !sortData.value;
  sortinfo.value = data;
  page.value = 2;
  pageNo.value = null;
  resetData();
  if (lnbActive.value == "doc1") {
    nexenList.value = await getSearchnexen();
  } else if (lnbActive.value == "doc2") {
    edmsList.value = await getSearchedms();
  } else if (lnbActive.value === "appro") {
    approList.value = await getSearchAppro();
  } else if (lnbActive.value === "board") {
    boardList.value = await getSearchBoard();
  } else {
    if (checkSearch.value === "row1") {
      approList.value = await getSearchAppro();
      boardList.value = await getSearchBoard();
    } else if (checkSearch.value === "row2") {
      nexenList.value = await getSearchnexen();
    } else if (checkSearch.value === "row3") {
      edmsList.value = await getSearchedms();
    } else {
      edmsList.value = await getSearchedms();
      nexenList.value = await getSearchnexen();
      approList.value = await getSearchAppro();
      boardList.value = await getSearchBoard();
    }
  }
  if (data == "accurate") {
    sortData.value = true;
  } else if (data == "recent") {
    sortData.value = false;
  }
};

const detailNexen = async (data) => {
  checkSearch.value === "all";
  resetData();
  selectRadio.value = false;
  pageNo.value = null;
  indexType.value = data;
  row2.value = true;
  row3.value = false;
  row1.value = false;
  row4.value = false;
  nexenList.value = await getSearchnexen();
  scroll.value = true;
};

const detailEdms = async (data) => {
  checkSearch.value === "all";
  resetData();
  selectRadio.value = false;
  pageNo.value = null;
  indexType.value = data;
  row2.value = false;
  row3.value = true;
  row1.value = false;
  row4.value = false;
  edmsList.value = await getSearchedms();
  scroll.value = true;
};

const sentinel = ref(null);
const page = ref(2);
const pagesize = ref(20);

const onIntersection = async () => {
  if (
    nexenList.value.length > 0 &&
    row2.value &&
    total.value === nexenList.value[0].items.length
  ) {
    return;
  }
  if (
    edmsList.value.length > 0 &&
    row3.value &&
    total.value === edmsList.value[0].items.length
  ) {
    return;
  }
  if (
    approList.value.length > 0 &&
    row1.value &&
    total.value === approList.value[0].items.length
  ) {
    return;
  }
  if (
    boardList.value.length > 0 &&
    row4.value &&
    total.value === boardList.value[0].items.length
  ) {
    return;
  }
  let pag = page.value;
  pageNo.value = pag;
  if (row2.value && nexenList.value.length > 0) {
    let list = nexenList.value[0].items;
    await getSearchnexen();
    for (let i in nexenList.value[0].items) {
      list.push(nexenList.value[0].items[i]);
    }
    nexenList.value[0].items = list;
  } else if (row3.value && edmsList.value.length > 0) {
    let list = edmsList.value[0].items;
    await getSearchedms();
    for (let i in edmsList.value[0].items) {
      list.push(edmsList.value[0].items[i]);
    }
    edmsList.value[0].items = list;
  } else if (row1.value && approList.value.length > 0) {
    let list = approList.value[0].items;
    await getSearchAppro();
    for (let i in approList.value[0].items) {
      list.push(approList.value[0].items[i]);
    }
    approList.value[0].items = list;
  } else if (row4.value && boardList.value.length > 0) {
    let list = boardList.value[0].items;
    await getSearchBoard();
    for (let i in boardList.value[0].items) {
      list.push(boardList.value[0].items[i]);
    }
    boardList.value[0].items = list;
  }

  page.value++;
};

const observing = ref(true);
watch(scroll, () => {
  if (scroll.value) {
    const observer = new IntersectionObserver(
      async ([entry], observer) => {
        // 가시성이 생기면
        if (entry.isIntersecting) {
          // 중복 실행을 막기 위해 관찰을 멈춘다
          observer.unobserve(entry.target);
          if (observing.value) {
            observing.value = false;
            await onIntersection(entry);
            setTimeout(() => {
              observing.value = true;
            }, 3000);
          }

          // 실행 뒤에는 다시 관찰을 시작한다
          observer.observe(entry.target);
        }
      },
      {
        // 30% 정도 보이면 실행 시작
        threshold: 0.3,
      }
    );
    // sentinel 요소 감시 시작
    if (sentinel.value) {
      observer.observe(sentinel.value);
    }
  }
});

const lnbChange = async (data) => {
  pagesize.value = 20;
  selectRadio.value = false;
  scroll.value = true;
  resetData();
  if (data === "appro") {
    row2.value = false;
    row3.value = false;
    row1.value = true;
    row4.value = false;
    approList.value = await getSearchAppro();
  } else if (data === "board") {
    row2.value = false;
    row3.value = false;
    row1.value = false;
    row4.value = true;
    boardList.value = await getSearchBoard();
  }

  lnbActive.value = data;
};
watch(lnbActive, () => {
  page.value = 2;
  checkSearch.value = "all";
  if (lnbActive.value === "appro") {
    row1.value = true;
    row2.value = false;
    row3.value = false;
    row4.value = false;
  } else if (lnbActive.value === "doc1") {
    row1.value = false;
    row2.value = true;
    row3.value = false;
    row4.value = false;
  } else if (lnbActive.value === "doc1") {
    row1.value = false;
    row2.value = false;
    row3.value = true;
    row4.value = false;
  } else if (lnbActive.value === "board") {
    row1.value = false;
    row2.value = false;
    row3.value = false;
    row4.value = true;
  } else {
    row1.value = true;
    row2.value = true;
    row3.value = true;
    row4.value = false;
  }
});

// const fileDown = async (data, info) => {
//   if (info === "중앙") {
//     const url = `https://kms.nexentire.com/my/files/${data.id}/content`;

//     const link = document.createElement("a");
//     link.href = url;
//     link.target = "_blank";
//     link.download = ""; // You can set a filename here, or leave it empty to use the default filename
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   }
// };

const openUrl = async (data, info, name) => {
  if (info === "중앙") {
    if (name === "explorer") {
      const url = `https://kms.nexentire.com/my/files/${data.id}/content`;
      const link = document.createElement("a");
      link.href = url;
      link.download = ""; // You can set a filename here, or leave it empty to use the default filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(
        `https://kms.nexentire.com/external/detail.jsp?type=${data.mapId}&pkey=${data.docId}`
      );
    }
  } else if (info === "표준") {
    // Create a form dynamically
    let form = document.createElement("form");
    form.method = "POST";
    form.action = `http://172.17.31.167:8088/xclickr31_nxt/cef/edms/cefEdmsSearchReceive.jsp`;

    // Add hidden fields to the form with the POST data
    let docIdInput = document.createElement("input");
    docIdInput.type = "hidden";
    docIdInput.name = "docId";
    docIdInput.value = data.docId;
    form.appendChild(docIdInput);

    let useridInput = document.createElement("input");
    useridInput.type = "hidden";
    useridInput.name = "userid";
    useridInput.value = userInfo.value.OrgDbUserDocumentData.empno;
    form.appendChild(useridInput);

    // Append the form to the body
    document.body.appendChild(form);

    // Open the form in a new window
    form.target = "_blank";

    // Submit the form
    form.submit();

    // Remove the form from the DOM
    document.body.removeChild(form);
  } else if (info === "결재") {
    const doc = data.dbPath.replaceAll("\\", "/");
    window.open(
      `https://portalnew.nexentire.com/dwp/com/portal/main.nsf/wfrmpage?ReadForm&url=/${doc}/vdockey/${data.docKey}?opendocument%26popup=1`
    );
  } else if (info === "bbs") {
    window.open(`/vboard/boardread?key_unid=${data.docid}&popup=1&pre=1`);
  }
};
</script>

<style scoped>
.more {
  cursor: pointer;
}
</style>