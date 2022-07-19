import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataresetComponent } from './layouts/datareset/datareset.component';
import { LoginComponent } from './layouts/login/login.component';
import { MainlayoutComponent } from './layouts/mainlayout/mainlayout.component';
import { NotallowedComponent } from './layouts/notallowed/notallowed.component';
import { NotfoundComponent } from './layouts/notfound/notfound.component';
import { UsersComponent } from './components/users/users.component';
import { CardUserComponent } from './components/users/card-user/card-user.component';
import { CreateUserComponent } from './components/users/create-user/create-user.component';
import { DetailUserComponent } from './components/users/detail-user/detail-user.component';
import { ListUserComponent } from './components/users/list-user/list-user.component';
import { ProfilComponent } from './components/users/profil/profil.component';
import { UpdateUserComponent } from './components/users/update-user/update-user.component';
import { DriversComponent } from './components/drivers/drivers.component';
import { CreateDriverComponent } from './components/drivers/create-driver/create-driver.component';
import { DetailDriverComponent } from './components/drivers/detail-driver/detail-driver.component';
import { UpdateDriverComponent } from './components/drivers/update-driver/update-driver.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { CreateEmployeeComponent } from './components/employees/create-employee/create-employee.component';
import { DetailEmployeeComponent } from './components/employees/detail-employee/detail-employee.component';
import { UpdateEmployeeComponent } from './components/employees/update-employee/update-employee.component';
import { GroupesComponent } from './components/groupes/groupes.component';
import { CreateGroupeComponent } from './components/groupes/create-groupe/create-groupe.component';
import { DetailGroupeComponent } from './components/groupes/detail-groupe/detail-groupe.component';
import { UpdateGroupeComponent } from './components/groupes/update-groupe/update-groupe.component';
import { InsurancesComponent } from './components/insurances/insurances.component';
import { CreateInsuranceComponent } from './components/insurances/create-insurance/create-insurance.component';
import { DetailInsuranceComponent } from './components/insurances/detail-insurance/detail-insurance.component';
import { ListInsuranceComponent } from './components/insurances/list-insurance/list-insurance.component';
import { UpdateInsuranceComponent } from './components/insurances/update-insurance/update-insurance.component';
import { MissionsComponent } from './components/missions/missions.component';
import { CreateMissionComponent } from './components/missions/create-mission/create-mission.component';
import { DetailMissionComponent } from './components/missions/detail-mission/detail-mission.component';
import { UpdateMissionComponent } from './components/missions/update-mission/update-mission.component';
import { ProvidersComponent } from './components/providers/providers.component';
import { CreateProviderComponent } from './components/providers/create-provider/create-provider.component';
import { DetailProviderComponent } from './components/providers/detail-provider/detail-provider.component';
import { UpdateProviderComponent } from './components/providers/update-provider/update-provider.component';
import { TracersComponent } from './components/tracers/tracers.component';
import { VehiclesComponent } from './components/vehicles/vehicles.component';
import { CardVehicleComponent } from './components/vehicles/card-vehicle/card-vehicle.component';
import { CreateVehicleComponent } from './components/vehicles/create-vehicle/create-vehicle.component';
import { DetailVehicleComponent } from './components/vehicles/detail-vehicle/detail-vehicle.component';
import { ListVehicleComponent } from './components/vehicles/list-vehicle/list-vehicle.component';
import { UpdateVehicleComponent } from './components/vehicles/update-vehicle/update-vehicle.component';
import { VignettesComponent } from './components/vignettes/vignettes.component';
import { CreateVignetteComponent } from './components/vignettes/create-vignette/create-vignette.component';
import { DetailVignetteComponent } from './components/vignettes/detail-vignette/detail-vignette.component';
import { ListVignetteComponent } from './components/vignettes/list-vignette/list-vignette.component';
import { UpdateVignetteComponent } from './components/vignettes/update-vignette/update-vignette.component';
import { VouchersComponent } from './components/vouchers/vouchers.component';
import { CreateVoucherComponent } from './components/vouchers/create-voucher/create-voucher.component';
import { DetailVoucherComponent } from './components/vouchers/detail-voucher/detail-voucher.component';
import { ListVoucherComponent } from './components/vouchers/list-voucher/list-voucher.component';
import { UpdateVoucherComponent } from './components/vouchers/update-voucher/update-voucher.component';
import { AuthGuard } from './guards/auth.guard';
import { ReadGuard } from './guards/read.guard';
import { CreateGuard } from './guards/create.guard';
import { UpdateGuard } from './guards/update.guard';
import { SuperadminGuard } from './guards/superadmin.guard';

