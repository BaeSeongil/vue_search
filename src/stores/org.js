import { ref } from "vue";
import { defineStore } from "pinia";
import { http } from "@/utils/api";
import config from "@/config/config.json";
import dev from "@/config/config_dev.json";

export const useOrgStore = defineStore("org", () => {
  const configs = { config, dev };

  const setFullorginfoObj = fullorginfo => {
    try {
      const fullorginfoArr = fullorginfo.split("^");
      let fullorginfoKeys;

      const packageName = config.package;

      const option = configs[packageName];

      if (fullorginfoArr[0] === "S") {
        fullorginfoKeys = option.fullorginfo.person;
      } else {
        // 부서면
        fullorginfoKeys = option.fullorginfo.department;
      }

      const fullorginfoObject = {};

      for (let index = 0; index < fullorginfoArr.length; index++) {
        const key = fullorginfoKeys[index];
        if (key === "") {
          continue;
        }
        let value = fullorginfoArr[index];
        if (value.includes(",") && value.includes(":")) {
          const values = value.split(",");
          const valueObj = {};
          values.forEach(v => {
            const [splitKey, splitValue] = v.split(":");
            valueObj[splitKey] = splitValue;
          });
          value = valueObj;
        } else if (value.includes(",")) {
          value = value.split(",");
        }
        fullorginfoObject[key] = value;
      }

      if (fullorginfoArr[0] === "S") {
        // fullorginfoObject.dispinfo
        const dispinfoObj = { ...fullorginfoObject.username };
        const titleObj = { ...fullorginfoObject.username };
        const keys = Object.keys(dispinfoObj);
        let target;
        if (fullorginfoObject.dispgrade === "P") {
          target = "posname";
        } else {
          target = "dutyname";
        }
        keys.forEach(key => {
          titleObj[key] = titleObj[key] + " " + fullorginfoObject[target][key];
          dispinfoObj[key] =
            dispinfoObj[key] +
            " " +
            fullorginfoObject[target][key] +
            " / " +
            fullorginfoObject.orgname[key];
        });
        fullorginfoObject.dispinfo = dispinfoObj;
        fullorginfoObject.title = titleObj;
        fullorginfoObject.id = fullorginfoObject.notesid;
      } else {
        fullorginfoObject.dispinfo = fullorginfoObject.orgname;
        fullorginfoObject.title = fullorginfoObject.orgname;
        fullorginfoObject.id = fullorginfoObject.orgcode;
      }


      return fullorginfoObject;
    } catch (e) {
      return fullorginfo;
    }
  };

  const getOrgChart = async (code = "") => {
    try {
      const option = {
        url: `/ematenapi/gw/bbs/api/org?id=tree&code=${encodeURI(code)}`,
        method: "GET",
      };

      const response = await http.request(option);

      if (response.data.result) {
        return response.data.data;
      } else {
        return [];
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const orgSetting = ref({});
  const initSetting = (option = {}) => {
    orgSetting.value = option;
  };

  const searchedList = ref([]);
  const timestamp = ref(null);

  const getOrgSearch = async ({ searchKeyword = "", searchtype = null }) => {
    try {
      if (searchKeyword.length < 2) {
        return [];
      }
      const startTime = Date.now();
      timestamp.value = startTime;
      const option = {
        url: `/ematenapi/gw/bbs/api/org`,
        method: "GET",
      };

      if (orgSetting.value.searchtype) {
        searchtype = orgSetting.value.searchtype;
      }
      option.params = {
        id: "search",
        query: encodeURIComponent(searchKeyword),
        type: 0,
        searchtype,
      };
      const response = await http.request(option);

      addList.value = [];

      if (timestamp.value !== startTime) {
        return searchedList.value;
      }

      if (response.data.result) {
        searchedList.value = response.data.data;
        return response.data.data;
      } else {
        return [];
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const myInfo = ref(null);
  const myFullOrg = ref([]);

  const getMyInfo = async () => {
    const option = {
      url: `/ematenapi/gw/bbs/api/org?id=userList`,
    };
    const { data } = await http.request(option);
    myInfo.value = data;
    myFullOrg.value = data.data[1].cuser.pinfo.fullorgcode.split(",");
  };

  const addList = ref([]);
  const deleteList = ref([]);
  const targetList = ref([]);

  const selectOrg = data => {
    if (data.type === "B" && orgSetting.value.searchtype === "Person") {
      return;
    }

    const findIndex = addList.value.findIndex(
      v => v === data.fullorginfoObject
    );
    if (findIndex !== -1) {
      addList.value.splice(findIndex, 1);
    } else {
      if (orgSetting.value.onlyOne) {
        addList.value = [data.fullorginfoObject];
        return;
      }
      addList.value.push(data.fullorginfoObject);
    }
  };

  const insertOrg = data => {
    let temp = targetList.value;
    temp.push(data.fullorginfoObject);

    // console.log(":insertOrg", data);
    // console.log(":insertOrg", temp);
    temp = temp.map(v => JSON.stringify(v));
    temp = [...new Set(temp)];
    temp = temp.map(v => JSON.parse(v));
    targetList.value = temp;
  };


  const addTarget = () => {
    if (orgSetting.value.onlyOne) {
      targetList.value = [...addList.value];
      addList.value = [];
      return;
    }
    let temp = targetList.value;
    temp.push(...addList.value);
    temp = temp.map(v => JSON.stringify(v));
    temp = [...new Set(temp)];
    temp = temp.map(v => JSON.parse(v));
    targetList.value = temp;
    addList.value = [];
  };
  const deleteTarget = () => {
    targetList.value = targetList.value.filter(v => {
      return !deleteList.value.includes(v);
    });
    deleteList.value = [];
  };
  const clearTarget = () => {
    targetList.value = [];
    deleteList.value = [];
  };
  const seleteTarget = data => {
    const findIndex = deleteList.value.findIndex(v => v === data);
    if (findIndex !== -1) {
      deleteList.value.splice(findIndex, 1);
    } else {
      deleteList.value.push(data);
    }
  };
  return {
    setFullorginfoObj,
    getOrgSearch,
    getOrgChart,
    getMyInfo,
    myInfo,
    myFullOrg,
    addList,
    deleteList,
    selectOrg,
    insertOrg,
    targetList,
    addTarget,
    deleteTarget,
    clearTarget,
    seleteTarget,
    initSetting,
    orgSetting,
  };
});
