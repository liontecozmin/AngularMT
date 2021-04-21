import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Alerts} from '../common/alertses';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AlertService
{

  private baseUrl = 'http://localhost:8081/api/alertses';
  private xlsUrl = 'http://localhost:8081/api/v1/xlsreport';
  private csvUrl = 'http://localhost:8081/api/v1/csvreport';
  private reportUrl = 'http://localhost:8081/api/v1/report/2';
  private brokenRuleUrl = 'http://localhost:8081/api/v1/brokenRule';

  constructor(private httpClient: HttpClient)
  {
  }

  getAlertList(): Observable<any>
  {
    return this.httpClient.get<GetResponse>(this.baseUrl).pipe(map(response => response._embedded.alertses));
  }

  getAlertXls(dateStart, dateEnd): Observable<any>
  {
    console.log('alertService retrieving the alert xls from ' + this.xlsUrl + '/' + dateStart + '/' + dateEnd);
    return this.httpClient.get<any>(this.xlsUrl + '/' + dateStart + '/' + dateEnd, {responseType: 'blob' as 'json'});
  }

  getAlertXls1(tenant, dateStart, dateEnd): Observable<any>
  {
    console.log('alertService retrieving the alert xls from ' + this.xlsUrl + '/' + tenant + '/' + dateStart + '/' + dateEnd);
    return this.httpClient.get<any>(this.xlsUrl + '/' + tenant + '/' + dateStart + '/' + dateEnd, {responseType: 'blob' as 'json'});
  }

  getAlertXls2(tenant1, tenant2, dateStart, dateEnd): Observable<any>
  {
    console.log
    ('alertService retrieving the alert xls from ' + this.xlsUrl + '/' + tenant1 + '/' + tenant2 + '/' + dateStart + '/' + dateEnd);
    return this.httpClient.get<any>(this.xlsUrl + '/' + tenant1 + '/' + tenant2 + '/' + dateStart + '/' + dateEnd, {responseType: 'blob' as 'json'});
  }

  getAlertCsv(dateStart, dateEnd): Observable<any>
  {
    console.log('alertService retrieving the alert csv report from ' + this.csvUrl + '/' + dateStart + '/' + dateEnd);
    return this.httpClient.get<any>(this.csvUrl + '/' + dateStart + '/' + dateEnd);
  }

  getAlertCsv1(tenant, dateStart, dateEnd): Observable<any>
  {
    console.log('alertService retrieving the alert csv report from ' + this.csvUrl + '/' + tenant + '/' + dateStart + '/' + dateEnd);
    return this.httpClient.get<any>(this.csvUrl + '/' + tenant + '/' + dateStart + '/' + dateEnd);
  }

  getAlertCsv2(tenant1, tenant2, dateStart, dateEnd): Observable<any>
  {
    console.log
    ('alertService retrieving the alert csv report from ' + this.csvUrl + '/' + tenant1 + '/' + tenant2 + '/' + dateStart + '/' + dateEnd);
    return this.httpClient.get<GetResponse>(this.csvUrl, {
      params: {
        tenant1,
        tenant2,
        dateStart,
        dateEnd
      },
    }).pipe(map(response => response._embedded.alertses));

  }

  getBrokenRule(dateStart, dateEnd): Observable<any>
  {
    console.log('alertService retrieving the brokenRule xls from ' + this.brokenRuleUrl + '/' + dateStart + '/' + dateEnd);
    return this.httpClient.get<any>(this.brokenRuleUrl + '/' + dateStart + '/' + dateEnd, {responseType: 'blob' as 'json'});
  }

  getBrokenRule1(tenant, dateStart, dateEnd): Observable<any>
  {
    console.log('alertService retrieving the brokenRule xls from ' + this.brokenRuleUrl + '/' + tenant + '/' + dateStart + '/' + dateEnd);
    return this.httpClient.get<any>(this.brokenRuleUrl + '/' + tenant + '/' + dateStart + '/' + dateEnd, {responseType: 'blob' as 'json'});
  }

  getBrokenRule2(tenant1, tenant2, dateStart, dateEnd): Observable<any>
  {
    console.log('alertService retrieving the brokenRule xls from ' + this.brokenRuleUrl + '/' + tenant1 + '/' + tenant2 + '/' + dateStart + '/' + dateEnd);
    return this.httpClient.get<any>(this.brokenRuleUrl + '/' + tenant1 + '/' + tenant2 + '/' + dateStart + '/' + dateEnd, {responseType: 'blob' as 'json'});
  }
}

interface GetResponse
{

  _embedded: {
    alertses: Alerts[];

  };
}
