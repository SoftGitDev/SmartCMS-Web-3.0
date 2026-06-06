import React, { useState } from 'react'
import { Button, Modal, ModalBody } from 'react-bootstrap'
import { Upload } from 'lucide-react'
import DragableFileSection from '../../../common/components/ui/ImageCropper/DragableFileSection'

interface UploadMdlProps {
    show: boolean
    handleClose: () => void
}
const UploadMdl: React.FC<UploadMdlProps> = ({ show, handleClose }) => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size='lg'
            >
                <Modal.Header closeButton>
                    <Modal.Title className='w-100'>
                        <div className='d-flex align-items-start'>
                            <div className="d-flex align-items-center justify-content-center rounded-3 bg-primary-50 bg-opacity-10 me-3" style={{ width: 40, height: 40, flexShrink: 0, }} >
                                <Upload className='text-primary' size={22} strokeWidth={2.2} />
                            </div>
                            <div>
                                <h6 className="fw-semibold text-dark mb-1">
                                    Upload Branch File
                                </h6>
                                <p className="text-secondary text-xs mb-0">
                                    Upload branch master and contact details.
                                </p>
                            </div>
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <ModalBody>
                    <DragableFileSection
                        files={selectedFiles}
                        setFiles={setSelectedFiles}
                        isMultiple={false}
                        accepted=".pdf, doc, docx, XLS, XLSX, TXT"
                        supportFile={''}
                    />
                </ModalBody>
                <Modal.Footer>
                    <Button variant="light" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary">Submit</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default UploadMdl
