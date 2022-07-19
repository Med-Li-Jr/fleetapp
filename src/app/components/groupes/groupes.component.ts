import { Component, OnInit } from '@angular/core';
import { GroupeRead } from '../../modals/groupe.modal';
import { GroupesService } from '../../services/groupes.service';
import { MyhelperService } from '../../services/myhelper.service';

@Component({
  selector: 'app-groupes',
  templateUrl: './groupes.component.html',
  styleUrls: ['./groupes.component.css']
})
export class GroupesComponent implements OnInit {
  
  groupes: GroupeRead[] = [];

  constructor(private helperService: MyhelperService, private groupeService: GroupesService) { }


  ngOnInit(): void {
    this.onGetAllGroupe();
  }

  onGetAllGroupe()  {
    this.helperService.setLocationMenu("Groupes", "Dashboard")
    this.helperService.setIsLoading(true);

    this.groupeService.getAllGroupes()
    .subscribe(      
      resp => {
        this.groupes = resp;
        this.helperService.setIsLoading(false);
        
      },
      error => {
        
        this.helperService.showErrorToast(error)
      },

    )
  }
}
