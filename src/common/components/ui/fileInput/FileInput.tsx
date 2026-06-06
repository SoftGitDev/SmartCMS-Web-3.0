import React, { useRef } from "react";
import { Button } from "react-bootstrap";
import {
    Link,
    File,
    Trash,
    ArrowDownNarrowWide,
} from "lucide-react";

import "./FileInput.css";

export interface RemoteFile {
    fileName: string;
    fileBase64?: string;
    fileContentType?: string;
}

interface FileInputProps {
    title?: string;
    description?: string;
    files: File[];
    setFiles: React.Dispatch<React.SetStateAction<File[]>>;
    accept?: string;
    multiple?: boolean;
    maxSizeMB?: number;
    maxHeight?: string;
    disabled?: boolean;

    remoteFiles?: RemoteFile[];

    onDownload?: (
        base64?: string,
        fileName?: string,
        contentType?: string
    ) => void;
}

const FileInput = ({
    title = "Attach File",
    description = "Maximum file size 5 MB",
    files,
    setFiles,
    accept = "*",
    multiple = false,
    maxSizeMB = 5,
    maxHeight = "250px",
    disabled = false,
    remoteFiles = [],
    onDownload,
}: FileInputProps) => {
    const fileRef = useRef<HTMLInputElement>(null);

    const openFileDialog = () => {
        if (!disabled) {
            fileRef.current?.click();
        }
    };

    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const selectedFiles = Array.from(
            e.target.files || []
        );

        const validFiles = selectedFiles.filter((file) => {
            return file.size <= maxSizeMB * 1024 * 1024;
        });

        if (multiple) {
            setFiles((prev) => [...prev, ...validFiles]);
        } else {
            setFiles(validFiles.slice(0, 1));
        }

        e.target.value = "";
    };

    const removeFile = (index: number) => {
        setFiles((prev) =>
            prev.filter((_, i) => i !== index)
        );
    };

    return (
        <div className="file-input-wrapper">

            <input
                ref={fileRef}
                type="file"
                accept={accept}
                multiple={multiple}
                className="d-none"
                onChange={handleFileChange}
            />

            <div
                className="file-upload-trigger"
                onClick={openFileDialog}
            >
                <div className="file-upload-icon">
                    <Link size={16} />
                </div>

                <div>
                    <h6 className="mb-0 fw-semibold">
                        {title}
                    </h6>

                    <small className="text-muted">
                        {description}
                    </small>
                </div>
            </div>

            <div
                className="file-list-container"
                style={{
                    maxHeight,
                }}
            >
                {/* Local Files */}
                {files.map((file, index) => {
                    const size =
                        file.size >= 1048576
                            ? `${(
                                file.size / 1048576
                            ).toFixed(2)} MB`
                            : `${(
                                file.size / 1024
                            ).toFixed(2)} KB`;

                    return (
                        <div
                            key={index}
                            className="file-card"
                        >
                            <div className="file-icon">
                                <File size={16} />
                            </div>

                            <div>
                                <div className="file-name">
                                    {file.name}
                                </div>

                                <small className="text-muted">
                                    File Size : {size}
                                </small>
                            </div>

                            <Button
                                variant="outline-danger"
                                className="file-action-btn ms-auto"
                                onClick={() =>
                                    removeFile(index)
                                }
                            >
                                <Trash size={14} />
                            </Button>
                        </div>
                    );
                })}

                {/* API Files */}
                {remoteFiles.map((file, index) => (
                    <div
                        key={`remote-${index}`}
                        className="file-card"
                    >
                        <div className="file-icon">
                            <File size={16} />
                        </div>

                        <div className="file-name">
                            {file.fileName}
                        </div>

                        {onDownload && (
                            <Button
                                variant="outline-success"
                                className="file-action-btn ms-auto"
                                onClick={() =>
                                    onDownload(
                                        file.fileBase64,
                                        file.fileName,
                                        file.fileContentType
                                    )
                                }
                            >
                                <ArrowDownNarrowWide
                                    size={14}
                                />
                            </Button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FileInput;