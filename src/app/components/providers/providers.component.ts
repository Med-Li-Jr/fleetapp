import { Component, OnInit } from '@angular/core';
import { ProviderRead } from '../../modals/provider.modal';
import { MyhelperService } from '../../services/myhelper.service';
import { ProvidersService } from '../../services/providers.service';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css']
})
export class ProvidersComponent implements OnInit {

  providers: ProviderRead[] = [];
  
  constructor(private helperService: MyhelperService, private providerService: ProvidersService) { }


  ngOnInit(): void {
    this.onGetAllProvider();
  }

  onGetAllProvider()  {
    this.helperService.setLocationMenu("Providers", "Dashboard")
    this.helperService.setIsLoading(true);

    this.providerService.getAllProviders()
    .subscribe(      
      resp => {
        this.providers = resp;
        this.helperService.setIsLoading(false);

      },
      error => {
        
        this.helperService.showErrorToast(error)
      },

    )
  }
}
