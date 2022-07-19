import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProviderDetail } from '../../../modals/provider.modal';
import { MyhelperService } from '../../../services/myhelper.service';
import { ProvidersService } from '../../../services/providers.service';

@Component({
  selector: 'app-detail-provider',
  templateUrl: './detail-provider.component.html',
  styleUrls: ['./detail-provider.component.css']
})
export class DetailProviderComponent implements OnInit {


  currentProvider: ProviderDetail = {
    id: 0,
    matricule: "",
    fullname: "",
    email: "",
    address: "",
    phone: "",
  };

  constructor(
    private helperService: MyhelperService,
    private route: ActivatedRoute, private router: Router,
    private providerService: ProvidersService
  ) { }

  ngOnInit(): void {
    this.getProvider();
  }

  getProvider(): void {

    this.helperService.setLocationMenu("Providers", "Detail")
    this.helperService.setIsLoading(true);

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.providerService.getProviderById(id)
      .subscribe(
        resp => {
          
          this.helperService.setIsLoading(false);
          this.currentProvider = resp
        },
        error => {
          
          this.helperService.showErrorToast(error)
        }
      );
  }

  onDelete() {
    this.helperService.setIsLoading(true);

    this.providerService.deleteProvider(this.currentProvider.id)
      .subscribe(
        resp => {
          if (resp.includes("success") == false) {
            this.helperService.showErrorToast(resp)
            
          }
          else
            this.router.navigate(['providers/']);
        },
        error => {
          
          this.helperService.showErrorToast(error)
        }
      )
  }
}
