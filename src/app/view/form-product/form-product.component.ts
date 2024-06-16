import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ListaProductosComponent } from '../lista-productos/lista-productos.component';
import { Producto } from 'src/app/model/producto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoService } from 'src/app/service/producto.service';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss']
})
export class FormProductComponent implements OnInit {

  formGroup!:FormGroup

  constructor(public dialogRef: MatDialogRef<ListaProductosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Producto,
    private productService:ProductoService,
    private formBuilder:FormBuilder
  ){

    }

    ngOnInit(): void {
      console.log(this.data);

      this.initForm()
    }

    initForm(){
      if(this.data){

      this.formGroup=this.formBuilder.group({
        name:[this.data.name,Validators.required],
        code:[this.data.code||"",Validators.required],
        category:[this.data.category||"",Validators.required],
        description:[this.data.description||"",Validators.required],
        price:[this.data.price||"",Validators.required],
        amount:[this.data.amount||"",Validators.required]
        });
      }else{
        this.formGroup=this.formBuilder.group({
          name:["",Validators.required],
          code:["",Validators.required],
          category:["",Validators.required],
          description:["",Validators.required],
          price:["",Validators.required],
          amount:["",Validators.required]
          });
      }


      }

      save(): void{
        let request={
          id:this.data!=null?this.data._id:null,
          name: this.formGroup.value.name,
          code: this.formGroup.value.code,
          category: this.formGroup.value.category,
          description: this.formGroup.value.description,
          price: this.formGroup.value.price,
          amount: this.formGroup.value.amount,
        }

        try{
          if(!this.data){
            this.productService.addProduct(request).subscribe(item=>console.log(item))
          }else{
            this.productService.editProduct(request).subscribe(item=>console.log(item)
            )
          }
          this.dialogRef.close(true)
        }catch(error){
          console.log(error);

        }
      }

}
