import { CommonModule } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, signal, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MasterService } from '../services/master.service';
import { propertyT } from '../interfaces/propertyType';

import { site } from '../interfaces/site';
import { property } from '../interfaces/property';


@Component({
  selector: 'app-site',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './site.component.html',
  styleUrl: './site.component.css'
})
export class SiteComponent implements OnInit {
  List:propertyT[]=[];
  siteList:site[]=[];
  propertyList:property[]=[];
  currentSiteIs :number=0;
  @ViewChild('propertyModel') modal : ElementRef | undefined;
  constructor(private masterServic: MasterService){
    this.masterServic.getAllPropertyType().subscribe((res:any)=>{
      this.List=res.data;
      })
  }
   initializerForm(){
    this.getSites();
    this.propertyForm=new FormGroup({
      
        propertyId :new FormControl(0),
        propertyNo:new FormControl(''),
        facing:new FormControl(''),
        totalArea:new FormControl(''),
        rate:new FormControl(''),
        siteId:new FormControl(0)
      
    })
   }
  propertyForm :FormGroup=new FormGroup({})
  ngOnInit(): void {
  this.initializerForm();
    }
  addSite(){
    this.masterServic.AddSite(this.formObj).subscribe((res:any)=>{
      alert("site added");
    },(error:any)=>{
      alert("something went wrong");
      console.log(error);
    })
  }
  getSites(){
    this.masterServic.getAllSite().subscribe((res:any)=>{
      this.siteList=res.data;
    })
  }
  isFormView=signal<boolean>(true);
  formObj: site=new site();
  toggleView(){
    this.isFormView.set(!this.isFormView());
  }


  onEdit(item:any){
   this.formObj=item;
   this.toggleView();   
}

onUpdateeSite(){
  this.masterServic.onUpdateSite(this.formObj).subscribe((res:any)=>{
    this.siteList=res.data;
    alert("site update successfully");
  },(error)=>{
    alert("something went wrong")
    console.log(error);

  })
}
OnDelete(item:any){
  this.masterServic.onDeleteSite(item.siteId).subscribe((res:any)=>{
    //this.siteList=res.data;
    alert("site deleted successfully");
  },(error)=>{
    alert("something went wrong")
    console.log(error);

  })
}
  
openModal(item:site){
  this.getProperties();
  console.log(this.propertyList);
  this.currentSiteIs=item.siteId;
  console.log(this.currentSiteIs);
  if(this.modal){
    this.modal.nativeElement.style.display='block'
  }
}
 closeModal(){
  if (this.modal){
    this.modal.nativeElement.style.display='none'
  }
 }

 getProperties()
 {
  this.masterServic.getAllpropertiyMasters().subscribe((res:any)=>{
   this.propertyList=res.data;
  },(error:any)=>{
    console.log(error);
  })}

 addProperty()
 {
  this.propertyForm.value.siteId=this.currentSiteIs;
  this.masterServic.addPropertMaster(this.propertyForm.value).subscribe((res:any)=>{
   alert("property added successfully")
   this.getProperties();
  },(error:any)=>{
    console.log(error);
  })}
} 