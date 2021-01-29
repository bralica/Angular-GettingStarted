import { Component, OnInit } from '@angular/core';
import { IProduct } from './product'; 

import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {


  productTitle: string = 'Poduct Detail';
  product: IProduct;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    let id = +this.route.snapshot.paramMap.get('id');
  }

}
