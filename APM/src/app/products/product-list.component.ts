import { ProductService } from './product.service';
import { Component, OnInit } from  '@angular/core';
import { IProduct } from './product';

@Component({
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{

	pageTitle: string = 'Product List';
	imageWidth: number = 50;	
	imageMargin: number =  2;
	showImage: boolean = false;
	errorMessage: string;
	// listFilter: string = 'cart';


	private _listFilter: string;

	filteredProducts: IProduct[];
	products: IProduct[] = [];

	get listFilter(): string{
		return this._listFilter;
	}
	set listFilter(value: string) {
		this._listFilter = value;
		this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
	}

	constructor(private productService: ProductService) {}

	toggleImage(): void {
		this.showImage = !this.showImage;
	}

	ngOnInit(): void {
		// console.log('In OnInit');
		this.productService.getProducts().subscribe({
			next: products =>  {
				this.products = products;
				this.filteredProducts = this.products;
			},
			error: err => this.errorMessage
		});


	}

	onRatingClicked(message: string): void {
		this.pageTitle = `Product Title: ${message}`;
	}

	performFilter(filterBy: string): IProduct[] {
		filterBy = filterBy.toLocaleLowerCase();
		return this.products.filter((product: IProduct) => 
			product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1
		)

	}

}