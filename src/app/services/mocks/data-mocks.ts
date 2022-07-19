import { GroupeModal } from "../../modals/groupe.modal";
import { InsuranceModal } from "../../modals/insurance.modal";
import { MissionModal } from "../../modals/mission.modal";
import { PrivilegeModal } from "../../modals/privilege.modal";
import { ProviderModal } from "../../modals/provider.modal";
import { TracerModal } from "../../modals/tracer.modal";
import { UserModal } from "../../modals/user.modal";
import { VehicleModal } from "../../modals/vehicle.modal";
import { VignetteModal } from "../../modals/vignette.modal";
import { VoucherModal } from "../../modals/voucher.modal";

export let groupesDB: GroupeModal[] = [
    {
        "id": 2,
        "name": "Groupe1",
        "description": "Description Groupe 1"
    },
    {
        "id": 3,
        "name": "Groupe2",
        "description": "Description Groupe 2"
    },
    {
        "id": 4,
        "name": "Groupe3",
        "description": "Description Groupe 3"
    },
    {
        "id": 5,
        "name": "Groupe4",
        "description": "Description Groupe 4"
    }
];

export let insurancesDB: InsuranceModal[] = [
    {
        "id": 2,
        "vehicleId": 2,
        "vehicleMarque": "Vehicle1",
        "nameAgence": "Agence1",
        "price": 123,
        "dateStartUsage": "2022-06-26",
        "dateLimiteUsage": "2022-07-27"
    },
    {
        "id": 3,
        "vehicleId": 3,
        "vehicleMarque": "Vehicle2",
        "nameAgence": "Agence2",
        "price": 456,
        "dateStartUsage": "2022-07-12",
        "dateLimiteUsage": "2022-09-23"
    },
    {
        "id": 4,
        "vehicleId": 3,
        "vehicleMarque": "Vehicle2",
        "nameAgence": "Agence1",
        "price": 789,
        "dateStartUsage": "2022-07-28",
        "dateLimiteUsage": "2022-10-08"
    },
    {
        "id": 5,
        "vehicleId": 4,
        "vehicleMarque": "Vehicle3",
        "nameAgence": "Agence3",
        "price": 97,
        "dateStartUsage": "2022-07-16",
        "dateLimiteUsage": "2022-10-13"
    },
    {
        "id": 6,
        "vehicleId": 2,
        "vehicleMarque": "Vehicle1",
        "nameAgence": "Agence1",
        "price": 741,
        "dateStartUsage": "2022-08-06",
        "dateLimiteUsage": "2022-11-18"
    },
    {
        "id": 7,
        "vehicleId": 5,
        "vehicleMarque": "Vehicle4",
        "nameAgence": "Agence2",
        "price": 159,
        "dateStartUsage": "2022-09-15",
        "dateLimiteUsage": "2022-11-30"
    },
    {
        "id": 8,
        "vehicleId": 6,
        "vehicleMarque": "Vehicle5",
        "nameAgence": "Agence3",
        "price": 357,
        "dateStartUsage": "2022-11-04",
        "dateLimiteUsage": "2023-02-02"
    }
];

