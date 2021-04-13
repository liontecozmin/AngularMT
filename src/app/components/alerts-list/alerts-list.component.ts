import {Component, OnInit} from '@angular/core';
import {AlertService} from "../../services/alert.service";
import {Alerts} from "../../common/alertses";
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-alerts-list',
  templateUrl: './alerts-list-table.html',
  styleUrls: ['./alerts-list.component.css']
})
export class AlertsListComponent implements OnInit
{
  alerts: Alerts[];

  constructor(private alertService: AlertService)
  {
  }

  ngOnInit(): void
  {
    this.listAlerts();
  }

  getAlertsXls(dateStart:string, dateEnd:string, germany, italy, austria):void
  {
      //this.listAlerts();
      //this.alertService.getAlertList();
      console.log("getting the xls")
      console.log(this.getCountriesNumber(germany,italy,austria))

      var regExp = /[a-zA-Z]/g;

      //INVALID DATE
        if(dateStart==null ||dateEnd==null||dateStart.length ==0||dateEnd.length==0||regExp.test(dateStart)||regExp.test(dateEnd))
        {dateStart="01.01.2019"
        dateEnd="01.01.3000"}
        else{
      dateStart=dateStart.replace(/\//g,'.')
      dateEnd=dateEnd.replace(/\//g,'.')}
      console.log(dateStart)
      //CHECK DATE VALUES

  switch (this.getCountriesNumber(germany,italy,austria))
  {
  case "001": {console.log("1 country selected");
  this.alertService.getAlertXls1(3,dateStart,dateEnd).subscribe(response => {
                                       this.downloadFile(response)})
  break;}
  case "010": {console.log("1 country selected");
  this.alertService.getAlertXls1(2,dateStart,dateEnd).subscribe(response => {
                                       this.downloadFile(response)})
  break;}
  case "011": {console.log("2 countries selected");
  this.alertService.getAlertReport2(2,3,dateStart,dateEnd).subscribe(response => console.log(response));
  this.alertService.getAlertXls2(2,3,dateStart,dateEnd).subscribe(response => {
                                       this.downloadFile(response)
                                       });
                                       console.log('sal');

  break;}
  case "100": {console.log("1 country selected");
    this.alertService.getAlertXls1(1,dateStart,dateEnd).subscribe(response => {
                                         this.downloadFile(response)})
    break;}
    case "101": {console.log("2 countries selected");
    this.alertService.getAlertXls2(1,3,dateStart,dateEnd).subscribe(response => {
                                         this.downloadFile(response)})
    break;}
    case "110": {console.log("2 countries selected");
    this.alertService.getAlertXls2(1,2,dateStart,dateEnd).subscribe(response => {
                                         this.downloadFile(response)})
    break;}
  default:{console.log("3 countries selected");
  this.alertService.getAlertXls(dateStart,dateEnd).subscribe(response => {
                                       this.downloadFile(response)})
  break;}
  }


  }


  downloadFile(data: any)
  {
    let today = new Date().toLocaleDateString()
    const blob = new Blob([data], { type: '.xlsx' });
    const file = new File([blob], "alertReport" +today+ '.xlsx', { type: 'application/vnd.ms.excel' });
    saveAs(file);
  }



  listAlerts()
  {
    this.alertService.getAlertList().subscribe(data =>
    {
      this.alerts = data
    })
  }



  getCountriesNumber(germany, italy, austria):string
    {
      let countries:string=germany.checked+italy.checked+austria.checked;
      let countryCode:string ="";
      if(germany.checked)
      {countryCode=countryCode+1;
      }
      else
      {countryCode=countryCode+0;
      }
      if(italy.checked)
      {countryCode=countryCode+1;
      }
      else
      {countryCode=countryCode+0;
      }
      if(austria.checked)
      {countryCode=countryCode+1;
      }
      else
      {countryCode=countryCode+0;
      }
      console.log("country code is "+countryCode)
      return countryCode;
    }
}
