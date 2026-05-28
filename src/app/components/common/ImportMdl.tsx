import React, { useCallback, useRef, useState } from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';
import DocumentCard from '../../components/ui/documentUpload/DocumentCard';
import { Cable } from 'lucide-react';
import * as urls from "../../utils/url";
import { apiRequest } from '../../utils/apiRequest';
import toastNotify from '../../utils/tostNotify';
import { SweetAlerts } from '../../utils/sweetAlert';
import { ApiConfigDataProps } from '../../types/administrator';

interface importMdlProps {
    show: boolean;
    handleClose: () => void;
    servicesDtlData?: ApiConfigDataProps | null;
    handleShowApiCreateMdl: (data?: ApiConfigDataProps | null, isEdit?: boolean) => void;
}

const ImportMdl: React.FC<importMdlProps> = ({ show, handleClose, handleShowApiCreateMdl }) => {
    const certificateUploadFileRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [fileContent, setFileContent] = useState<string>("");
    const [error, setError] = useState("");

    const handleImportSubmit = useCallback(async () => {
        if (!selectedFile || !fileContent) {
            setError("Please select a file first");
            return;
        }

        try {
            // Send the actual text content
            const payload = {
                Data: fileContent
            };

            const result = await apiRequest("POST", urls.importApiConfig, payload);

            if (result.Success) {
                const response = result.Response;
                SweetAlerts("Success", "Configuration imported successfully", "success");
                handleClose();
                handleShowApiCreateMdl(response, false);
                // Reset state
                setSelectedFile(null);
                setFileContent("");
            } else {
                result.Message !== "No data found" && toastNotify(result.Message, "error");
            }
        } catch (err) {
            console.error("Error importing file:", err);
            toastNotify("Failed to import configuration", "error");
        }
    }, [selectedFile, fileContent, handleClose, handleShowApiCreateMdl]);


    const handleFileChange = async (e: any) => {
        if (e?.file) {
            const file = e.file;
            setSelectedFile(file);

            try {
                const reader = new FileReader();

                reader.onload = (event) => {
                    const text = event.target?.result as string;
                    setFileContent(text);
                    setError("");
                };
                reader.readAsText(file);

            } catch (err) {
                setSelectedFile(null);
                setFileContent("");
            }
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered size="lg" className="import-config-modal">
            <Modal.Header closeButton className="border-0 pb-0">
                <div className="d-flex align-items-center gap-3">
                    <div className="icon-wrapper-md" style={{ width: '44px', height: '44px' }}>
                        <Cable size={24} />
                    </div>
                    <div>
                        <h6 className="mb-0">Import API Configuration</h6>
                        <span className="text-md fw-light">Upload a .txt file to auto-populate service settings.</span>
                    </div>
                </div>
            </Modal.Header>

            <Modal.Body className="pt-4 pb-0">
                <div className="upload-container mb-3">
                    <DocumentCard
                        title={<span className='mb-0 text-sm fw-medium'>Configuration File (.txt)</span>}
                        imageBase64={""}
                        isRequired
                        isNoImage
                        getCardClass={() => "text-start"}
                        fileInputRef={certificateUploadFileRef}
                        fileErrorName="file"
                        maxSize={500}
                        onFileChange={handleFileChange}
                        accept=".txt"
                        fileName={selectedFile?.name}
                    />
                </div>

                {error && (
                    <Alert variant="danger" className="py-2 mt-2 text-sm">
                        {error}
                    </Alert>
                )}
            </Modal.Body>

            <Modal.Footer className="border-0 pt-0">
                <Button variant="light" size="sm" onClick={handleClose}>
                    Cancel
                </Button>
                <Button
                    variant="primary"
                    size="sm"
                    onClick={handleImportSubmit}
                    disabled={!selectedFile || !fileContent}
                    style={{ backgroundColor: '#6366F1', border: 'none', padding: '8px 24px' }}
                >
                    Process Import
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ImportMdl;