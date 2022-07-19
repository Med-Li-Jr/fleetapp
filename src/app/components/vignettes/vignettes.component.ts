import { Component, OnInit } from '@angular/core';
import { VignetteRead } from '../../modals/vignette.modal';
import { MyhelperService } from '../../services/myhelper.service';
import { VignettesService } from '../../services/vignettes.service';

@Component({
  selector: 'app-vignettes',
  templateUrl: './vignettes.component.html',
  styleUrls: ['./vignettes.component.css']
})
export class VignettesComponent implements OnInit {
  vignettes: VignetteRead[] = [];
  
  constructor(private helperService: MyhelperService, private vignetteService: VignettesService) { }


  ngOnInit(): void {
    this.helperService.setLocationMenu("Vignettes", "Dashboard")
    this.onGetAllVignette();
  }

  onGetAllVignette()  {
    this.helperService.setIsLoading(true);

    this.vignetteService.getAllVignettes()
    .subscribe(      
      resp => {
        this.vignettes = resp;
        this.helperService.setIsLoading(false);

      },
      error => {
        
        this.helperService.showErrorToast(error)
      },

    )
  }
}
