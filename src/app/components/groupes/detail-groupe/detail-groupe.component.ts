import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupeDetail } from '../../../modals/groupe.modal';
import { GroupesService } from '../../../services/groupes.service';
import { MyhelperService } from '../../../services/myhelper.service';

@Component({
  selector: 'app-detail-groupe',
  templateUrl: './detail-groupe.component.html',
  styleUrls: ['./detail-groupe.component.css']
})
export class DetailGroupeComponent implements OnInit {

  currentGroupe: GroupeDetail = {
    id: 0,
    name: "",
    description: "",
    allVehicles: []
  };

  constructor(
    private helperService: MyhelperService,
    private route: ActivatedRoute, private router: Router,
    private groupeService: GroupesService
  ) { }

  ngOnInit(): void {
    this.getGroupe();
  }

  getGroupe(): void {

    this.helperService.setLocationMenu("Groupes", "Detail")
    this.helperService.setIsLoading(true);

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.groupeService.getGroupeById(id)
      .subscribe(
        resp => {
          
          this.helperService.setIsLoading(false);
          this.currentGroupe = resp
        },
        error => {
          
          this.helperService.showErrorToast(error)
        }
      );
  }

  onDelete() {
    this.helperService.setIsLoading(true);

    this.groupeService.deleteGroupe(this.currentGroupe.id)
      .subscribe(
        resp => {
          
          if (resp.includes("success") == false) {
            this.helperService.showErrorToast(resp)
            
          }
          else
            this.router.navigate(['groupevehicles/']);
        },
        error => {
          
          this.helperService.showErrorToast(error)
        }
      )
  }
}
