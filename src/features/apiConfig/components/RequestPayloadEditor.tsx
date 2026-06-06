// Purpose: Manage Account Type 
// Created by: Harish
// Created Date: 04-01-2026

// Change History:

import { ArrowBigDown, ArrowBigUp, ChevronDown, ChevronRight, CirclePlus, FileJson2, List, Plus, SlidersHorizontal, Trash2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Nav, Button, Form, InputGroup, Modal, Row, Col } from "react-bootstrap";
import RadioBtn from "../../../common/components/ui/Radio/RadioBtn";
import Textfield from "../../../common/components/ui/TextField/TextInput";
import SelectField from "../../../common/components/ui/SelectBox/SelectField";
import { SweetAlerts } from "../../../services/notification/sweetAlert";


// --- Types ---
interface FieldNode {
    id: string;
    key: string;
    value: any;
    type: "string" | "number" | "boolean" | "object" | "array" | "null";
    functionType?: string;
    functionParams?: any;
    subFunction?: "none" | "upper" | "lower" | "trim";
    children?: FieldNode[];
    isOpen?: boolean;
}

const FunctionParamModal = ({ show, onHide, functionType, currentSubFunction, onSave }: { show: boolean; onHide: () => void; functionType: string; currentSubFunction?: string; onSave: (params: any, subFunction: string) => void }) => {
    const [params, setParams] = useState<any>({});
    const [subFunction, setSubFunction] = useState<string>("none");

    useEffect(() => {
        if (show) {
            setSubFunction(currentSubFunction || "none");

            if (functionType === 'substr') {
                setParams({ start: '0', end: '4' });
            } else if (functionType === 'lpad' || functionType === 'rpad') {
                setParams({ length: '10', padChar: '0' });
            } else if (functionType === 'dateFormat') {
                setParams({ format: 'yyyy-MM-dd HH:mm:ss A' });
            } else if (functionType === 'replace') {
                setParams({ search: '', replaceWith: '' });
            }
        }
    }, [show, functionType, currentSubFunction]);

    const handleSave = () => {
        onSave(params, subFunction);
        onHide();
    };

    const dateFormats = [
        'yyyy-MM-dd HH:mm:ss A',
        'yyyy-MM-dd',
        'dd-MM-yyyy',
        'MM/dd/yyyy',
        'dd/MM/yyyy',
        'yyyy/MM/dd',
        'HH:mm:ss',
        'hh:mm:ss A',
        'MMMM dd, yyyy',
        'MMM dd, yyyy'
    ];

    const showSubFunctionOption = ['substr', 'lpad', 'rpad', 'replace'].includes(functionType);

    return (
        <Modal show={show} onHide={onHide} centered size="lg">
            <Modal.Header closeButton>
                <div className="d-flex align-items-center gap-3">
                    <div className="icon-wrapper-md" style={{ width: '44px', height: '44px' }}>
                        <SlidersHorizontal size={24} />
                    </div>
                    <div>
                        <h6 className="mb-0">Configure {functionType?.toUpperCase()} Function</h6>
                        <span className="text-md fw-light">Configure a new function</span>
                    </div>
                </div>
            </Modal.Header>
            <Modal.Body>
                {/* Sub-Function Selection */}
                {showSubFunctionOption && (
                    <div className="mb-4 p-3 bg-light border rounded">
                        <Form.Label className="text-sm fw-bold mb-2">Additional Text Transformation (Optional)</Form.Label>
                        <Form.Text className="d-block mb-2 text-sm text-muted">
                            Apply an additional transformation to the value before the {functionType} function
                        </Form.Text>
                        <div className="d-flex gap-3">
                            <RadioBtn
                                id="subFunc-none"
                                label="None"
                                name="subFunction"
                                value="none"
                                checked={subFunction === "none"}
                                onChange={(e: any) => setSubFunction(e.target.value)}
                            />
                            <RadioBtn
                                id="subFunc-upper"
                                label="UPPERCASE"
                                name="subFunction"
                                value="upper"
                                checked={subFunction === "upper"}
                                onChange={(e: any) => setSubFunction(e.target.value)}
                            />
                            <RadioBtn
                                id="subFunc-lower"
                                label="lowercase"
                                name="subFunction"
                                value="lower"
                                checked={subFunction === "lower"}
                                onChange={(e: any) => setSubFunction(e.target.value)}
                            />
                            <RadioBtn
                                id="subFunc-trim"
                                label="Trim Spaces"
                                name="subFunction"
                                value="trim"
                                checked={subFunction === "trim"}
                                onChange={(e: any) => setSubFunction(e.target.value)}
                            />
                        </div>
                        {subFunction !== "none" && (
                            <div className="mt-2 p-2 bg-white border rounded text-muted text-xs ps-3">
                                <strong>Preview:</strong> {`{{#${functionType}}}{{#${subFunction}}}{{fieldName}}{{/${subFunction}}}...{{/${functionType}}}`}
                            </div>
                        )}
                    </div>
                )}

                {/* Substring Section */}
                {functionType === 'substr' && (
                    <Row>
                        <Col md={6} className="mb-3">
                            <Textfield
                                label="Start Position"
                                type="number"
                                name="start"
                                value={params.start || '0'}
                                onChange={(e) => setParams({ ...params, start: e.target.value })}
                                placeholder="Start index (e.g., 0)"
                                required
                            />
                            <small className="text-muted text-xs">Starting position (0-based index)</small>
                        </Col>
                        <Col md={6} className="mb-3">
                            <Textfield
                                label="End Position"
                                type="number"
                                name="end"
                                value={params.end || '4'}
                                onChange={(e) => setParams({ ...params, end: e.target.value })}
                                placeholder="End index (e.g., 4)"
                                required
                            />
                            <small className="text-muted text-xs">Ending position (exclusive)</small>
                        </Col>
                        <Col md={12}>
                            <div className="bg-light p-2 rounded text-sm border-start border-primary border-4">
                                <strong>Example:</strong> For Aadhaar last 4 digits: Start = 8, End = 12
                            </div>
                        </Col>
                    </Row>
                )}

                {/* Padding Section (Lpad/Rpad) */}
                {(functionType === 'lpad' || functionType === 'rpad') && (
                    <Row>
                        <Col md={6} className="mb-3">
                            <Textfield
                                label="Total Length"
                                type="number"
                                name="length"
                                value={params.length || '10'}
                                onChange={(e) => setParams({ ...params, length: e.target.value })}
                                placeholder="Final length"
                                required
                            />
                        </Col>
                        <Col md={6} className="mb-3">
                            <Textfield
                                label="Padding Character"
                                type="text"
                                maxLength={1}
                                name="padChar"
                                value={params.padChar || '0'}
                                onChange={(e) => setParams({ ...params, padChar: e.target.value })}
                                placeholder="e.g. 0"
                                required
                            />
                        </Col>
                    </Row>
                )}

                {/* Date Format Section - Using SelectField */}
                {functionType === 'dateFormat' && (
                    <Row>
                        <Col md={8} className="mb-3">
                            <SelectField
                                name="dateFormat"
                                label="Target Date Format"
                                options={dateFormats.map(f => ({ label: f, value: f }))}
                                value={params.format ? { label: params.format, value: params.format } : null}
                                onChange={(option: any) => setParams({ ...params, format: option.value })}
                                placeholder="Select Format..."
                                required
                            />
                            <div className="bg-light p-2 mt-2 rounded text-xs">
                                <code className="pe-1">yyyy</code>: Year | <code className="pe-1">MM</code>: Month | <code className="pe-1">dd</code>: Day | <code className="pe-1">HH</code>: 24h
                            </div>
                        </Col>
                    </Row>
                )}

                {/* Replace Section */}
                {functionType === 'replace' && (
                    <Row>
                        <Col md={6} className="mb-3">
                            <Textfield
                                label="Search String"
                                name="search"
                                value={params.search || ''}
                                onChange={(e: any) => setParams({ ...params, search: e.target.value })}
                                placeholder="Find..."
                                required
                            />
                        </Col>
                        <Col md={6} className="mb-3">
                            <Textfield
                                label="Replace With"
                                name="replaceWith"
                                value={params.replaceWith || ''}
                                onChange={(e: any) => setParams({ ...params, replaceWith: e.target.value })}
                                placeholder="Replace..."
                                required
                            />
                        </Col>
                    </Row>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="light" size="sm" onClick={onHide}>Cancel</Button>
                <Button variant="primary" size="sm" onClick={handleSave}>Apply Function</Button>
            </Modal.Footer>
        </Modal>
    );
};

const RequestPayloadEditor = ({ value, onChange, type, contentType, getTabIndex, index, setFieldValue, name }: { value: string; name: string, contentType: string; getTabIndex: any; onChange: (val: string) => void; type?: string, index?: number, setFieldValue: any, }) => {
    const [activeTab, setActiveTab] = useState("json");
    const [jsonText, setJsonText] = useState(value || "{}");
    const [treeData, setTreeData] = useState<FieldNode[]>([]);

    const isInternalChange = useRef(false);

    // --- Helper: Generate function template string ---
    const generateFunctionTemplate = (node: FieldNode): string => {
        if (!node.functionType || node.functionType === "none") {
            return node.value || "";
        }

        let varName = `{{${node.key}}}`;

        // Wrap in subfunction if present
        if (node.subFunction && node.subFunction !== "none") {
            varName = `{{#${node.subFunction}}}${varName}{{/${node.subFunction}}}`;
        }

        switch (node.functionType) {
            case 'substr':
                const { start = '0', end = '4' } = node.functionParams || {};
                return `{{#substr}}${varName},${start},${end}{{/substr}}`;
            case 'upper':
                return `{{#upper}}${varName}{{/upper}}`;
            case 'lower':
                return `{{#lower}}${varName}{{/lower}}`;
            case 'trim':
                return `{{#trim}}${varName}{{/trim}}`;
            case 'lpad':
                const lpadParams = node.functionParams || { length: '10', padChar: '0' };
                return `{{#lpad}}${varName},${lpadParams.length},${lpadParams.padChar}{{/lpad}}`;
            case 'rpad':
                const rpadParams = node.functionParams || { length: '10', padChar: '0' };
                return `{{#rpad}}${varName},${rpadParams.length},${rpadParams.padChar}{{/rpad}}`;
            case 'replace':
                const replaceParams = node.functionParams || { search: '', replaceWith: '' };
                return `{{#replace}}${varName},${replaceParams.search},${replaceParams.replaceWith}{{/replace}}`;
            case 'dateFormat':
                const format = node.functionParams?.format || 'yyyy-MM-dd HH:mm:ss A';
                return `{{#dateFormat}}${varName},${format}{{/dateFormat}}`;
            default:
                return node.value || "";
        }
    };

    // --- Logic: Convert JSON String to Tree (Handles Paste) ---
    const parseToTree = (obj: any): FieldNode[] => {
        if (obj === null || typeof obj !== "object") return [];

        return Object.entries(obj).map(([key, val]) => {
            let fieldType: FieldNode["type"] = "string";
            if (val === null) fieldType = "null";
            else if (Array.isArray(val)) fieldType = "array";
            else if (typeof val === "object") fieldType = "object";
            else if (typeof val === "number") fieldType = "number";
            else if (typeof val === "boolean") fieldType = "boolean";

            return {
                id: Math.random().toString(36).substr(2, 9),
                key,
                type: fieldType,
                value: (fieldType === "object" || fieldType === "array") ? "" : val,
                isOpen: true,
                functionType: "none",
                subFunction: "none",
                children: (fieldType === "object" || fieldType === "array") ? parseToTree(val) : []
            };
        });
    };

    // --- Logic: Convert Tree back to JSON Object with Functions ---
    const parseToObject = (nodes: FieldNode[]): any => {
        const obj: any = {};
        nodes.forEach(node => {
            // In Builder mode, we skip empty keys unless it's an array element
            if (!node.key && node.type !== 'array') return;

            if (node.type === "object") {
                obj[node.key] = parseToObject(node.children || []);
            } else if (node.type === "array") {
                obj[node.key] = (node.children || []).map(child => {
                    const temp = parseToObject([child]);
                    return temp[child.key];
                });
            } else {
                // Apply function transformation if selected
                const finalValue = generateFunctionTemplate(node);

                if (node.type === "number") {
                    obj[node.key] = Number(finalValue);
                } else if (node.type === "boolean") {
                    obj[node.key] = String(finalValue).toLowerCase() === "true";
                } else if (node.type === "null") {
                    obj[node.key] = null;
                } else {
                    obj[node.key] = finalValue;
                }
            }
        });
        return obj;
    };

    // USED TO RENDER THE JSON TO TREE STRUCTURE 
    useEffect(() => {
        if (isInternalChange.current) {
            isInternalChange.current = false;
            return;
        }
        try {
            let sanitizedValue = value || "{}";

            sanitizedValue = sanitizedValue
                .replace(/\[\s*{{#[^}]+}}/g, '[')
                .replace(/{{\/[^}]+}}\s*\]/g, ']');

            sanitizedValue = sanitizedValue
                .replace(/,(\s*)({{\/[^}]+}})?\s*\]/g, '$1$2]')
                .replace(/,(\s*)({{\/[^}]+}})?\s*}/g, '$1$2}');

            sanitizedValue = sanitizedValue
                .replace(/{{#[^}]+}}/g, '')
                .replace(/{{\/[^}]+}}/g, '');

            sanitizedValue = sanitizedValue
                .replace(/,\s*,/g, ',')
                .replace(/,(\s*[\]}])/g, '$1');

            const parsed = JSON.parse(sanitizedValue);
            setTreeData(parseToTree(parsed));
            setJsonText(value);
        } catch (e) {
            console.error("JSON Parse Error:", e);
        }
    }, [value]);


    // FUNCTION USED TO HANDLE THE JSON TO TREE STRUCTURE CREATE 
    const handleTreeChange = (newTree: FieldNode[]) => {
        setTreeData(newTree);
        const obj = parseToObject(newTree);
        const jsonString = JSON.stringify(obj, null, 4);
        setJsonText(jsonString);
        isInternalChange.current = true;
        onChange(jsonString);
    };

    return (
        <div className="border-0">
            <div className="bg-white d-flex justify-content-between align-items-center pt-3 pb-2">
                <div className="d-flex align-items-center">
                    <div className="p-1 py-0 bg-light text-primary rounded me-2 border">
                        {type === "Request Payload" ? <ArrowBigUp size={15} /> : <ArrowBigDown size={15} />}
                    </div>
                    <label className="m-0 fw-semibold text-sm text-dark required">{type}</label>
                </div>
                {contentType === "J" &&
                    <Nav variant="pills" className="nav-pills-custom border rounded-2" activeKey={activeTab} onSelect={(k) => setActiveTab(k || "json")}>
                        <Nav.Item><Nav.Link eventKey="json" className="py-1 px-2 text-sm"><FileJson2 size={16} className="me-1" /> JSON</Nav.Link></Nav.Item>
                        <Nav.Item><Nav.Link eventKey="kv" className="py-1 px-2 text-sm"><List size={16} className="me-1" /> Builder</Nav.Link></Nav.Item>
                    </Nav>
                }
            </div>

            <div className="p-0">
                {activeTab === "json" ? (
                    <div>
                        <textarea
                            className="form-control rounded-2 text-sm"
                            rows={12}
                            name={name}
                            value={jsonText}
                            placeholder={contentType === "J" ? "Enter Request Payload..." : contentType === "X" ? "Sample XML ... <request>\n    <userId></userId>\n    <ticketId></ticketId>\n</request>" : "Enter Payload"}
                            tabIndex={getTabIndex()}
                            onChange={(e) => {
                                setJsonText(e.target.value);
                                onChange(e.target.value);
                                setFieldValue(name, e.target.value);
                                try {
                                    const parsed = JSON.parse(e.target.value);
                                    setTreeData(parseToTree(parsed));
                                } catch (err) { }
                            }}
                            spellCheck={false}
                        />
                    </div>

                ) : (
                    <div className="p-3 border rounded-3 overflow-auto" style={{ height: '255px' }}>
                        <div className="tree-container">
                            {treeData.map((node, i) => (
                                <JSONNode
                                    key={node.id}
                                    node={node}
                                    level={0}
                                    generateTemplate={generateFunctionTemplate}
                                    onUpdate={(updated) => {
                                        const newTree = [...treeData];
                                        newTree[i] = updated;
                                        handleTreeChange(newTree);
                                    }}
                                    onDelete={() => {
                                        handleTreeChange(treeData.filter((_, idx) => idx !== i));
                                    }}
                                />
                            ))}
                            <Button
                                variant=""
                                size="sm"
                                className="mt-2 border-dashed text-primary w-100"
                                onClick={() => {
                                    if (treeData.length > 0) {
                                        const lastNode = treeData[treeData.length - 1];

                                        if (!lastNode.key.trim() && lastNode.type !== 'array') {
                                            SweetAlerts("Error !", "Please fill the last field before adding a new one.", "error");
                                            return;
                                        }
                                    }
                                    handleTreeChange([...treeData, { id: Math.random().toString(36).substr(2, 9), key: "", value: "", type: "string", isOpen: true, functionType: "none", subFunction: "none", children: [] }])
                                }}>
                                <CirclePlus size={14} className="me-1" /> Add Field
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- Recursive Node Component ---
const JSONNode = ({ node, level, onUpdate, onDelete, generateTemplate }: { node: FieldNode; level: number; onUpdate: (node: FieldNode) => void; onDelete: () => void; generateTemplate: (node: FieldNode) => string }) => {
    const [showFunctionModal, setShowFunctionModal] = useState(false);
    const [selectedFunction, setSelectedFunction] = useState<string>("");

    const isContainer = node.type === "object" || node.type === "array";

    const updateField = (changes: Partial<FieldNode>) => onUpdate({ ...node, ...changes });

    const requiresParams = (funcType: string) => {
        return ['substr', 'lpad', 'rpad', 'dateFormat', 'replace'].includes(funcType);
    };

    const handleFunctionChange = (funcType: string) => {
        if (funcType === 'none') {
            updateField({ functionType: 'none', functionParams: undefined });
        } else if (requiresParams(funcType)) {
            setSelectedFunction(funcType);
            setShowFunctionModal(true);
        } else {
            // Simple functions without params
            updateField({ functionType: funcType });
        }
    };

    const handleFunctionParamSave = (params: any, subFunction: any) => {
        updateField({
            functionType: selectedFunction,
            functionParams: params,
            subFunction: subFunction
        });
    };

    // Get the display value (either template or raw value)
    const displayValue = generateTemplate(node);

    return (
        <>
            <div className="mb-2" style={{ marginLeft: level > 0 ? '24px' : '0', borderLeft: level > 0 ? '1px solid #dee2e6' : 'none' }}>
                <InputGroup size="sm" className="bg-white border rounded shadow-sm">
                    {isContainer && (
                        <Button variant="light" className="border-end" onClick={() => updateField({ isOpen: !node.isOpen })}>
                            {node.isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                        </Button>
                    )}
                    <Form.Control
                        placeholder="Key"
                        value={node.key}
                        onChange={(e) => updateField({ key: e.target.value })}
                        className="text-muted border shadow-none text-sm"
                        style={{ width: '40px' }}
                    />

                    <Form.Select
                        value={node.type}
                        onChange={(e: any) => {
                            const newType = e.target.value;
                            updateField({
                                type: newType,
                                value: newType === "null" ? null : "",
                                children: (newType === 'object' || newType === 'array') ? [] : undefined,
                                functionType: 'none'
                            });
                        }}
                        className="border text-sm shadow-none text-muted"
                        style={{ maxWidth: '110px' }} >
                        <option value="string">String</option>
                        <option value="number">Number</option>
                        <option value="boolean">Boolean</option>
                        <option value="object">Object</option>
                        <option value="array">Array</option>
                        <option value="null">Null</option>
                    </Form.Select>

                    {!isContainer && (
                        <Form.Select
                            value={node.functionType || "none"}
                            onChange={(e: any) => handleFunctionChange(e.target.value)}
                            className="border shadow-none text-sm text-muted"
                            style={{ maxWidth: '130px' }} >
                            <option value="none">No Function</option>
                            <option value="substr">Substr</option>
                            <option value="upper">Upper</option>
                            <option value="lower">Lower</option>
                            <option value="trim">Trim</option>
                            <option value="lpad">Lpad</option>
                            <option value="rpad">Rpad</option>
                            <option value="replace">Replace</option>
                            <option value="dateFormat">DateFormat</option>
                        </Form.Select>
                    )}

                    {!isContainer ? (
                        <Form.Control
                            placeholder={node.type === "null" ? "null" : "Value"}
                            value={node.type === "null" ? "" : displayValue}
                            disabled={node.type === "null" || !!(node.functionType && node.functionType !== "none")}
                            onChange={(e) => updateField({ value: e.target.value })}
                            className="border-start shadow-none text-sm"
                            title={displayValue}
                            style={{ width: '140px' }}
                        />
                    ) : (
                        <div className="flex-grow-1 d-flex align-items-center px-2 text-muted text-xs border-start">
                            {node.type === 'object' ? `{ Object (${node.children?.length || 0}) }` : `[ Array (${node.children?.length || 0}) ]`}
                        </div>
                    )}
                    {isContainer && (
                        <Button
                            variant="light"
                            className="text-success border-start"
                            onClick={() => updateField({
                                isOpen: true,
                                children: [...(node.children || []), {
                                    id: Math.random().toString(36).substr(2, 9),
                                    key: node.type === 'array' ? `${node.children?.length}` : "",
                                    value: "",
                                    type: "string",
                                    functionType: "none",
                                    subFunction: "none"
                                }]
                            })}>
                            <Plus size={14} />
                        </Button>
                    )}
                    <Button variant="light" className="text-danger border-start" onClick={onDelete}><Trash2 size={14} /></Button>
                </InputGroup>

                {isContainer && node.isOpen && (
                    <div className="mt-2">
                        {node.children?.map((child, i) => (
                            <JSONNode
                                key={child.id}
                                node={child}
                                level={level + 1}
                                generateTemplate={generateTemplate}
                                onUpdate={(updated) => {
                                    const newChildren = [...(node.children || [])];
                                    newChildren[i] = updated;
                                    updateField({ children: newChildren });
                                }}
                                onDelete={() => {
                                    updateField({ children: node.children?.filter((_, idx) => idx !== i) });
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>

            <FunctionParamModal
                show={showFunctionModal}
                onHide={() => setShowFunctionModal(false)}
                functionType={selectedFunction}
                currentSubFunction={node.subFunction}
                onSave={handleFunctionParamSave}
            />
        </>
    );
};

export default RequestPayloadEditor;