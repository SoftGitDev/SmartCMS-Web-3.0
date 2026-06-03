// Purpose: Bank mst module 
// Created by: Harish 
// Created Date: 25-05-2026


import React, { Suspense, useState } from 'react'
import LoaderUI from '../../../components/loader/Loader'
import PageHeaeder from '../../../components/common/PageHeaeder'
import { Building2, Landmark, Plus } from 'lucide-react'
import { Button } from 'react-bootstrap'
import BankMstTbl from '../../../content/table/administrator/BankMstTbl'
import { getUserData } from '../../../utils/common'
import { sessionStoreData } from '../../../utils/Helper'


const organizationData = [
    {
        bankName: "Soft-tech Solutions",
        mobileNo: "9727788331",
        status: "Y",
        emailId: "info@soft-techsolutions.com",
        personName: "Harish Patel",
        address: "Palanpur, Gujarat",
        countryName: "India",
        stateName: "Gujarat",
        bankCode: "BNK001",
        cityName: "Palanpur",
        pinCode: "385001",
        adminDomain: "cms.vmcv.in",
        clientDomain: "cms.vmcv.in",
        npciCode: "NPCI001",
        bankUserNm: "Yogesh",
        bankUserCd: "USR001"
    },
    {
        bankName: "NextGen Technologies",
        mobileNo: "9876543210",
        status: "Y",
        emailId: "support@nextgen.com",
        personName: "Amit Sharma",
        address: "Jaipur, Rajasthan",
        countryName: "India",
        stateName: "Rajasthan",
        bankCode: "BNK002",
        cityName: "Jaipur",
        pinCode: "302001",
        adminDomain: "nextgen.vmcv.in",
        clientDomain: "nextgen.vmcv.in",
        npciCode: "NPCI002",
        bankUserNm: "Prateek",
        bankUserCd: "USR002"
    },
    {
        bankName: "Skyline Infotech",
        mobileNo: "9988776655",
        status: "N",
        emailId: "contact@skyline.com",
        personName: "Rahul Mehta",
        address: "Ahmedabad, Gujarat",
        countryName: "India",
        stateName: "Gujarat",
        bankCode: "BNK003",
        cityName: "Ahmedabad",
        pinCode: "380001",
        adminDomain: "skyline.vmcv.in",
        clientDomain: "skyline.vmcv.in",
        npciCode: "NPCI003",
        bankUserNm: "Suresh",
        bankUserCd: "USR003"
    },
    {
        bankName: "Digital Wave",
        mobileNo: "9090909090",
        status: "Y",
        emailId: "admin@digitalwave.com",
        personName: "Karan Joshi",
        address: "Mumbai, Maharashtra",
        countryName: "India",
        stateName: "Maharashtra",
        bankCode: "BNK004",
        cityName: "Mumbai",
        pinCode: "400001",
        adminDomain: "digitalwave.vmcv.in",
        clientDomain: "digitalwave.vmcv.in",
        npciCode: "NPCI004",
        bankUserNm: "Rohan",
        bankUserCd: "USR004"
    },
    {
        bankName: "Vision Tech",
        mobileNo: "9123456789",
        status: "Y",
        emailId: "info@visiontech.com",
        personName: "Priya Shah",
        address: "Surat, Gujarat",
        countryName: "India",
        stateName: "Gujarat",
        bankCode: "BNK005",
        cityName: "Surat",
        pinCode: "395003",
        adminDomain: "vision.vmcv.in",
        clientDomain: "vision.vmcv.in",
        npciCode: "NPCI005",
        bankUserNm: "Deepak",
        bankUserCd: "USR005"
    },
    {
        bankName: "Alpha Systems",
        mobileNo: "9011223344",
        status: "N",
        emailId: "contact@alphasystems.com",
        personName: "Nikhil Verma",
        address: "Delhi, India",
        countryName: "India",
        stateName: "Delhi",
        bankCode: "BNK006",
        cityName: "New Delhi",
        pinCode: "110001",
        adminDomain: "alpha.vmcv.in",
        clientDomain: "alpha.vmcv.in",
        npciCode: "NPCI006",
        bankUserNm: "Vikram",
        bankUserCd: "USR006"
    },
    {
        bankName: "SecureNet Pvt Ltd",
        mobileNo: "9870011223",
        status: "Y",
        emailId: "admin@securenet.com",
        personName: "Ravi Kumar",
        address: "Bangalore, Karnataka",
        countryName: "India",
        stateName: "Karnataka",
        bankCode: "BNK007",
        cityName: "Bangalore",
        pinCode: "560001",
        adminDomain: "securenet.vmcv.in",
        clientDomain: "securenet.vmcv.in",
        npciCode: "NPCI007",
        bankUserNm: "Manish",
        bankUserCd: "USR007"
    },
    {
        bankName: "Prime Solutions",
        mobileNo: "9900112233",
        status: "Y",
        emailId: "support@prime.com",
        personName: "Anjali Singh",
        address: "Lucknow, Uttar Pradesh",
        countryName: "India",
        stateName: "Uttar Pradesh",
        bankCode: "BNK008",
        cityName: "Lucknow",
        pinCode: "226001",
        adminDomain: "prime.vmcv.in",
        clientDomain: "prime.vmcv.in",
        npciCode: "NPCI008",
        bankUserNm: "Pooja",
        bankUserCd: "USR008"
    },
    {
        bankName: "Future Minds",
        mobileNo: "9765432109",
        status: "Y",
        emailId: "hello@futureminds.com",
        personName: "Suresh Yadav",
        address: "Indore, Madhya Pradesh",
        countryName: "India",
        stateName: "Madhya Pradesh",
        bankCode: "BNK009",
        cityName: "Indore",
        pinCode: "452001",
        adminDomain: "future.vmcv.in",
        clientDomain: "future.vmcv.in",
        npciCode: "NPCI009",
        bankUserNm: "Nitin",
        bankUserCd: "USR009"
    },
    {
        bankName: "Core Infotech",
        mobileNo: "9898989898",
        status: "N",
        emailId: "info@coreinfotech.com",
        personName: "Deepak Jain",
        address: "Chennai, Tamil Nadu",
        countryName: "India",
        stateName: "Tamil Nadu",
        bankCode: "BNK010",
        cityName: "Chennai",
        pinCode: "600001",
        adminDomain: "core.vmcv.in",
        clientDomain: "core.vmcv.in",
        npciCode: "NPCI010",
        bankUserNm: "Ankit",
        bankUserCd: "USR010"
    },
    {
        bankName: "Bright Future Tech",
        mobileNo: "9345678901",
        status: "Y",
        emailId: "team@brightfuture.com",
        personName: "Meera Kapoor",
        address: "Hyderabad, Telangana",
        countryName: "India",
        stateName: "Telangana",
        bankCode: "BNK011",
        cityName: "Hyderabad",
        pinCode: "500001",
        adminDomain: "bright.vmcv.in",
        clientDomain: "bright.vmcv.in",
        npciCode: "NPCI011",
        bankUserNm: "Neha",
        bankUserCd: "USR011"
    },
    {
        bankName: "Matrix Solutions",
        mobileNo: "9456123780",
        status: "Y",
        emailId: "contact@matrixsolutions.com",
        personName: "Vikas Arora",
        address: "Pune, Maharashtra",
        countryName: "India",
        stateName: "Maharashtra",
        bankCode: "BNK012",
        cityName: "Pune",
        pinCode: "411001",
        adminDomain: "matrix.vmcv.in",
        clientDomain: "matrix.vmcv.in",
        npciCode: "NPCI012",
        bankUserNm: "Gaurav",
        bankUserCd: "USR012"
    }
];



