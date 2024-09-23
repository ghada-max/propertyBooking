import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable, map } from 'rxjs';
import { site } from '../../interfaces/site';
import { MasterService } from '../../services/master.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { property } from '../../interfaces/property';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent  implements OnInit{
  siteId:number=0;
  sites: site[] = []; // Declare as a simple array
  property: property[] = []; // Declare as a simple array

constructor(private masterService: MasterService){}

ngOnInit(): void {
this.getsites();
}
getsites()
{
this.masterService.getAllSite().subscribe((res:any)=>{
         this.sites=res.data;
    },(error)=>{
      console.log(error);
    })
  
}

getAllPropertyBySite(event:Event){
   this.masterService.getAllPropertyBySiteId(this.siteId).subscribe((res:any)=>{
   this.property=res.data;
  })

}






@ViewChild('propertyModel') modal : ElementRef | undefined;

openModal(){
 
  if(this.modal){
    this.modal.nativeElement.style.display='block'
  }
}
 closeModal(){
  if (this.modal){
    this.modal.nativeElement.style.display='none'
  }
 }

addPropertyBooking(){}











}
