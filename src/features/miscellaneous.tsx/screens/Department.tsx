import React, { Suspense, useState } from 'react'
import LoaderUI from '../../../common/components/feedBack/loader/Loader'
import DepartmentTbl from '../components/DepartmentTbl'
import DepartmentMdl from '../components/DepartmentMdl'
import DepartmentHODMdl from '../components/DepartmentHODMdl'

interface DepartmentProps {
    show: boolean
    handleClose: () => void
}

const dummyUsers = [
    {
        TranCode: "EMP001",
        UserName: "john.doe",
        PersonName: "John Doe",
        Selected: "Y",
        ExistFlag: "Y"
    },
    {
        TranCode: "EMP002",
        UserName: "jane.smith",
        PersonName: "Jane Smith",
        Selected: "N",
        ExistFlag: "N"
    },
    {
        TranCode: "EMP003",
        UserName: "michael.brown",
        PersonName: "Michael Brown",
        Selected: "Y",
        ExistFlag: "Y"
    },
    {
        TranCode: "EMP004",
        UserName: "sarah.wilson",
        PersonName: "Sarah Wilson",
        Selected: "N",
        ExistFlag: "N"
    },
    {
        TranCode: "EMP005",
        UserName: "david.jones",
        PersonName: "David Jones",
        Selected: "N",
        ExistFlag: "Y"
    },
    {
        TranCode: "EMP006",
        UserName: "emma.taylor",
        PersonName: "Emma Taylor",
        Selected: "Y",
        ExistFlag: "N"
    }
];
const Department: React.FC<DepartmentProps> = ({ show, handleClose }) => {
    const [isDepartmentHODMdl, setIsDepartmentHODMdl] = useState<boolean>(false)
    const [editData, setEditeData] = useState<any>(null);
    const [selected, setSelected] = useState<any>(null);
    const [getUser, setGetUser] = useState<any>(dummyUsers);
    const [formData, setFormData] = useState<any[]>([]);
    const [editDepartementData, setEditDepartmentData] = useState<any[]>([]);



    // Handle Department Modal
    const handleDepartmentHODMdl = () => {
        setIsDepartmentHODMdl(!isDepartmentHODMdl)
    }


    return (
        <Suspense fallback={<LoaderUI />}>
            <div>
                {/* table  */}
                <DepartmentTbl
                    handleCloseDepartmentMdl={handleClose}
                    handleDepartmentHODMdl={handleDepartmentHODMdl}
                />

                {/* Modal */}
                {show &&
                    <DepartmentMdl
                        show={show}
                        handleClose={handleClose}
                    />
                }


                {isDepartmentHODMdl &&
                    <DepartmentHODMdl
                        isDepartmenHodMdl={isDepartmentHODMdl}
                        setIsDepartmentHodMdl={setIsDepartmentHODMdl}
                        userData={undefined}
                        editDepartementData={editDepartementData}
                        setEditDepartmentData={setEditDepartmentData}
                        getUser={getUser}
                        setGetUser={setGetUser}
                        formData={formData}
                        setFormData={setFormData}
                        selected={selected}
                    />
                }
            </div>
        </Suspense>



    )
}

export default Department