const BankMst = () => {
    const [isBankMdl, setIsBankMdl] = useState<boolean>(false)

    const [pageNo, setPageNo] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [totalRecord, setTotalRecords] = useState<number>(0);
    const [searchContain, setSearchContain] = useState<string>('');
    const [isLoader, setIsLoader] = useState<boolean>(false);
    const [editTableData, setEditTableData] = useState<any>()

    const handleBankMdl = () => {
        setIsBankMdl(!isBankMdl)
    }

    const userData = getUserData();
    // Login Client 
    const loginWithClient = (data: any) => {
        console.log('DAta Login Client', data);

        const updateClient = {
            ...userData,
            reqClientCd: data?.bankCode,
            reqUserCd: data?.bankUserCd || userData?.userCd,
            reqclientNm: data?.bankName,
            reqUserNm: data?.bankUserNm || "",
            reqClientId: data?.npciCode,
            isLoginAsClient: true,
        };

        // setLocalUserData(updateClient); // Set Local User Data
        sessionStoreData(updateClient); // Set Local User Data
        window.location.reload(); // Reload the Application
    }
    return (
        <>
            {/* Header */}
            <Suspense fallback={<LoaderUI />}>
                <PageHeaeder
                    Icon={Landmark}
                    title={'Organization Management'}
                    description={
                        'Manage bank onboarding, branch mapping, operational status, contact details, and organization-wide banking configurations.'
                    }
                    button={
                        <div className='d-flex ms-auto gap-3'>
                            <Button variant='primary' size='sm' onClick={() => handleBankMdl()} >
                                <Plus size={16} className="me-2" />
                                New Organization
                            </Button>
                        </div>
                    }
                />
            </Suspense>
            <div className='p-3'>
                {/* Tbale */}
                <BankMstTbl
                    data={organizationData}
                    isLoader={isLoader}
                    setPageSize={setPageSize}
                    setPageNo={setPageNo}
                    totalRecord={totalRecord}
                    setSearchContain={setSearchContain}
                    handleBankMdl={handleBankMdl}
                    loginWithClient={loginWithClient}
                />
            </div>
        </>
    )
}

export default BankMst
