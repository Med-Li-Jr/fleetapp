import { Injectable } from '@angular/core';
import { groupesDB, insurancesDB, missionsDB, privilegesDB, providersDB, tracersDB, usersDB, vehiclesDB, vignettesDB, vouchersDB } from './mocks/data-mocks';

@Injectable({
  providedIn: 'root'
})
export class MyhelperService {

  isLoginPage: boolean = true;
  constructor() { }

  setIsLoginPage(value: boolean) {
    this.isLoginPage = value;
  }

  getIsLoginPage(): boolean {
    return this.isLoginPage;
  }


  configData() {

    if (localStorage.getItem("usersTable") == null)
      localStorage.setItem("usersTable", JSON.stringify(usersDB));

    if (localStorage.getItem("groupesTable") == null)
      localStorage.setItem("groupesTable", JSON.stringify(groupesDB))

    if (localStorage.getItem("insurancesTable") == null)
      localStorage.setItem("insurancesTable", JSON.stringify(insurancesDB))

    if (localStorage.getItem("missionsTable") == null)
      localStorage.setItem("missionsTable", JSON.stringify(missionsDB))

    if (localStorage.getItem("privilegesTable") == null)
      localStorage.setItem("privilegesTable", JSON.stringify(privilegesDB))

    if (localStorage.getItem("providersTable") == null)
      localStorage.setItem("providersTable", JSON.stringify(providersDB))

    if (localStorage.getItem("tracersTable") == null)
      localStorage.setItem("tracersTable", JSON.stringify(tracersDB))

    if (localStorage.getItem("vehiclesTable") == null)
      localStorage.setItem("vehiclesTable", JSON.stringify(vehiclesDB))

    if (localStorage.getItem("vignettesTable") == null)
      localStorage.setItem("vignettesTable", JSON.stringify(vignettesDB))

    if (localStorage.getItem("vouchersTable") == null)
      localStorage.setItem("vouchersTable", JSON.stringify(vouchersDB))
  }

  resetData() {

    localStorage.setItem("usersTable", JSON.stringify(usersDB));
    localStorage.setItem("groupesTable", JSON.stringify(groupesDB))
    localStorage.setItem("insurancesTable", JSON.stringify(insurancesDB))
    localStorage.setItem("missionsTable", JSON.stringify(missionsDB))
    localStorage.setItem("privilegesTable", JSON.stringify(privilegesDB))
    localStorage.setItem("providersTable", JSON.stringify(providersDB))
    localStorage.setItem("tracersTable", JSON.stringify(tracersDB))
    localStorage.setItem("vehiclesTable", JSON.stringify(vehiclesDB))
    localStorage.setItem("vignettesTable", JSON.stringify(vignettesDB))
    localStorage.setItem("vouchersTable", JSON.stringify(vouchersDB))

  }


  public setIsLoading(value: boolean) {
    let modal = <HTMLElement>document.getElementById("spinnerModal")
    let myOverlay = <HTMLElement>document.getElementById("myOverlay")
    if (value == true) {
      modal.style.display = "block"
      myOverlay.style.display = "block"
    }
    else {
      setTimeout( () => {
        modal.style.display = "none"
        myOverlay.style.display = "none"  
      }, 500)
    }
  }


  showErrorToast(messageErrror: string)
  {
    setTimeout(() => {
      let toastContent = (document.getElementById("toast-content") as any);
      messageErrror = messageErrror.toString().replace("Error:", "")
      toastContent.innerHTML = messageErrror.split(";").join("<br>");
      let showToastPlacement = (document.getElementById("showToastPlacement") as any)
      showToastPlacement.click();
      this.setIsLoading(false);
    }, 600)
  }

  setLocationMenu(mainMenu: string, currentMenu: string) {
    (<HTMLElement>document.getElementById("main-location")).textContent = mainMenu + "\\";
    (<HTMLElement>document.getElementById("current-location")).textContent = currentMenu;
    // (<HTMLElement>document.getElementById("logo-menu")).classList.add("bx-home-circle");
    this.isLoginPage = false; 
    this.removejscssfile("site.js")
    // alert('dgfsd') 
    this.loadScript()
  }

  public removejscssfile(filename : any) {
    
    var allsuspects = document.getElementsByTagName("script")

    // alert("qsdfqsdfsd")
    for (var i = allsuspects.length; i >= 0; i--) {
      if (allsuspects[i] && allsuspects[i].src.includes(filename)){
        //console.log(allsuspects[i].src, "-------", allsuspects[i].src.includes(filename))
        allsuspects[i].parentNode?.removeChild(allsuspects[i])
      }
    }
  }


  public loadScript() {
    // alert('load')
    let node = document.createElement('script');
    node.src = "/assets/js/site.js";
    // node.type = 'text/javascript';
    node.async = false;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
  }


}

(window as any).openLoadiing = function()
{

  let modal = <HTMLElement>document.getElementById("spinnerModal")
  let myOverlay = <HTMLElement>document.getElementById("myOverlay")
    modal.style.display = "block"
    myOverlay.style.display = "block"
};

(window as any).closeLoadiing = function()
{

  let modal = <HTMLElement>document.getElementById("spinnerModal")
  let myOverlay = <HTMLElement>document.getElementById("myOverlay")
    modal.style.display = "none"
    myOverlay.style.display = "none"
};

export const KEYMAPBOX = "pk.eyJ1IjoibG1pajIxIiwiYSI6ImNsMzF2aWp2YTEwemszcHBzNWFjbGpuazkifQ.JYhts2hRovC2gSRfcWcDUA";
export const ALLMODULES: string[] = [
  "Employees",
  "Drivers",
  "Vehicles",
  "Missions",
  "Tracers",
  "GroupeVehicles",
  "Insurances",
  "Providers",
  "Vignettes",
  "Vouchers",

]