export let missionsDB: MissionModal[] = [
    {
        "id": 2,
        "vehicleId": 2,
        "vehicleMarque": "Vehicle1",
        "employeeId": 2,
        "employeeFullname": "AdmEmp",
        "driverId": 6,
        "driverFullname": "Driv1",
        "status": "waiting",
        "dateStart": "2022-07-01",
        "dateEnd": "2022-07-01",
        "sourceLatitude": 36.684279114923775,
        "sourceLongitude": 9.382324218750002,
        "sourceLocation": "سيدي عامر, Béja",
        "destinationLatitude": 33.95976371991848,
        "destinationLongitude": 9.645996093750002,
        "destinationLocation": "بشيمة البرج, Gabès"
    },
    {
        "id": 3,
        "vehicleId": 3,
        "vehicleMarque": "Vehicle2",
        "employeeId": 2,
        "employeeFullname": "AdmEmp",
        "driverId": 3,
        "driverFullname": "AdmDriver",
        "status": "waiting",
        "dateStart": "2022-07-08",
        "dateEnd": "2022-07-20",
        "sourceLatitude": 36.47253975414894,
        "sourceLongitude": 8.723144531250002,
        "sourceLocation": "الخضراء, Jendouba",
        "destinationLatitude": 32.507908649863566,
        "destinationLongitude": 10.56884765625,
        "destinationLocation": "القلعة الشرقية, Tataouine"
    },
    {
        "id": 4,
        "vehicleId": 4,
        "vehicleMarque": "Vehicle3",
        "employeeId": 1,
        "employeeFullname": "SupAdmin",
        "driverId": 6,
        "driverFullname": "Driv1",
        "status": "finished",
        "dateStart": "2022-06-25",
        "dateEnd": "2022-06-26",
        "sourceLatitude": 37.03588560718272,
        "sourceLongitude": 9.272460937500002,
        "sourceLocation": "سجنان, Bizerte",
        "destinationLatitude": 34.57804779650303,
        "destinationLongitude": 8.624267578125002,
        "destinationLocation": "كاف دربي, Gafsa"
    },
    {
        "id": 5,
        "vehicleId": 5,
        "vehicleMarque": "Vehicle4",
        "employeeId": 1,
        "employeeFullname": "SupAdmin",
        "driverId": 6,
        "driverFullname": "Driv1",
        "status": "waiting",
        "dateStart": "2022-08-01",
        "dateEnd": "2022-08-02",
        "sourceLatitude": 35.297642067638066,
        "sourceLongitude": 10.744628906250002,
        "sourceLocation": "العشابة, Mahdia",
        "destinationLatitude": 34.432285508898566,
        "destinationLongitude": 10.151367187500002,
        "destinationLocation": "الحشيشينة الجنوبية, Sfax"
    },
    {
        "id": 6,
        "vehicleId": 6,
        "vehicleMarque": "Vehicle5",
        "employeeId": 4,
        "employeeFullname": "Emp1",
        "driverId": 3,
        "driverFullname": "AdmDriver",
        "status": "waiting",
        "dateStart": "2022-08-01",
        "dateEnd": "2022-07-02",
        "sourceLatitude": 35.744728809339655,
        "sourceLongitude": 10.437011718750002,
        "sourceLocation": "كروسية المركزية, Sousse",
        "destinationLatitude": 35.31557331379036,
        "destinationLongitude": 8.811035156250002,
        "destinationLocation": "سمامة, Kasserine"
    },
    {
        "id": 7,
        "vehicleId": 4,
        "vehicleMarque": "Vehicle3",
        "employeeId": 4,
        "employeeFullname": "Emp1",
        "driverId": 6,
        "driverFullname": "Driv1",
        "status": "finished",
        "dateStart": "2022-06-08",
        "dateEnd": "2022-06-27",
        "sourceLatitude": 35.3514238809726,
        "sourceLongitude": 10.107421875000002,
        "sourceLocation": "أولاد عاشور, Kairouan",
        "destinationLatitude": 36.36733719763421,
        "destinationLongitude": 8.800048828125002,
        "destinationLocation": "سيدي خيار, Al Kaf"
    }
];

