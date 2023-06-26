export const MAIN_URL = "http://10.0.1.30";
//10.0.1.30
//http://192.168.70.81
export const PORT = ":8080/";
export const PORT_FOR_REPORT = ":8082/";

export const API_LOGIN = "";

export const API_GET_BOATS_LIST_SEARCH = "boats/search";
export const API_GET_BOAT_INFO_CARD = "boats/getBoatCard/";
export const API_GET_BOAT_INFO_SPEC_MARKS = "boats/getBoatCardSpecmarks/";
export const API_GET_BOAT_INFO_ARRESTS = "boats/getBoatArrests/";
export const API_GET_BOAT_CARD_FOR_MODIF = "boatCardModif/getBoatCardAsBoatModif/";
export const API_GET_STATEMENT_MODIF_INFO = "boatCardModif/getBoatCardModif/";
export const API_ADD_CHANGE_INFORMATION_CARD = "boatCardModif/addStatement/";

export const API_DOWNLOAD_FILE_MODIF = "boatCardModif/download/";
export const API_ACCEPT_BOAT_MODIF = "boatCardModif/register/";
export const API_DECLINE_BOAT_MODIF = "boatCardModif/refuseApp/";
export const API_CHECK_ENGINES_MODIF = "boatCardModif/checkEngineVin/";

export const API_GET_LICENSE_LIST_SEARCH = "boats/license/search";
export const API_GET_LICENSE_INFO_CARD = "boats/license/drivingLicense/";
export const API_GET_LICENSE_ADD_INFO_CARD = "boats/license/drivingLicenseAdd/";

export const API_GET_BASES_BUILDING_LIST_SEARCH = "bases/search";
export const API_EDIT_BASES_BUILDING = "bases/updateBoatParking/";
export const API_ADD_BASES_BUILDING = "bases/addBoatParking";

export const API_GET_GIMS_SECTIONS = "static/info/gimsSections";
export const API_GET_OWNER_TYPE = "static/info/personTypes";
export const API_GET_NSI_CHECK_STATUS = "static/info/nsiCheckStatus";

export const API_GET_LICENSE_INFO_FROM_LIBS_OBLAST = "directory/oblast/";
export const API_GET_LICENSE_INFO_FROM_LIBS_RAYON = "directory/rayon/";
export const API_GET_LICENSE_INFO_FROM_LIBS_GOROD = "directory/gorod/";

export const API_ADD_NEW_SPECIAL_MARK = "boats/license/addBoatDrivingLicenseSpecmarks/";
export const API_ADD_NEW_CONF_MARK = "boats/license/addBoatDrivingLicenseConf/";

export const API_GET_USERS_LIBRARY = "static/info/gimsUsers";
export const API_GET_ATE_LIBRARY = "static/info/gimsSections";
export const API_GET_APP_REG_STATUS_LIBRARY = "static/info/boatCardStatus";
export const API_GET_DICTIONARY_RAYON_FOR_OBL = "directory/getRayonByOblast/";
export const API_GET_DICTIONARY_GOROD_FOR_RAYON = "directory/getGorodByRayon/";
export const API_GET_DICTIONARY_SECTION_FOR_RAYON = "directory/getGimsSectionDistrictByRayon/";
export const API_LICENSE_CANCELLATION = "boats/license/changeLicenseDateEnd/";

export const API_ADD_NEW_BOAT_DEAL = "boats/saveBoatDeals/";
export const API_ADD_NEW_BOAT_SPEC_MARK = "boats/addBoatCardSpecmarks/";
export const API_EDIT_BOAT_SPEC_MARK = "boats/updateBoatCardSpecmarks/";
export const API_ADD_BOAT_INFO_ARRESTS = "boats/saveBoatArrests/";
export const API_ADD_BOAT_INFO_DOCS = "boats/file/uploadfile";
export const API_ADD_BOAT_INFO_DOCS_DOWNLOAD = "boats/file/download/";
export const API_DELETE_BOAT_INFO_DOCS = "boats/file/delete/";

