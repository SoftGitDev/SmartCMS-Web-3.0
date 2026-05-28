// Purpose: Manage Mail-SMS-Template List
// Created by: Harish 
// Created Date: 06-01-2026

// Change History:
// 03-01-2026 | Yogesh | Create a common compoenent for page header and implement APIs
// --------------------------------------------------------------

import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import * as urls from '../../../../utils/url';
import { apiRequest } from '../../../../utils/apiRequest';
import toastNotify from '../../../../utils/tostNotify';
import { getUserData } from '../../../../utils/common';
import { SweetAlerts } from '../../../../utils/sweetAlert';
import LoaderUI from '../../../../components/loader/Loader';
import MailSmsTempTbl from '../../../../content/table/administrator/MailSmsTempTbl';
import AddMailSMSTemplate from '../../../../content/modal/administrator/AddMailSMSTemplate';

// const AddMailSMSTemplate = lazy(() => import("../../../../content/modal/appconfiguration/AddMailSMSTemplate").then(({ default: AddMailSMSTemplate }) => ({ default: AddMailSMSTemplate })));
// const MailSmsTempTbl = lazy(() => import("../../../../content/table/appconfiguration/MailSmsTempTbl").then(({ default: MailSmsTempTbl }) => ({ default: MailSmsTempTbl })));

const MailSMSTemplate = () => {

    const [isAddTemplateMdl, setIsAddTemplateMdl] = useState<boolean>(false); // Use for ticket category modal show
    const [templateData, setTemplateData] = useState<any>([]); // Use for ticket category modal show
    const [editedData, setEditedData] = useState<any>([]); // Use for ticket category modal show
    const [isLoader, setIsLoader] = useState<{ getList: boolean, delete: boolean }>({ getList: false, delete: false });
    const [pageNo, setPageNo] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [totalRecord, setTotalRecords] = useState<number>(0);
    const [isDeleteConfirmationMdl, setIsDeleteConfirmationMdl] = useState<boolean>(false);
    const [searchContain, setSearchContain] = useState<string>('');
    const userData = getUserData();

    const handleAddTemplateMdl = (data?: any) => {
        setIsAddTemplateMdl(!isAddTemplateMdl);
        setEditedData(data);
    }

    const handleAddTemplateMdlClose = () => {
        setIsAddTemplateMdl(!isAddTemplateMdl);
        setEditedData(null);
    }

    const handleDeleteConfirmationMdl = (data?: any) => {
        setIsDeleteConfirmationMdl(!isDeleteConfirmationMdl);
        setEditedData(data || null);
    }

    // API for Fetch Certificate Config List
    const getMailSmsTemplateList = useCallback(async () => {
        setIsLoader({ ...isLoader, getList: true });
        try {
            const payload = {
                searchText: searchContain,
                pageNo: pageNo,
                pageSize: pageSize,
            };
            const result = await apiRequest("POST", urls.getMailSmsTemplateList, payload);

            if (result.status === "200" && result.success) {
                setTemplateData(result.response);
                setTotalRecords(result.totalRecord);
            } else {
                setTemplateData([]);
                result.message !== "No data found" && toastNotify(result?.message || "Failed to load modules", "error");
            }
        } catch (err) {
            //    Ignore Case
        } finally {
            setIsLoader({ ...isLoader, getList: false });
        }
    }, [pageNo, pageSize, searchContain])


    // Delete to User
    const deleteSmtpConfig = useCallback(async (data: any | null) => {
        try {
            setIsLoader({ ...isLoader, delete: true });
            const payload = {
                tempCode: data?.templateCode,
            };

            await apiRequest("DELETE", urls.deleteMailSmsTemplate, payload).then((result) => {
                if (result.status === "200" && result.success) {
                    getMailSmsTemplateList();
                    handleDeleteConfirmationMdl()
                    // SweetAlerts("Success !", result.message, 'success');
                } else {
                    SweetAlerts("Error !", result.message, 'error');
                }
            });
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoader({ ...isLoader, delete: false });
        }
    }, [handleDeleteConfirmationMdl])

    // useEffect(() => {
    //     getMailSmsTemplateList();
    // }, [pageNo, pageSize, searchContain]);


    useEffect(() => {
        setPageNo(1);
        setPageSize(10);
    }, [searchContain])


    return (
        <div>

            <div className="mx-auto  mt-3">
                <Suspense fallback={<LoaderUI />}>
                    <MailSmsTempTbl
                        data={templateData}
                        isLoader={isLoader.getList}
                        setPageSize={setPageSize}
                        setPageNo={setPageNo}
                        handleAddTemplateMdlClose={handleAddTemplateMdlClose}
                        totalRecord={totalRecord}
                        setSearchContain={setSearchContain}
                        handleDeleteConfirmationMdl={handleDeleteConfirmationMdl}
                        handleAddTemplateMdl={handleAddTemplateMdl}
                        userData={userData}
                    />
                </Suspense>
            </div>

            {isAddTemplateMdl &&
                <Suspense>
                    <AddMailSMSTemplate
                        show={isAddTemplateMdl}
                        handleClose={handleAddTemplateMdl}
                        editedData={editedData}
                        getMailSmsTemplateList={getMailSmsTemplateList}
                    />
                </Suspense>
            }

            {/* {isDeleteConfirmationMdl &&
                <Suspense>
                    <ConfirmModal
                        show={isDeleteConfirmationMdl}
                        onHide={() => handleDeleteConfirmationMdl()}
                        onConfirm={() => deleteSmtpConfig(editedData)}
                        isLoading={isLoader.delete}
                        type='delete'
                        title={''}
                        message={''}
                    />
                </Suspense>
            } */}
        </div>
    )
}

export default MailSMSTemplate
