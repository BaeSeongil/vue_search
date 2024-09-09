export const Lang = (str, langCode) => {
  try {
    let obj;

    let lang = "";
    // 고정 언어를 받는다면 언어적용
    if (langCode) {
      lang = langCode;
    } else {
      // 고정이 아니라면 쿠키값 사용
      const cArr = document.cookie.split(";");
      for (const i in cArr) {
        if (cArr[i].trim().split("=")[0] === "language") {
          lang = cArr[i].trim().split("=")[1];
        }
      }
    }

    try {
      obj = JSON.parse(str);
      // eslint-disable-next-line
    } catch (e) {
      obj = str;
    }

    if (typeof obj === "string") {
      // 쿠키에도 없다면 ko 기본값
      if (!lang) {
        lang = "ko";
      }

      const arr = str.split(",");

      for (const index in arr) {
        const regex = new RegExp(`^${lang}:`);
        if (regex.test(arr[index])) {
          return arr[index].split(":")[1];
        }
      }

      // 못찾으면 ko로 다시 시도
      lang = "ko";

      for (const index in arr) {
        const regex = new RegExp(`^${lang}:`);
        if (regex.test(arr[index])) {
          return arr[index].split(":")[1];
        }
      }
    } else if (typeof obj === "object") {
      if (obj[lang] !== undefined) {
        return obj[lang];
      }
      // 못찾으면 ko로 다시 시도
      lang = "ko";
      if (obj[lang] !== undefined) {
        return obj[lang];
      }
    }

    // ko도 없으면 string 그대로 return
    return str;
  } catch (error) {
    if (typeof str === "undefined") {
      return "";
    }

    return str;
  }
};

export const getlangCode = () => {
  try {
    let lang = "ko";
    // 고정이 아니라면 쿠키값 사용
    const cArr = document.cookie.split(";");
    for (const i in cArr) {
      if (cArr[i].trim().split("=")[0] === "language") {
        lang = cArr[i].trim().split("=")[1];
      }
    }
    return lang;
  } catch (error) {
    console.error(error);
    return "ko";
  }
};
