import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Product } from '../../models/product';
import { ProductsService } from 'src/app/shared/services/products.service';


@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent {
  formValue !: FormGroup;
  productObj: Product = new Product();
  productData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;
  productList : any;
  visibility=false;
  id !: number
  totalItemSale !: number
  displayedColumns: string[] = ['name', 'description', 'price', 'category', 'stock', 'action'];


  constructor(private formbuilder: FormBuilder,
    private productService: ProductsService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
    name : [''],
    title : [''],
    price : [''],
    description : [''],
    category : [''],
    image : [''],
    totalItemSale : 0,
    stock : 0
    })
    this.getAllProducts();
    this.productService.getProducts().subscribe((data: any) => {
      this.productList = data;
    });
  }

  getAllProducts() {
    this.productService.getProducts()
      .subscribe((res: any) => {
        this.productData = res;
      })
  }

  clickAddProduct() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postProductDetails() {
    this.productObj.name = this.formValue.value.name;
    this.productObj.price = this.formValue.value.price;
    this.productObj.description = this.formValue.value.description;
    this.productObj.category = this.formValue.value.category;
    this.productObj.image = this.formValue.value.image;
    this.productObj.stock = this.formValue.value.stock;


    this.productService.postProduct(this.productObj)
      .subscribe((res: any) => {
        alert("Product added successfully!")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllProducts();
      }, () => {
        alert("Something went wrong!")
      });
  }

  deleteProduct(data: any) {
    this.productService.deleteProduct(data.id)
      .subscribe(() => {
        this.getAllProducts();
      })

  }

  onEdit(data: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.productObj.id = data.id
    this.productObj.totalItemSale = data.totalItemSale
    this.formValue.controls['name'].setValue(data.name)
    this.formValue.controls['title'].setValue(data.title)
    this.formValue.controls['price'].setValue(data.price)
    this.formValue.controls['description'].setValue(data.description)
    this.formValue.controls['category'].setValue(data.category)
    this.formValue.controls['image'].setValue(data.image)
    this.formValue.controls['stock'].setValue(data.stock)
  }

  updateProductDetails() {
    this.productObj.name = this.formValue.value.name;
    this.productObj.price = this.formValue.value.price;
    this.productObj.description = this.formValue.value.description;
    this.productObj.category = this.formValue.value.category;
    this.productObj.image = this.formValue.value.image;
    this.productObj.stock = this.formValue.value.stock;



    this.productService.updateProduct(this.productObj, this.productObj.id)
      .subscribe(() => {
        alert("Updated Successfully!")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllProducts();
      })
  }

  topfiveItems(){
    this.visibility = true
  }

  showButton(){
    this.visibility = false
  }

  delete(data : any){
    var returnval = confirm("Are you sure you want to delete this item?")
    if (returnval){
      this.deleteProduct(data)
      this.getAllProducts();
    }else{
      this.getAllProducts();
    }
  }
}