export let privilegesDB: PrivilegeModal[] = [
    {
        "id": 1,
        "userID": 1,
        "moduleName": "Employees",
        "canCreate": true,
        "canRead": true,
        "canUpdate": true,
        "canDelete": true
    },
    {
        "id": 2,
        "userID": 1,
        "moduleName": "Drivers",
        "canCreate": true,
        "canRead": true,
        "canUpdate": true,
        "canDelete": true
    },
    {
        "id": 3,
        "userID": 1,
        "moduleName": "Vehicles",
        "canCreate": true,
        "canRead": true,
        "canUpdate": true,
        "canDelete": true
    },
    {
        "id": 4,
        "userID": 1,
        "moduleName": "Missions",
        "canCreate": true,
        "canRead": true,
        "canUpdate": true,
        "canDelete": true
    },
    {
        "id": 5,
        "userID": 1,
        "moduleName": "Tracers",
        "canCreate": true,
        "canRead": true,
        "canUpdate": true,
        "canDelete": true
    },
    {
        "id": 6,
        "userID": 1,
        "moduleName": "GroupeVehicles",
        "canCreate": true,
        "canRead": true,
        "canUpdate": true,
        "canDelete": true
    },
    {
        "id": 7,
        "userID": 1,
        "moduleName": "Insurances",
        "canCreate": true,
        "canRead": true,
        "canUpdate": true,
        "canDelete": true
    },
    {
        "id": 8,
        "userID": 1,
        "moduleName": "Providers",
        "canCreate": true,
        "canRead": true,
        "canUpdate": true,
        "canDelete": true
    },
    {
        "id": 9,
        "userID": 1,
        "moduleName": "Vignettes",
        "canCreate": true,
        "canRead": true,
        "canUpdate": true,
        "canDelete": true
    },
    {
        "id": 10,
        "userID": 1,
        "moduleName": "Vouchers",
        "canCreate": true,
        "canRead": true,
        "canUpdate": true,
        "canDelete": true
    },
    {
        "id": 11,
        "userID": 2,
        "moduleName": "Employees",
        "canCreate": true,
        "canRead": true,
        "canUpdate": true,
        "canDelete": false
    },
    {
        "id": 12,
        "userID": 2,
        "moduleName": "Drivers",
        "canCreate": true,
        "canRead": true,
        "canUpdate": true,
        "canDelete": false
    },
    {
        "id": 13,
        "userID": 2,
        "moduleName": "Vehicles",
        "canCreate": true,
        "canRead": true,
        "canUpdate": true,
        "canDelete": true
    },
    {
        "id": 14,
        "userID": 2,
        "moduleName": "Missions",
        "canCreate": true,
        "canRead": true,
        "canUpdate": true,
        "canDelete": true
    },
    {
        "id": 15,
        "userID": 2,
        "moduleName": "Tracers",
        "canCreate": true,
        "canRead": true,
        "canUpdate": true,
        "canDelete": true
    },
    {
        "id": 16,
        "userID": 2,
        "moduleName": "GroupeVehicles",
        "canCreate": true,
        "canRead": true,
        "canUpdate": true,
        "canDelete": true
    },
    {
        "id": 17,
        "userID": 2,
        "moduleName": "Insurances",
        "canCreate": true,
        "canRead": true,
        "canUpdate": true,
        "canDelete": true
    },
    {
        "id": 18,
        "userID": 2,
        "moduleName": "Providers",
        "canCreate": true,
        "canRead": true,
        "canUpdate": true,
        "canDelete": true
    },
    {
        "id": 19,
        "userID": 2,
        "moduleName": "Vignettes",
        "canCreate": true,
        "canRead": true,
        "canUpdate": true,
        "canDelete": true
    },
    {
        "id": 20,
        "userID": 2,
        "moduleName": "Vouchers",
        "canCreate": true,
        "canRead": true,
        "canUpdate": true,
        "canDelete": true
    },
    {
        "id": 21,
        "userID": 3,
        "moduleName": "Employees",
        "canCreate": false,
        "canRead": true,
        "canUpdate": false,
        "canDelete": false
    },
    {
        "id": 22,
        "userID": 3,
        "moduleName": "Drivers",
        "canCreate": true,
        "canRead": true,
        "canUpdate": true,
        "canDelete": false
    },
    {
        "id": 23,
        "userID": 3,
        "moduleName": "Vehicles",
        "canCreate": true,
        "canRead": true,
        "canUpdate": false,
        "canDelete": false
    },
    {
        "id": 24,
        "userID": 3,
        "moduleName": "Missions",
        "canCreate": true,
        "canRead": true,
        "canUpdate": true,
        "canDelete": true
    },
    {
        "id": 25,
        "userID": 3,
        "moduleName": "Tracers",
        "canCreate": true,
        "canRead": true,
        "canUpdate": true,
        "canDelete": false
    },
    {
        "id": 26,
        "userID": 3,
        "moduleName": "GroupeVehicles",
        "canCreate": false,
        "canRead": true,
        "canUpdate": false,
        "canDelete": false
    },
    {
        "id": 27,
        "userID": 3,
        "moduleName": "Insurances",
        "canCreate": false,
        "canRead": true,
        "canUpdate": false,
        "canDelete": false
    },
    {
        "id": 28,
        "userID": 3,
        "moduleName": "Providers",
        "canCreate": false,
        "canRead": true,
        "canUpdate": false,
        "canDelete": false
    },
    {
        "id": 29,
        "userID": 3,
        "moduleName": "Vignettes",
        "canCreate": false,
        "canRead": true,
        "canUpdate": false,
        "canDelete": false
    },
    {
        "id": 30,
        "userID": 3,
        "moduleName": "Vouchers",
        "canCreate": false,
        "canRead": true,
        "canUpdate": false,
        "canDelete": false
    },
    {
        "id": 31,
        "userID": 4,
        "moduleName": "Employees",
        "canCreate": false,
        "canRead": true,
        "canUpdate": false,
        "canDelete": false
    },
    {
        "id": 32,
        "userID": 4,
        "moduleName": "Drivers",
        "canCreate": true,
        "canRead": true,
        "canUpdate": false,
        "canDelete": false
    },
    {
        "id": 33,
        "userID": 4,
        "moduleName": "Vehicles",
        "canCreate": true,
        "canRead": true,
        "canUpdate": true,
        "canDelete": false
    },
    {
        "id": 34,
        "userID": 4,
        "moduleName": "Missions",
        "canCreate": true,
        "canRead": true,
        "canUpdate": true,
        "canDelete": false
    },
    {
        "id": 35,
        "userID": 4,
        "moduleName": "Tracers",
        "canCreate": false,
        "canRead": true,
        "canUpdate": false,
        "canDelete": false
    },
    {
        "id": 36,
        "userID": 4,
        "moduleName": "GroupeVehicles",
        "canCreate": true,
        "canRead": true,
        "canUpdate": true,
        "canDelete": false
    },
    {
        "id": 37,
        "userID": 4,
        "moduleName": "Insurances",
        "canCreate": true,
        "canRead": true,
        "canUpdate": true,
        "canDelete": true
    },
    {
        "id": 38,
        "userID": 4,
        "moduleName": "Providers",
        "canCreate": false,
        "canRead": false,
        "canUpdate": false,
        "canDelete": false
    },
    {
        "id": 39,
        "userID": 4,
        "moduleName": "Vignettes",
        "canCreate": true,
        "canRead": true,
        "canUpdate": true,
        "canDelete": false
    },
    {
        "id": 40,
        "userID": 4,
        "moduleName": "Vouchers",
        "canCreate": false,
        "canRead": false,
        "canUpdate": false,
        "canDelete": false
    },
    {
        "id": 41,
        "userID": 5,
        "moduleName": "Employees",
        "canCreate": false,
        "canRead": true,
        "canUpdate": false,
        "canDelete": false
    },
    {
        "id": 42,
        "userID": 5,
        "moduleName": "Drivers",
        "canCreate": false,
        "canRead": false,
        "canUpdate": false,
        "canDelete": false
    },
    {
        "id": 43,
        "userID": 5,
        "moduleName": "Vehicles",
        "canCreate": false,
        "canRead": true,
        "canUpdate": false,
        "canDelete": false
    },
    {
        "id": 44,
        "userID": 5,
        "moduleName": "Missions",
        "canCreate": false,
        "canRead": false,
        "canUpdate": false,
        "canDelete": false
    },
    {
        "id": 45,
        "userID": 5,
        "moduleName": "Tracers",
        "canCreate": false,
        "canRead": false,
        "canUpdate": false,
        "canDelete": false
    },
    {
        "id": 46,
        "userID": 5,
        "moduleName": "GroupeVehicles",
        "canCreate": false,
        "canRead": true,
        "canUpdate": false,
        "canDelete": false
    },
    {
        "id": 47,
        "userID": 5,
        "moduleName": "Insurances",
        "canCreate": false,
        "canRead": true,
        "canUpdate": true,
        "canDelete": false
    },
    {
        "id": 48,
        "userID": 5,
        "moduleName": "Providers",
        "canCreate": true,
        "canRead": true,
        "canUpdate": true,
        "canDelete": true
    },
    {
        "id": 49,
        "userID": 5,
        "moduleName": "Vignettes",
        "canCreate": false,
        "canRead": true,
        "canUpdate": true,
        "canDelete": false
    },
    {
        "id": 50,
        "userID": 5,
        "moduleName": "Vouchers",
        "canCreate": true,
        "canRead": true,
        "canUpdate": true,
        "canDelete": true
    },
    {
        "id": 51,
        "userID": 6,
        "moduleName": "Employees",
        "canCreate": false,
        "canRead": false,
        "canUpdate": false,
        "canDelete": false
    },
    {
        "id": 52,
        "userID": 6,
        "moduleName": "Drivers",
        "canCreate": false,
        "canRead": true,
        "canUpdate": false,
        "canDelete": false
    },
    {
        "id": 53,
        "userID": 6,
        "moduleName": "Vehicles",
        "canCreate": false,
        "canRead": true,
        "canUpdate": false,
        "canDelete": false
    },
    {
        "id": 54,
        "userID": 6,
        "moduleName": "Missions",
        "canCreate": true,
        "canRead": true,
        "canUpdate": true,
        "canDelete": false
    },
    {
        "id": 55,
        "userID": 6,
        "moduleName": "Tracers",
        "canCreate": false,
        "canRead": true,
        "canUpdate": false,
        "canDelete": false
    },
    {
        "id": 56,
        "userID": 6,
        "moduleName": "GroupeVehicles",
        "canCreate": false,
        "canRead": false,
        "canUpdate": false,
        "canDelete": false
    },
    {
        "id": 57,
        "userID": 6,
        "moduleName": "Insurances",
        "canCreate": false,
        "canRead": false,
        "canUpdate": false,
        "canDelete": false
    },
    {
        "id": 58,
        "userID": 6,
        "moduleName": "Providers",
        "canCreate": false,
        "canRead": true,
        "canUpdate": true,
        "canDelete": false
    },
    {
        "id": 59,
        "userID": 6,
        "moduleName": "Vignettes",
        "canCreate": false,
        "canRead": false,
        "canUpdate": false,
        "canDelete": false
    },
    {
        "id": 60,
        "userID": 6,
        "moduleName": "Vouchers",
        "canCreate": false,
        "canRead": true,
        "canUpdate": true,
        "canDelete": true
    }
];

