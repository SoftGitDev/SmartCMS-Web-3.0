import React, { useState, useRef, useEffect } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import "./ImageCropper.css"; // Ensure this imports the CSS above
import { Modal, OverlayTrigger, Tooltip, Button } from "react-bootstrap";
import { Crop, MoveLeft, MoveRight, RectangleCircle, Square, Undo } from "lucide-react";
import { documentSaveProps } from "../../../types/bank";

interface ImageEditorProps {
    show: boolean;
    onHide: () => void;
    imageSrc: string;
    onSave?: ({ base64, width, height }: documentSaveProps) => void;
    setError: any
    setFileSize: (val: string) => void;
    isCircle?: boolean;
    setImageSize?: any;
    maxSize?: any;
}

const ImageEditor: React.FC<ImageEditorProps> = ({
    show,
    onHide,
    imageSrc,
    onSave,
    setError,
    setFileSize,
    isCircle,
    setImageSize,
    maxSize,
}) => {
    const cropperRef = useRef<ReactCropperElement>(null);

    // State
    const [scale, setScale] = useState<number>(1);
    const [aspectRatio, setAspectRatio] = useState<number>(16 / 9);
    const [isSaving, setIsSaving] = useState(false);
    const [imgInfo, setImgInfo] = useState<{ width: number; height: number } | null>(null);
    useEffect(() => {
        if (show && isCircle) {
            setAspectRatio(1);
            cropperRef.current?.cropper.setAspectRatio(1);
        }
    }, [show, isCircle]);

    useEffect(() => {
        if (show && imageSrc) {
            if (imageSrc.startsWith("data:application/pdf")) {
                setError("Invalid file type. PDF files cannot be edited as images.");
                onHide();
            } else if (!imageSrc.startsWith("data:image/")) {
                if (imageSrc.startsWith("data:")) {
                    setError("Unsupported file format.");
                    onHide();
                }
            }
        }
    }, [imageSrc, show, setError, onHide]);

    // Handlers
    const onRotate = (direction: 'left' | 'right') => () => {
        const cropper = cropperRef.current?.cropper;
        if (cropper) {
            cropper.rotate(direction === 'left' ? -45 : 45);
        }
    };

    const onScale = (e: React.ChangeEvent<HTMLInputElement>) => {
        const cropper = cropperRef.current?.cropper;
        if (cropper) {
            const scaleValue = parseFloat(e.target.value);
            setScale(scaleValue);
            cropper.scale(scaleValue);
        }
    };

    const onReset = () => {
        const cropper = cropperRef.current?.cropper;
        if (cropper) {
            cropper.reset();
            cropper.setAspectRatio(16 / 9);
            setAspectRatio(16 / 9);
            setScale(1);
        }
    };

    const onCrop = () => {
        const cropper = cropperRef.current?.cropper;
        if (cropper) {
            const data = cropper.getData();
            setImgInfo({ width: Math.round(data.width), height: Math.round(data.height) });
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        const cropper = cropperRef.current?.cropper;

        if (!cropper) {
            setIsSaving(false);
            return;
        }

        try {
            const canvas = cropper.getCroppedCanvas({
                width: imgInfo?.width,
                height: imgInfo?.height,
                fillColor: '#fff',
            });

            // setImageSize && setImageSize(imgInfo);

            if (!canvas) throw new Error("Could not crop image");

            let finalCanvas = canvas;

            if (isCircle) {
                const size = Math.min(canvas.width, canvas.height);
                const circleCanvas = document.createElement("canvas");
                circleCanvas.width = size;
                circleCanvas.height = size;

                const ctx = circleCanvas.getContext("2d");
                if (!ctx) throw new Error("Canvas error");

                ctx.beginPath();
                ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
                ctx.closePath();
                ctx.clip();

                ctx.drawImage(canvas, 0, 0, size, size);

                finalCanvas = circleCanvas;
            }

            // Export PNG (transparent circle)
            const croppedDataUrl = finalCanvas.toDataURL("image/png");

            const fileSizeMB = (croppedDataUrl.length * 0.75) / (1024 * 1024);
            setFileSize(fileSizeMB.toFixed(2));

            setError(null);
            if (onSave) onSave({ base64: croppedDataUrl, width: imgInfo?.width || 0, height: imgInfo?.height || 0 });
            onHide();
        } catch (err) {
            console.error(err);
            setError("Failed to process image.");
        } finally {
            setIsSaving(false);
        }
    };


    const renderRatioBtn = (ratio: number, label: string, icon: React.ReactNode) => (
        <OverlayTrigger placement="top" overlay={<Tooltip>{label}</Tooltip>}>
            <button
                type="button"
                className={`btn tool-btn ${Math.abs(aspectRatio - ratio) < 0.01 ? "active" : ""}`}
                onClick={() => {
                    setAspectRatio(ratio);
                    cropperRef.current?.cropper.setAspectRatio(ratio);
                }}
            >
                {icon}
            </button>
        </OverlayTrigger>
    );

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
            size="lg"
            backdrop="static"
            className="premium-modal" // Custom CSS class
        >
            <Modal.Header closeButton className="border-0">
                <div className="d-flex align-items-center gap-2">
                    <Crop size={20} className="text-primary" />
                    <h5 className="mb-0 text-primary">Image Editor</h5>
                </div>
            </Modal.Header>

            <Modal.Body className="p-0 bg-dark">
                {/* Canvas Area */}
                <div className="d-flex justify-content-center align-items-center cropper-container-wrapper" style={{ minHeight: '400px' }}>
                    <Cropper
                        src={imageSrc}
                        style={{ height: 400, width: "100%" }}
                        guides={true}
                        ref={cropperRef}
                        viewMode={1}
                        background={false}
                        responsive={true}
                        autoCropArea={1}
                        checkOrientation={false}
                        crop={onCrop}
                    />
                </div>

                {/* Info Bar (Informative) */}
                <div className="d-flex justify-content-between px-3 py-2 bg-secondary bg-opacity-10 border-top border-dark">
                    <span className="info-badge">
                        Zoom: {Math.round(scale * 100)}%
                    </span>
                    {imgInfo && (
                        <span className="info-badge">
                            {imgInfo.width} x {imgInfo.height} px
                        </span>
                    )}
                </div>
            </Modal.Body>

            <Modal.Footer className="d-flex flex-column gap-3">
                {/* Tools Row */}
                <div className="d-flex justify-content-between align-items-center w-100">

                    {/* 1. Rotation Controls */}
                    <div className="d-flex gap-1">
                        <OverlayTrigger placement="top" overlay={<Tooltip>Rotate Left</Tooltip>}>
                            <button className="btn tool-btn" onClick={onRotate("left")}>
                                <MoveLeft size={22} />
                            </button>
                        </OverlayTrigger>
                        <OverlayTrigger placement="top" overlay={<Tooltip>Rotate Right</Tooltip>}>
                            <button className="btn tool-btn" onClick={onRotate("right")}>
                                <MoveRight size={22} />
                            </button>
                        </OverlayTrigger>
                    </div>

                    {!isCircle && (
                        <div className="d-flex gap-1 border-start border-end border-secondary px-3 mx-2">
                            {renderRatioBtn(16 / 9, "Landscape (16:9)", <RectangleCircle size={20} />)}
                            {renderRatioBtn(1, "Square (1:1)", <Square size={18} />)}
                            {renderRatioBtn(NaN, "Free Form", <Crop size={20} />)}
                        </div>
                    )}


                    {/* 3. Reset */}
                    <OverlayTrigger placement="top" overlay={<Tooltip>Reset All</Tooltip>}>
                        <button className="btn tool-btn text-danger" onClick={onReset}>
                            <Undo size={22} />
                        </button>
                    </OverlayTrigger>
                </div>

                {/* Slider Row */}
                <div className="w-100 d-flex align-items-center gap-3 px-2">
                    <small className="text-muted" style={{ minWidth: '40px' }}>Zoom</small>
                    <input
                        type="range"
                        className="custom-range flex-grow-1"
                        min="0.2"
                        max="3"
                        step="0.1"
                        value={scale}
                        onChange={onScale}
                    />
                </div>

                {/* Action Row */}
                <div className="d-flex justify-content-end gap-2 w-100 pt-2">
                    <Button
                        type="button"
                        variant="secondary"
                        disabled={isSaving}
                        onClick={onHide}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        variant="primary"
                        disabled={isSaving}
                        onClick={handleSave}
                    >
                        {isSaving ? "Processing..." : "Save & Apply"}
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
}

export default ImageEditor;