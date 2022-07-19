import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupeUpdate } from '../../../modals/groupe.modal';
import { GroupesService } from '../../../services/groupes.service';
import { MyhelperService } from '../../../services/myhelper.service';

@Component({
  selector: 'app-update-groupe',
  templateUrl: './update-groupe.component.html',
  styleUrls: ['./update-groupe.component.css']
})
export class UpdateGroupeComponent implements OnInit {

  currentGroupe: GroupeUpdate = {
    id: 0,
    name: "",
    description: "",
  }

  constructor(private helperService: MyhelperService, private router: Router,
    private route: ActivatedRoute,
    private groupeService: GroupesService) { }



  ngOnInit(): void {
    this.getGroupe();
  }

  getGroupe(): void {
    this.helperService.setLocationMenu("Groupes", "Update")
    this.helperService.setIsLoading(true);

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.groupeService.getGroupeById(id)
      .subscribe(groupe => {

        this.currentGroupe.id = groupe.id;
        this.currentGroupe.name = groupe.name;
        this.currentGroupe.description = groupe.description;
        
        this.helperService.setIsLoading(false);

      },
      error => {
        
        this.helperService.showErrorToast(error)
      })
  }

  onSubmit() {

    this.helperService.setIsLoading(true);
    this.groupeService.updateGroupe(this.currentGroupe.id, this.currentGroupe)
      .subscribe(
        resp => {
          
          if(resp.includes("success") == false) {
            this.helperService.showErrorToast(resp)
            
          }
          else
            this.router.navigate(['groupevehicles/' + this.currentGroupe.id]);
        },
        error => {
          
          this.helperService.showErrorToast(error)
        }
      )
  }

}
