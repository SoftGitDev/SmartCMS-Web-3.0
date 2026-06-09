import { Cog, PlusCircle, Trash } from 'lucide-react';
import React, { useState } from 'react';
import { Row, Col, Button, Modal as BootstrapModal } from 'react-bootstrap';
import toastNotify from '../../../services/notification/tostNotify';
import Textfield from '../../../common/components/ui/TextField/TextInput';

type ResponseMappingMdlProps = {
  setFieldValue: any;
  index: number;
  values: any;
  setFieldTouched: any;
  getTabIndex: any;
};

const dataTypeOptions = [
  { label: 'Boolean', value: 'B' },
  { label: 'String', value: 'S' },
  { label: 'Integer', value: 'I' },
];

const ResponseMappingMdl: React.FC<ResponseMappingMdlProps> = ({ setFieldValue, index, values, getTabIndex }) => {
  const fieldPath = "StatusMapData";
  const currentFieldsArray = values.steps[index]?.[fieldPath] || [];

  const [showModal, setShowModal] = useState(false);
  const [activeKeyword, setActiveKeyword] = useState<string | null>(null);
  const [modalData, setModalData] = useState<any[]>([]);

  const uniqueKeywords = Array.from(new Set(currentFieldsArray.filter((r: any) => r.DeleteFlag !== "Y").map((r: any) => r.Keyword)));

  const handleOpenModal = (keyword: string) => {
    if (!keyword) {
      toastNotify("Please enter a Keyword first", "error");
      return;
    }
    const existingMappings = currentFieldsArray.filter((r: any) => r.Keyword === keyword);
    setActiveKeyword(keyword);
    setModalData(existingMappings.length > 0 ? existingMappings : [{ Value: "", DisplayValue: "", id: Date.now(), ExistFlag: "N", DeleteFlag: "N" }]);
    setShowModal(true);
  };

  const handleSaveModal = () => {
    const otherKeywords = currentFieldsArray.filter((r: any) => r.Keyword !== activeKeyword);
    const flattenedData = modalData.map(m => ({
      ...m,
      Keyword: activeKeyword,
      DataType: modalData.find(x => x.DeleteFlag !== "Y")?.DataType || m.DataType || "S"
    }));

    setFieldValue(`steps.${index}.${fieldPath}`, [...otherKeywords, ...flattenedData]);
    setShowModal(false);
  };

  return (
    <div className="mb-3">
      <fieldset className="border rounded-3 p-2 px-3 mb-3">
        <legend className="float-none w-auto px-2 text-primary mb-0 text-xs fw-medium">
          Status Mapping Configuration
        </legend>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <p className='text-sm m-0 text-slate-600 ps-1'>Define response keys and click the gear icon to map multiple status values.</p>
          <Button
            variant="link" size="sm" className="p-0 text-decoration-none text-primary text-xs ms-auto fw-semibold"
            onClick={() => {
              const newField = { id: Date.now(), DataType: "S", Keyword: "", Value: "", DisplayValue: "", ExistFlag: "N", DeleteFlag: "N" };
              setFieldValue(`steps.${index}.${fieldPath}`, [...currentFieldsArray, newField]);
            }}
          >
            <PlusCircle className="me-1" size={15} /> Add Key
          </Button>
        </div>

        {uniqueKeywords.map((keyword, kIdx) => {
          const firstMatch = currentFieldsArray.find((r: any) => r.Keyword === keyword && r.DeleteFlag !== "Y");
          const count = currentFieldsArray.filter((r: any) => r.Keyword === keyword && r.DeleteFlag !== "Y").length;
          const absoluteIndex = currentFieldsArray.findIndex((f: any) => f.id === firstMatch.id);
          if (!firstMatch) return null;

          return (
            <Row key={firstMatch.id} className="g-2 mb-2 align-items-end pb-2">

              <Col md={5}>
                <Textfield
                  label="Response Key (Keyword)"
                  placeholder='Enter Response Key (Keyword)'
                  value={firstMatch.Keyword}
                  tabIndex={getTabIndex()}
                  onChange={(e) => {
                    const updated = currentFieldsArray.map((r: any) =>
                      r.id === firstMatch.id
                        ? { ...r, Keyword: e.target.value }
                        : r
                    );
                    setFieldValue(`steps.${index}.${fieldPath}`, updated);
                  }}
                />
              </Col>
              <Col md={3}>
                <Button
                  variant="light"
                  tabIndex={getTabIndex()}
                  size='sm'
                  className="w-100 d-flex align-items-center justify-content-center"
                  onClick={() => handleOpenModal(firstMatch.Keyword)} >
                  <Cog className="me-2" />
                  {count > 1 ? `Configured (${count})` : "Configure Values"}
                </Button>
              </Col>
              <Col md={1} className="text-end">
                <Button variant="outline-danger" tabIndex={getTabIndex()} size="sm" onClick={() => {
                  const updated = currentFieldsArray.map((r: any) => r.Keyword === keyword ? { ...r, DeleteFlag: "Y" } : r);
                  setFieldValue(`steps.${index}.${fieldPath}`, updated);
                }}>
                  <Trash />
                </Button>
              </Col>
            </Row>
          );
        })}
      </fieldset>

      {/* NESTED VALUES MODAL */}
      <BootstrapModal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
        <BootstrapModal.Header closeButton className="bg-light">
          <BootstrapModal.Title className="text-base">
            Mapping Values for: <span className="text-primary">{activeKeyword}</span>
          </BootstrapModal.Title>
        </BootstrapModal.Header>
        <BootstrapModal.Body>
          <Row className="mb-2 fw-bold text-xs text-muted">
            <Col md={5}>API Response Value</Col>
            <Col md={5}>Display Value (UI)</Col>
            <Col md={2}></Col>
          </Row>

          {/* IMPORTANT: Only show rows NOT marked for deletion in the UI */}
          {modalData.filter(m => m.DeleteFlag !== "Y").map((row) => {
            // Find the real index in the full modalData array
            const realIdx = modalData.findIndex(m => m.id === row.id);

            return (
              <Row key={row.id} className="mb-2 g-2">
                <Col md={5}>
                  <Textfield
                    placeholder="e.g. C"
                    label=''
                    value={row.Value}
                    tabIndex={getTabIndex()}
                    onChange={(e) => {
                      const newData = [...modalData];
                      newData[realIdx].Value = e.target.value;
                      setModalData(newData);
                    }}
                  />
                </Col>
                <Col md={5}>
                  <Textfield
                    placeholder="e.g. Closed"
                    label=''
                    value={row.DisplayValue}
                    tabIndex={getTabIndex()}
                    onChange={(e) => {
                      const newData = [...modalData];
                      newData[realIdx].DisplayValue = e.target.value;
                      setModalData(newData);
                    }}
                  />
                </Col>

                <Col md={1} className="text-end ">
                  <Button className='mt-1' variant="outline-danger" size="sm"
                    tabIndex={getTabIndex()}
                    onClick={() => {
                      const newData = [...modalData];
                      if (row.ExistFlag === "Y") {
                        newData[realIdx].DeleteFlag = "Y";
                      } else {
                        newData.splice(realIdx, 1);
                      }
                      setModalData(newData);
                    }}>
                    <Trash />
                  </Button>
                </Col>
              </Row>
            );
          })}

          <Button variant="link" className="text-primary fw-semibold text-xs p-0 pe-1 text-decoration-none"
            onClick={() => {

              const activeRows = modalData.filter(m => m.DeleteFlag !== "Y");

              if (activeRows.length > 0) {
                const lastRow = activeRows[activeRows.length - 1];
                if (!lastRow.Value.trim() || !lastRow.DisplayValue.trim()) {
                  toastNotify("Please fill the existing mapping before adding a new one.", "error");
                  return;
                }
              }

              setModalData([...modalData, { id: Date.now() + Math.random(), Value: "", DisplayValue: "", ExistFlag: "N", DeleteFlag: "N" }])
            }}>
            <PlusCircle style={{ marginBottom: "3px" }} size={15} /> Add Value Pair
          </Button>

        </BootstrapModal.Body>
        <BootstrapModal.Footer>
          <Button variant="light" onClick={() => setShowModal(false)} > Cancel</Button>
          <Button variant="primary" onClick={handleSaveModal} > Save Mapping</Button>
        </BootstrapModal.Footer>
      </BootstrapModal>
    </div>
  );
};

export default ResponseMappingMdl;