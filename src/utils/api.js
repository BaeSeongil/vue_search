import axios from 'axios';
import router from '@/router';
import { useMainStore } from "@/stores/main";

let isDisplayLoader = false;



const instance = axios.create({
    baseURL: import.meta.env.BASE_URL,
    // timeout: 1000 * 60 // 대용량 첨부때문에 삭제함
});

const displayLoading = isLoading => {
    const store = useMainStore();
    if (isDisplayLoader === true) {
        // console.log("isLoading", isLoading);
        store.setLoading(isLoading);
    }
};

const setIsDisplayLoader = options => {
    const displayLoader = options?.isDisplayLoader || false;
    isDisplayLoader = displayLoader;
};

instance.interceptors.request.use(
    config => {
        displayLoading(true);
        //console.log('[REQ:' + config.method + '] ' + config.url + ': ' + JSON.stringify(config.data || {}))
        // config.headers['Authorization'] = AuthManager.getAuthToken()
        return config;
    },
    error => {
        //console.log('axios.interceptors.request.error: ', error)
        displayLoading(false);
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    response => {
        // const config = response.config || {}
        displayLoading(false);
        return onResponseHandle(response);
    },
    error => {
        // console.log('axios.interceptors.response.error: ' + JSON.stringify(error))
        // onErrorHandle(error)
        // displayLoading(false)
        // return Promise.reject(error)

        return onErrorHandle(error);
    }
);

const onResponseHandle = response => {
    if (response?.data?.result == false) {
        // 에러발생시 공통로직 추가할 부분
        return response;
    } else {
        return response;
    }
};

const onErrorHandle = async error => {
    const status = error?.response?.status;

    setTimeout(async () => {
        if (error?.response) {
            switch (status) {
                case 401:
                    toLogin();
                    break;
                case 403:

                    // toLogin()
                    break;
                case 404:
                    break;
                default: {

                    // 에러 핸들링 처리는 각함수에서 하기


                }
            }
        } else {
            if (error?.code === "ERR_CANCELED") {
                // 대용량 첨부 취소일시
                return;
            }
            // alert('네트워크 오류입니다.')
            console.log("네트워크 오류입니다.");
            console.log(JSON.stringify(error));
        }

    }, 100);
    console.log(error.response);
    return error?.response;
};

const toLogin = () => {
    router.replace({
        path: '/login',
        query: {
            redirect: router.currentRoute.fullPath
        }
    });
};
export const http = {
    request: async function (options) {
        options = options || {};
        setIsDisplayLoader(options);
        try {
            const response = await instance(options);
            return response;
        } catch (error) {
            console.log("http.request.error", error);
        }
    },
    get: async function (url, options) {
        options = options || {};
        setIsDisplayLoader(options);

        try {
            const response = await instance.get(url);
            return response;
        } catch (error) {
            console.log("http.get.error", error);
        }
    },
    put: async function (url, options = {}) {
        setIsDisplayLoader(options);

        const data = options.data ? options.data : null;
        const option = options.options ? option.options : null;

        try {
            const response = await instance.put(url, data, option);
            return response;
        } catch (error) {
            console.log("http.post.error", error);
        }
    },
    post: async function (url, options = {}) {
        setIsDisplayLoader(options);

        const data = options.data ? options.data : null;
        const option = options.options ? option.options : null;

        try {
            const response = await instance.post(url, data, options);
            return response;
        } catch (error) {
            console.log("http.post.error", error);
        }
    },
    delete: async function (url, options = {}) {
        setIsDisplayLoader(options);

        const data = options.data ? options.data : null;

        try {
            const response = await instance.delete(url, data);
            return response;
        } catch (error) {
            //console.log("http.delete.error", error)
        }
    }
};

export const AuthManager = (function () {
    return {
        setAuthToken: function (authToken) {
            localStorage.setItem("AUTH_TOKEN", authToken);
        },
        getAuthToken: function () {
            return localStorage.getItem("AUTH_TOKEN");
        },
        clear: function () {
            localStorage.removeItem("AUTH_TOKEN");
        }
    };
})();