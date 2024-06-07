import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as htmlToImage from 'html-to-image';
import jsPDF from 'jspdf';
import { NgxUiLoaderService } from 'ngx-ui-loader';
@Injectable({
  providedIn: 'root'
})
export class GeneratePdfService {
  constructor(
    private $loader: NgxUiLoaderService,
    private router: Router

  ) { }
  generatePDF(name: string) {
    try {
      this.$loader.start();
      setTimeout(async () => {
        const div: any = document.querySelectorAll('#print');

        const options = {
          background: 'white',
          scale: 2,
        };
        var doc: any = new jsPDF('l', 'mm', [60, 200]);
        for (let index = 0; index < div.length; index++) {
          const d = div[index];
          const img = await htmlToImage.toCanvas(d, {
            quality: 1,
            pixelRatio:10
          })
          const bufferX = 1;
          const bufferY = 1;
          const imgProps = (<any>doc).getImageProperties(img);
          const pdfWidth = doc.internal.pageSize.getWidth() - 1 * bufferX;
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

          if (div.length === 1) {
            doc = await doc.addImage(
              img,
              'PNG',
              bufferX,
              bufferY,
              pdfWidth,
              pdfHeight,
              undefined,
              'FAST'
            );
            await doc.save(`${name}.pdf`);
            this.$loader.stop()
          } else {
            if (index === 0) {
              doc = await doc.addImage(
                img,
                'PNG',
                bufferX,
                bufferY,
                pdfWidth,
                pdfHeight,
                undefined,
                'FAST'
              );
            } else {
              doc = await doc.addPage([200, 75], 'l');
              doc = await doc.addImage(
                img,
                'PNG',
                bufferX,
                bufferY,
                pdfWidth,
                pdfHeight,
                undefined,
                'FAST'
              );
              if (index + 1 === div.length) {
                await doc.save(`${name}.pdf`);
                this.$loader.stop()
              }
            }
          }



        }
      }, 100);
    } catch (error) {
      console.log("🚀 ~ error:", error)

    }

  }

}
