import { Component } from '@angular/core';
import { Payload } from '../add-dialog/add-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent {

  data:Payload = {
    name: '',
    company: '',
    price: '',
  }

  image:any;
  formData = new FormData();


  nameFormControl = new FormControl('',[Validators.required]);
  companyFormControl = new FormControl('',[Validators.required]);
  priceFormControl = new FormControl('',[Validators.required]);

  edit:boolean = false;

  constructor(private dialog:MatDialogRef<EditDialogComponent>) {}

  onUpload(event:any) {
    this.image = event.target.files[0];  
  }

  editProduct() {
    this.formData.append("name",this.data.name)
    this.formData.append("company",this.data.company)
    this.formData.append("price",this.data.price)
    if(this.image) {
      this.formData.append("image",this.image)
    }
    this.edit = true;
    this.dialog.close();
  }

}


