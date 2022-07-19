import { Injectable } from '@angular/core';
import { PrivilegeCreate, PrivilegeDetail, PrivilegeModal, PrivilegeRead, PrivilegeUpdate } from '../modals/privilege.modal';
import { LayoutBLLService } from './layoutBLL.service';

@Injectable({
  providedIn: 'root'
})
export class PrivilegesService {


  
  constructor(
    private bllService: LayoutBLLService) { }

    defaultPrivilege() : PrivilegeRead {
    return {
      id: 0,
      userID: 0,
      moduleName: "",
      canCreate: false,
      canRead: false,
      canUpdate: false,
      canDelete: false
    }
  }
  convertModalToRead(privilege: PrivilegeModal) : PrivilegeRead {
    return {
      id: privilege.id,
      userID: privilege.userID,
      moduleName: privilege.moduleName,
      canCreate: privilege.canCreate,
      canRead: privilege.canRead,
      canUpdate: privilege.canUpdate,
      canDelete: privilege.canDelete
    }
  }

  convertModalToDetail(privilege: PrivilegeModal) : PrivilegeDetail {
    return {
      id: privilege.id,
      userID: privilege.userID,
      moduleName: privilege.moduleName,
      canCreate: privilege.canCreate,
      canRead: privilege.canRead,
      canUpdate: privilege.canUpdate,
      canDelete: privilege.canDelete
    }
  }

  convertCreateToModal(privilege: PrivilegeCreate, id: number) : PrivilegeModal {
    return {
      id: id,
      userID: privilege.userID,
      moduleName: privilege.moduleName,
      canCreate: privilege.canCreate,
      canRead: privilege.canRead,
      canUpdate: privilege.canUpdate,
      canDelete: privilege.canDelete
    }
  }


  convertUpdateToModal(privilege: PrivilegeUpdate) : PrivilegeModal {
    return {
      id: privilege.id,
      userID: privilege.userID,
      moduleName: privilege.moduleName,
      canCreate: privilege.canCreate,
      canRead: privilege.canRead,
      canUpdate: privilege.canUpdate,
      canDelete: privilege.canDelete
    }
  }

  getAllPrivileges() : PrivilegeRead[]
  {

    this.updateTB()
    
    let allPrivileges : PrivilegeRead[] = []
    for(let i = 0; i < privilegesTB.length; i++)
    {
      allPrivileges.push(this.convertModalToRead(privilegesTB[i]))
    }
    //console.log(privilegesTB, "fffffffffffff")
    return allPrivileges
  }
  
  getAllPrivilegesByUserID(id: number) : PrivilegeRead[] 
  {

    this.updateTB()
    
      
    let privilegesUser : PrivilegeRead[] = []
    for(let i = 0; i < privilegesTB.length; i++)
    {
      if(privilegesTB[i].userID === id)
        privilegesUser.push(this.convertModalToRead(privilegesTB[i]))
    }
    return privilegesUser;
  }
  
  getPrivilegeById(id: number): PrivilegeDetail
  {

    this.updateTB()
    
    let index = privilegesTB.findIndex(user => user.id === id)
    if (index < 0)
      throw Error("Privilege does not exist");


    return this.convertModalToDetail(privilegesTB[index]);

  }


  privilegeById(id: number): PrivilegeRead {

    this.updateTB()
    
    let index = privilegesTB.findIndex(driver => driver.id === id)
    if (index < 0)
      return this.defaultPrivilege();

    return privilegesTB[index];
  }

  addPrivilege(privilege: PrivilegeCreate) : string
  {

    this.updateTB()
    
    let message = this.bllService.validatePrivilege(privilege); 
    if (message.length > 0) {
      return message
    }

    privilegesTB.push(this.convertCreateToModal( privilege, (this.bllService.getLastIdFromData(privilegesTB) + 1)))
    this.updateTable()
    return "Add success";
  }

  updatePrivilege(id: Number, privilege: PrivilegeUpdate) : string
  {

    this.updateTB()
    
    let index = privilegesTB.findIndex( elt => elt.id === id)
    if(index < 0)
      return "Privilege does not exist"

    privilegesTB[index] = this.convertUpdateToModal(privilege);
    this.updateTable()
    return "Update success"

  }

  deletePrivilege(id: number) : string
  {

    this.updateTB()
    
    let index = privilegesTB.findIndex(element => element.id === id);
    if (index < 0)
      return "Privilege does not exist";

    privilegesTB.splice(index, 1);
    this.updateTable()
    return "Delete success";
  }
  
  updateTable()
  {
    localStorage.setItem("privilegesTable", JSON.stringify(privilegesTB))
  }


  updateTB()
  {
    let loaclTB: any = localStorage.getItem("privilegesTable");
    loaclTB = JSON.parse(loaclTB);

    if (loaclTB)
      privilegesTB = loaclTB;
  }

}

export let privilegesTB: PrivilegeModal[] = []