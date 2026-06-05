import React, { useState } from 'react'
import { Button, Modal, Form, Row, Col, ModalBody } from 'react-bootstrap'
import { FileText, FileTextIcon, HelpCircle, Save, X } from 'lucide-react'
import { Formik, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import Editor from '../../../components/ui/editor/Editor'
import Textfield from '../../../components/ui/TextField/TextInput'
import SelectField from '../../../components/ui/SelectBox/SelectField'
import RadioBtn from '../../../components/ui/Radio/RadioBtn'
import Note from '../../../utils/Note'
import { ArticleConfiguNote, UserAddNote } from '../../data/note'

interface ArticleMdlProps {
    show: boolean
    handleClose: () => void
    isEdited?: boolean // Flag to detect edit mode vs add mode
    editActicle?: (values: any) => void
    addActicle?: (values: any) => void
    // External state functions & arrays referenced in your template handlers
    getCategoryDropdownData?: any[]
    getSubCategoryDropdownData?: any[]
    fetchSubCategory?: (catCode: string) => void
    formData?: any
    setFormData?: React.Dispatch<React.SetStateAction<any>>
}

const ArticleMdl: React.FC<ArticleMdlProps> = ({
    show,
    handleClose,
    isEdited = false,
    editActicle = (vals) => console.log('Edit submission payload:', vals),
    addActicle = (vals) => console.log('Add submission payload:', vals),
    getCategoryDropdownData = [],
    getSubCategoryDropdownData = [],
    fetchSubCategory = () => { },
    formData = {},
    setFormData = () => { }
}) => {
    // Local visual toggle state referenced in your layout hooks
    const [selectedArticleType, setSelectedArticleType] = useState<string>("G")

    // Formik Initial Field Value Block Setup
    const initialValues = {
        articleType: formData?.ArticleType || "G",
        articleFor: formData?.ArticleFor || "A",
        categoryValue: formData?.CategoryCode || "",
        categoryLabel: formData?.CategoryName || "",
        subCategoryValue: formData?.SubCategoryCode || "",
        subCategoryLabel: formData?.SubCategoryName || "",
        topic: formData?.Topic || "",
        description: formData?.Description || ""
    }

    // Comprehensive Yup Validation Schema Layout
    const validation = Yup.object().shape({
        articleType: Yup.string().required("Article type selection is required"),
        articleFor: Yup.string().required("Target audience is required"),
        categoryValue: Yup.string().when("articleType", {
            is: "S",
            then: (schema) => schema.required("Category selection is required for specific articles"),
            otherwise: (schema) => schema.notRequired()
        }),
        topic: Yup.string()
            .min(5, "Topic must be at least 5 characters long")
            .max(200, "Topic cannot exceed 200 characters")
            .required("Article topic heading is required"),
        description: Yup.string()
            .min(10, "Please provide a more informative description summary")
            .required("Article content body description field is required")
    })

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            size="xl"
        >
            {/* <Modal.Header closeButton className="border-bottom border-light-subtle bg-light-subtle py-3"> */}

            {/* Header */}
            <Modal.Header closeButton >
                <Modal.Title className='d-flex align-items-center gap-2'>
                    <div className='icon-wrapper mt-1'>
                        <FileTextIcon className='text-primary' size={22} />
                    </div>
                    <div>
                        <h6 className="m-0 fw-semibold text-dark">
                            {isEdited ? "Modify Knowledge Base Article" : "Create New Knowledge Base Article"}
                        </h6>
                        <p className="text-xs text-muted fw-normal m-0 mt-1">
                            Publish and manage information articles, standard documentation, and troubleshooting guides.
                        </p>
                    </div>
                </Modal.Title>
            </Modal.Header>

            {/* </Modal.Header> */}

            <Formik
                initialValues={initialValues}
                validationSchema={validation}
                enableReinitialize={true} // Safe backup if your sync formData changes asynchronously
                onSubmit={(values, { setSubmitting }) => {
                    if (isEdited) {
                        editActicle(values);
                    } else {
                        addActicle(values);
                    }
                    setSubmitting(false);
                    handleClose();
                }}
            >
                {({ values, handleChange, handleBlur, handleSubmit, setFieldValue, isSubmitting }) => (
                    <Form onSubmit={handleSubmit}>
                        <ModalBody >
                            <Row className="justify-content-center">
                                <Col>
                                    <fieldset className="border rounded-3 p-3 bg-white ">
                                        <legend className="float-none w-auto px-2 text-sm fw-semibold text-slate-700 mb-0">
                                            Article <span className='text-primary'> Configurations </span>
                                        </legend>

                                        <Row className="g-3 mt-1">
                                            {/* Article Type Section */}
                                            <Col md={6}>
                                                <label className='form-label text-xs fw-semibold text-slate-500 mb-1 d-block'>Article Type</label>
                                                <div className="d-flex align-items-center h-75">
                                                    <RadioBtn
                                                        label="Generic"
                                                        name="articleType"
                                                        className="me-3"
                                                        value="G"
                                                        checked={values.articleType === "G"}
                                                        onChange={(e: any) => {
                                                            handleChange(e);
                                                            setSelectedArticleType("G");
                                                            setFormData({ ...formData, ArticleType: "G" });
                                                            // Clear structural specific fields to keep form schema clean
                                                            setFieldValue("categoryValue", "");
                                                            setFieldValue("subCategoryValue", "");
                                                        }}
                                                    />
                                                    <RadioBtn
                                                        label="Specific"
                                                        name="articleType"
                                                        className="me-3"
                                                        value='S'
                                                        checked={values.articleType === "S"}
                                                        onChange={(e: any) => {
                                                            handleChange(e);
                                                            setSelectedArticleType("S");
                                                            setFormData({ ...formData, ArticleType: "S" })
                                                        }}
                                                    />
                                                </div>
                                            </Col>

                                            {/* Article For Visibility Audience Scope */}
                                            <Col md={6} className='mt-3 mt-md-0'>
                                                <label className='form-label text-xs fw-semibold text-slate-500 mb-1 d-block'>Article For</label>
                                                <div className="d-flex align-items-center h-75">
                                                    <RadioBtn
                                                        label="Internal"
                                                        name="articleFor"
                                                        className="me-3"
                                                        value="A"
                                                        checked={values.articleFor === "A"}
                                                        onChange={(e: any) => { handleChange(e); setFormData({ ...formData, ArticleFor: "A" }) }}
                                                    />
                                                    <RadioBtn
                                                        label="External"
                                                        name="articleFor"
                                                        className="me-3"
                                                        value='C'
                                                        checked={values.articleFor === "C"}
                                                        onChange={(e: any) => { handleChange(e); setFormData({ ...formData, ArticleFor: "C" }) }}
                                                    />
                                                    <RadioBtn
                                                        label="Both"
                                                        name="articleFor"
                                                        className="me-3"
                                                        value='B'
                                                        checked={values.articleFor === "B"}
                                                        onChange={(e: any) => { handleChange(e); setFormData({ ...formData, ArticleFor: "B" }) }}
                                                    />
                                                </div>
                                            </Col>

                                            {/* Dynamic Category Context Blocks */}
                                            {values.articleType === "S" && (
                                                <>
                                                    <Col md={6} className='mt-2'>
                                                        <SelectField
                                                            name="category"
                                                            label='Category'
                                                            placeholder="Select Category"
                                                            required
                                                            tabIndex={1}
                                                            options={[{ value: "", label: "Select Category" }, ...getCategoryDropdownData.map((items: any) => ({
                                                                value: items.TranCode, label: items.CategoryName
                                                            }))]}
                                                            value={values.categoryValue !== "" && values.categoryValue !== "0" && {
                                                                value: values.categoryValue,
                                                                label: values.categoryLabel
                                                            }}
                                                            onChange={(e: any) => {
                                                                setFieldValue("categoryValue", e?.value);
                                                                setFieldValue("categoryLabel", e?.label);
                                                                fetchSubCategory(e?.value);
                                                                setFieldValue("subCategoryValue", "");
                                                                setFieldValue("subCategoryLabel", "");
                                                                setFormData({ ...formData, CategoryCode: e?.value, CategoryName: e?.label })
                                                            }}
                                                        />
                                                        <ErrorMessage name="categoryValue" className='ErrorMessage' component="div" />
                                                    </Col>

                                                    <Col md={6} className='mt-2'>
                                                        <SelectField
                                                            label='Sub-Category'
                                                            name="subCategory"
                                                            tabIndex={2}
                                                            options={[{ value: "", label: "Select Sub-Category" }, ...getSubCategoryDropdownData.map((items: any) => ({
                                                                value: items.TranCode, label: items.SubCategoryName
                                                            }))]}
                                                            placeholder="Select Sub-Category"
                                                            value={values.subCategoryValue !== "" && values.subCategoryValue !== "0" ? {
                                                                value: values.subCategoryValue,
                                                                label: values.subCategoryLabel
                                                            } : ""}
                                                            onChange={(e: any) => {
                                                                setFieldValue("subCategoryValue", e?.value);
                                                                setFieldValue("subCategoryLabel", e?.label);
                                                                setFormData({ ...formData, SubCategoryCode: e?.value, SubCategoryName: e?.label })
                                                            }}
                                                        />
                                                    </Col>
                                                </>
                                            )}

                                            {/* Topic Header Fields */}
                                            <Col md={12} className='mt-3'>
                                                <Textfield
                                                    label="Topic / Heading"
                                                    name="topic"
                                                    placeholder='Enter Topic / Heading'
                                                    id="topic"
                                                    tabIndex={3}
                                                    maxLength={200}
                                                    required
                                                    value={values.topic}
                                                    onChange={(e: any) => { handleChange(e); setFormData({ ...formData, Topic: e.target.value }) }}
                                                    onBlur={handleBlur}
                                                />
                                                <ErrorMessage name="topic" className='ErrorMessage' component="div" />
                                            </Col>

                                            {/* Full Text Editor Block */}
                                            <Col md={12} className='mt-2'>
                                                <Editor
                                                    label='Description / Content Block'
                                                    required
                                                    value={values.description}
                                                    onChange={(e: any) => { setFieldValue("description", e); setFormData({ ...formData, Description: e }) }}
                                                />
                                                <ErrorMessage name="description" className='ErrorMessage' component="div" />
                                            </Col>
                                        </Row>
                                    </fieldset>
                                </Col>

                                <Col md={4}>
                                    <div className="d-none d-md-block">
                                        <Note data={ArticleConfiguNote} />
                                    </div>
                                </Col>
                            </Row>
                        </ModalBody>

                        <Modal.Footer>
                            <Button variant="light" onClick={handleClose} disabled={isSubmitting} >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Processing..." : isEdited ? "Update" : "Submit"}
                            </Button>
                        </Modal.Footer>
                    </Form>
                )}
            </Formik>
        </Modal >
    )
}

export default ArticleMdl