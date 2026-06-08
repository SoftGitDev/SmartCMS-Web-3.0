import { Formik } from 'formik'
import React, { useState } from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap'
import * as urls from "../../../services/axios/url";
import toastNotify from '../../../services/notification/tostNotify';
import { apiRequest } from '../../../services/api/apiRequest';
import Checkbox from '../../../common/components/ui/checkBox/Checkbox';
import { Loader2 } from 'lucide-react';

interface serviceMappingMdlProps {
    isOpen: boolean,
    handleClose: () => void,
    serviceData: any[] | null,
    editCategoryData: { categoryCd?: string, subCategoryCd?: string } | null,
    flag: string
}

const ServiceMappingMdl: React.FC<serviceMappingMdlProps> = ({ isOpen, handleClose, serviceData, editCategoryData, flag }) => {

    const [isLoader, setIsLoader] = useState<boolean>(false);

    const mapService = async (data: any) => {
        try {

            if (JSON.stringify(data?.mapData) === JSON.stringify(serviceData)) {
                return toastNotify("You have not made any changes.", 'error');
            }

            setIsLoader(true);
            const payload = {
                CategoryCode: editCategoryData?.categoryCd || "0",
                SubCategoryCode: editCategoryData?.subCategoryCd || "0",
                Detail: data?.mapData.map((d: any) => ({
                    MapServiceId: d.ServiceCode,
                    AssignFlag: d.MapFlag,
                    MapFlag: d.existing,
                    DeleteFlag: d.delete
                }))
            };
            const config = {};
            const result = await apiRequest("POST", urls.mapServices, payload, config)
            if (result.STATUS === '0') {
                toastNotify(result.MESSAGE, 'success');
                handleClose();
            } else {
                toastNotify(result.MESSAGE, 'error');
            }
        } catch (error: any) {

        } finally {
            setIsLoader(false);
        }
    };


    return (
        <Modal
            show={isOpen}
            onHide={() => { handleClose() }}
            backdrop="static"
            keyboard={false}
            size='lg'
        >
            <Modal.Header closeButton>
                <Modal.Title className='text-base'>Map Service with {flag === "S" ? "Sub-Category" : "Category"} </Modal.Title>
            </Modal.Header>
            <Formik
                initialValues={{
                    mapData: serviceData ? [...serviceData] : []
                }}
                onSubmit={(values) => {
                    mapService(values)
                }}
            >
                {({ values, handleSubmit, setFieldValue }) => {
                    return (
                        <form onSubmit={handleSubmit}>
                            <Modal.Body>
                                <Row>
                                    {values?.mapData.map((s: any, id: number) => {
                                        return (
                                            <Col md={6} key={id}>
                                                <div className="mt-2">
                                                    <Checkbox
                                                        label={s.ServiceName}
                                                        checked={s.MapFlag === "Y"}
                                                        value={s}
                                                        onChange={(e: any) => {
                                                            const newVal = [...values?.mapData];
                                                            newVal[id].MapFlag = e.target.checked ? "Y" : "N";

                                                            if (s.existing === "Y") {
                                                                newVal[id].delete = e.target.checked ? "N" : "Y";
                                                            }

                                                            setFieldValue("mapData", newVal);
                                                        }}
                                                    />
                                                </div>
                                            </Col>
                                        );
                                    })}
                                </Row>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="light" onClick={handleClose} > Close</Button>
                                <Button type='submit' disabled={isLoader} >{!isLoader ? "Update" : "Loading..."}</Button>
                            </Modal.Footer>
                        </form>
                    )
                }}
            </Formik>
        </Modal >
    )
}

export default ServiceMappingMdl