export const API_GET_BOATS_REG_LIST_SEARCH = "boatCardApp/search";

export const API_GET_BOATS_REG_INFO = "boatCardApp/getBoatCardApp/";
export const API_GET_BOATS_REG_ENG = "boatCardApp/getEngines/";
export const API_GET_BOATS_REG_DEALS = "boatCardApp/getDeals/";
export const API_GET_BOATS_REG_SPEC_MARKS = "boatCardApp/getSpecMarks/";
export const API_GET_BOATS_DECISION_INFO = "boatCardApp/confirmReg/";
export const API_ACCEPT_BOAT_REGISTRATION = "boatCardApp/registerBoat/";
export const API_DECLINE_BOAT_REGISTRATION = "boatCardApp/refuseApp/";

export const API_REG_INFORM_CHANGE = "boatCardModif/search";
export const API_REG_INFORM_CHANGE_BOAT_CARD = "boatCardModif/searchBoatCard";

export const API_ADD_NEW_ENGINE_CHECK = "boatCardApp/checkEngineVin/";
export const API_GET_BOAT_TYPES = "static/info/boatTypes";
export const API_GET_BOAT_VID = "static/info/boatVid";
export const API_GET_BOAT_BODY = "static/info/boatBody";
export const API_GET_SA_CATEGORY = "static/info/saCategory";

export const API_ADD_NEW_STATEMENT = "boatCardApp/addStatement";
export const API_ADD_STATEMENT_FILE_DOWNLOAD = "boatCardApp/download/";

//NSI
export const API_DOWNLOAD_LEGISLATION_FILE = "nsi/downloadFile/";

export const API_GET_CLASSIFICATION_BOATS = "nsi/classificationBoats";

export const API_GET_LEGISLATION_INFO = "static/info/infLegislation";
export const API_ADD_LEGISLATION_INFO = "nsi/addInfLegislation";
export const API_EDIT_LEGISLATION_INFO = "nsi/changeInfLegislation/";
export const API_DELETE_LEGISLATION_INFO = "nsi/deleteInfLegislation/";

export const API_GET_FORMS_INFO = "static/info/insForms";
export const API_ADD_FORMS_INFO = "nsi/addInfForms";
export const API_EDIT_FORMS_INFO = "nsi/changeInfForms/";
export const API_DELETE_FORMS_INFO = "nsi/deleteInfForms/";

export const API_GET_PAID_PROC_INFO = "nsi/infPaidProceduresView";
export const API_ADD_PAID_PROC_INFO = "nsi/addInfPaidProcedures";
export const API_EDIT_PAID_PROC_INFO = "nsi/changeInfPaidProcedures/";
export const API_DELETE_PAID_PROC_INFO = "nsi/deleteInfPaidProcedures/";

export const API_GET_REQUISITES_INFO = "nsi/infRequisitesView";
export const API_ADD_REQUISITES_CHAPTER = "nsi/addChapter";
export const API_EDIT_REQUISITES_CHAPTER = "nsi/changeChapter/";
export const API_DELETE_REQUISITES_CHAPTER = "nsi/deleteChapter/";
export const API_ADD_REQUISITES_LINE = "nsi/addLine/";
export const API_EDIT_REQUISITES_LINE = "nsi/changeLine/";
export const API_DELETE_REQUISITES_LINE = "nsi/deleteLine/";

export const API_GET_CONTACTS_INFO = "static/info/gimsSectionsOrderByName";
export const API_GET_SECTION_INFO = "nsi/contacts/";

export const API_GET_ADMIN_PROC = "static/info/nsiAp";
export const API_ADD_ADMIN_PROC = "nsi/addNsiAp";
export const API_EDIT_ADMIN_PROC = "nsi/changeNsiAp/";
export const API_DELETE_ADMIN_PROC = "nsi/deleteNsiAp/";
//NSI

//DuplicateShipsTicket