const routes: Routes = [
  {
    path: "", redirectTo: "/login", pathMatch: "full"
  },
  {
    path: "login", component: LoginComponent
  },
  {
    path: "reset", component: DataresetComponent
  },
  {
    path: "notallowed", component: NotallowedComponent
  },
  {
    path: "", component: MainlayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "profil", component: ProfilComponent,
      },
      {
        path: "users", component: UsersComponent,
        canActivate: [SuperadminGuard],
        data: {
          moduleName: "users"
        }
      },
      {
        path: "users/add", component: CreateUserComponent,
        canActivate: [SuperadminGuard],
        data: {
          moduleName: "users"
        }
      },
      {
        path: "users/:id", component: DetailUserComponent,
        canActivate: [SuperadminGuard],
        data: {
          moduleName: "users"
        }
      },
      {
        path: "users/:id/update", component: UpdateUserComponent,
        canActivate: [SuperadminGuard],
        data: {
          moduleName: "users"
        }
      },
      {
        path: "drivers", component: DriversComponent,
        canActivate: [ReadGuard],
        data: {
          moduleName: "drivers"
        }
      },
      {
        path: "drivers/add", component: CreateDriverComponent,
        canActivate: [CreateGuard],
        data: {
          moduleName: "drivers"
        }
      },
      {
        path: "drivers/:id", component: DetailDriverComponent,
        canActivate: [ReadGuard],
        data: {
          moduleName: "drivers"
        }
      },
      {
        path: "drivers/:id/update", component: UpdateDriverComponent,
        canActivate: [UpdateGuard],
        data: {
          moduleName: "drivers"
        }
      },
      {
        path: "employees", component: EmployeesComponent,
        canActivate: [ReadGuard],
        data: {
          moduleName: "employees"
        }
      },
      {
        path: "employees/add", component: CreateEmployeeComponent,
        canActivate: [CreateGuard],
        data: {
          moduleName: "employees"
        }
      },
      {
        path: "employees/:id", component: DetailEmployeeComponent,
        canActivate: [ReadGuard],
        data: {
          moduleName: "employees"
        }
      },
      {
        path: "employees/:id/update", component: UpdateEmployeeComponent,
        canActivate: [UpdateGuard],
        data: {
          moduleName: "employees"
        }
      },
      {
        path: "groupevehicles", component: GroupesComponent,
        canActivate: [ReadGuard],
        data: {
          moduleName: "groupevehicles"
        }
      },
      {
        path: "groupevehicles/add", component: CreateGroupeComponent,
        canActivate: [CreateGuard],
        data: {
          moduleName: "groupevehicles"
        }
      },
      {
        path: "groupevehicles/:id", component: DetailGroupeComponent,
        canActivate: [ReadGuard],
        data: {
          moduleName: "groupevehicles"
        }
      },
      {
        path: "groupevehicles/:id/update", component: UpdateGroupeComponent,
        canActivate: [UpdateGuard],
        data: {
          moduleName: "groupevehicles"
        }
      },
      {
        path: "vehicles", component: VehiclesComponent,
        canActivate: [ReadGuard],
        data: {
          moduleName: "vehicles"
        }
      },
      {
        path: "vehicles/add", component: CreateVehicleComponent,
        canActivate: [CreateGuard],
        data: {
          moduleName: "vehicles"
        }
      },
      {
        path: "vehicles/:id", component: DetailVehicleComponent,
        canActivate: [ReadGuard],
        data: {
          moduleName: "vehicles"
        }
      },
      {
        path: "vehicles/:id/update", component: UpdateVehicleComponent,
        canActivate: [UpdateGuard],
        data: {
          moduleName: "vehicles"
        }
      },
      {
        path: "insurances", component: InsurancesComponent,
        canActivate: [ReadGuard],
        data: {
          moduleName: "insurances"
        }
      },
      {
        path: "insurances/add", component: CreateInsuranceComponent,
        canActivate: [CreateGuard],
        data: {
          moduleName: "insurances"
        }
      },
      {
        path: "insurances/:id", component: DetailInsuranceComponent,
        canActivate: [ReadGuard],
        data: {
          moduleName: "insurances"
        }
      },
      {
        path: "insurances/:id/update", component: UpdateInsuranceComponent,
        canActivate: [UpdateGuard],
        data: {
          moduleName: "insurances"
        }
      },
      {
        path: "missions", component: MissionsComponent,
        canActivate: [ReadGuard],
        data: {
          moduleName: "missions"
        }
      },
      {
        path: "missions/add", component: CreateMissionComponent,
        canActivate: [CreateGuard],
        data: {
          moduleName: "missions"
        }
      },
      {
        path: "missions/:id", component: DetailMissionComponent,
        canActivate: [ReadGuard],
        data: {
          moduleName: "missions"
        }
      },
      {
        path: "missions/:id/update", component: UpdateMissionComponent,
        canActivate: [UpdateGuard],
        data: {
          moduleName: "missions"
        }
      },
      {
        path: "providers", component: ProvidersComponent,
        canActivate: [ReadGuard],
        data: {
          moduleName: "providers"
        }
      },
      {
        path: "providers/add", component: CreateProviderComponent,
        canActivate: [CreateGuard],
        data: {
          moduleName: "providers"
        }
      },
      {
        path: "providers/:id", component: DetailProviderComponent,
        canActivate: [ReadGuard],
        data: {
          moduleName: "providers"
        }
      },
      {
        path: "providers/:id/update", component: UpdateProviderComponent,
        canActivate: [UpdateGuard],
        data: {
          moduleName: "providers"
        }
      },
      {
        path: "tracers", component: TracersComponent,
        canActivate: [ReadGuard],
        data: {
          moduleName: "tracers"
        }
      },
      {
        path: "vignettes", component: VignettesComponent,
        canActivate: [ReadGuard],
        data: {
          moduleName: "vignettes"
        }
      },
      {
        path: "vignettes/add", component: CreateVignetteComponent,
        canActivate: [CreateGuard],
        data: {
          moduleName: "vignettes"
        }
      },
      {
        path: "vignettes/:id", component: DetailVignetteComponent,
        canActivate: [ReadGuard],
        data: {
          moduleName: "vignettes"
        }
      },
      {
        path: "vignettes/:id/update", component: UpdateVignetteComponent,
        canActivate: [UpdateGuard],
        data: {
          moduleName: "vignettes"
        }
      },
      {
        path: "vouchers", component: VouchersComponent,
        canActivate: [ReadGuard],
        data: {
          moduleName: "vouchers"
        }
      },
      {
        path: "vouchers/add", component: CreateVoucherComponent,
        canActivate: [CreateGuard],
        data: {
          moduleName: "vouchers"
        }
      },
      {
        path: "vouchers/:id", component: DetailVoucherComponent,
        canActivate: [ReadGuard],
        data: {
          moduleName: "vouchers"
        }
      },
      {
        path: "vouchers/:id/update", component: UpdateVoucherComponent,
        canActivate: [UpdateGuard],
        data: {
          moduleName: "vouchers"
        }
      },

    ]
  },
  {
    path: "**", component: NotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponents = [
  UsersComponent, ListUserComponent, CreateUserComponent, DetailUserComponent, CardUserComponent, UpdateUserComponent, ProfilComponent,
  DriversComponent, CreateDriverComponent, DetailDriverComponent, UpdateDriverComponent,
  EmployeesComponent, CreateEmployeeComponent, DetailEmployeeComponent, UpdateEmployeeComponent,
  GroupesComponent, CreateGroupeComponent, DetailGroupeComponent, UpdateGroupeComponent,
  VehiclesComponent, ListVehicleComponent, CreateVehicleComponent, DetailVehicleComponent, CardVehicleComponent, UpdateVehicleComponent,
  InsurancesComponent, ListInsuranceComponent, CreateInsuranceComponent, DetailInsuranceComponent, UpdateInsuranceComponent,
  MissionsComponent, CreateMissionComponent, DetailMissionComponent, UpdateMissionComponent,
  ProvidersComponent, CreateProviderComponent, DetailProviderComponent, UpdateProviderComponent,
  TracersComponent,
  VignettesComponent, ListVignetteComponent, CreateVignetteComponent, DetailVignetteComponent, UpdateVignetteComponent,
  VouchersComponent, ListVoucherComponent, CreateVoucherComponent, DetailVoucherComponent, UpdateVoucherComponent,
];