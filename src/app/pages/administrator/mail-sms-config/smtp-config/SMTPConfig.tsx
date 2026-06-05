// Purpose: Manage SMTP Configuration List
// Created by: Harish 
// Created Date: 07-01-2026

// Change History:
// 07-01-2026 | Prateek | Create a SMTP Configuration table compoenent and implement APIs
// 03-02-2026 | Yogesh | Review code and made changes
// --------------------------------------------------------------

import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import { getUserData } from '../../../../utils/common';
import toastNotify from '../../../../utils/tostNotify';
import { apiRequest } from '../../../../utils/apiRequest';
import * as urls from "../../../../utils/url";
import { SweetAlerts } from '../../../../utils/sweetAlert';
import SMTPConfigFrm from './SMTPConfigFrm';
import { Button } from 'react-bootstrap';
import { Plus } from 'lucide-react';
import { SMTPConfigListProps } from '../../../../types/administrator';
import LoaderUI from '../../../../components/loader/Loader';

// import ConfirmModal from '../../../../content/modal/ConfirmModal';

const SmtpConfigTbl = lazy(() => import("../../../../content/table/administrator/SmtpConfigTbl").then(({ default: SmtpConfigTbl }) => ({ default: SmtpConfigTbl })));


const SMTPConfig = () => {

    const userData = getUserData();
    const [pageNo, setPageNo] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [isSMTPFrm, setIsSMTPFrm] = useState<boolean>(false);
    const [totalRecord, setTotalRecords] = useState<number>(0);
    const [searchContain, setSearchContain] = useState<string>('');
    const [smtpData, setSmtpData] = useState<SMTPConfigListProps[]>([]);
    const [editBranchData, setEditBranchData] = useState<any | null>(null);
    const [isDeleteConfirmationMdl, setIsDeleteConfirmationMdl] = useState<boolean>(false);
    const [isLoader, setIsLoader] = useState<{ getList: boolean, delete: boolean }>({ getList: false, delete: false });


    const handleSmtpConfigFrm = (data?: any | null) => {
        setIsSMTPFrm(!isSMTPFrm);
        setEditBranchData(data || null)
    }

    const handleDeleteConfirmationMdl = (data?: any) => {
        setIsDeleteConfirmationMdl(!isDeleteConfirmationMdl);
        setEditBranchData(data || null);
    }

    // This function use for Fetch Branch List
    const getSmtpConfigList = useCallback(async () => {
        try {
            setIsLoader({ ...isLoader, getList: true });

            const payload = {
                searchText: searchContain,
                pageNo: pageNo,
                pageSize: pageSize,
                pagination: true
            };
            const result = await apiRequest("POST", urls.getSmtpConfigList, payload);
            if (result.success && result.status === "200") {
                setSmtpData(result.response);
                setTotalRecords(result.totalRecord);
            } else {
                setSmtpData([]);
                result.message !== "No Data Found!" && toastNotify(result.message, 'error');
            }
        } catch (error) {
            // iganor case
        } finally {
            setIsLoader({ ...isLoader, getList: false });
        }
    }, [pageNo, pageSize, searchContain]);


    // useEffect(() => {
    //     getSmtpConfigList();
    // }, [pageNo, pageSize, searchContain]);

    useEffect(() => {
        setPageNo(1);
        setPageSize(10);
    }, [searchContain])


    // Delete to User
    const deleteSmtpConfig = useCallback(async (data: any | null) => {
        try {
            setIsLoader({ ...isLoader, delete: true });
            const payload = {
                tranCode: data?.tranCode,
            };

            await apiRequest("DELETE", urls.deleteSmtpConfig, payload).then((result) => {
                if (result.status === "200" && result.success) {
                    getSmtpConfigList();
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


    return (
        <>

            <div className=' mt-3'>
                <Suspense fallback={<LoaderUI />}>
                    <SmtpConfigTbl
                        data={smtpData}
                        isLoader={isLoader.getList}
                        setPageSize={setPageSize}
                        setPageNo={setPageNo}
                        totalRecord={totalRecord}
                        setSearchContain={setSearchContain}
                        handleSmtpConfigFrm={handleSmtpConfigFrm}
                        handleDeleteConfirmationMdl={handleDeleteConfirmationMdl}
                        userData={userData}
                        tableBtn={
                            userData?.permissions?.SAVE_MAIL_CONFIG !== "Y" &&
                            <Button variant='primary' className="ms-auto" onClick={() => { handleSmtpConfigFrm() }}>  <Plus size={16} className="me-2" /> New SMTP Config </Button>
                        }
                    />
                </Suspense>
            </div>

            {isSMTPFrm &&
                <Suspense fallback={<LoaderUI />}>
                    <SMTPConfigFrm
                        isOpen={isSMTPFrm}
                        handleClose={handleSmtpConfigFrm}
                        getSmtpConfigList={getSmtpConfigList}
                        editSMTPData={editBranchData}
                        userData={userData}
                    />
                </Suspense>
            }

            {/* {isDeleteConfirmationMdl &&
                <Suspense>
                    <ConfirmModal
                        show={isDeleteConfirmationMdl}
                        onHide={() => handleDeleteConfirmationMdl()}
                        onConfirm={() => deleteSmtpConfig(editBranchData)}
                        isLoading={isLoader.delete}
                        type='delete'
                        title={''}
                        message={''}
                    />
                </Suspense>
            } */}
        </>
    )
}

export default SMTPConfig