export let tracersDB: TracerModal[] = [];

export let providersDB: ProviderModal[] = [
    {
        "id": 2,
        "fullname": "Provider1",
        "email": "provider1@gmail.com",
        "matricule": "21AZ4526",
        "address": "Monastir",
        "phone": "12345678"
    },
    {
        "id": 3,
        "fullname": "Provider2",
        "email": "provider2@gmail.com",
        "matricule": "22ER1472",
        "address": "Sousse",
        "phone": "12345679"
    },
    {
        "id": 4,
        "fullname": "Provider3",
        "email": "provider3@gmail.com",
        "matricule": "32TY7412",
        "address": "Sfax",
        "phone": "12345677"
    },
    {
        "id": 5,
        "fullname": "Provider4",
        "email": "provider4@gmail.com",
        "matricule": "74UI1486",
        "address": "Mahdia",
        "phone": "12345676"
    },
    {
        "id": 6,
        "fullname": "Provider5",
        "email": "provider5@gmail.com",
        "matricule": "63OP4125",
        "address": "Tunis",
        "phone": "12345675"
    }
];

export let usersDB: UserModal[] = [
    {
        "id": 1,
        "fullname": "SupAdmin",
        "roleName": "superAdmin",
        "isSuperAdmin": true,
        "email": "MedLawani.jr@gmail.com",
        "password": "a",
        "address": "Monastir",
        "phone": "+216 24635003",
        "imageUrl": "https://raw.githubusercontent.com/Med-Li-Jr/images_demo/main/fleet_app/users/med_li_jr.jpg"
    },
    {
        "id": 2,
        "fullname": "AdmEmp",
        "roleName": "employee",
        "isSuperAdmin": false,
        "email": "adminemployee@gmail.com",
        "password": "a",
        "address": "Sousse",
        "phone": "+216 56358459",
        "imageUrl": "https://raw.githubusercontent.com/Med-Li-Jr/images_demo/main/fleet_app/users/adminemp.png"
    },
    {
        "id": 3,
        "fullname": "AdmDriver",
        "roleName": "driver",
        "isSuperAdmin": false,
        "email": "admdriver@gmail.com",
        "password": "a",
        "address": "Mahdia",
        "phone": "+225 12345678",
        "imageUrl": "https://raw.githubusercontent.com/Med-Li-Jr/images_demo/main/fleet_app/users/dicaprio.jpg"
    },
    {
        "id": 4,
        "fullname": "Emp1",
        "roleName": "employee",
        "isSuperAdmin": false,
        "email": "employee1@gmail.com",
        "password": "a",
        "address": "Sfax",
        "phone": "+225 12345679",
        "imageUrl": "https://raw.githubusercontent.com/Med-Li-Jr/images_demo/main/fleet_app/users/Henry_Cavill.jpg"
    },    
    {
        "id": 5,
        "fullname": "Emp2",
        "roleName": "employee",
        "isSuperAdmin": false,
        "email": "employee2@gmail.com",
        "password": "a",
        "address": "Tunis",
        "phone": "+216 12345670",
        "imageUrl": "https://raw.githubusercontent.com/Med-Li-Jr/images_demo/main/fleet_app/users/jensen.jpg"
    },
    {
        "id": 6,
        "fullname": "Driv1",
        "roleName": "driver",
        "isSuperAdmin": false,
        "email": "driver1@gmail.com",
        "password": "a",
        "address": "Kesserine",
        "phone": "+225 12345677",
        "imageUrl": "https://raw.githubusercontent.com/Med-Li-Jr/images_demo/main/fleet_app/users/Grant_Gustin.jpg"
    }
];

