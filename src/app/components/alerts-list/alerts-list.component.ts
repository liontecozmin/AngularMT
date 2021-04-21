import {Component, OnInit} from '@angular/core';
import {AlertService} from "../../services/alert.service";
import {Alerts} from "../../common/alertses";
import {saveAs} from 'file-saver';

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

  getAlertsXls(dateStart: string, dateEnd: string, germany, italy, austria): void
  {
    //this.listAlerts();
    //this.alertService.getAlertList();
    console.log('getting the alert report');
    console.log(this.getCountriesNumber(germany, italy, austria));

    const dates = this.getDates(dateStart, dateEnd);
    dateStart = dates.dateStart;
    dateEnd = dates.dateEnd;

    this.callAlertsApi(germany, italy, austria, dateStart, dateEnd);
  }

  getBrokenRulesXls(dateStart: string, dateEnd: string, germany, italy, austria): void
  {
    //this.listAlerts();
    //this.alertService.getAlertList();a
    console.log('getting the broken rule report');
    console.log(this.getCountriesNumber(germany, italy, austria));

    const dates = this.getDates(dateStart, dateEnd);
    dateStart = dates.dateStart;
    dateEnd = dates.dateEnd;

    this.callBrokenRulesApi(germany, italy, austria, dateStart, dateEnd);
  }


  private callAlertsApi(germany, italy, austria, dateStart: string, dateEnd: string): void
  {
    switch (this.getCountriesNumber(germany, italy, austria))
    {
      case '001':
      {
        console.log('1 country selected');
        this.alertService.getAlertXls1(3, dateStart, dateEnd).subscribe(response =>
        {
          this.downloadFile(response);
        });
        break;
      }
      case '010':
      {
        console.log('1 country selected');
        this.alertService.getAlertXls1(2, dateStart, dateEnd).subscribe(response =>
        {
          this.downloadFile(response);
        });
        break;
      }
      case '011':
      {
        console.log('2 countries selected');
        this.alertService.getAlertCsv2(2, 3, dateStart, dateEnd).subscribe(response => console.log(response));
        this.alertService.getAlertXls2(2, 3, dateStart, dateEnd).subscribe(response =>
        {
          this.downloadFile(response);
        });
        break;
      }
      case '100':
      {
        console.log('1 country selected');
        this.alertService.getAlertXls1(1, dateStart, dateEnd).subscribe(response =>
        {
          this.downloadFile(response);
        });
        break;
      }
      case '101':
      {
        console.log('2 countries selected');
        this.alertService.getAlertXls2(1, 3, dateStart, dateEnd).subscribe(response =>
        {
          this.downloadFile(response);
        });
        break;
      }
      case '110':
      {
        console.log('2 countries selected');
        this.alertService.getAlertXls2(1, 2, dateStart, dateEnd).subscribe(response =>
        {
          this.downloadFile(response);
        });
        break;
      }
      default:
      {
        console.log('3 countries selected');
        this.alertService.getAlertXls(dateStart, dateEnd).subscribe(response =>
        {
          this.downloadFile(response);
        });
        break;
      }
    }
  }

  private callBrokenRulesApi(germany, italy, austria, dateStart: string, dateEnd: string): void
  {
    switch (this.getCountriesNumber(germany, italy, austria))
    {
      case '001':
      {
        console.log('austria selected');
        this.alertService.getBrokenRule1(3, dateStart, dateEnd).subscribe(response =>
        {
          this.downloadFile(response);
        });
        break;
      }
      case '010':
      {
        console.log('italy selected');
        this.alertService.getBrokenRule1(2, dateStart, dateEnd).subscribe(response =>
        {
          this.downloadFile(response);
        });
        break;
      }
      case '011':
      {
        console.log('italy and austria selected');
        // this.alertService.getAlertCsv2(2, 3, dateStart, dateEnd).subscribe(response => console.log(response));
        this.alertService.getBrokenRule2(2, 3, dateStart, dateEnd).subscribe(response =>
        {
          this.downloadFile(response);
        });
        break;
      }
      case '100':
      {
        console.log('germany selected');
        this.alertService.getBrokenRule1(1, dateStart, dateEnd).subscribe(response =>
        {
          this.downloadFile(response);
        });
        break;
      }
      case '101':
      {
        console.log('germany and austria selected');
        this.alertService.getBrokenRule2(1, 3, dateStart, dateEnd).subscribe(response =>
        {
          this.downloadFile(response);
        });
        break;
      }
      case '110':
      {
        console.log('germany and italy selected');
        this.alertService.getBrokenRule2(1, 2, dateStart, dateEnd).subscribe(response =>
        {
          this.downloadFile(response);
        });
        break;
      }
      default:
      {
        console.log('3 countries selected');
        this.alertService.getBrokenRule(dateStart, dateEnd).subscribe(response =>
        {
          this.downloadFile(response);
        });
        break;
      }
    }
  }

  private getDates(dateStart: string, dateEnd: string)
  {
    const regExp = /[a-zA-Z]/g;

    // invalid date
    if (dateStart == null || dateEnd == null || dateStart.length == 0 || dateEnd.length == 0 ||
      regExp.test(dateStart) || regExp.test(dateEnd))
    {
      dateStart = '01.01.2019';
      dateEnd = '01.01.3000';
    } else
    {
      dateStart = dateStart.replace(/\//g, '.');
      dateEnd = dateEnd.replace(/\//g, '.');
    }
    console.log('startDate is' + dateStart);
    return {dateStart, dateEnd};
  }

  downloadFile(data: any): void
  {
    const today = new Date().toLocaleDateString();
    const blob = new Blob([data], {type: '.xlsx'});
    const file = new File([blob], 'alertReport' + today + '.xlsx', {type: 'application/vnd.ms.excel'});
    saveAs(file);
  }

  listAlerts(): void
  {
    this.alertService.getAlertList().subscribe(data =>
    {
      this.alerts = data;
    });
  }

// create a code for identifying the countries
  getCountriesNumber(germany, italy, austria): string
  {
    let countryCode: string = '';
    if (germany.checked)
    {
      countryCode = countryCode + 1;
    } else
    {
      countryCode = countryCode + 0;
    }
    if (italy.checked)
    {
      countryCode = countryCode + 1;
    } else
    {
      countryCode = countryCode + 0;
    }
    if (austria.checked)
    {
      countryCode = countryCode + 1;
    } else
    {
      countryCode = countryCode + 0;
    }
    console.log('country code is ' + countryCode);
    return countryCode;
  }
}
