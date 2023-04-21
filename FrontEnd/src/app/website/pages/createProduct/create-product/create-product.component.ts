import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/user/products/products.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent {
  msgError=null
  productData:any={
    title:'',
    content:'',
    image:{}||'',
    price:null,
  }
  id=''
  img='https://cdn.pixabay.com/photo/2017/10/08/19/55/magnifying-glass-2831367__340.png'
  constructor(private product:ProductsService,private router:Router,private _activatedRoute : ActivatedRoute ) {
    this._activatedRoute.paramMap.subscribe(params => { 
      let id = params.get('singleOrderId')
      
      if(id){
        this.id=id
      product.showSingle(id).subscribe((res)=>{
        this.productData=res.data
        this.img=res.data.image
        console.log(res)
         })
      }
      }
    )
  }
  handleChange(eve :any){
    this.productData.image = eve.target.files[0]
    this.img = URL.createObjectURL(eve.target.files[0]);
    console.log(this.productData.image)
   
    
  }
  handleSubmit(form : NgForm){
    let formData = new FormData()
    formData.append('image' , this.productData.image)
    formData.append('title', this.productData.title)
    formData.append('content' , this.productData.content)
    formData.append('price' , this.productData.price)
    if(!this.id){
    this.product.addProduct(formData).subscribe((res)=>{
        this.router.navigateByUrl('/products')
    },(e)=>{
      console.log(e)
    })
  }
  else{
    this.product.edit(this.id,formData).subscribe((res)=>{
      console.log(res)
    },(e)=>{
      console.log(e)
    })
  }
      } 
    }
