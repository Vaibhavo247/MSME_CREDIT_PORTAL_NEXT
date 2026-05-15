import { publicHttp, authHttp, agentHttp } from "./client";
import { BASE_HEADERS, withCorrelationId } from "./headers";
import { AUTH_PATHS } from "./path";

/* =========================
   PUBLIC APIs
========================= */

export const sendAirtelData = (payload) =>
  publicHttp.post(AUTH_PATHS.AIRTEL_DATA, payload, BASE_HEADERS);

export const sendMobileOtp = (payload) =>
  agentHttp.post(AUTH_PATHS.SEND_OTP, payload, BASE_HEADERS);

export const validateMobileOtp = (payload, correlationId) =>
  agentHttp.post(
    AUTH_PATHS.VALIDATE_OTP,
    payload,
    withCorrelationId(correlationId),
  );

export const logout = () => publicHttp.post(AUTH_PATHS.LOGOUT);

/* =========================
   AUTHENTICATED APIs
========================= */



export const enableWhatsappMessage = (payload) =>
  authHttp.post(AUTH_PATHS.ENABLE_WHATSAPP, payload, BASE_HEADERS);

/* =========================
   AUTHENTICATED APIs
========================= */
export const userSummary = () =>
  authHttp.get(AUTH_PATHS.USER_SUMMARY, BASE_HEADERS);

export const getLoanRecords = () =>
  agentHttp.post(AUTH_PATHS.GET_LOAN_RECORD, {}, BASE_HEADERS);

export const getLoanRecordsForFtCash = () =>
  agentHttp.post(AUTH_PATHS.GET_LOAN_RECORD_FT_CASH, {}, BASE_HEADERS);

export const getCreditPendingLoanRecords = () =>
  agentHttp.post(
    AUTH_PATHS.GET_CREDIT_PENDING_LOAN_RECORDS,
    {},
    BASE_HEADERS,
  );

export const ekycOtp = (payload) =>
  authHttp.post(AUTH_PATHS.EKYC_OTP, payload, BASE_HEADERS);

export const validateEkycOtp = (payload) =>
  authHttp.post(AUTH_PATHS.EKYC_VALIDATE, payload, BASE_HEADERS);

export const validatePan = (payload) =>
  authHttp.post(AUTH_PATHS.PAN_VALIDATE, payload, BASE_HEADERS);

export const saveAddress = (payload) =>
  authHttp.post(AUTH_PATHS.SAVE_ADDRESS, payload, BASE_HEADERS);

export const savePresonalInformations = (payload) =>
  authHttp.post(AUTH_PATHS.SAVE_PRESONAL_INFORMATION, payload, BASE_HEADERS);

export const getVkycGroup = () =>
  authHttp.get(AUTH_PATHS.VKYCGROUP, BASE_HEADERS);
export const getVkycStatus = () =>
  authHttp.get(AUTH_PATHS.VKYCSTATUS, BASE_HEADERS);

export const skipGst = () => authHttp.get(AUTH_PATHS.SKIP_GST, BASE_HEADERS);

export const gstVerify = (payload) =>
  authHttp.post(AUTH_PATHS.VREIFY_GST, payload, BASE_HEADERS);

export const gstOtp = (payload) =>
  authHttp.post(AUTH_PATHS.GST_OTP, payload, BASE_HEADERS);

export const gstOtpVerify = (payload) =>
  authHttp.post(AUTH_PATHS.GST_OTP_VERIFY, payload, BASE_HEADERS);

export const skipAggreator = () =>
  authHttp.get(AUTH_PATHS.SKIP_AGGREGATOR, BASE_HEADERS);

export const getAggreatorDetails = () =>
  authHttp.get(AUTH_PATHS.GET_AGGRE_DETAILS, BASE_HEADERS);

export const aggregatorConcerned = (payload) =>
  authHttp.post(AUTH_PATHS.AGGREGATOR_CONCERNED, payload, BASE_HEADERS);

