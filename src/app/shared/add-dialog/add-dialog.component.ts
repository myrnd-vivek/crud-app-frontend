import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { ProductService } from 'src/app/product/services/product.service';

export interface Payload {
  name: string,
  company: string,
  price: string,
  image?: string
}

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent {

  isAdd:boolean = false;
  image:any;
  formData = new FormData();

  constructor(
    private dialogRef:MatDialogRef<AddDialogComponent>,
  ) {}

  addNewProduct() {
    this.isAdd = true;
    this.dialogRef.close();
  }

  onUpload(event:any) {
    this.image = event.target.files[0];  
  }

  onSubmit(product:NgForm) {
    this.formData.append("name",product.value.name)
    this.formData.append("company",product.value.company)
    this.formData.append("price",product.value.price)
    this.formData.append("image",this.image)
  }
}
