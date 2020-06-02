import { Injectable } from '@angular/core';
import { Angular5Csv } from 'angular5-csv/dist/Angular5-csv';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
// import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { UberApplication } from 'app/UberReaderData/UberApplication';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

// declare var pdfMake;
// declare var pdfFonts;

@Injectable()
export class ExportService {

    constructor(
        private file: File,
        private fileOpener: FileOpener) {

    }

    base64ToArrayBuffer(data) {
        var input = data.substring(data.indexOf(',') + 1);
        var binaryString = window.atob(input);
        var binaryLen = binaryString.length;
        var bytes = new Uint8Array(binaryLen);
        for (var i = 0; i < binaryLen; i++) {
            var ascii = binaryString.charCodeAt(i);
            bytes[i] = ascii;
        }
        return bytes;
    };

    b64toBlob = (b64Data, contentType, sliceSize?) => {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;
    
        var byteCharacters = atob(b64Data);
        var byteArrays = [];
    
        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
          var slice = byteCharacters.slice(offset, offset + sliceSize);
    
          var byteNumbers = new Array(slice.length);
          for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
          }
    
          var byteArray = new Uint8Array(byteNumbers);
    
          byteArrays.push(byteArray);
        }
    
        var blob = new Blob(byteArrays, { type: contentType });
        return blob;
    }

    content: { name: string, id: string, data: string }[] = [
        { name: 'nikhill1', id: '1', data: 'temp1' },
        { name: 'nikhill2', id: '2', data: 'temp2' }
      ];

    public exportPDF(el: HTMLElement, fileName: string) {
        const div = el;//document.getElementById("Html2Pdf");
        const options = {background:"white",height :div.clientHeight , width : div.clientWidth  };
        //html2canvas(div,options).then((canvas)=>{
            /* var doc = new jsPDF("p","mm","a4");
            let imgData = canvas.toDataURL("image/PNG");
            doc.addImage(imgData, 'PNG', 20,20 );
            
            let pdfOutput = doc.output();
            let buffer = new ArrayBuffer(pdfOutput.length);
            let array = new Uint8Array(buffer);
            for (var i = 0; i < pdfOutput.length; i++) {
                array[i] = pdfOutput.charCodeAt(i);
            }

            const doc = new jsPDF();

            console.log(doc, 'test');
            doc.text('Hello world!', 10, 10)

            const nameX = 10;
            const idX = 40;
            const dataX = 70;
            const advanceY = 10;
            const startY = 30;

            doc.text('Name', nameX, 20);
            doc.text('Id', idX, 20);
            doc.text('Data', dataX, 20);

            this.content.forEach((item, index) => {
                const y = startY + (advanceY * index);
                doc.text(item.name, nameX, y);
                doc.text(item.id, idX, y);
                doc.text(item.data, dataX, y);
            });
            const base64 = (doc.output('datauri') as string).split(',')[1];
            console.log('asfsafa: ', (doc.output('datauri') as string));
            //const blob = this.b64toBlob(base64, 'application/pdf');                  
            let buffer = this.base64ToArrayBuffer((doc.output('datauri') as string));
            let blob = new Blob([buffer], { type: 'application/pdf' });
            console.log('asdf blob: ', blob);
            //Device.getInfo().then(info => {
                //This is where the PDF file will stored , you can change it as you like
                // for more information please visit https://ionicframework.com/docs/native/file/
                //const directory = this.file.externalApplicationStorageDirectory ;
                let directory = this.file.dataDirectory;
                /* if (info.platform == 'ios') {
                    directory = this.file.documentsDirectory;
                }
                else if (info.platform == 'android') {
                    directory = this.file.externalRootDirectory + '/Download/';
                }

                directory = this.file.externalRootDirectory + '/Download/';
                //Writing File to Device
                this.file.writeFile(directory, 'test.pdf', blob, { replace: true })
                    .then(success => {
                        console.log("File created Succesfully" + JSON.stringify(success))
                        let url = success.nativeURL;
                        console.log('asdf url: ', url);
                        this.fileOpener.open(url, 'application/pdf')
                            .then(() => console.log('File is opened'))
                            .catch(e => console.log('Error opening file', e));
                    })
                    .catch((error)=> console.log("Cannot Create File " +JSON.stringify(error)));
            //});                    
        //});*/
    }

    public exportPDF2(docDefinition: any, fileName: string) {
        console.log('exportPDF called..');
        //Device.getInfo().then(info => {
            //console.log('device info: ', info);            
            let pdfObj = pdfMake.createPdf(docDefinition);

            let path = this.file.externalRootDirectory + '/Download/';
            pdfObj.getBuffer(buffer => {
                console.log('buffer: ', buffer, buffer.buffer);
                let utf8 = new Uint8Array(buffer);
                let binaryArray = utf8.buffer;
                let blob = new Blob([buffer], { type: 'application/pdf' });               
                console.log('blob: ', blob);
                console.log('path: ', path);
                this.file.writeFile(path, 'test.pdf', blob, { replace: true })
                    .then(fileEntry => {
                        let url = fileEntry.nativeURL;
                        console.log('asdf url: ', url);
                        this.fileOpener.open(url, 'application/pdf')
                            .then(() => console.log('File is opened'))
                            .catch(e => console.log('Error opening file', e));
                    }, error => console.log('errorrrrrrr: ', error))
                    .catch((error)=> console.log("Cannot Create File " +JSON.stringify(error)));
            });
            /* if (info.platform == 'web') {
                pdfObj.download(fileName);
            }
            else {
                let path = this.file.dataDirectory;
                if (info.platform == 'ios') {
                    path = this.file.documentsDirectory;
                }
                else if (info.platform == 'android') {
                    path = this.file.externalRootDirectory + '/Download/';
                }
                
                pdfObj.getBuffer(buffer => {
                    console.log('buffer: ', buffer, buffer.buffer);
                    //let utf8 = new Uint8Array(buffer);
                    //let binaryArray = utf8.buffer;
                    let blob = new Blob([buffer], { type: 'application/pdf' });               
                
                    this.file.writeFile(path, fileName + '.pdf', blob, { replace: true })
                        .then(fileEntry => {
                            let url = fileEntry.nativeURL;
                            console.log('asdf url: ', url);
                            this.fileOpener.open(url, 'application/pdf')
                                .then(() => console.log('File is opened'))
                                .catch(e => console.log('Error opening file', e));
                        }, error => console.log('errorrrrrrr: ', error))
                        .catch((error)=> console.log("Cannot Create File " +JSON.stringify(error)));
                });
            } */
        //});
    }
    
    public exportCSV(data: any, fileName: string, options?: any) {
        let platform = UberApplication.GetInstance().GetDeviceInfo().platform;
        //Device.getInfo().then(info => {
            //console.log('device info: ', info);
            if (platform == 'web') {
                new Angular5Csv(data, fileName, options);
            }
            else {
                let path = this.file.dataDirectory;
                if (platform == 'ios') {
                    path = this.file.documentsDirectory;
                }
                else if (platform == 'android') {
                    path = this.file.externalRootDirectory + '/Download/';
                }

                this.file.writeFile(path, fileName + '.csv', this.convertToCSV(data), { replace: true })
                    .then((res) => {
                        console.log('asdf adsf: ', res);
                        let path = res.nativeURL;
                        if (res != null) {
                            this.fileOpener.open(path, 'text/csv')
                                .then(() => console.log('File is opened'))
                                .catch(e => console.log('Error opening file', e));
                        }
                    })
            }
        //});
    }

    private convertToCSV(data: any[]): string {        
        const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here                
        const headers = Object.keys(data[0])
                
        var csv = data.map(row => headers.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))    
        csv.unshift(headers.join(','))
            
        return csv.join('\r\n');     
    }

    private getMIMEtype(extn){
        let ext=extn.toLowerCase();
        let MIMETypes={
          'txt' :'text/plain',
          'docx':'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'doc' : 'application/msword',
          'pdf' : 'application/pdf',
          'jpg' : 'image/jpeg',
          'bmp' : 'image/bmp',
          'png' : 'image/png',
          'xls' : 'application/vnd.ms-excel',
          'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'rtf' : 'application/rtf',
          'ppt' : 'application/vnd.ms-powerpoint',
          'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
        }
        return MIMETypes[ext];
      }
}