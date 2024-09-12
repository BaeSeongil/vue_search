import { ref } from "vue";
import { defineStore, storeToRefs } from "pinia";
import { http } from "@/utils/api";
import { open } from "@/utils/link";
import router from "../router";
import configFile from "@/config/config.json";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { useRoute } from 'vue-router'
import AesUtil from '@/assets/js/AesUtil.js'

const route = useRoute()

dayjs.extend(utc);
dayjs.extend(timezone);



export const useMainStore = defineStore("main", () => {


  const spinnerOn = () => {
    if (document.querySelector(".spinner.loading_video"))
      document.querySelector(".spinner.loading_video").style.display =
        "inline-block";
  };
  const spinnerOff = () => {
    if (document.querySelector(".spinner.loading_video"))
      document.querySelector(".spinner.loading_video").style.display = "none";
  };

  const config = ref(null);

  const setOption = async () => {
    const packageName = configFile.package;
    config.value = await import(`@/config/config_${packageName}.json`);
  };

  const option = () => {
    return config.value;
  };

  const language = ref(null);
  const getLanguage = async () => {
    try {
      const option = {
        url: `ematenapi/gw/search/api/main?type=language`
      };

      const res = await http.request(option);
      if (res.data.result) {
        language.value = res.data.data;
      } else {
        language.value = {};
      }
    } catch (error) {
      return language.value = {};
    }
  };

  const userInfo = ref(null);
  const loginCheck = async () => {
    let url;
    const portal = import.meta.env.VITE_APP_PORTAL;
    if (portal === "true" || portal === true) {
      url = `/portalapi/portal/api/wPgAuthority`;
    } else {
    }
    url = `/dwp/com/sys/webservice.nsf/wPgAuthority?open`;
    const { data } = await http.get(url);

    let login = false;

    if (data.Login == "1" && data.UserName != "Anonymous") {
      // 로그인이 정상적일때,
      login = true;
      userInfo.value = data;
      await getMydrive();
    }
    return login;
  };
  const langCode = ref({});
  const SideMenuVisible = ref(true);

  const openInHiddenIframe = async (url) => {
    // iframe 요소 생성
    const iframe = document.createElement('iframe');

    // iframe의 스타일을 설정하여 시각적으로 숨김
    iframe.style.position = 'absolute';
    iframe.style.width = '0px';
    iframe.style.height = '0px';

    // iframe의 src 속성에 URL을 설정
    iframe.src = url;

    // iframe을 body에 추가하여 문서에 포함
    document.body.appendChild(iframe);
  }

  const getMydrive = async () => {
    const keySize = 128;
    const iterations = 1000;
    const iterationCount = 1000
    const salt = "3FF2EC019C627B945225DEBAD71A01B6985FE84C95A70EB132882F88C0A59A55";
    const iv = "F27D5C9927726BCEFE7510B1BDD3D137";

    const id = userInfo.value?.OrgDbUserDocumentData.empno;
    const key = new Date().getTime().toString();	// 시간값이 나온다. 이전 예제에서 Java System.currentTimeMillis()와 동일
    const myDriveURL = "https://kms.nexentire.com";
    const stdURL = "https://stddoc.nexentire.com";
    const aesUtil = new AesUtil(keySize, iterationCount);
    const enc_id = aesUtil.encrypt(salt, iv, key, id);
    const dec_id = aesUtil.decrypt(salt, iv, key, enc_id);

    const lang = langCode.value.toUpperCase();
    const d_url = `${myDriveURL}/login/index.jsp?user_id=${encodeURIComponent(enc_id)}&key=${key}&ctype=PORTAL&lang=${lang}`
    // const s_url = `/getStddocSession/xclickr31_nxt/cef/sso/receiveSso.jsp?user_id=${encodeURIComponent(enc_id)}&key=${key}&login_locale=${langCode.value}`

    const newWindow = window.open(d_url, '_blank', 'position=absolute,width=1,height=1,left=-10000px,top=-10000px');
    // newWindow.blur();
    window.focus()
    // openInHiddenIframe(d_url);
    // openInHiddenIframe(s_url);

    const checkUrlChange = setInterval(() => {
      if (newWindow.closed) {
        // 새 창이 이미 닫힌 경우 체크 중지
        clearInterval(checkUrlChange);
      } else {
        // 현재 창의 URL이 변경되었는지 확인
        try {
          if (!newWindow.location.href.includes('/login/') && newWindow.location.href.includes('/myspace/')) {
            newWindow.close();
            clearInterval(checkUrlChange);
          }
        } catch (e) {
          // 다른 출처의 URL로 변경되면 접근이 제한될 수 있습니다.
          // 이 경우 창을 닫고 체크를 중지합니다.
          newWindow.close();
          clearInterval(checkUrlChange);
        }
      }
    }, 1000);

    // const url = {
    //   d_url: d_url,
    //   s_url: s_url
    // }

    // return url
    // window.open(s_url)
    // const option = {
    //   url: s_url,
    // };

    // const res = await http.request(option);

    // return res
  }
  // 검색어
  const searchvalue = ref(null);
  // 결과 내 재검색
  const research = ref(false);
  const reValue = ref(null);

  const edmsList = ref([]);
  const edmsTotal = ref(null);
  const nexenList = ref([]);
  const nexenTotal = ref(null);

  const indexType = ref("TOTAL");

  // 검색 대상 라디오 버튼
  const selectRadio = ref(true);
  // 무한 스크롤 보일지 말지 정하는 값
  const scroll = ref(false);
  const pageNo = ref(1);
  const sortinfo = ref("accurate");
  const getSearchedms = async (data) => {
    const option = {
      url: `ematenapi/gw/search/api/main?type=edms`
    };
    // searchvalue.value = route.query.search;
    option.params = {
      query: searchvalue.value,
      index: indexType.value,
      lang: langCode.value,
      userId: userInfo.value.OrgDbUserDocumentData.empno
    }
    if (sortinfo.value === "recent") {
      option.params.sort = "chgDate"
    } else {
      option.params.sort = "SCORE"
    }
    if (pageNo.value) {
      option.params.pageNo = pageNo.value
    }
    if (research.value) {
      option.params.requery = reValue.value;
    }
    if (searchvalue.value && searchvalue.value.length > 1) {
      spinnerOn();
      // console.log("option", option);
      const { data: res } = await http.request(option);

      if (res.result) {
        edmsList.value = res.data.result
        edmsTotal.value = res.data.totalCount
      } else {
        edmsList.value = []
        edmsTotal.value = 0
      }
      spinnerOff();
    }
    return edmsList.value
  }

  const getSearchnexen = async (data) => {
    const option = {
      url: `ematenapi/gw/search/api/main?type=nexen`
    };
    // searchvalue.value = route.query.search;
    option.params = {
      query: searchvalue.value,
      index: indexType.value,
      lang: langCode.value,
      userId: userInfo.value.OrgDbUserDocumentData.empno
    }
    if (sortinfo.value === "recent") {
      option.params.sort = "updatedDate"
    } else {
      option.params.sort = "SCORE"
    }
    if (pageNo.value) {
      option.params.pageNo = pageNo.value
    }
    if (research.value) {
      option.params.requery = reValue.value;
    }
    if (searchvalue.value && searchvalue.value.length > 1) {
      spinnerOn();

      const { data: res } = await http.request(option);

      // console.log("res", res);
      if (res.result) {
        nexenList.value = res.data.result
        nexenTotal.value = res.data.totalCount
      } else {
        nexenList.value = []
        nexenTotal.value = 0
      }

      spinnerOff();
    }
    return nexenList.value
  }

  const approList = ref([]);
  const approTotal = ref(0);
  const getSearchAppro = async (data, count) => {
    const option = {
      url: `ematenapi/gw/search/api/main?type=approval`
    };
    // searchvalue.value = route.query.search;
    option.params = {
      query: searchvalue.value,
      index: "approval",
      lang: langCode.value,
      userId: userInfo.value.OrgDbUserDocumentData.empno
    }
    if (sortinfo.value === "recent") {
      option.params.sort = "createdDate"
    } else {
      option.params.sort = "SCORE"
    }
    if (research.value) {
      option.params.requery = reValue.value;
    }

    if (pageNo.value) {
      option.params.pageNo = pageNo.value
    }
    if (searchvalue.value && searchvalue.value.length > 1) {
      spinnerOn();
      const { data: res } = await http.request(option);

      if (res.result) {
        approList.value = res.data.result
        approTotal.value = res.data.totalCount
      } else {
        approList.value = []
        approTotal.value = 0
      }

      spinnerOff();
    }


    return approList.value
  }

  const boardList = ref([]);
  const boardTotal = ref(0);
  const getSearchBoard = async (data, count) => {
    const option = {
      url: `ematenapi/gw/search/api/main?type=board`
    };
    // searchvalue.value = route.query.search;
    option.params = {
      query: searchvalue.value,
      index: "bbs",
      lang: langCode.value,
      userId: userInfo.value.OrgDbUserDocumentData.empno
    }
    if (sortinfo.value === "recent") {
      option.params.sort = "modifiedDate"
    } else {
      option.params.sort = "SCORE"
    }
    if (research.value) {
      option.params.requery = reValue.value;
    }

    if (pageNo.value) {
      option.params.pageNo = pageNo.value
    }
    if (searchvalue.value && searchvalue.value.length > 1) {
      spinnerOn();
      const { data: res } = await http.request(option);
      if (res.result) {
        boardList.value = res.data.result
        boardTotal.value = res.data.totalCount
      } else {
        boardList.value = []
        boardTotal.value = 0
      }

      spinnerOff();
    }


    return boardList.value
  }

  const lnbActive = ref("all");
  const lnbSelect = ref(false);
  const checkSearch = ref("all");

  // 표준 문서
  const row3 = ref(true);
  // 문서 중앙
  const row2 = ref(true);
  // 그룹웨어
  const row1 = ref(true);
  const row4 = ref(true);

  const resetData = () => {
    approList.value = [];
    approTotal.value = 0;
    nexenList.value = [];
    nexenTotal.value = 0;
    edmsList.value = [];
    edmsTotal.value = 0;
    boardList.value = [];
    boardTotal.value = 0;
  }

  return {
    spinnerOn,
    spinnerOff,
    setOption,
    option,
    getLanguage,
    SideMenuVisible,
    loginCheck,
    userInfo,
    langCode,
    language,
    getSearchedms,
    getSearchnexen,
    edmsList,
    edmsTotal,
    nexenList,
    nexenTotal,
    searchvalue,
    indexType,
    selectRadio,
    scroll,
    pageNo,
    getSearchAppro,
    approList,
    approTotal,
    lnbActive,
    lnbSelect,
    checkSearch,
    row1, row2, row3, row4,
    resetData,
    sortinfo,
    getSearchBoard,
    boardList,
    boardTotal,
    research,
    reValue,
    getMydrive
  };
});
