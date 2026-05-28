// ===================== BASE URL =====================
// const BaseUrl = process.env.REACT_APP_API_BASE_URL;
const BaseUrl = "http://localhost:9005";
// const BaseUrl = window?.globalConfig.REACT_APP_API_BASE_URL || process.env.REACT_APP_API_BASE_URL;

// ===================== BANK ONBOARDING SETUP =====================

export const getSetupDetail = BaseUrl + "/bank-onboarding/get-setup-detail/";
export const onBoardingSetup = BaseUrl + "/bank-onboarding/setup/";
export const serviceModuleList =
  BaseUrl + "/bank-onboarding/get-service-module-list/";
export const licenseVerify = BaseUrl + "/bank-onboarding/license-verify/";
export const getDeviceId = BaseUrl + "/bank-onboarding/get-device-id/";

// ===================== TOKEN =====================
export const refreshToken = BaseUrl + "/auth/refresh/token";

// ===================== AUTH & LOGIN =====================

export const getCaptcha = BaseUrl + "/auth/generate-captcha/";
export const login = BaseUrl + "/auth/login/";
export const otpVerify = BaseUrl + "/auth/login-otp-verify/";
export const resendOtp = BaseUrl + "/auth/resend-otp";
export const recoveryOtp = BaseUrl + "/auth/login-with-otp";
export const gAuthVerify = BaseUrl + "/auth/login-gauth-verify/";
export const passwordChange = BaseUrl + "/auth/password-change/";
export const logout = BaseUrl + "/auth/logout/";
export const forgetPassword = BaseUrl + "/auth/forgot-password/";
export const forgetPasswordVerify = BaseUrl + "/auth/forgot-password-verify/";
export const authLogoDetails = BaseUrl + "/auth/logo-details/";


// ===================== Profile =====================
export const getUserProfile = BaseUrl + "/get-user-profile/";
export const updateUserProfile = BaseUrl + "/edit-user-profile/";
export const getUserMfaQR = BaseUrl + "/get-user-mfa-qr/";
export const verifyUserMfaQR = BaseUrl + "/verify-user-mfa-qr/";
export const generateUserMfaQR = BaseUrl + "/generate-user-mfa-qr/";
export const changeUserPassword = BaseUrl + "/change-user-password/";


// ===================== MAIL SMS & TEMPLATE CONFIGURATIONS =====================
export const getMailSmsTemplateList = BaseUrl + "/get-mail-sms-template-list/";
export const editSmsConfig = BaseUrl + "/edit-sms-configuration/";
export const editMailSmsTemplate = BaseUrl + "/edit-mail-sms-template/";
export const editMailConfig = BaseUrl + "/edit-mail-configuration/";
export const addMailSmsTemplate = BaseUrl + "/add-mail-sms-template/";
export const getMailSmsConfig = BaseUrl + "/get-mail-sms-configuration/";
export const deleteMailSmsTemplate = BaseUrl + "/delete-mail-sms-template/";
export const testMailSms = BaseUrl + "/test-mail-sms/";


// ===================== API CONFIGURATION =====================
export const addApiService = BaseUrl + "/add-api-config/";
export const editApiService = BaseUrl + "/edit-api-config/";
export const getApiServiceList = BaseUrl + "/get-api-config-list/";
export const editApiServiceStatus = BaseUrl + "/edit-api-config-status/";
export const getApiServiceDetail = BaseUrl + "/get-api-config-detail/";
export const getKeywordList = BaseUrl + "/get-keyword-list/";
export const getKeywordGroupList = BaseUrl + "/get-keyword-group-list/";
export const deleteApiConfig = BaseUrl + "/delete-api-config/";
export const testApiService = BaseUrl + ' /test-api-config/'
export const importApiConfig = BaseUrl + ' /import-api-config/'
export const exportApiConfig = BaseUrl + ' /export-api-config/'
export const getServiceTestDetail = BaseUrl + ' /service-test-api-config/'


// ===================== SMTP Config APIs ==============================
export const getSmtpConfigList = BaseUrl + "/get-smtp-config-list/";
export const getSmtpConfigDetail = BaseUrl + "/get-smtp-config-detail/";
export const getSmtpConfigCombo = BaseUrl + "/get-smtp-config-combo/";
export const addSmtpConfig = BaseUrl + "/add-smtp-config/";
export const updateSmtpConfig = BaseUrl + "/update-smtp-config/";
export const deleteSmtpConfig = BaseUrl + "/delete-smtp-config/";
export const getSmtpCombo = BaseUrl + "/get-smtp-config-combo/";


// ===================== COMBO =====================
export const mailSmsCombo = BaseUrl + "/get-mail-sms-combo/";
export const getAPIConfigCombo = BaseUrl + "/get-api-config-combo/";
export const getAPITypeCombo = BaseUrl + "/get-api-type-combo/";
export const getBankCombo = BaseUrl + "/bank-combo/";


// ===================== app-config-controller =====================
export const appConfigGroups = BaseUrl + "/get-app-config-groups/";
export const appConfigDetails = BaseUrl + "/get-app-config-list/";
export const appConfigUpdate = BaseUrl + "/app-config-update/";


// ===================== FILE CONFIGURATIONS =====================
export const updateFileConfig = BaseUrl + '/update-file-config/';
export const getReturnFileConfigCombo = BaseUrl + '/get-return-file-config-combo/';
export const getFileConfigList = BaseUrl + '/get-file-config-list/';
export const getFileConfigDtlDetail = BaseUrl + '/get-file-config-dtl-detail/';
export const getFileConfigDetail = BaseUrl + '/get-file-config-detail/';
export const getFileConfigCombo = BaseUrl + '/get-file-config-combo/';
export const getCbsFileConfigCombo = BaseUrl + '/get-cbs-file-config-combo/';
export const addFileConfig = BaseUrl + '/add-file-config/';
export const addFileConfigDtl = BaseUrl + '/add-file-config-dtl/';
export const deleteFileConfig = BaseUrl + '/delete-file-config/';
export const fileConfigColumns = BaseUrl + "/get-file-config-column-combo/";

// ===================== CERTIFICATE GROUPS CONFIGURATIONS =====================
export const updateCertificateGroup = BaseUrl + "/update-certificate-group/";
export const addCertificateGroup = BaseUrl + "/add-certificate-group/";
export const getCertificateGroupList = BaseUrl + "/get-certificate-group-list/";
export const getCertificateGroupCombo = BaseUrl + "/get-certificate-group-combo/";
export const deleteCertificateGroup = BaseUrl + "/delete-certificate-group/";
export const getCertificateGroupCombo2 = BaseUrl + "/get-certificate-group-combo-2/";


// ===================== PRODUCT CONFIGURATIONS =====================
export const getSubscribedService = BaseUrl + "/get-subscribe-service/";
export const getSubscribedServiceCombo = BaseUrl + "/get-subscribe-service-combo/";
export const getProductConfigMainGroups = BaseUrl + "/get-product-config-main-groups/";
export const getProductConfigList = BaseUrl + "/get-product-config-list/";
export const updateProductConfig = BaseUrl + "/update-product-config/";
export const updateProductConfigStatus = BaseUrl + "/update-product-config-status/";


export const allServiceList = BaseUrl + "/get-bank-subscribed-services-list/";
export const updateLicense = BaseUrl + "/update-license/";
export const activeServiceList = BaseUrl + "/get-bank-subscribed-service-list/";