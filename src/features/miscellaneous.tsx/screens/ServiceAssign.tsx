import React, { useState } from 'react'
import { Button, Card, CardBody, Col, Row } from 'react-bootstrap'
import SelectField from '../../../common/components/ui/SelectBox/SelectField'
import ServiceAssignTbl from '../components/ServiceAssignTbl'
import { Loader2 } from 'lucide-react'
import { Formik } from 'formik'

const ServiceAssign = () => {
    const [isLoader, setIsLoader] = useState<boolean>(false)
    const [services, setServices] = useState<any[]>([])
    const [userList, setUserList] = useState<any[]>([
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
    ]);


    const updateAssignedCategory = (val: any) => {
        console.log(val);
    }

    const initialValues = {
        serviceValue: '',
        serviceLabel: '',
        assignedServices: [],
    };
    return (
        <>
            <Formik
                initialValues={initialValues}
                onSubmit={(values, { resetForm }) => {
                    updateAssignedCategory(values)
                }}
            >
                {({ values, handleSubmit, setFieldValue, handleBlur }) => {
                    return (
                        <form onSubmit={handleSubmit}>
                            <Card>
                                <CardBody>
                                    <Row>
                                        <Col lg={4} md={6}>
                                            <SelectField
                                                name="services"
                                                placeholder="Services"
                                                required
                                                options={[{ value: "", label: "Select Services" }, ...services.map((items: any) => ({
                                                    value: items.TranCode, label: items.ServiceName
                                                }))]}
                                                value={values.serviceValue !== "" && {
                                                    value: values.serviceValue,
                                                    label: values.serviceLabel,
                                                }}
                                                onChange={(e: any) => {
                                                    // e.value !== "" ? getServiceWiseUsers(e.value) : setUserList([]);
                                                    setFieldValue('serviceValue', e.value);
                                                    setFieldValue('serviceLabel', e.label)
                                                }}
                                                onBlur={handleBlur}
                                            />
                                        </Col>
                                        <Col className="d-flex align-items-center gap-2">
                                            {userList.length !== 0 ? <>
                                                {/* {permission.Update === "Y" && */}
                                                <Button type='submit' disabled={isLoader} >
                                                    {!isLoader ? "Update" : "Loading..."}
                                                </Button>
                                                {/* } */}
                                            </> :
                                                <>
                                                    {isLoader && <><Loader2 className='icon-loader text-lg' /> Loading...</>}
                                                </>
                                            }
                                        </Col>
                                    </Row>
                                    <div className='mt-2'>
                                        Assigned
                                        <span className='text-primary ms-2'>
                                            Users
                                        </span>
                                    </div>
                                    <ServiceAssignTbl
                                        values={values}
                                        setFieldValue={setFieldValue}
                                        userList={userList}
                                    />
                                </CardBody>
                            </Card>



                        </form>
                    )
                }}
            </Formik>


        </>
    )
}

export default ServiceAssign