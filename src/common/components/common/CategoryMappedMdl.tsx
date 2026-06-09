import { InfoIcon } from "lucide-react";
import { Button, Modal } from "react-bootstrap";


type CategoryMappedMdlProps = {
  show: boolean;
  title?: string;          // Optional, defaults to "Category Already Used"
  message?: string;        // Optional, allows dynamic message (multi-line supported)
  integrationName?: string; // Optional, defaults to "ATM Switch Dispute API"
  onClose: () => void;
  onViewIntegration: () => void;
};

const CategoryMappedMdl = ({
  show,
  title = "Category Already Used",
  message = "This Category/Sub Category combination is already mapped with Integration:",
  integrationName = "ATM Switch Dispute API",
  onClose,
  onViewIntegration,
}: CategoryMappedMdlProps) => {
  return (
    <Modal show={show} onHide={onClose} centered backdrop="static">
      <Modal.Body className="p-4 text-center">
        {/* Info Icon with yellow background circle */}
        <div
          className="d-inline-flex align-items-center justify-content-center mb-4 rounded-circle"
          style={{ width: 48, height: 48, backgroundColor: "#FFF9E6" }}
        >
          <InfoIcon className="text-warning" style={{ fontSize: "28px" }} />
        </div>

        {/* Title */}
        <h5 className="fw-semibold mb-3">{title}</h5>

        {/* Dynamic message + integration name */}
        <p className="text-muted mb-4 px-3" style={{ lineHeight: "1.5" }}>
          {message}
          <br />
          <strong className="text-primary">{integrationName}</strong>
        </p>

        {/* Buttons */}
        <div className="d-flex justify-content-center gap-3">
          <Button variant="light" onClick={onClose}>
            Close
          </Button>
          <Button
            variant="primary" // assuming "theme" is your primary blue style
            onClick={onViewIntegration}
          >
            View Integration
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CategoryMappedMdl;