import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  APIurl="https://projectapi.gerasim.in/api";
  constructor(private http:HttpClient) { }

  getAllPropertyType(){
    return this.http.get(this.APIurl+"/PropertyBookingController/GetAllPropertyType");
  }

  savePropertyType(data:any){
   const dataArray=[data];
    return this.http.post(this.APIurl+"/PropertyBookingController/AddPropertyType",dataArray);
  }

  onEditPropertyType(data:any){
    return this.http.put(this.APIurl+"PropertyBookingController​/UpdatePropertyType",data)
  }

  onDeletePropertyType(id:any){
    return this.http.delete(`${this.APIurl}/PropertyBookingController/DeletePropertyTypeById?id=${id}`)
  }

  AddSite(data:any){
  
     return this.http.post(this.APIurl+"/PropertyBookingController/AddSites",data);
   }
   getAllSite(){
    return this.http.get(this.APIurl+"/PropertyBookingController/GetAllSites");
  }

  onUpdateSite(data:any){
    return this.http.put(this.APIurl+"PropertyBookingController/UpdateSites",data)
  }

  onDeleteSite(id:any){
    return this.http.delete(`${this.APIurl}/PropertyBookingController/DeleteSitesById?id=${id}`)
  }


  getAllpropertiyMasters(){
    return this.http.get(this.APIurl+"/PropertyBookingController/GetAllPropertyMasters");
  }

  addPropertMaster(data:any){
     return this.http.post(this.APIurl+"/PropertyBookingController/AddPropertyMasters",data);
   }


   getAllPropertyBySiteId(siteId: number): Observable<any> {
    return this.http.get<any>(`${this.APIurl}/PropertyBookingController/GetAllPropertyBySiteId?siteid=${siteId}`);
  }
  





















}
