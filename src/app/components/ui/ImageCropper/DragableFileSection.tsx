import React, { useState, useCallback } from 'react';
import {
    CloudUpload, XCircle, CheckCircle2,
    FileText, Image as ImageIcon, File,
} from 'lucide-react';
import "./DocumentCard.css";

interface DragableSectionProps {
    isMultiple?: boolean;
    accepted?: string;
    files: File[];
    setFiles: React.Dispatch<React.SetStateAction<File[]>>;
    supportFile: string;
}

// Utility to format file sizes nicely
const formatBytes = (bytes: number, decimals = 2) => {
    if (!+bytes) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};



const DragableFileSection: React.FC<DragableSectionProps> = ({
    files,
    setFiles,
    isMultiple = true,
    accepted,
    supportFile
}) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const selectedFiles = event.target.files;
        processFiles(selectedFiles);
        event.target.value = ''; // Reset input
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);
        const droppedFiles = event.dataTransfer.files;
        processFiles(droppedFiles);
    };

    const processFiles = (newFiles: FileList | null) => {
        if (newFiles && newFiles.length > 0) {
            const filesArray = Array.from(newFiles);
            if (isMultiple) {
                setFiles(prev => [...prev, ...filesArray]);
            } else {
                setFiles([filesArray[0]]); // Keep only first file if not multiple
            }
        }
    };

    const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);
    }, []);

    const handleRemoveFile = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <section className="drag-drop-section">
            <div
                className={`document-uploader ${isDragging ? "drag-active" : ""} ${files.length > 0 ? "has-files" : ""}`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragEnter={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => document.getElementById('browse')?.click()}
            >
                <div className="upload-header">
                    <div className="upload-icon-ring">
                        <CloudUpload size={28} className={isDragging ? "bounce-anim" : ""} />
                    </div>
                    <p className="upload-title">
                        Drop files here or <span className="browse-link">browse</span>
                    </p>
                    <p className="upload-subtitle">
                        Supported: {supportFile} &nbsp;·&nbsp; {isMultiple ? "Multiple files allowed" : "Single file only"}
                    </p>
                </div>

                <input
                    type="file"
                    hidden
                    id="browse"
                    onChange={handleFileChange}
                    accept={accepted ?? ".pdf,.docx,.pptx,.txt,.xlsx,.jpg,.png"}
                    multiple={isMultiple}
                    onClick={(e) => e.stopPropagation()}
                />

                {files.length > 0 && (
                    <div className="file-list" onClick={(e) => e.stopPropagation()}>
                        <div className="file-list__container">
                            {files.map((file, index) => (
                                <div className="file-item" key={`${file.name}-${index}`}>
                                    <div className="d-flex align-items-center me-1 justify-content-center rounded-3 border bg-light" style={{ width: 40, height: 40 }} >
                                        {/* {getFilePreview(file.name)} */}
                                        <FileText />
                                    </div>

                                    <div className="file-info">
                                        <p className="file-name" title={file.name}>{file.name}</p>
                                        <p className="file-size">{formatBytes(file.size)}</p>
                                    </div>

                                    <button
                                        className="file-remove-btn"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleRemoveFile(index);
                                        }}
                                        aria-label="Remove file"
                                    >
                                        <XCircle size={20} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {files.length > 0 && (
                    <div className="success-status fade-in" onClick={(e) => e.stopPropagation()}>
                        <CheckCircle2 size={18} />
                        <span>{files.length} file{files.length !== 1 ? 's' : ''} ready to upload</span>
                    </div>
                )}
            </div>
        </section>
    );
};

export default DragableFileSection;