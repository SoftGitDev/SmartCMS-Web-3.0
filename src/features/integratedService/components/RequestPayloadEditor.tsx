import { ArrowBigDown, ArrowBigUp, LucideChevronDown, LucideChevronRight, LucideFileJson2, LucideList, LucidePlus, LucidePlusCircle, LucideTrash2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Nav, Button, Form, InputGroup } from "react-bootstrap";

// --- Types ---
interface FieldNode {
    id: string;
    key: string;
    value: any;
    type: "string" | "number" | "boolean" | "object" | "array" | "null";
    children?: FieldNode[];
    isOpen?: boolean;
}

const RequestPayloadEditor = ({ value, onChange, type, contentType, getTabIndex }: { value: string; contentType: string; getTabIndex: any; onChange: (val: string) => void; type?: string }) => {
    const [activeTab, setActiveTab] = useState("json");
    const [jsonText, setJsonText] = useState(value || "{}");
    const [treeData, setTreeData] = useState<FieldNode[]>([]);

    const isInternalChange = useRef(false);

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
                children: (fieldType === "object" || fieldType === "array") ? parseToTree(val) : []
            };
        });
    };

    // --- Logic: Convert Tree back to JSON Object ---
    const parseToObject = (nodes: FieldNode[]): any => {
        const obj: any = {};
        nodes.forEach(node => {
            // In Builder mode, we skip empty keys unless it's an array element
            if (!node.key && node.type !== 'array') return;

            if (node.type === "object") {
                obj[node.key] = parseToObject(node.children || []);
            } else if (node.type === "array") {
                obj[node.key] = (node.children || []).map(child => {
                    // Extracting value from nested array nodes
                    const temp = parseToObject([child]);
                    return temp[child.key];
                });
            } else if (node.type === "number") {
                obj[node.key] = Number(node.value);
            } else if (node.type === "boolean") {
                obj[node.key] = String(node.value).toLowerCase() === "true";
            } else if (node.type === "null") {
                obj[node.key] = null;
            } else {
                obj[node.key] = node.value;
            }
        });
        return obj;
    };

    // Sync external changes (like pasting into textarea) to the Tree
    useEffect(() => {
        if (isInternalChange.current) {
            isInternalChange.current = false;
            return;
        }
        try {
            const parsed = JSON.parse(value || "{}");
            setTreeData(parseToTree(parsed));
            setJsonText(value);
        } catch (e) {
            // toastNotify("Please Enter Valid JSON", "error")
        }
    }, [value]);

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
                    <label className="m-0 fw-semibold text-sm text-dark">{type}</label>
                </div>
                {contentType === "J" &&
                    <Nav variant="pills" className="nav-pills-custom border rounded-2" activeKey={activeTab} onSelect={(k) => setActiveTab(k || "json")}>
                        <Nav.Item><Nav.Link eventKey="json" className="py-1 px-2 text-sm"><LucideFileJson2 /> JSON</Nav.Link></Nav.Item>
                        <Nav.Item><Nav.Link eventKey="kv" className="py-1 px-2 text-sm"><LucideList /> Builder</Nav.Link></Nav.Item>
                    </Nav>
                }
            </div>

            <div className="p-0">
                {activeTab === "json" ? (
                    <textarea
                        className="form-control rounded-2 text-sm"
                        rows={12}
                        value={jsonText}
                        placeholder={contentType === "J" ? "Enter Request Payload..." : contentType === "X" ? "Sample XML ... <request>\n    <userId></userId>\n    <ticketId></ticketId>\n</request>" : "Enter Payload"}
                        tabIndex={getTabIndex()}
                        onChange={(e) => {
                            setJsonText(e.target.value);
                            onChange(e.target.value);
                            try {
                                const parsed = JSON.parse(e.target.value);
                                setTreeData(parseToTree(parsed));
                            } catch (err) { }
                        }}
                        spellCheck={false}
                        style={{ backgroundColor: '#1e1e1e', color: '#d4d4d4', borderRadius: '0', }}
                    />
                ) : (
                    <div className="p-3 bg-light rounded-3 overflow-auto" style={{ height: '255px' }}>
                        <div className="tree-container">
                            {treeData.map((node, i) => (
                                <JSONNode
                                    key={node.id}
                                    node={node}
                                    level={0}
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
                                variant="light"
                                size="sm"
                                className="mt-2 border-dashed w-100"
                                onClick={() => handleTreeChange([...treeData, { id: Math.random().toString(36).substr(2, 9), key: "", value: "", type: "string", isOpen: true, children: [] }])}>
                                <LucidePlus /> Add Field
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- Recursive Node Component ---
const JSONNode = ({ node, level, onUpdate, onDelete }: { node: FieldNode; level: number; onUpdate: (node: FieldNode) => void; onDelete: () => void }) => {
    const isContainer = node.type === "object" || node.type === "array";

    const updateField = (changes: Partial<FieldNode>) => onUpdate({ ...node, ...changes });

    return (
        <div className="mb-2" style={{ marginLeft: level > 0 ? '24px' : '0', borderLeft: level > 0 ? '1px solid #dee2e6' : 'none' }}>
            <InputGroup size="sm" className="bg-white rounded shadow-sm">
                {isContainer && (
                    <Button variant="light" className="border-end" onClick={() => updateField({ isOpen: !node.isOpen })}>
                        {node.isOpen ? <LucideChevronDown size={14} /> : <LucideChevronRight size={14} />}
                    </Button>
                )}
                <Form.Control
                    placeholder="Key"
                    value={node.key}
                    onChange={(e) => updateField({ key: e.target.value })}
                    className="fw-bold border-0"
                    style={{ width: '150px' }}
                />
                <Form.Select
                    value={node.type}
                    onChange={(e: any) => {
                        const newType = e.target.value;
                        updateField({
                            type: newType,
                            value: newType === "null" ? null : "",
                            children: (newType === 'object' || newType === 'array') ? [] : undefined
                        });
                    }}
                    className="border-0 bg-light text-muted"
                    style={{ maxWidth: '100px' }} >

                    <option value="string">String</option>
                    <option value="number">Number</option>
                    <option value="boolean">Boolean</option>
                    <option value="object">Object</option>
                    <option value="array">Array</option>
                    <option value="null">Null</option>
                </Form.Select>
                {!isContainer ? (
                    <Form.Control
                        placeholder={node.type === "null" ? "null" : "Value"}
                        value={node.type === "null" ? "" : node.value}
                        disabled={node.type === "null"}
                        onChange={(e) => updateField({ value: e.target.value })}
                        className="border-0 border-start"
                    />
                ) : (
                    <div className="flex-grow-1 bg-light d-flex align-items-center px-2 text-muted text-xs border-start">
                        {node.type === 'object' ? `{ Object (${node.children?.length || 0}) }` : `[ Array (${node.children?.length || 0}) ]`}
                    </div>
                )}
                {isContainer && (
                    <Button variant="light" className="text-success border-start" onClick={() => updateField({ isOpen: true, children: [...(node.children || []), { id: Math.random().toString(36).substr(2, 9), key: node.type === 'array' ? `${node.children?.length}` : "", value: "", type: "string" }] })}>
                        <LucidePlusCircle size={14} />
                    </Button>
                )}
                <Button variant="light" className="text-danger border-start" onClick={onDelete}><LucideTrash2 size={14} /></Button>
            </InputGroup>

            {isContainer && node.isOpen && (
                <div className="mt-2">
                    {node.children?.map((child, i) => (
                        <JSONNode
                            key={child.id}
                            node={child}
                            level={level + 1}
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
    );
};

export default RequestPayloadEditor;