export const getAggreatorStatus = () =>
  authHttp.get(AUTH_PATHS.CHECK_AGGREGATOR_STATUS, BASE_HEADERS);

export const udhyamOtp = (payload) =>
  authHttp.post(AUTH_PATHS.UDHYAM_OTP, payload, BASE_HEADERS);

export const udhyamOtpVerify = (payload) =>
  authHttp.post(AUTH_PATHS.UDHYAM_OTP_VERIFY, payload, BASE_HEADERS);

export const getEmployee = () =>
  agentHttp.get(AUTH_PATHS.GET_EMPLOYEE, BASE_HEADERS);

 export const getEmployeeRole = () =>
  agentHttp.get(AUTH_PATHS.GET_EMPLOYEE_ROLE, BASE_HEADERS);

 export const getEmployeeDetail = () =>
  agentHttp.get(AUTH_PATHS.GET_EMPLOYEE_DETAIL, BASE_HEADERS);

export const udhyamManual = (payload) =>
  authHttp.post(AUTH_PATHS.UDHYAM_MANUAL, payload, BASE_HEADERS);

export const searchPincode = (pincode) =>
  authHttp.get(`${AUTH_PATHS.SEARCH_PINCODE}/:${pincode}`, BASE_HEADERS);

export const bre = (payload, stages) =>
  authHttp.post(`${AUTH_PATHS.BRE}${stages}`, payload, BASE_HEADERS);


export const saveLoanInformations = (payload) =>
  authHttp.post(AUTH_PATHS.SAVE_LOAN_INFORMATION, payload, BASE_HEADERS);

export const saveInsuranceDetails = (payload) =>
  authHttp.post(AUTH_PATHS.SAVE_INSURANCE_DETAILS, payload, BASE_HEADERS);

export const saveBankDetails = (payload) =>
  authHttp.post(AUTH_PATHS.SAVE_BANK_DETAILS, payload, BASE_HEADERS);

export const checkDocUploadStatus = () =>
  authHttp.get(AUTH_PATHS.CHECK_DOC_UPLOAD_STATUS, BASE_HEADERS);

export const getAadhaarNumberFromRef = (payload) =>
  authHttp.post(AUTH_PATHS.AADHAAR_FROM_REF, payload, BASE_HEADERS);

export const getAllLiveBanks = () =>
  authHttp.get(AUTH_PATHS.GET_LIVE_BANKS, BASE_HEADERS);


export const getSignUrl = () =>
  authHttp.get(AUTH_PATHS.READ_SIGN_URL, BASE_HEADERS);

export const panyDrop = (payload) =>
  authHttp.post(AUTH_PATHS.PANYDROPAPI, payload, BASE_HEADERS);


export const fetchInsurancePremium = (payload) =>
  authHttp.post(AUTH_PATHS.INSURANCEPREMIUM, payload, BASE_HEADERS);



export const getPdf = (fileName) =>
  authHttp.get(`${AUTH_PATHS.PDF}${fileName}`, BASE_HEADERS);

export const ftCashuploadDocuments = (payload) =>
  authHttp.post(AUTH_PATHS.UPLOAD_DOCUMENTS, payload, BASE_HEADERS);


export const coApplicantEkycOtp = (payload) =>
  authHttp.post(AUTH_PATHS.CO_APPLICANT_EKYC_OTP, payload, BASE_HEADERS);

export const coApplicantValidateEkycOtp = (payload) =>
  authHttp.post(AUTH_PATHS.CO_APPLICANT_EKYC_VALIDATE, payload, BASE_HEADERS);

export const coApplicantValidatePan = (payload) =>
  authHttp.post(AUTH_PATHS.CO_APPLICANT_PAN_VALIDATE, payload, BASE_HEADERS);

export const getPrefioslink = () =>
  authHttp.get(AUTH_PATHS.GET_PERFIOS_LINK, BASE_HEADERS);


