import dayjs from "dayjs";
import { useMainStore } from "@/stores/main";


export const DatetoLocaleString = (isodate, options = {}) => {
  let LocaleDate;
  if (!isodate) {
    return "";
  } else if (typeof isodate == "string") {
    if (isodate != "") {
      const regex = /^\d{4}\d{2}\d{2}T\d{2}\d{2}\d{2}$/;
      if (regex.test(isodate)) {
        LocaleDate = convertElasticDate(isodate);
      } else {
        LocaleDate = new Date(isodate);
      }
    }
  } else if (typeof isodate == "object" || typeof isodate == "number") {
    LocaleDate = new Date(isodate);
  }


  const store = useMainStore();
  const { option } = store;


  // 날짜시간 표시방식 설정값
  const { datetime_displaytype } = option();


  // 로그인시 선택한 언어
  const loginLang = getLanguageCode();
  let rtn = "";

  // 기본 표시형식
  if (datetime_displaytype == "2") {
    //고객사와 합의한 포맷
    if (Object.prototype.hasOwnProperty.call(options, "format")) {
      if (options.format == "dateonly") {
        rtn = LocaleDate.toLocaleDateString([], {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }).replaceAll(" ", "");
      } else if (options.format == "sdateonly") {
        rtn = LocaleDate.toLocaleDateString([], {
          year: "2-digit",
          month: "2-digit",
          day: "2-digit",
        }).replaceAll(" ", "");
      } else if (options.format == "timeonly") {
        rtn = LocaleDate.toLocaleTimeString("en-us", { hour12: false });
      } else if (options.format == "stimeonly") {
        rtn = LocaleDate.toLocaleTimeString("en-us", {
          hour12: false,
          timeStyle: "short",
        });
      } else if (options.format == "datestime") {
        rtn =
          LocaleDate.toLocaleDateString([], {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }).replaceAll(" ", "") +
          " " +
          LocaleDate.toLocaleTimeString("en-us", {
            hour12: false,
            timeStyle: "short",
          });
      } else if (options.format == "sdatestime") {
        rtn =
          LocaleDate.toLocaleDateString([], {
            year: "2-digit",
            month: "2-digit",
            day: "2-digit",
          }).replaceAll(" ", "") +
          " " +
          LocaleDate.toLocaleTimeString("en-us", {
            hour12: false,
            timeStyle: "short",
          });
      } else if (options.format == "datenoneday") {
        rtn = LocaleDate.toLocaleDateString([], {
          year: "numeric",
          month: "numeric",
        }).replaceAll(" ", "");
      } else if (options.format == "onlyday") {
        rtn = LocaleDate.toLocaleDateString("en-us", {
          day: "numeric",
        });
      } else if (options.format == "timenonesecond") {
        rtn = LocaleDate.toLocaleTimeString("en-us", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
      }
    }
    if (rtn == "") {
      rtn =
        LocaleDate.toLocaleDateString([], {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }).replaceAll(" ", "") +
        " " +
        LocaleDate.toLocaleTimeString("en-us", { hour12: false });
    }
  } else if (datetime_displaytype == "1" && loginLang == "ko") {
    // 한국어만 예외처리
    if (Object.prototype.hasOwnProperty.call(options, "format")) {
      if (options.format == "dateonly") {
        rtn = LocaleDate.toLocaleDateString([], {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }).replaceAll(" ", "");
      } else if (options.format == "sdateonly") {
        rtn = LocaleDate.toLocaleDateString([], {
          year: "2-digit",
          month: "2-digit",
          day: "2-digit",
        }).replaceAll(" ", "");
      } else if (options.format == "timeonly") {
        rtn = LocaleDate.toLocaleTimeString("en-us", { hour12: false });
      } else if (options.format == "stimeonly") {
        rtn = LocaleDate.toLocaleTimeString("en-us", {
          hour12: false,
          timeStyle: "short",
        });
      } else if (options.format == "datestime") {
        rtn =
          LocaleDate.toLocaleDateString([], {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }).replaceAll(" ", "") +
          " " +
          LocaleDate.toLocaleTimeString("en-us", {
            hour12: false,
            timeStyle: "short",
          });
      } else if (options.format == "sdatestime") {
        rtn =
          LocaleDate.toLocaleDateString([], {
            year: "2-digit",
            month: "2-digit",
            day: "2-digit",
          }).replaceAll(" ", "") +
          " " +
          LocaleDate.toLocaleTimeString("en-us", {
            hour12: false,
            timeStyle: "short",
          });
      } else if (options.format == "datenoneday") {
        rtn = LocaleDate.toLocaleDateString([], {
          year: "numeric",
          month: "numeric",
        }).replaceAll(" ", "");
      } else if (options.format == "onlyday") {
        rtn = LocaleDate.toLocaleDateString("en-us", {
          day: "numeric",
        });
      } else if (options.format == "timenonesecond") {
        rtn = LocaleDate.toLocaleTimeString("en-us", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
      }
    }
    if (rtn == "") {
      rtn =
        LocaleDate.toLocaleDateString([], {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }).replaceAll(" ", "") +
        " " +
        LocaleDate.toLocaleTimeString("en-us", { hour12: false });
    }
  } else {
    if (Object.prototype.hasOwnProperty.call(options, "format")) {
      if (options.format == "dateonly" || options.format == "sdateonly") {
        if (Object.prototype.hasOwnProperty.call(options, "dateStyle")) {
          rtn = LocaleDate.toLocaleDateString([], {
            dateStyle: options.dateStyle,
          });
        } else {
          rtn = LocaleDate.toLocaleDateString();
        }
      } else if (
        options.format == "timeonly" ||
        options.format == "stimeonly"
      ) {
        if (Object.prototype.hasOwnProperty.call(options, "timeStyle")) {
          rtn = LocaleDate.toLocaleTimeString([], {
            timeStyle: options.timeStyle,
          });
        } else {
          rtn = LocaleDate.toLocaleTimeString();
        }
      } else if (options.format == "datestime") {
        rtn = LocaleDate.toLocaleString([], {
          dateStyle: "medium",
          timeStyle: "short",
        });
      } else if (options.format == "sdatestime") {
        rtn = LocaleDate.toLocaleString([], {
          dateStyle: "short",
          timeStyle: "short",
        });
      } else if (options.format == "datenoneday") {
        rtn = LocaleDate.toLocaleDateString([], {
          year: "numeric",
          month: "numeric",
        }).replaceAll(" ", "");
      } else if (options.format == "onlyday") {
        rtn = LocaleDate.toLocaleDateString("en-us", {
          day: "numeric",
        });
      } else if (options.format == "timenonesecond") {
        rtn = LocaleDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
      }
    }
    if (rtn == "") {
      if (
        Object.prototype.hasOwnProperty.call(options, "dateStyle") &&
        Object.prototype.hasOwnProperty.call(options, "timeStyle")
      ) {
        rtn = LocaleDate.toLocaleString([], {
          dateStyle: options.dateStyle,
          timeStyle: options.timeStyle,
        });
      } else {
        rtn = LocaleDate.toLocaleString();
      }
    }
  }
  return rtn;
};
/* 배선일 수석님이 적어주신 설명 및 예시
1. 서버 환경변수
sis_datetime_displaytype
=> 0 : date 객체의 locale 표시
=> 1 : ko 면 예외 그외 언어는 기본값 표시
=> 2 : 고객사와 합의한 고정포맷으로 표시 (사이트별 예외처리)


2. 공통함수
DatetoLocaleString(isodate, options);
=> isodate : javascript date 객체 초기화시 입력할 값. (value, dateString, dateObject)
=> options : 사전에 정의된 날짜 포맷과 관련된 json 옵션. (필요시 추가 가능)
  format : dateonly(날짜만), sdateonly(날짜만. 년도2자리), timeonly(시간만), stimeonly(시간만. 초제외), datestime(날짜+시간. 초제외), sdatestime(날짜+시간. 년도2자리,초제외)
  dateStyle : full, long, medium, short 의 date 객체에서 기본 제공하는 표시길이 형태 정의 (sis_datetime_displaytype 값이 0 또는 1이면서 한국어가 아닌경우 적용)
  timeStyle : full, long, medium, short 의 date 객체에서 기본 제공하는 표시길이 형태 정의 (sis_datetime_displaytype 값이 0 또는 1이면서 한국어가 아닌경우 적용)


3. 예제

// 오늘 날짜
DatetoLocaleString('',{ format: 'dateonly'});
DatetoLocaleString('');
DatetoLocaleString();
// 특정 날짜
DatetoLocaleString("2014-06-01T06:00:00Z");


// 날짜만
DatetoLocaleString("2014-06-01T06:00:00Z", { format: 'dateonly'});
=> 0 : '2014. 6. 1.' or '6/1/2014'
=> 1 : '2014.06.01.' or '6/1/2014'
=> 2 : '2014.06.01.'

// 시간만
DatetoLocaleString("2014-06-01T06:00:00Z", { format: 'timeonly'});
=> 0 : '오후 3:00:00' or '1:00:00 AM'
=> 1 : '15:00:00' or '1:00:00 AM'
=> 2 : '15:00:00'

// 날짜 + 시간
DatetoLocaleString("2014-06-01T06:00:00Z");
=> 0 : '2014. 6. 1. 오후 3:00:00' or '6/1/2014, 1:00:00 AM'
=> 1 : '2014.06.01. 15:00:00' or '6/1/2014, 1:00:00 AM'
=> 2 : '2014.06.01. 15:00:00'

// 날짜 + 시간 (초 제외)
DatetoLocaleString("2014-06-01T06:00:00Z", { format: 'datestime'});
=> 0 : '2014. 6. 1. 오후 3:00' or 'Jun 1, 2014, 1:00 AM'
=> 1 : '2014.06.01. 15:00' or 'Jun 1, 2014, 1:00 AM'
=> 2 : '2014.06.01. 15:00'


// 날짜만 + 표시형식 (sis_datetime_displaytype 값이 0 또는 1이면서 한국어가 아닌경우 dateStyle 속성 적용)
DatetoLocaleString("2014-06-01T06:00:00Z", { format: 'dateonly', dateStyle: 'long' });
=> full : '2014년 6월 1일 일요일'
=> long : '2014년 6월 1일'
=> medium : '2014. 6. 1.'
=> short : '14. 6. 1.'

// 시간만 + 표시형식 (sis_datetime_displaytype 값이 0 또는 1이면서 한국어가 아닌경우 timeStyle 속성 적용)
DatetoLocaleString("2014-06-01T06:00:00Z", { format: 'timeonly', timeStyle: 'long'});
=> full : '오후 3시 0분 0초 한국 표준시'
=> long : '오후 3시 0분 0초 GMT+9'
=> medium : '오후 3:00:00'
=> short : '오후 3:00'

// 
DatetoLocaleString("2014-06-01T06:00:00Z", { dateStyle: 'long', timeStyle: 'long'});
=> long, long : '2014년 6월 1일 오후 3시 0분 0초 GMT+9'
=> short, short : "14. 6. 1. 오후 3:00"
*/

const convertElasticDate = dateString => {
  // 연도, 월, 일, 시간, 분, 초 추출
  const year = dateString.substr(0, 4);
  const month = dateString.substr(4, 2) - 1; // 월은 0부터 시작하므로 1을 빼줍니다.
  const day = dateString.substr(6, 2);
  const hour = dateString.substr(9, 2);
  const minute = dateString.substr(11, 2);
  const second = dateString.substr(13, 2);

  // Date 객체 생성
  const date = new Date(Date.UTC(year, month, day, hour, minute, second));

  return date;
};

const getLanguageCode = () => {
  const cookies = document.cookie;
  let language = cookies.replace(
    /(?:(?:^|.*;\s*)DWP_LANG\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
  if (!language) {
    language = cookies.replace(
      /(?:(?:^|.*;\s*)language\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
  }
  if (!language) {
    language = "ko";
  }
  return language;
};

export const formatDateToGMT = date => {
  return dayjs(date).utc().format('YYYY-MM-DDTHH:mm:ss') + ' GMT';
};
