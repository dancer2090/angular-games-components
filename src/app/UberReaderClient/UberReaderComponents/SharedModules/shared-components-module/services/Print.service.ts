import { Injectable } from '@angular/core';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
var domtoimage = require('dom-to-image');

@Injectable()
export class PrintService {

    constructor() {}

    public printDocument(title:string, styleSheetUrls:string[], style:string, contents:string, saveAsPdf:boolean=false, useCanvas:boolean=false, orientation:string='l') {
        let styleSheetLinks;
        if (styleSheetUrls && styleSheetUrls.length > 0) {
            styleSheetLinks = styleSheetUrls.map(url => `<link rel="stylesheet" href="${url}">`).join('');
        }

        let htmlToPrint =
            `<html>
            <head>
                <title>${title}</title>
                ${styleSheetLinks === undefined ? `` : styleSheetLinks}
                <style>
                ${style}
                </style>
            </head>
            <body>
                ${contents}
            </body>
            </html>`;

        let popupWin = window.open('', '_blank', 'top=0,left=0,height=auto,width=auto');
        let popupDocument = popupWin.document;
        popupDocument.open();
        popupDocument.write(htmlToPrint);
        popupDocument.close();

        if (useCanvas)
        {
            //let options = saveAsPdf ? {useCORS: true, imageTimeout: 0} : {allowTaint: true, imageTimeout: 0};
            setTimeout(() => {
                let options = { width: popupDocument.body.scrollWidth, height: popupDocument.body.scrollHeight };
                (html2canvas as any)(popupDocument.body, options).then(canvas => {
                    if (saveAsPdf) {
                        popupWin.close();
                        let pdf = new jsPDF(orientation, 'pt', [canvas.width, canvas.height]);
                        let imgData  = canvas.toDataURL("image/jpeg", 1.0);
                        pdf.addImage(imgData, 0, 0, canvas.width, canvas.height);
                        pdf.save(title + '.pdf');
                    }
                    else {
                        popupDocument.body.replaceWith(canvas);
                        popupWin.print();
                        setTimeout(() => { popupWin.close(); }, 100);
                    }
                });
            }, 100);
        }
        else
        {
            setTimeout(() => {
                popupWin.print();
                setTimeout(() => { popupWin.close(); }, 100);
            }, 100);
        }
    }
}