export const getPrefiosReport = () =>
  authHttp.get(AUTH_PATHS.GET_PERFIOS_REPORT, BASE_HEADERS);


// ============================== credit portal============================


// This endpoint is part of the credit-portal surface and requires the agent bearer token
export const getUshyamDeviatedcase = () =>
  agentHttp.get(AUTH_PATHS.GET_UDHYAM_DEVIATED_CASES, BASE_HEADERS);

export const getSectorSubsector = () =>
  authHttp.get(AUTH_PATHS.GET_SECTOR_SUBSECTOR, BASE_HEADERS);

export const getAllRecords = () =>
  authHttp.get(AUTH_PATHS.GET_ALL_RECORDS, BASE_HEADERS);

// These credit portal endpoints appear to require the agent bearer token,
// not the general access token.
export const getCreditApprovedLoanRecords = () =>
  agentHttp.get(AUTH_PATHS.GET_CREDIT_APPROVED_RECORDS, BASE_HEADERS);

export const getDisbursedRecords = () =>
  agentHttp.get(AUTH_PATHS.GET_DISBURSED_RECORDS, BASE_HEADERS);

// export const getEmployee = () =>
  // authHttp.get(AUTH_PATHS.GET_EMPLOYEE, BASE_HEADERS);

export const getRejectedPreCase = () =>
  authHttp.get(AUTH_PATHS.GET_REJECTED_PRE_CASE, BASE_HEADERS);

export const getMsmeCustomerDetails = () =>
  authHttp.get(AUTH_PATHS.GET_MSME_CUSTOMER_DETAILS, BASE_HEADERS);

export const getMsmeLead = () =>
  authHttp.get(AUTH_PATHS.GET_MSME_LEAD, BASE_HEADERS);

export const getMsmeStaticDetails = () =>
  authHttp.get(`${AUTH_PATHS.GET_MSME_STATIC_DETAILS}/:${id}`, BASE_HEADERS);


export const getGoogleBre = (application_id) =>
  authHttp.get(`${AUTH_PATHS.GET_GOOGLE_BRE}/:${application_id}`, BASE_HEADERS);

export const getMsmeBreDetails = (id) =>
  authHttp.get(`${AUTH_PATHS.GET_MSME_BRE_DETAILS}/:${id}`, BASE_HEADERS);

export const getComprehensiveCreditReport = (id) =>
  authHttp.get(`${AUTH_PATHS.GET_COMPREHENSIVE_CREDIT_REPORT}/:${id}`, BASE_HEADERS);

export const updateDeviatedCase = (payload) =>
  authHttp.post(AUTH_PATHS.UPDATE_DEVIATED_CASE,payload, BASE_HEADERS);

export const updateUdyamDocs = (payload) =>
  authHttp.post(AUTH_PATHS.UPDATE_UDYAM_DOCS,payload, BASE_HEADERS);

export const rejectDeviatedCase = (payload) =>
  authHttp.post(AUTH_PATHS.REJECT_DEVIATED_CASE,payload, BASE_HEADERS);

export const landmarkByAgent = (payload) =>
  authHttp.post(AUTH_PATHS.LANDMARK_BY_AGENT,payload, BASE_HEADERS);

export const saveCpv = (payload) =>
  authHttp.post(AUTH_PATHS.SAVE_CPV,payload, BASE_HEADERS);

export const pendingDeviatedCase = (payload) =>
  authHttp.post(AUTH_PATHS.PENDING_DEVIATED_CASE,payload, BASE_HEADERS);

export const updateSectorSubsectorCase = (payload) =>
  authHttp.post(AUTH_PATHS.UPDATE_SECTOR_SUBSECTOR_CASE,payload, BASE_HEADERS);

export const updateEmployeeStatus = (payload) =>
  authHttp.post(AUTH_PATHS.UPDATE_EMPLOYEE_STATUS,payload, BASE_HEADERS);