export let vehiclesDB: VehicleModal[] = [
    {
        "id": 2,
        "groupeId": 2,
        "groupeName": "Groupe1",
        "marque": "Vehicle1",
        "seatNbr": 5,
        "datePurchase": "2022-07-01",
        "dateStartUsage": "2022-07-10",
        "dateLimiteUsage": "2023-09-08",
        "imageUrl": "https://raw.githubusercontent.com/Med-Li-Jr/images_demo/main/fleet_app/vehicles/vehicle1.jpg"
    },
    {
        "id": 3,
        "groupeId": 2,
        "groupeName": "Groupe1",
        "marque": "Vehicle2",
        "seatNbr": 3,
        "datePurchase": "2022-07-05",
        "dateStartUsage": "2022-07-21",
        "dateLimiteUsage": "2024-02-20",
        "imageUrl": "https://raw.githubusercontent.com/Med-Li-Jr/images_demo/main/fleet_app/vehicles/vehicle2.jpg"
    },
    {
        "id": 4,
        "groupeId": 3,
        "groupeName": "Groupe2",
        "marque": "Vehicle3",
        "seatNbr": 5,
        "datePurchase": "2022-07-17",
        "dateStartUsage": "2022-07-20",
        "dateLimiteUsage": "2023-08-04",
        "imageUrl": "https://raw.githubusercontent.com/Med-Li-Jr/images_demo/main/fleet_app/vehicles/vehicle3.jpg"
    },
    {
        "id": 5,
        "groupeId": 2,
        "groupeName": "Groupe1",
        "marque": "Vehicle4",
        "seatNbr": 3,
        "datePurchase": "2022-07-05",
        "dateStartUsage": "2022-08-01",
        "dateLimiteUsage": "2024-05-01",
        "imageUrl": "https://raw.githubusercontent.com/Med-Li-Jr/images_demo/main/fleet_app/vehicles/vehicle4.jpg"
    },
    {
        "id": 6,
        "groupeId": 3,
        "groupeName": "Groupe2",
        "marque": "Vehicle5",
        "seatNbr": 3,
        "datePurchase": "2022-07-03",
        "dateStartUsage": "2022-09-01",
        "dateLimiteUsage": "2024-07-12",
        "imageUrl": "https://raw.githubusercontent.com/Med-Li-Jr/images_demo/main/fleet_app/vehicles/vehicle5.png"
    }
];

