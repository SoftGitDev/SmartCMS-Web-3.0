import React from "react";
import { User, Mail, Phone, Shield, Camera, Save, } from "lucide-react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Textfield from "../../../components/ui/TextField/TextInput";
import StatusBadge from "../../../components/ui/customBadge/StatusBadge";

const UserDetail = () => {
    const validation = Yup.object({
        firstName: Yup.string().required("First Name is required"),
        lastName: Yup.string().required("Last Name is required"),
        mobileNo: Yup.string()
            .required("Mobile Number is required")
            .matches(/^[0-9]{10}$/, "Enter valid mobile number"),
        email: Yup.string()
            .email("Invalid email")
            .required("Email is required"),

        currentPwd: Yup.string(),
        newPwd: Yup.string()
            .min(8, "Minimum 8 characters")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
                "Must contain uppercase, lowercase, number and special character"
            ),
        confirmPwd: Yup.string().oneOf(
            [Yup.ref("newPwd")],
            "Passwords must match"
        ),
    });

    const handleSubmit = (values: any) => {
        console.log(values);
    };

    return (
        <div >
            <Formik
                initialValues={{
                    firstName: "Demo",
                    lastName: "Bank",
                    mobileNo: "8890991961",
                    email: "demo@softtech.com",
                    currentPwd: "",
                    newPwd: "",
                    confirmPwd: "",
                }}
                validationSchema={validation}
                onSubmit={handleSubmit}
            >
                {({ values, handleChange, handleBlur, handleSubmit, }) => (
                    <Form onSubmit={handleSubmit}>
                        <Row className="g-4">
                            {/* Profile Card */}
                            <Col lg={4}>
                                <Card className=" border-0 shadow-sm">
                                    <Card.Body>
                                        <div className="text-center">
                                            <div className="profile-avatar">
                                                <img src="https://ui-avatars.com/api/?name=Harish+Suthar" alt="" />
                                                <button type="button" className="avatar-upload-btn" >
                                                    <Camera size={16} />
                                                </button>
                                            </div>
                                            <h4 className="mt-3 mb-1">
                                                Harish Suthar
                                            </h4>
                                            <StatusBadge
                                                label={'Admin'}
                                                variant="primary"
                                            />
                                            <div className="profile-security  text-sm">
                                                <Shield size={15} />
                                                <span>MFA Enabled</span>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                            {/* Personal Info */}
                            <Col lg={8}>
                                <Card className="border-0 h-100 shadow-sm">
                                    <Card.Body>
                                        <h5 className="section-title">
                                            Personal Information
                                        </h5>
                                        <Row className="g-3">
                                            <Col md={6}>
                                                <Textfield
                                                    label="First Name"
                                                    name="firstName"
                                                    value={values.firstName}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    required
                                                    IconProp={User}
                                                />
                                                <ErrorMessage name="firstName" component="div" className="ErrorMessage" />
                                            </Col>

                                            <Col md={6}>
                                                <Textfield
                                                    label="Last Name"
                                                    name="lastName"
                                                    value={values.lastName}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    required
                                                    IconProp={User}
                                                />
                                                <ErrorMessage name="lastName" component="div" className="ErrorMessage" />
                                            </Col>

                                            <Col md={6}>
                                                <Textfield
                                                    label="Mobile Number"
                                                    name="mobileNo"
                                                    value={values.mobileNo}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    required
                                                    IconProp={Phone}
                                                />
                                                <ErrorMessage name="mobileNo" component="div" className="ErrorMessage" />
                                            </Col>

                                            <Col md={6}>
                                                <Textfield
                                                    label="Email Address"
                                                    name="email"
                                                    value={values.email}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    required
                                                    IconProp={Mail}
                                                />
                                                <ErrorMessage name="email" component="div" className="ErrorMessage" />
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                    <div className="text-end mt-0 p-3">
                                        <Button type="submit" >
                                            <Save size={18} className="me-2" />
                                            Save Changes
                                        </Button>
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default UserDetail;