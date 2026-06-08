
import React, { useState } from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import * as urls from '../../../services/axios/url';
import { SingleArrayChangeCheck } from './ArrayChangeCheck';
import toastNotify from '../../../services/notification/tostNotify';
import { apiRequest } from '../../../services/api/apiRequest';
import Checkbox from '../../../common/components/ui/checkBox/Checkbox';
import { Loader2 } from 'lucide-react';


type departmentMdlProps = {
    isDepartmenHodMdl: boolean;
    setIsDepartmentHodMdl: React.Dispatch<React.SetStateAction<boolean>>;
    userData: any;
    editDepartementData: any[]
    setEditDepartmentData: React.Dispatch<React.SetStateAction<any[]>>;
    getUser: any;
    setGetUser: any;
    formData: any;
    setFormData: any;
    selected: any;
};

const DepartmentHODMdl: React.FC<departmentMdlProps> = ({ isDepartmenHodMdl, setIsDepartmentHodMdl, userData, editDepartementData, setEditDepartmentData, getUser, setGetUser, formData, setFormData, selected }) => {
    const [isLoader, setIsLoader] = useState<boolean>(false);

    const addDepartmentHOD = async () => {
        try {
            if (SingleArrayChangeCheck(getUser, formData)) {
                return toastNotify("You have not made any changes.", 'error');
            }
            setIsLoader(true);
            const payload = {
                DepartmentCode: selected,
                Users: getUser.filter((items: any) => items.Selected === "Y" || items.ExistFlag === "Y").map((data: any) => ({
                    HodCode: data.TranCode,
                    // TranCode: data.TranCode,
                    ExistFlag: data.ExistFlag,
                    DeleteFlag: data.ExistFlag === "Y" && data.Selected === "Y" ? "N" : "Y"
                }))
            };
            const config = {};
            const result = await apiRequest("POST", urls.addDepartmentHod, payload, config)
            if (result.STATUS === '0') {
                toastNotify(result.MESSAGE, 'success');
                setEditDepartmentData([]);
                setIsDepartmentHodMdl(false);
            } else {
                toastNotify(result.MESSAGE, 'error');
            }
        } catch (error: any) {

        } finally {
            setIsLoader(false);
        }
    };

    return (
        <div>
            <Modal
                show={isDepartmenHodMdl}
                onHide={() => { setIsDepartmentHodMdl(!isDepartmenHodMdl); setEditDepartmentData([]) }}
                backdrop="static"
                keyboard={false}
                className='addBranchModel'
            >
                <Modal.Header closeButton>
                    <Modal.Title className='text-base'>Department HOD</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Row>
                        {getUser.map((items: any, id: number) => {
                            return (
                                <Col md={6} key={id}>
                                    <div className="mt-2">
                                        <Checkbox
                                            label={`${items.PersonName} (${items.UserName})`}
                                            checked={items.Selected === "Y"}
                                            value={items}
                                            onChange={(e: any) => {
                                                const newVal = [...getUser];
                                                newVal[id].Selected = e.target.checked ? "Y" : "N"
                                                setGetUser(newVal);
                                            }}
                                        />
                                    </div>
                                </Col>
                            );
                        })}
                    </Row>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="light" onClick={() => { setIsDepartmentHodMdl(!isDepartmenHodMdl); setEditDepartmentData([]) }} className='btn-sm'>
                        Close
                    </Button>
                    <Button variant="primary" type='button' className='btn-sm' onClick={addDepartmentHOD} disabled={isLoader} >{!isLoader ? "Submit" : <><Loader2 className='icon-loader text-white text-lg' /> Loading...</>}</Button>
                </Modal.Footer>
            </Modal>
        </div >
    )
}

export default DepartmentHODMdl
