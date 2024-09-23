import { Component, OnInit, inject } from '@angular/core';
import { propertyT } from '../../interfaces/propertyType';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MasterService } from '../../services/master.service';

@Component({
  selector: 'app-property-type',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './property-type.component.html',
  styleUrl: './property-type.component.css'
})
export class PropertyTypeComponent implements OnInit {
  propertyTypeList: propertyT[]=[];
  propertyTypeitem: propertyT[]=[];

  propertyForm: FormGroup=new FormGroup({

  })
  initializerForm(item?:propertyT){
    this.propertyForm=new FormGroup({
      propertTypeId: new FormControl<number>(item ? item.propertTypeId : 0), // Allow null
      propertyType:new FormControl<string>(item ? item.propertyType:"",[Validators.required,Validators.minLength(5)])
    })
  }
   masterS=inject(MasterService);
   
  ngOnInit(): void { 
    this.initializerForm();
    this.getAllPropertyType();
  }


  getAllPropertyType(){
   this.masterS.getAllPropertyType().subscribe((res:any)=>
   {
     this.propertyTypeList=res.data;
   },(error)=>{
    console.log(error);
   }
  ) }

  savePropertyType(){
    const data = {
      propertyType: this.propertyForm.value // Access the form control value
    }
    this.masterS.savePropertyType(this.propertyForm.value).subscribe((res:any)=>{
      console.log("propertyType saved successfully");
    },(error)=>{
      console.log("something went wrong",error);

    })
  }
  onEdit(item:propertyT){
    this.initializerForm(item);
    console.log(item);
  }



  onupdatepropertyType(){
 
    
    this.masterS.onEditPropertyType(this.propertyForm.value).subscribe((res:any)=>{
      console.log("updated successfully");
    },(error)=>{
      console.log(error);
    })
  }


  onDelete(item:propertyT){

    this.masterS.onDeletePropertyType(item.propertTypeId).subscribe((res:any)=>{
      console.log("propertyDeletedSuccessfully");
    },(error)=>{
      console.log(error);
    })
  }
}
