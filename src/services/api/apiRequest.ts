import axios from "axios";
import * as urls from "../axios/url";
import { getToken, getUserData, setLocalToken } from "../storage/common";
import { SweetAlerts } from "../notification/sweetAlert";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: "Basic " + "",
  },
});

export const basicAuthDtl = btoa(
  process.env.REACT_APP_AUTHENTICATION_USERNAME +
    ":" +
    process.env.REACT_APP_AUTHENTICATION_PASSWORD,
);

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = getToken();

    // const token1 = await generateJwt();
    if (
      config.url === urls.getSetupDetail ||
      config.url === urls.onBoardingSetup ||
      config.url === urls.serviceModuleList ||
      config.url === urls.licenseVerify ||
      config.url === urls.getDeviceId ||
      // || config.url === urls.authLogoDetails
      !token
    ) {
      config.headers["Authorization"] = `Basic ${basicAuthDtl}`;
    } else if (token) {
      config.headers["Authorization"] = `Bearer ${token.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response: any) => {
    return response;
  },

  async (error: any) => {
    if (!error.response) {
      // Handle network errrs or cases where reposnse is not available

      if (window.location.pathname !== "/") {
        window.location.href = "/";
      }

      return Promise.reject(error);
    }

    const originalRequest = error.config;

    // check if the error is due to in expired access token
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      // // Use your token refresh logic here
      const token = getToken();

      // // Example: Refresh token logic using an API call
      await refreshAccessToken(token.refreshToken);

      const updatedToken = getToken();

      if (updatedToken) {
        originalRequest.headers["Authorization"] =
          `Bearer ${updatedToken.accessToken}`;
      }
      return axios(originalRequest);
    }
    return Promise.reject(error);
  },
);

// Function to refresh access token using your authentication service
const refreshAccessToken = async (refreshToken: string) => {
  const getidentifyData: any = localStorage.getItem("_identityData");
  const identifyData = JSON.parse(getidentifyData);
  const userData = getUserData();

  const payload = {
    BankCode: userData?.BankCode || undefined,
    UserId: userData?.UserId || userData?.UserId || undefined,
    SessionId: userData?.SessionId || userData?.SessionId || undefined,
    BranchCode: userData?.BranchCode || userData?.BranchCode || undefined,
    reqDomain: window.location.hostname,
    ipAddress: identifyData?.ip,
  };

  await axios({
    method: "POST",
    url: urls.refreshToken,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${refreshToken}`,
    },
  })
    .then((response) => {
      if (response.data.statusCode === 0) {
        setLocalToken(response.data.data);
        return;
      } else {
        return window.location.pathname !== "/sessionout"
          ? (window.location.href = "/sessionout")
          : "";
      }
    })
    .catch(async () => {
      return window.location.pathname !== "/sessionout"
        ? (window.location.href = "/sessionout")
        : "";
    });
};

export const apiRequest = async (
  method: any,
  endpoint: any,
  data: any = null,
  config = {},
) => {
  const getLocation: any = localStorage.getItem("location");
  const location = JSON.parse(getLocation);
  const getidentifyData: any = localStorage.getItem("_identityData");
  const identifyData = JSON.parse(getidentifyData);
  const userData = getUserData();

  try {
    const payload = {
      ...data,
      bankCode:
        (data?.bankCode === "" && "") ||
        data?.bankCode ||
        userData?.bankCode ||
        undefined,
      userId: data?.userId || userData?.userId || undefined,
      sessionId: data?.sessionId || userData?.sessionId || undefined,
      branchCode: data?.BranchCode || userData?.BranchCode || "0",
      machineNm: "",
      reqClientCd:
        data?.reqClientCd || data?.reqClientCd === 0
          ? data?.reqClientCd
          : userData?.reqClientCd || undefined,
      reqUserCd:
        data?.reqUserCd || data?.reqUserCd === 0
          ? data?.reqUserCd
          : userData?.reqUserCd || undefined,
      domain: "localhost", // window.location.hostname,
      ipAddress: identifyData?.ip,
      channelId: "Web",
      sessionToken: userData?.sessionToken || undefined,
      // latitude: location?.latitude.toString() || "",
      latitude: location?.latitude != null ? location.latitude.toString() : "",
      longitude:
        location?.longitude != null ? location.longitude.toString() : "",

      // longitude: location?.longitude.toString() || "",
    };

    const response = await axiosInstance({
      method,
      url: endpoint,
      data: payload,
      ...config,
    });

    // Handle successful reposnse
    if (response.data.statusCode === 3) {
      SweetAlerts(
        "Error !",
        "Your account was accessed from another device or location. If you did not authorize this activity, please log in again and take the necessary steps to secure your account.",
        "error",
      );
      // return window.location.pathname !== "/sessionout" ? window.location.href = "/sessionout" : "";
    } else {
      return response.data;
    }
  } catch (error: any) {
    if (error.status !== 403) {
      SweetAlerts("Error !", error?.message, "error");

      if (error.status === 400 || error.status === 401) {
        return window.location.pathname !== "/sessionout"
          ? (window.location.href = "/sessionout")
          : "";
      }
      // await apiErrorLog({
      //   errorApi: endpoint,
      //   errorTitle: endpoint,
      //   errorMsg: error.toString(),
      // });
    }
  }
};

export const apiRequestMultiPart = async (
  method: string,
  endpoint: any,
  data: any = null,
  config: any = {},
) => {
  try {
    //check access token expire time
    //if token will expire with in 10 sec or 15 sec then call refresh token method for update token
    //refresh token method call must be async method

    const getLocation: any = localStorage.getItem("location");
    const location = JSON.parse(getLocation);
    const getidentifyData: any = localStorage.getItem("_identityData");
    const identifyData = JSON.parse(getidentifyData);
    const userData = getUserData();
    const { UploadFile, private_key, certificate, ...otherPayload } = data;

    const form = new FormData();

    UploadFile && form.append("file", UploadFile[0]);
    private_key && form.append("private_key", private_key[0]);
    certificate && form.append("certificate", certificate[0]);

    const payload: any = {
      ...otherPayload,
      compCd: userData?.compCd || undefined,
      userCd: userData?.userCd || undefined,
      clientCd: userData?.clientCd || undefined,
      reqClientCd: userData?.reqClientCd || undefined,
      reqUserCd: userData?.reqUserCd || undefined,
      reqDomain: window.location.hostname,
      ipAddress: identifyData?.ip,
      channelId: "Web",
      sessionToken: userData?.sessionToken || undefined,
      latitude: location?.latitude.toString() || "",
      longitude: location?.longitude.toString() || "",
    };

    form.append(
      "data",
      new Blob([JSON.stringify(payload)], { type: "application/json" }),
    );

    const response = await axiosInstance({
      method,
      url: endpoint,
      data: form,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      ...config,
    });
    // Handle successful response
    if (response.data.STATUS === "3") {
      SweetAlerts(
        "Error !",
        "Your account was accessed from another device or location. If you did not authorize this activity, please log in again and take the necessary steps to secure your account.",
        "error",
      );
      return window.location.pathname !== "/sessionout"
        ? (window.location.href = "/sessionout")
        : "";
    } else {
      return response.data;
    }
  } catch (error: any) {
    if (error.status !== 403) {
      SweetAlerts("Error !", error.toString(), "error");

      // await apiErrorLog({
      //   errorApi: endpoint,
      //   errorTitle: endpoint,
      //   errorMsg: error,
      // });
    }
    throw error;
  }
};