export const API_DUP_SHIP_TICKET_DATA = "boatCardAppDup/searchApp";
export const API_GET_BOAT_CARD_FOR_DUPLICATE = "boatCardAppDup/getBoatCardForBoatCardDup/";
export const API_ADD_NEW_APP_DUPL = "boatCardAppDup/addStatement/";
export const API_GET_APP_INFO_DUPLICATE = "boatCardAppDup/getBoatCardDupSite/";
export const API_GET_DUPLICATE_DECISION_INFO = "boatCardAppDup/confirmReg/";
export const API_ACCEPT_DUPLICATE = "boatCardAppDup/saveBoatCardAppDup/";
export const API_DECLINE_DUPLICATE = "boatCardAppDup/refuseApp/";

// export const API_DUP_SHIP_TICKET_BOAT_CARD = "boatCardAppDup/searchBoatCard";
// export const API_DUP_SH
// boatCardAppDup/addStatement/

export const API_GET_SHIPS_TICKET_DATA = "issuanceBoatTicket/searchTicket";
export const API_GET_SHIPS_TICKET_DECISION_INFO = "issuanceBoatTicket/confirmReg";
export const API_ACCEPT_SHIPS_TICKET = "issuanceBoatTicket/saveBoatCardAppDup";
export const API_DECLINE_SHIPS_TICKET = "issuanceBoatTicket/refuseApp";

export const API_GET_DATA_PROVISION_INFORMATION = "boatInfoApp/searchApp";
export const API_ADD_STATEMENT_PROVISION_INFORMATION = "boatInfoApp/addStatement";
export const API_GET_STATEMENT_PROVISION_INFORMATION = "boatInfoApp/getBoatInfo/";
export const API_DOWNLOAD_FILE_PROVISION_INFO = "boatInfoApp/download/";
export const API_DOWNLOAD_FILEREPORT_PROVISION_INFO = "boatInfoApp/report/";

export const API_GET_WEEKLY_REPORT = "weeklyreport/reportWeeklyPdf";
export const API_GET_TRAFFIC_ACCIDENTS_REPORT = "accidentreport/reportTransportAccidentExcelAndPdf";
export const API_GET_CERTIFICATE_REPORT = "repdl/reportDIPdfAndExcel";
export const API_GET_QUARTERLY_REPORT = "repquarter/quarterReport";
export const API_GET_FIVEYEARS_GRAPH_REPORT = "graph/downloadDocReport";
export const API_GET_MONTH_GRAPH_REPORT = "graph/downloadDocReportGraph2";

export const API_GET_TRANSPORT_ACCIDENT_LIST_SEARCH = "boatincidents/search";
export const API_FIND_BOAT_INFO_BY_REGNUM = "boatincidents/getByRegNum/";
export const API_FIND_BOAT_INFO_BY_ID = "boatincidents/getByRegNum/";
export const API_SAVE_TRANSPORT_ACCIDENT_MAIN_INFO = "boatincidents/saveIncident";
export const API_SAVE_TRANSPORT_ACCIDENT_VICTIMS_INFO = "boatincidents/saveVictims";
export const API_SAVE_TRANSPORT_ACCIDENT_CAUSERS_INFO = "boatincidents/saveCausers";
export const API_GET_TRANSPORT_ACCIDENT_VICTIMS_INFO = "boatincidents/getVictims/";
export const API_GET_TRANSPORT_ACCIDENT_CAUSERS_INFO = "boatincidents/getCausers/";
export const API_DELETE_TRANSPORT_ACCIDENT_VICTIMS_INFO = "boatincidents/deleteVictims/";
export const API_DELETE_TRANSPORT_ACCIDENT_CAUSERS_INFO = "boatincidents/deleteCausers/";
export const API_ADD_TRANSPORT_ACCIDENT_FILE = "incident/file/uploadfile";
export const API_GET_TRANSPORT_ACCIDENT_FILELIST = "incident/file/filelist/";
export const API_DOWNLOAD_TRANSPORT_ACCIDENT_FILE = "incident/file/download/";
export const API_DELETE_TRANSPORT_ACCIDENT_FILE = "incident/file/delete/";
