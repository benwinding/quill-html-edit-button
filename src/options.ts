export interface QuillHtmlEditButtonOptions {
  // Flags
  debug?: boolean;              // default:  false 
  syntax?: boolean;             // default:  false  
  // Overlay
  closeOnClickOverlay: boolean; // default:  true                       
  prependSelector: string;      // default:  null                       
  // Labels
  buttonHTML?: string;          // default:  "&lt;&gt;"
  buttonTitle?: string;         // default:  "Show HTML source"
  msg: string;                  // default:  'Edit HTML here, when you click "OK" the quill editor\'s contents will be replaced'     
  okText: string;               // default:  "Ok"
  cancelText: string;           // default:  "Cancel"            
  // Quill Modules (for the HTML editor)
  editorModules?: {
    // Any modules here will be declared in HTML quill editor instance
  };
}
