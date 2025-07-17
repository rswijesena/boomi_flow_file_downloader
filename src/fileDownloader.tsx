
import { eLoadingState, FlowComponent } from 'flow-component-model';
import * as React from 'react';
import './fileDownloader.css';

// declare const manywho: IManywho;
declare const manywho: any;

export default class fileDownloader extends FlowComponent {

    fileNameHiddenComponentID : string
    fileTypeHiddenComponentID : string
    fileContentHiddenComponentID : string
    fileName: any
    fileType : any
    fileContent: any
    

    constructor(props: any) {
        super(props);
        //get attribute values
        this.fileNameHiddenComponentID = this.getAttribute('file Name Hidden Component ID', 'DEFAUTL_VALUE');
        this.fileTypeHiddenComponentID = this.getAttribute('file Type Hidden Component ID', 'DEFAUTL_VALUE');
        this.fileContentHiddenComponentID = this.getAttribute('file Content Hidden Component ID', 'DEFAUTL_VALUE');
    }

    async componentDidMount() {
        this.fileName = manywho.model.getComponent(this.fileNameHiddenComponentID, this.flowKey);
        this.fileType = manywho.model.getComponent(this.fileTypeHiddenComponentID, this.flowKey);
        this.fileContent = manywho.model.getComponent(this.fileContentHiddenComponentID, this.flowKey);
    }

    forceCRLF = (str) => str.replace(/\r?\n/g, "\r\n");

    downloadFile = (fileTypeParam) => {
        // Create a sample text file content
        let blob : any;
        
        if(fileTypeParam == "application/pdf" || fileTypeParam=="application/vnd.openxmlformats-officedocument.wordprocessingml.document" || fileTypeParam=="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
            // Decode the base64 string to a Uint8Array
            const pdfData = atob(this.fileContent.contentValue);
            const dataArray = new Uint8Array(pdfData.length);
            for (let i = 0; i < pdfData.length; i++) {
                dataArray[i] = pdfData.charCodeAt(i);       
            }
             // Create a Blob object containing the PDF data
            blob = new Blob([dataArray], { type: this.fileType.contentValue });
        } else {
            // Create a Blob object containing the file content
            blob = new Blob([this.forceCRLF(this.fileContent.contentValue)], { type: this.fileType.contentValue });
        }
       
        // Create a URL for the Blob object
        const url = URL.createObjectURL(blob);
    
        // Create an <a> element
        const link = document.createElement('a');
        link.href = url;
        link.download = this.fileName.contentValue; // Set the file name
        document.body.appendChild(link);
    
        // Programmatically click the <a> element to initiate the download
        link.click();
    
        // Clean up by revoking the URL object to release memory
        URL.revokeObjectURL(url);
        document.body.removeChild(link);
      };

    
    render() {
        let control: any;

        return (<div>
          
           <div className="field padding-bottom--24">
                <button onClick={() => this.downloadFile(this.fileType.contentValue)}>Download</button>
           </div>
     
        </div>);
    }
}

manywho.component.register('filedownloder', fileDownloader);
