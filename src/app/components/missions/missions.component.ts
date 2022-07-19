import { Component, OnInit } from '@angular/core';
import { MissionRead } from '../../modals/mission.modal';
import { MissionsService } from '../../services/missions.service';
import { MyhelperService } from '../../services/myhelper.service';

@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.css']
})
export class MissionsComponent implements OnInit {

  missions: MissionRead[] = [];
  
  constructor(private helperService: MyhelperService, private missionService: MissionsService) { }


  ngOnInit(): void {
    this.onGetAllMission();
  }

  onGetAllMission()  {
    this.helperService.setLocationMenu("Missions", "Dashboard")
    this.helperService.setIsLoading(true);

    this.missionService.getAllMissions()
    .subscribe(      
      resp => {
        this.missions = resp;
        this.helperService.setIsLoading(false);
        
      },
      error => {
        this.helperService.showErrorToast(error)
      },

    )
  }
}
