import React, { useState } from 'react';
import { CircleCheck, LoaderCircle } from 'lucide-react';
import { Col } from 'react-bootstrap';
import { ErrorMessage, FormikHandlers } from 'formik';
import TextArea from '../../../common/components/ui/textArea/TextArea';



interface Props {
    values: any;
    setFieldValue: (field: string, value: any) => void;
    mode: 'licenseStep' | 'licenseStep';
    handleChange: FormikHandlers["handleChange"];
    handleBlur: FormikHandlers["handleBlur"];
    licenseVerify?: (licenseKey?: string) => void;
    isLicenseLoader?: boolean;
    flag?: string
}


const License: React.FC<Props> = ({ values, setFieldValue, handleBlur, isLicenseLoader, handleChange, licenseVerify }) => {

    const [deviceId, setDeviceId] = useState<string>("5B55153Z-673F4V-5R5F1P1P-1R1R1R");

    const [copied, setCopied] = useState<boolean>(false)
    // Copy Function
    const copyToClipboard = () => {
        navigator.clipboard.writeText(deviceId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // FUNCTION USED FOR GET DEVICE ID 
    // const getDeviceID = useCallback(async () => {
    //     try {
    //         const payload = {
    //             bankCode: values.bankCode,
    //         };

    //         await apiRequest("POST", urls.getDeviceId, payload).then((result) => {
    //             if (result.status === "200" && result.success) {
    //                 setDeviceId(result?.response?.deviceId)
    //             } else {
    //                 setDeviceId("");
    //                 toastNotify(result.Message, 'error');
    //             }
    //         });
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }, []);

    // useEffect(() => {
    //   getDeviceID();
    // }, []);


    return (
        <div className="container" style={{ maxWidth: '800px' }}>
            {/* Header Section */}
            <div className="text-center mb-4">
                <h5 className="mt-0 mb-1 fw-semibold text-primary" >License Activation</h5>
                <p className='text-muted text-md'>
                    Activate your  license to complete the setup
                </p>
            </div>

            {/* Registration Code */}
            <label className="form-label small fw-bold">
                Registration Request Code <span className="text-danger">*</span>
            </label>
            <div className="d-flex mb-5 align-items-center gap-3 mt-2">
                <div className="flex-grow-1 rounded p-2 fw-bold text-center licence-input">
                    {deviceId}
                </div>
                {/* Copy Button */}
                <button className="btn btn-outline-success" onClick={copyToClipboard} >
                    {copied ? '✓ Copied' : 'Copy'}
                </button>
            </div>

            {/* Registration Code Section */}
            {/* <div className="mb-4">
                <label className="form-label small fw-bold">
                    Registration Request Code <span className="text-danger">*</span>
                </label>
                <Textfield
                    placeholder="Device ID"
                    type="text"
                    name="deviceId"
                    disabled
                    min={0}
                    max={999}
                    value={deviceId}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <p className="small text-muted mt-2 text-center">
                    Use this Registration Request Code to generate license
                </p>
            </div> */}

            {/* Automatic License Box */}
            {/* <div className="border-0 rounded-4 mb-2" style={{ backgroundColor: '#f0f4ff', border: '1px solid #d0dbff !important' }}>
        <div className="p-4">
          <h6 className="fw-semibold text-lg mb-3 d-flex align-items-center"> Automatic License Retrieval</h6>
          <button className="btn btn-primary w-100 py-2 rounded-3 shadow-sm"
            style={{ backgroundColor: '#4e54ff', border: 'none', fontSize: "14px" }}>
            <CircleCheck size={18} className="me-2" /> Submit for online validation
          </button>
        </div>
      </div>

      <div className="d-flex align-items-center my-2 text-muted">
        <hr className="flex-grow-1" />
        <span className="px-3 small fw-bold">OR</span>
        <hr className="flex-grow-1" />
      </div> */}

            {/* Manual License Box */}
            <div className="border-0 rounded-4"
                style={{ backgroundColor: '#fff9f0', border: '1px solid #ffe4bc !important' }}>
                <div className="p-4">
                    <h6 className="fw-semibold text-lg mb-3">Manual License Validation</h6>
                    <Col md={12} className="mb-2">
                        <TextArea
                            label="Enter License Key"
                            placeholder="Paste your license key here..."
                            name="LicXml"
                            value={values?.LicXml}
                            required
                            onChange={(e) => {
                                setFieldValue("LicXml", e.target.value)
                            }}
                            onBlur={handleBlur}
                        />
                        <ErrorMessage className="ErrorMessage" name="LicXml" component="div" />
                    </Col>
                    <button type='submit' className="btn w-100 py-2 rounded-3 text-white shadow-sm" disabled={isLicenseLoader} style={{ backgroundColor: '#fb8c00', border: 'none', fontSize: "14px" }}
                    // onClick={() => {
                    //   licenseVerify?.(values.LicXml)
                    // }}
                    >
                        {!isLicenseLoader ? <><CircleCheck size={18} className="me-2" /> Validate License Manually</> : <><LoaderCircle size={18} className="icon-loader text-white text-lg" /> Loading...</>}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default License;


