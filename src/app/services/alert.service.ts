import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Alerts} from "../common/alertses";
import {map} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private baseUrl = 'http://localhost:8081/api/alertses'
  private xlsUrl = 'http://localhost:8081/api/v1/xlsreport'
  private reportUrl = 'http://localhost:8081/api/v1/report/2'
  constructor(private httpClient: HttpClient)
    {
    }

  getAlertList(): Observable<any>
    {
      return this.httpClient.get<GetResponse>(this.baseUrl).pipe(map(response => response._embedded.alertses));
    }

  getAlertXls(dateStart,dateEnd): Observable<any>
  {
    console.log("alertService retrieving the xls from "+ this.xlsUrl+"/"+dateStart+"/"+dateEnd);
    return this.httpClient.get<any>(this.xlsUrl+"/"+dateStart+"/"+dateEnd, {responseType:'blob' as 'json'});
  }

  getAlertXls1(tenant,dateStart,dateEnd): Observable<any>
    {
      console.log("alertService retrieving the xls from "+ this.xlsUrl+"/"+tenant+"/"+dateStart+"/"+dateEnd);
      return this.httpClient.get<any>(this.xlsUrl+"/"+tenant+"/"+dateStart+"/"+dateEnd, {responseType:'blob' as 'json'});
    }

   getAlertXls2(tenant1, tenant2,dateStart,dateEnd): Observable<any>
    {
       console.log("alertService retrieving the xls from "+ this.xlsUrl+"/"+tenant1+"/"+tenant2+"/"+dateStart+"/"+dateEnd);
       return this.httpClient.get<any>(this.xlsUrl+ "/"+tenant1+"/"+tenant2+"/"+dateStart+"/"+dateEnd, {responseType:'blob' as 'json'});
    }

  getAlertReport(): Observable<Alerts[]>
    {
      console.log("alertService retrieving the report");
      return this.httpClient.get<any>(this.reportUrl);
    }

}

interface GetResponse
  {

    _embedded: {
      alertses: Alerts[];

    }
  }
