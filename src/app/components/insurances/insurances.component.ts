import { Component, OnInit } from '@angular/core';
import { InsuranceRead } from '../../modals/insurance.modal';
import { InsurancesService } from '../../services/insurances.service';
import { MyhelperService } from '../../services/myhelper.service';

@Component({
  selector: 'app-insurances',
  templateUrl: './insurances.component.html',
  styleUrls: ['./insurances.component.css']
})
export class InsurancesComponent implements OnInit {

  insurances: InsuranceRead[] = [];
  
  constructor(private helperService: MyhelperService, private insuranceService: InsurancesService) { }


  ngOnInit(): void {
    this.helperService.setLocationMenu("Insurances", "Dashboard")
    this.onGetAllInsurance();
  }

  onGetAllInsurance()  {
    this.helperService.setIsLoading(true);

    this.insuranceService.getAllInsurances()
    .subscribe(      
      resp => {
        this.insurances = resp;
        this.helperService.setIsLoading(false);
      },
      error => {
        this.helperService.showErrorToast(error)
      },

    )
  }
}
