import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GroupeCreate } from '../../../modals/groupe.modal';
import { GroupesService } from '../../../services/groupes.service';
import { MyhelperService } from '../../../services/myhelper.service';

@Component({
  selector: 'app-create-groupe',
  templateUrl: './create-groupe.component.html',
  styleUrls: ['./create-groupe.component.css']
})
export class CreateGroupeComponent implements OnInit {

  currentGroupe: GroupeCreate = {
    name: "",
    description: "",
  }

  constructor(private helperService: MyhelperService,
              private groupeService: GroupesService, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
    this.helperService.setLocationMenu("Groupes", "Add")
  }

  initForm() {

    this.currentGroupe = {
      name: "",
      description: "",
    }
  }

  onSubmit() {

    this.helperService.setIsLoading(true);
    this.groupeService.addGroupe(this.currentGroupe)
      .subscribe(
        resp => {
          
          if(resp.includes("success") == false) {
            this.helperService.showErrorToast(resp)
            
          }
          else
            this.router.navigate(['groupevehicles']);
        },
        error => {
          
          this.helperService.showErrorToast(error)
        }
      );
  }

}
 