export const insertMsmeComment = (payload) =>
  authHttp.post(AUTH_PATHS.INSERT_MSME_COMMENT,payload, BASE_HEADERS);

export const insertEmployee = (payload) =>
  authHttp.post(AUTH_PATHS.  INSERT_EMPLOYEE,payload, BASE_HEADERS);


export const getSummary = (id) =>
  authHttp.get(`${AUTH_PATHS.GET_SUMMARY}/:${id}`, BASE_HEADERS);


// export const getEmployeeRole = () =>
//   authHttp.get(AUTH_PATHS.  GET_EMPLOYEE_ROLE, BASE_HEADERS);

//  export const getEmployeeDetail = () =>
//   agentHttp.get(AUTH_PATHS.GET_EMPLOYEE_DETAIL, BASE_HEADERS);

export const getComment = (id) =>
  authHttp.get(`${AUTH_PATHS.GET_COMMENT}/:${id}`, BASE_HEADERS);

export const getCaseDocs = (id) =>
  authHttp.get(`${AUTH_PATHS.GET_CASE_DOCS}/:${id}`, BASE_HEADERS);


export const webUploadBusinessImage = (id,payload) =>
  authHttp.post(`${AUTH_PATHS.WEB_UPLOAD_BUSINESS_IMAGE}/:${id}`,payload, BASE_HEADERS);


export const webGetBusinessImage = (id) =>
  authHttp.get(`${AUTH_PATHS.WEB_GET_BUSINESS_IMAGE}/:${id}`, BASE_HEADERS);

export const getMsmeLeadImage = (id) =>
  authHttp.get(`${AUTH_PATHS.GET_MSME_LEAD_IMAGE}/:${id}`, BASE_HEADERS);

export const getUserJourneyDetails = (id) =>
  authHttp.get(`${AUTH_PATHS.GET_USER_JOURNEY_DETAILS}/:${id}`, BASE_HEADERS);


export const leadRemarkOptions = () =>
  authHttp.get(AUTH_PATHS.LEAD_REMARK_OPTIONS, BASE_HEADERS);

export const businessLeadGeneration = (payload) =>
  authHttp.post(AUTH_PATHS.BUSINESS_LEAD_GENERATION,payload, BASE_HEADERS);

export const aggregatorbankStatment = (id) =>
  authHttp.get(`${AUTH_PATHS.AGGREGATOR_BANK_STATEMENT}/:${id}`, BASE_HEADERS);

export const aggregatorbankStatmentexcel = (id) =>
  authHttp.get(`${AUTH_PATHS.AGGREGATOR_BANK_STATEMENT_EXCEL}/:${id}`, BASE_HEADERS);

export const userJourney = (id) =>
  authHttp.get(`${AUTH_PATHS.USER_JOURNEY}/:${id}`, BASE_HEADERS);

export const getAoDetails = () =>
  authHttp.get(AUTH_PATHS.GET_AO_DETAILS, BASE_HEADERS);


export const msmeReport = (id) =>
  authHttp.get(`${AUTH_PATHS.MSME_REPORT}/:${id}`, BASE_HEADERS);

  // GET_AO_IMAGE: '/get_ao_image/:id',
  // GET_AGENT_ACTION: '/getAgentAction/:id',
  // GET_ACTIVE_AGENT: '/getActiveAgent/:id'


export const getAoImage = (id) =>
  authHttp.get(`${AUTH_PATHS.GET_AO_IMAGE}/:${id}`, BASE_HEADERS);


export const getAgentAction = (id) =>
  authHttp.get(`${AUTH_PATHS.GET_AGENT_ACTION}/:${id}`, BASE_HEADERS);

export const getActiveAgent = (id) =>
  authHttp.get(`${AUTH_PATHS.GET_ACTIVE_AGENT}/:${id}`, BASE_HEADERS);