export let vignettesDB: VignetteModal[] = [
    {
        "id": 2,
        "vehicleId": 2,
        "vehicleMarque": "Vehicle1",
        "type": "Type1",
        "price": 123,
        "dueDate": "2022-12-01"
    },
    {
        "id": 3,
        "vehicleId": 3,
        "vehicleMarque": "Vehicle2",
        "type": "Type2",
        "price": 963,
        "dueDate": "2022-12-03"
    },
    {
        "id": 4,
        "vehicleId": 4,
        "vehicleMarque": "Vehicle3",
        "type": "Type3",
        "price": 147,
        "dueDate": "2023-01-28"
    },
    {
        "id": 5,
        "vehicleId": 3,
        "vehicleMarque": "Vehicle2",
        "type": "Type1",
        "price": 965,
        "dueDate": "2023-02-08"
    },
    {
        "id": 6,
        "vehicleId": 2,
        "vehicleMarque": "Vehicle1",
        "type": "Type3",
        "price": 951,
        "dueDate": "2023-12-08"
    },
    {
        "id": 7,
        "vehicleId": 3,
        "vehicleMarque": "Vehicle2",
        "type": "Type2",
        "price": 123,
        "dueDate": "2024-01-06"
    }
];

export let vouchersDB: VoucherModal[] = [
    {
        "id": 2,
        "vehicleId": 2,
        "vehicleMarque": "Vehicle1",
        "totalLiter": 159,
        "employeeId": 1,
        "employeeFullname": "SupAdmin",
        "providerId": 2,
        "providerFullname": "Provider1",
        "dateLimiteUsage": "2022-10-29",
        "price": 14,
        "dateStartUsage": "2022-07-21"
    },
    {
        "id": 3,
        "vehicleId": 3,
        "vehicleMarque": "Vehicle2",
        "totalLiter": 147,
        "employeeId": 1,
        "employeeFullname": "SupAdmin",
        "providerId": 3,
        "providerFullname": "Provider2",
        "dateLimiteUsage": "2022-10-01",
        "price": 75,
        "dateStartUsage": "2022-07-19"
    },
    {
        "id": 4,
        "vehicleId": 3,
        "vehicleMarque": "Vehicle2",
        "totalLiter": 96,
        "employeeId": 1,
        "employeeFullname": "SupAdmin",
        "providerId": 4,
        "providerFullname": "Provider3",
        "dateLimiteUsage": "2023-04-26",
        "price": 855,
        "dateStartUsage": "2022-08-06"
    },
    {
        "id": 5,
        "vehicleId": 4,
        "vehicleMarque": "Vehicle3",
        "totalLiter": 123,
        "employeeId": 1,
        "employeeFullname": "SupAdmin",
        "providerId": 5,
        "providerFullname": "Provider4",
        "dateLimiteUsage": "2023-01-14",
        "price": 789,
        "dateStartUsage": "2022-07-01"
    },
    {
        "id": 6,
        "vehicleId": 3,
        "vehicleMarque": "Vehicle2",
        "totalLiter": 159,
        "employeeId": 1,
        "employeeFullname": "SupAdmin",
        "providerId": 4,
        "providerFullname": "Provider3",
        "dateLimiteUsage": "2023-02-03",
        "price": 753,
        "dateStartUsage": "2022-11-09"
    },
    {
        "id": 7,
        "vehicleId": 2,
        "vehicleMarque": "Vehicle1",
        "totalLiter": 852,
        "employeeId": 1,
        "employeeFullname": "SupAdmin",
        "providerId": 6,
        "providerFullname": "Provider5",
        "dateLimiteUsage": "2022-11-05",
        "price": 456,
        "dateStartUsage": "2022-06-30"
    }
]


export let allSetInterval: any = [];
export let allMarker: any = [];
// export let mapTracer: any = null;
(window as any).groupesDB = groupesDB;
(window as any).insurancesDB = insurancesDB;
(window as any).missionsDB = missionsDB;
(window as any).privilegesDB = privilegesDB;
(window as any).providersDB = providersDB;
(window as any).tracersDB = tracersDB;
(window as any).vehiclesDB = vehiclesDB;
(window as any).vignettesDB = vignettesDB;
(window as any).vouchersDB = vouchersDB;
(window as any).usersDB = usersDB;
// (window as any).allMarker = function() {
//     return allMarker
// };
