import React, { useEffect, useState } from "react";
import { ErrorMessage, useFormikContext } from "formik";
import "./DocumentCard.css"
import ImageEditor from "../ImageCropper/ImageCropper";
import excel from '../../../assets/images/excel.png'
import { CloudUpload, FileText } from "lucide-react";
import { checkImageMimeType, converToBase64, imageCompress } from "../../../utils/common";
import { SweetAlerts } from "../../../utils/sweetAlert";
import Textfield from "../TextField/TextInput";
import { documentSaveProps } from "../../../types/bank";
import toastNotify from "../../../utils/tostNotify";


interface DocumentCardProps {
  title?: any;
  imageBase64?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  fileInputRef?: any;
  getCardClass?: (value: boolean, extra?: string) => string;
  onUploadClick?: () => void;
  onFileChange?: any, // ({ base64, width, height, file }: documentSaveProps & { file?: File }) => void;
  onFileBlur?: (e: any) => void;
  fileErrorName?: string;
  maxSize?: number;
  isNoImage?: boolean;
  accept?: string;
  fileName?: string; // Add this to allow parent to control displayed filename
  isNotBase64?: boolean; // Add this to allow parent to control displayed filename
  descTitle?:string
  subdescTitle?:string
}

const   DocumentCard: React.FC<DocumentCardProps> = ({
  title,
  imageBase64,
  isRequired,
  isDisabled,
  isNotBase64,
  fileInputRef,
  getCardClass,
  onUploadClick,
  onFileChange,
  onFileBlur,
  fileErrorName,
  maxSize,
  isNoImage,
  accept,
  fileName,
  descTitle,
  subdescTitle,
}) => {

  const [isImageCrop, setIsImageCrop] = useState<boolean>(false);
  const [previewSrc, setPreviewSrc] = useState<string>("");
  const [uploadedFileName, setUploadedFileName] = useState<string>("");
  const [fileType, setFileType] = useState<string>(""); // Track file type

  // Update uploadedFileName when fileName prop changes
  useEffect(() => {
    setUploadedFileName(fileName || "");
  }, [fileName]);

  // Safe error message component
  const SafeErrorMessage = () => {
    try {
      const formik = useFormikContext();
      if (!formik) return null;
      return <ErrorMessage name={fileErrorName || ''} component="div" className="ErrorMessage" />;
    } catch {
      return null;
    }
  };

  const handleImageCrop = (image?: string | null) => {
    setIsImageCrop(!isImageCrop);
    setPreviewSrc(image || "");
  }

  // Helper function to check if file is Excel
  const isExcelFile = (file: File): boolean => {
    const excelMimeTypes = [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel.sheet.macroEnabled.12'
    ];
    const excelExtensions = ['.xls', '.xlsx', '.xlsm'];

    return excelMimeTypes.includes(file.type) ||
      excelExtensions.some(ext => file.name.toLowerCase().endsWith(ext));
  };

  // Helper function to check if file is Text
  const isTextFile = (file: File): boolean => {
    const textMimeTypes = [
      'text/plain',
      'application/txt',
      'text/txt'
    ];
    const textExtensions = ['.txt'];

    return textMimeTypes.includes(file.type) ||
      textExtensions.some(ext => file.name.toLowerCase().endsWith(ext));
  };

  const handleInputFIle = async (e: React.ChangeEvent<any>) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) {
      console.log("No file selected");
      return;
    }

    const fileSize = (selectedFile?.size / 1048576).toFixed(2);
    const maxImageSize = maxSize ? maxSize / 1024 : 0.5;

    // Check if it's an Excel file
    if (isExcelFile(selectedFile)) {
      // For Excel files, just validate size and pass the file directly
      if (maxSize && Number(fileSize) * 1024 > Number(maxSize)) {
        e.target.value = ''; // Reset input
        return SweetAlerts("Warning !", `File size must be less than ${maxSize} KB`, 'warning');
      }

      // Save the filename for display
      setUploadedFileName(selectedFile.name);
      setFileType('excel');

      // Pass the file object directly without base64 conversion
      onFileChange?.({ file: selectedFile, base64: '' });
      e.target.value = ''; // Reset input
      return;
    }

    // Check if it's a Text file
    if (isTextFile(selectedFile)) {
      // For Text files, validate size and pass the file directly
      if (maxSize && Number(fileSize) * 1024 > Number(maxSize)) {
        e.target.value = ''; // Reset input
        return SweetAlerts("Warning !", `File size must be less than ${maxSize} KB`, 'warning');
      }

      // Save the filename for display
      setUploadedFileName(selectedFile.name);
      setFileType('text');

      // Pass the file object directly without base64 conversion
      onFileChange?.({ file: selectedFile, base64: '' });
      e.target.value = ''; // Reset input
      return;
    }

    const isImage = selectedFile.type.startsWith('image/');

    if (isImage && !isNoImage) {
      try {

        const compressedBase64: any = await imageCompress(selectedFile);

        // Validate MIME type after compression
        const mimeType = compressedBase64.split(';')[0].split(':')[1];
        if (!mimeType || !mimeType.startsWith('image/')) {
          e.target.value = ''; // Reset input
          return SweetAlerts("Error !", 'Invalid Image format', 'error');
        }

        handleImageCrop(compressedBase64);

        e.target.value = '';
        return;

      } catch (error) {
        console.error("Image compression failed:", error);
        e.target.value = ''; // Reset input
        return SweetAlerts("Error !", 'Failed to process image', 'error');
      }
    }

    // For non-compressed images or other files, use FileReader
    const reader = new FileReader();

    reader.onloadend = async () => {
      if (!isNoImage && isImage) {
        const mimeType = checkImageMimeType(reader);
        if (mimeType === 'unknown') {
          e.target.value = ''; // Reset input
          return SweetAlerts("Error !", 'Invalid Image format', 'error');
        } else if (Number(fileSize) > Number(maxImageSize)) {
          e.target.value = ''; // Reset input
          return SweetAlerts("Warning !", `Image size less than ${maxImageSize * 1024} KB`, 'warning');
        }
      } else {
        // For non-image files (but not Excel or Text), just check size if maxSize is provided
        if (maxSize && Number(fileSize) * 1024 > Number(maxSize)) {
          e.target.value = ''; // Reset input
          return SweetAlerts("Warning !", `File size must be less than ${maxSize} KB`, 'warning');
        }
      }

      let base64: any = ""

      if (!isNotBase64) {
        base64 = await converToBase64(selectedFile);
      }

      if (!isNoImage && isImage) {
        handleImageCrop(base64);
      } else {
        onFileChange?.(!isNotBase64 ? { base64 } : selectedFile);
      }

      // Reset the input value after successful upload
      e.target.value = '';
    };

    selectedFile && reader.readAsArrayBuffer(selectedFile);
  };



  // Render file preview based on type
  const renderFilePreview = () => {
    if (!uploadedFileName) return null;

    return (
      <>
        <div className="file-preview" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        
          {fileType === 'text' && (
            <div style={{
              fontSize: '48px',
              color: '#4CAF50'
            }}>📄</div>
          )}
          <div className="file-name" style={{
            marginTop: '8px',
            fontSize: '14px',
            fontWeight: '500',
            wordBreak: 'break-word',
            textAlign: 'center',
            padding: '0 10px'
          }}>
            {uploadedFileName}
          </div>
        </div>
        <div className="preview-overlay">
          <span>Re-Upload</span>
        </div>
      </>
    );
  };

  return (
    <div className={getCardClass?.(!!imageBase64, isRequired ? "required" : "")}>

      {/* Header */}
      <span className="mb-1 text-start">
        <span className={`label-14 ps-1 text-md ${isRequired ? "required" : ""}`}>{title}</span>
        {(!!imageBase64 || uploadedFileName) && <span className="text-success ms-2">✔</span>}
      </span>

      {/* Preview / Upload */}
      <div
        className="preview-zone"
        onClick={() =>
          fileInputRef?.current?.click()
        }
      >
        {uploadedFileName && uploadedFileName ? (
          renderFilePreview()
        ) : !!imageBase64 && imageBase64 ? (
          <>
            <img
              src={imageBase64}
              alt={title}
              className="custImagePreview"
            />
            <div className="preview-overlay">
              <span>Re-Upload</span>
            </div>
          </>
        ) : (
          <div className="text-center p-4">
            <div className="d-flex justify-content-center">
              <div className="upload-icon-wrapper text-primary">
                <CloudUpload size={28} />
              </div>
            </div>
            <h6 className="fw-medium mb-1">
             {descTitle || 'No document uploaded' } 
            </h6>
             <p className="text-muted text-xs">
             {subdescTitle || 'Click here to upload document'} 
            </p>
          </div>
        )}
      </div>

      {/* Hidden Input */}
      <Textfield
        className="d-none"
        type="file"
        style={{ display: 'none' }}
        ref={fileInputRef}
        disabled={isDisabled}
        accept={accept || ".png,.jpg,.jpeg"}
        onChange={async (e: React.ChangeEvent<any>) => {
          await handleInputFIle(e);
        }}
        onBlur={onFileBlur}
      />

      <SafeErrorMessage />

      <ImageEditor
        show={isImageCrop}
        onHide={() => { handleImageCrop() }}
        imageSrc={previewSrc}
        onSave={(data: documentSaveProps) => onFileChange && onFileChange(data)}
        setError={(msg: string) => toastNotify(msg, "error")}
        setFileSize={(size: string) => { console.log(size) }}
      />
    </div>
  );
};

export default DocumentCard;