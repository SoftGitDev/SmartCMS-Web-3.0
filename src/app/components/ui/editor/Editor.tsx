import React from 'react';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

interface editorProps {
    onChange: any
    label?: string;
    required?: boolean;
    disabled?: boolean;
    value?: string;
    placeholder?: string
    onReady?: any
    data?: any

}

const Editor: React.FC<editorProps> = ({ onChange, label, required, value, disabled, onReady, data, placeholder = "Type your content here..." }) => {

    // const editorConfiguration = {
    //     toolbar: {
    //         items: [
    //             "heading",
    //             "|",
    //             "bold",
    //             "italic",
    //             "|",
    //             "bulletedList",
    //             "numberedList",
    //             "|",
    //             "insertTable",
    //             "|",
    //             "undo",
    //             "redo",
    //         ],
    //     },
    //     htmlSupport: {
    //         allow: [
    //             {
    //                 name: /.*/,
    //                 attributes: true,
    //                 classes: true,
    //                 styles: true
    //             }
    //         ],
    //         disallow: [
    //             { name: 'script' }, // Disallow script tags
    //             { name: 'iframe' }  // Disallow iframe tags
    //         ]
    //     }
    // };

    const editorConfiguration = {
        toolbar: {
            items: [
                'heading',
                '|',
                'bold',
                'italic',
                'link',
                'bulletedList',
                'numberedList',
                '|',
                'outdent',
                'indent',
                '|',
                'blockQuote',
                'insertTable',
                'mediaEmbed',
                'undo',
                'redo'
            ],
            // Allows the toolbar to wrap to the next line on smaller screens
            shouldNotGroupWhenFull: true
        },
        placeholder: placeholder,
        onReady,
    };
    return (
        <div>
            {label &&
                <label className={`text-slate-500 text-xs ${required ? "required" : ""}`}>
                    {label}
                </label>
            }
            <CKEditor
                editor={ClassicEditor as any}
                data={value}
                // config={editorConfiguration}
                config={editorConfiguration}
                onChange={onChange}
                disabled={disabled}
                onReady={onReady}
            />
        </div>
    )
}

export default Editor;