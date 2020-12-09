import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { PrimeNGConfig } from 'primeng/api';

import {CarouselModule} from 'primeng/carousel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  imgArray = [
   {image: 'medico-slideshow-1.jpg'},
   {image: 'medicos-slideshow-2.jpg'} 
   
      ];
  photo;
  responsiveOptions:any;
  
  constructor(private spinner: NgxSpinnerService,
    private primengConfig: PrimeNGConfig) {
 
      this.responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '768px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '560px',
            numVisible: 1,
            numScroll: 1
        }
    ];

     }

  ngOnInit(): void {
   
    this.spinner.show();
    this.primengConfig.ripple = true;
     this.photo = 'https://www.ibes.med.br/wp-content/uploads/2018/05/praticas-padrao-ouro.png';
    setTimeout(() => {
      this.spinner.hide();
    }, 500);


  }

   
}
