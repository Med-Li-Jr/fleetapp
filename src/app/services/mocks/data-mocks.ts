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

/* GROUPES DB */
export let groupesDB: GroupeModal[] =
    [
        {
            "id": 1,
            "name": "Groupe1",
            "description": "Description Groupe 1"
        },
        {
            "id": 2,
            "name": "Groupe2",
            "description": "Description Groupe 2"
        },
        {
            "id": 3,
            "name": "Groupe3",
            "description": "Description Groupe 3"
        },
        {
            "id": 4,
            "name": "Groupe4",
            "description": "Description Groupe 4"
        },
        {
            "id": 5,
            "name": "Groupe5",
            "description": "Description Groupe 5"
        }
    ]


/* INSURANCES DB */
export let insurancesDB: InsuranceModal[] =
    [
        {
            "id": 1,
            "vehicleId": 1,
            "vehicleMarque": "Vehicle1",
            "nameAgence": "Agence 1",
            "price": 123,
            "dateStartUsage": "2022-06-27",
            "dateLimiteUsage": "2022-07-08",
        },
        {
            "id": 2,
            "vehicleId": 3,
            "vehicleMarque": "Vehicle2",
            "nameAgence": "Agence 2",
            "price": 456,
            "dateStartUsage": "2022-06-29",
            "dateLimiteUsage": "2022-09-16",
        },
        {
            "id": 3,
            "vehicleId": 4,
            "vehicleMarque": "Vehicle3",
            "nameAgence": "Agence 3",
            "price": 789,
            "dateStartUsage": "2022-06-11",
            "dateLimiteUsage": "2022-10-28",
        },
        {
            "id": 4,
            "vehicleId": 3,
            "vehicleMarque": "Vehicle2",
            "nameAgence": "Agence 2",
            "price": 741,
            "dateStartUsage": "2022-08-18",
            "dateLimiteUsage": "2022-09-24",
        },
        {
            "id": 5,
            "vehicleId": 6,
            "vehicleMarque": "Vehicle4",
            "nameAgence": "Agence 2",
            "price": 852,
            "dateStartUsage": "2022-07-08",
            "dateLimiteUsage": "2022-10-20",
        }
    ]

/* MISSIONS DB */
export let missionsDB: MissionModal[] =

    [
        {
            "id": 2,
            "employeeId": 1,
            "vehicleId": 1,
            "driverId": 6,
            "status": "waiting",
            "sourceLatitude": 36.578482018843076,
            "sourceLongitude": 10.245929671685206,
            "sourceLocation": "السلام, Ben Arous",
            "destinationLatitude": 35.79910280910871,
            "destinationLongitude": 10.653609920609824,
            "destinationLocation": "قصيبة الشط, Sousse",
            "dateStart": "2022-07-01",
            "dateEnd": "2022-07-02",
            "employeeFullname": "SuperAdmin",
            "driverFullname": "Driver1",
            "vehicleMarque": "Vehicle1",
        },
        {
            "id": 3,
            "employeeId": 1,
            "vehicleId": 3,
            "driverId": 8,
            "status": "waiting",
            "sourceLatitude": 35.5304379885449,
            "sourceLongitude": 11.0302734375,
            "sourceLocation": "هيبون, Mahdia",
            "destinationLatitude": 33.484602764044965,
            "destinationLongitude": 10.393066406250002,
            "destinationLocation": "الراقوبة الغربية, Médenine",
            "dateStart": "2022-07-03",
            "dateEnd": "2022-07-05",
            "employeeFullname": "SuperAdmin",
            "driverFullname": "Driver2",
            "vehicleMarque": "Vehicle2",
        },
        {
            "id": 4,
            "employeeId": 5,
            "vehicleId": 4,
            "driverId": 6,
            "status": "finished",
            "sourceLatitude": 36.52552902240466,
            "sourceLongitude": 9.140625000000002,
            "sourceLocation": "تيبار, Béja",
            "destinationLatitude": 32.78542718260786,
            "destinationLongitude": 10.766601562500002,
            "destinationLocation": "قصر مهيرة, Tataouine",
            "dateStart": "2022-07-07",
            "dateEnd": "2022-07-10",
            "employeeFullname": "Employee2",
            "driverFullname": "Driver1",
            "vehicleMarque": "Vehicle3",
        },
        {
            "id": 5,
            "employeeId": 2,
            "vehicleId": 4,
            "driverId": 3,
            "status": "waiting",
            "sourceLatitude": 35.49556154352994,
            "sourceLongitude": 10.854492187500002,
            "sourceLocation": "الشراحيل, Monastir",
            "destinationLatitude": 34.721748842642256,
            "destinationLongitude": 10.634765625,
            "destinationLocation": "الحاجب, Sfax",
            "dateStart": "2022-07-29",
            "dateEnd": "2022-07-30",
            "employeeFullname": "AdminEmployee",
            "driverFullname": "AdminDriver",
            "vehicleMarque": "Vehicle3",
        }
    ]

/* PRIVILEGES DB */
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
        "canDelete": true
    },
    {
        "id": 12,
        "userID": 2,
        "moduleName": "Drivers",
        "canCreate": true,
        "canRead": true,
        "canUpdate": true,
        "canDelete": true
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
        "canUpdate": false,
        "canDelete": false
    },
    {
        "id": 15,
        "userID": 2,
        "moduleName": "Tracers",
        "canCreate": false,
        "canRead": true,
        "canUpdate": false,
        "canDelete": false
    },
    {
        "id": 16,
        "userID": 2,
        "moduleName": "GroupeVehicles",
        "canCreate": false,
        "canRead": true,
        "canUpdate": false,
        "canDelete": false
    },
    {
        "id": 17,
        "userID": 2,
        "moduleName": "Insurances",
        "canCreate": false,
        "canRead": true,
        "canUpdate": false,
        "canDelete": false
    },
    {
        "id": 18,
        "userID": 2,
        "moduleName": "Providers",
        "canCreate": false,
        "canRead": true,
        "canUpdate": false,
        "canDelete": false
    },
    {
        "id": 19,
        "userID": 2,
        "moduleName": "Vignettes",
        "canCreate": false,
        "canRead": false,
        "canUpdate": false,
        "canDelete": false
    },
    {
        "id": 20,
        "userID": 2,
        "moduleName": "Vouchers",
        "canCreate": false,
        "canRead": false,
        "canUpdate": false,
        "canDelete": false
    },
    {
        "id": 21,
        "userID": 3,
        "moduleName": "Employees",
        "canCreate": false,
        "canRead": false,
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
        "canDelete": true
    },
    {
        "id": 23,
        "userID": 3,
        "moduleName": "Vehicles",
        "canCreate": false,
        "canRead": true,
        "canUpdate": false,
        "canDelete": false
    },
    {
        "id": 24,
        "userID": 3,
        "moduleName": "Missions",
        "canCreate": false,
        "canRead": true,
        "canUpdate": true,
        "canDelete": false
    },
    {
        "id": 25,
        "userID": 3,
        "moduleName": "Tracers",
        "canCreate": false,
        "canRead": true,
        "canUpdate": false,
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
        "canRead": false,
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
        "canCreate": false,
        "canRead": false,
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
        "canDelete": true
    },
    {
        "id": 34,
        "userID": 4,
        "moduleName": "Missions",
        "canCreate": false,
        "canRead": false,
        "canUpdate": false,
        "canDelete": false
    },
    {
        "id": 35,
        "userID": 4,
        "moduleName": "Tracers",
        "canCreate": false,
        "canRead": false,
        "canUpdate": false,
        "canDelete": false
    },
    {
        "id": 36,
        "userID": 4,
        "moduleName": "GroupeVehicles",
        "canCreate": false,
        "canRead": true,
        "canUpdate": false,
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
        "canRead": true,
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
        "canDelete": true
    },
    {
        "id": 40,
        "userID": 4,
        "moduleName": "Vouchers",
        "canCreate": false,
        "canRead": true,
        "canUpdate": false,
        "canDelete": false
    },
    {
        "id": 41,
        "userID": 5,
        "moduleName": "Employees",
        "canCreate": false,
        "canRead": false,
        "canUpdate": false,
        "canDelete": false
    },
    {
        "id": 42,
        "userID": 5,
        "moduleName": "Drivers",
        "canCreate": true,
        "canRead": true,
        "canUpdate": true,
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
        "canCreate": true,
        "canRead": true,
        "canUpdate": true,
        "canDelete": true
    },
    {
        "id": 45,
        "userID": 5,
        "moduleName": "Tracers",
        "canCreate": false,
        "canRead": true,
        "canUpdate": false,
        "canDelete": false
    },
    {
        "id": 46,
        "userID": 5,
        "moduleName": "GroupeVehicles",
        "canCreate": true,
        "canRead": true,
        "canUpdate": true,
        "canDelete": true
    },
    {
        "id": 47,
        "userID": 5,
        "moduleName": "Insurances",
        "canCreate": true,
        "canRead": true,
        "canUpdate": false,
        "canDelete": false
    },
    {
        "id": 48,
        "userID": 5,
        "moduleName": "Providers",
        "canCreate": false,
        "canRead": false,
        "canUpdate": false,
        "canDelete": false
    },
    {
        "id": 49,
        "userID": 5,
        "moduleName": "Vignettes",
        "canCreate": false,
        "canRead": false,
        "canUpdate": false,
        "canDelete": false
    },
    {
        "id": 50,
        "userID": 5,
        "moduleName": "Vouchers",
        "canCreate": false,
        "canRead": true,
        "canUpdate": false,
        "canDelete": false
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
        "canCreate": true,
        "canRead": true,
        "canUpdate": false,
        "canDelete": false
    },
    {
        "id": 53,
        "userID": 6,
        "moduleName": "Vehicles",
        "canCreate": false,
        "canRead": false,
        "canUpdate": false,
        "canDelete": false
    },
    {
        "id": 54,
        "userID": 6,
        "moduleName": "Missions",
        "canCreate": false,
        "canRead": true,
        "canUpdate": false,
        "canDelete": false
    },
    {
        "id": 55,
        "userID": 6,
        "moduleName": "Tracers",
        "canCreate": false,
        "canRead": false,
        "canUpdate": false,
        "canDelete": false
    },
    {
        "id": 56,
        "userID": 6,
        "moduleName": "GroupeVehicles",
        "canCreate": false,
        "canRead": true,
        "canUpdate": false,
        "canDelete": false
    },
    {
        "id": 57,
        "userID": 6,
        "moduleName": "Insurances",
        "canCreate": false,
        "canRead": true,
        "canUpdate": false,
        "canDelete": false
    },
    {
        "id": 58,
        "userID": 6,
        "moduleName": "Providers",
        "canCreate": false,
        "canRead": false,
        "canUpdate": false,
        "canDelete": false
    },
    {
        "id": 59,
        "userID": 6,
        "moduleName": "Vignettes",
        "canCreate": false,
        "canRead": true,
        "canUpdate": false,
        "canDelete": false
    },
    {
        "id": 60,
        "userID": 6,
        "moduleName": "Vouchers",
        "canCreate": false,
        "canRead": false,
        "canUpdate": false,
        "canDelete": false
    },
    {
        "id": 61,
        "userID": 8,
        "moduleName": "Employees",
        "canCreate": false,
        "canRead": false,
        "canUpdate": false,
        "canDelete": false
    },
    {
        "id": 62,
        "userID": 8,
        "moduleName": "Drivers",
        "canCreate": false,
        "canRead": true,
        "canUpdate": false,
        "canDelete": false
    },
    {
        "id": 63,
        "userID": 8,
        "moduleName": "Vehicles",
        "canCreate": false,
        "canRead": true,
        "canUpdate": false,
        "canDelete": false
    },
    {
        "id": 64,
        "userID": 8,
        "moduleName": "Missions",
        "canCreate": false,
        "canRead": true,
        "canUpdate": false,
        "canDelete": false
    },
    {
        "id": 65,
        "userID": 8,
        "moduleName": "Tracers",
        "canCreate": false,
        "canRead": false,
        "canUpdate": false,
        "canDelete": false
    },
    {
        "id": 66,
        "userID": 8,
        "moduleName": "GroupeVehicles",
        "canCreate": false,
        "canRead": true,
        "canUpdate": false,
        "canDelete": false
    },
    {
        "id": 67,
        "userID": 8,
        "moduleName": "Insurances",
        "canCreate": false,
        "canRead": false,
        "canUpdate": false,
        "canDelete": false
    },
    {
        "id": 68,
        "userID": 8,
        "moduleName": "Providers",
        "canCreate": false,
        "canRead": false,
        "canUpdate": false,
        "canDelete": false
    },
    {
        "id": 69,
        "userID": 8,
        "moduleName": "Vignettes",
        "canCreate": false,
        "canRead": false,
        "canUpdate": false,
        "canDelete": false
    },
    {
        "id": 70,
        "userID": 8,
        "moduleName": "Vouchers",
        "canCreate": false,
        "canRead": false,
        "canUpdate": false,
        "canDelete": false
    }
]


/* PROVIDERS DB */
export let providersDB: ProviderModal[] =
    [
        {
            "id": 1,
            "matricule": "12AL7451",
            "fullname": "Provider1",
            "email": "provider1@gmail.com",
            "address": "Monastir",
            "phone": "56358459"
        },
        {
            "id": 4,
            "matricule": "74PM963",
            "fullname": "Provider2",
            "email": "provider2@gmail.com",
            "address": "Sousse",
            "phone": "56358458"
        },
        {
            "id": 6,
            "matricule": "96TG753",
            "fullname": "Provider3",
            "email": "provider3@gmail.com",
            "address": "Mahdia",
            "phone": "56358457"
        },
        {
            "id": 7,
            "matricule": "85NB741",
            "fullname": "Provider4",
            "email": "provider4@gmail.com",
            "address": "Tunis",
            "phone": "56358456"
        },
        {
            "id": 8,
            "matricule": "45QS985",
            "fullname": "Provider5",
            "email": "provider5@gmail.com",
            "address": "Djerba",
            "phone": "56358455"
        }
    ]

/* TRACERS DB */
export let tracersDB: TracerModal[] = []



/* VEHICLES DB */
export let vehiclesDB: VehicleModal[] =
    [
        {
            "id": 1,
            "groupeId": 1,
            "marque": "Vehicle1",
            "seatNbr": 4,
            "datePurchase": "2022-06-20",
            "dateStartUsage": "2022-06-26",
            "dateLimiteUsage": "2022-12-01",
            "imageUrl": "/assets/img/vehicles/vehicle1.jpg",
            "groupeName": "Groupe1",
        },
        {
            "id": 3,
            "groupeId": 2,
            "marque": "Vehicle2",
            "seatNbr": 5,
            "datePurchase": "2022-06-20",
            "dateStartUsage": "2022-06-23",
            "dateLimiteUsage": "2023-08-30",
            "imageUrl": "/assets/img/vehicles/vehicle2.jpeg",
            "groupeName": "Groupe2",
        },
        {
            "id": 4,
            "groupeId": 3,
            "marque": "Vehicle3",
            "seatNbr": 4,
            "datePurchase": "2022-06-20",
            "dateStartUsage": "2022-06-22",
            "dateLimiteUsage": "2024-07-31",
            "imageUrl": "/assets/img/vehicles/vehicle3.jpg",
            "groupeName": "Groupe3",
        },
        {
            "id": 6,
            "groupeId": 1,
            "marque": "Vehicle4",
            "seatNbr": 2,
            "datePurchase": "2022-06-28",
            "dateStartUsage": "2022-06-24",
            "dateLimiteUsage": "2023-03-24",
            "imageUrl": "/assets/img/vehicles/vehicle4.jpg",
            "groupeName": "Groupe1",
        },
        {
            "id": 7,
            "groupeId": 1,
            "marque": "Vehicle5",
            "seatNbr": 2,
            "datePurchase": "2022-06-20",
            "dateStartUsage": "2022-06-23",
            "dateLimiteUsage": "2024-05-14",
            "imageUrl": "/assets/img/vehicles/vehicle5.png",
            "groupeName": "Groupe1",
        },
        {
            "id": 8,
            "groupeId": 5,
            "marque": "Vehicle6",
            "seatNbr": 2,
            "datePurchase": "2022-06-27",
            "dateStartUsage": "2022-06-17",
            "dateLimiteUsage": "2023-10-20",
            "imageUrl": "/assets/img/vehicles/vehicle6.jpeg",
            "groupeName": "Groupe5",
        }
    ]


/* VIGNETTES DB */
export let vignettesDB: VignetteModal[] =
    [
        {
            "id": 1,
            "vehicleId": 1,
            "type": "Type1",
            "price": 123,
            "dueDate": "2022-07-07",
            "vehicleMarque": "Vehicle1",
        },
        {
            "id": 2,
            "vehicleId": 3,
            "type": "Type2",
            "price": 753,
            "dueDate": "2022-07-09",
            "vehicleMarque": "Vehicle2",
        },
        {
            "id": 3,
            "vehicleId": 4,
            "type": "Type3",
            "price": 147,
            "dueDate": "2022-06-23",
            "vehicleMarque": "Vehicle3",
        },
        {
            "id": 4,
            "vehicleId": 7,
            "type": "Type2",
            "price": 963.25,
            "dueDate": "2022-10-05",
            "vehicleMarque": "Vehicle5",
        },
        {
            "id": 5,
            "vehicleId": 1,
            "type": "Type2",
            "price": 12.3,
            "dueDate": "2022-10-21",
            "vehicleMarque": "Vehicle1",
        },
        {
            "id": 6,
            "vehicleId": 3,
            "type": "Type3",
            "price": 85.36,
            "dueDate": "2022-11-18",
            "vehicleMarque": "Vehicle2",
        }
    ]


/* VOUCHERS DB */
export let vouchersDB: VoucherModal[] =
    [
        {
            "id": 1,
            "employeeId": 3,
            "vehicleId": 1,
            "providerId": 1,
            "price": 123,
            "totalLiter": 456,
            "dateStartUsage": "2022-06-29",
            "dateLimiteUsage": "2022-07-08",
            "vehicleMarque": "Vehicle1",
            "employeeFullname": "SuperAdmin",
            "providerFullname": "Provider1",
        },
        {
            "id": 2,
            "employeeId": 3,
            "vehicleId": 3,
            "providerId": 4,
            "price": 789,
            "totalLiter": 147,
            "dateStartUsage": "2022-06-24",
            "dateLimiteUsage": "2022-10-26",
            "vehicleMarque": "Vehicle2",
            "employeeFullname": "SuperAdmin",
            "providerFullname": "Provider2",
        },
        {
            "id": 3,
            "employeeId": 3,
            "vehicleId": 4,
            "providerId": 6,
            "price": 753,
            "totalLiter": 951,
            "dateStartUsage": "2022-06-30",
            "dateLimiteUsage": "2022-12-07",
            "vehicleMarque": "Vehicle3",
            "employeeFullname": "SuperAdmin",
            "providerFullname": "Provider3",
        },
        {
            "id": 4,
            "employeeId": 3,
            "vehicleId": 6,
            "providerId": 7,
            "price": 147,
            "totalLiter": 123,
            "dateStartUsage": "2022-06-27",
            "dateLimiteUsage": "2022-07-02",
            "vehicleMarque": "Vehicle4",
            "employeeFullname": "SuperAdmin",
            "providerFullname": "Provider4",
        },
        {
            "id": 5,
            "employeeId": 3,
            "vehicleId": 4,
            "providerId": 8,
            "price": 145,
            "totalLiter": 963,
            "dateStartUsage": "2022-09-15",
            "dateLimiteUsage": "2023-03-22",
            "vehicleMarque": "Vehicle3",
            "employeeFullname": "SuperAdmin",
            "providerFullname": "Provider5",
        }
    ]


/* USERS DB */
export let usersDB: UserModal[] =

    [
        {
            "id": 1,
            "fullname": "SuperAdmin",
            "email": "spadmin@gmail.com",
            "password": "a",
            "phone": "56358459",
            "address": "Monastirr",
            "imageUrl": "/assets/img/users/med_li_jr.jpg",
            "roleName": "superAdmin",
            "isSuperAdmin": true,

        },
        {
            "id": 2,
            "fullname": "AdminEmployee",
            "email": "admemp@gmail.com",
            "password": "a",
            "phone": "56358458",
            "address": "Soussa",
            "imageUrl": "/assets/img/users/adminemp.png",
            "roleName": "employee",
            "isSuperAdmin": false,

        },
        {
            "id": 3,
            "fullname": "AdminDriver",
            "email": "admdriver@gmail.com",
            "password": "a",
            "phone": "56358457",
            "address": "Mahdia",
            "imageUrl": "/assets/img/users/jensen.jpeg",
            "roleName": "driver",
            "isSuperAdmin": false,

        },
        {
            "id": 4,
            "fullname": "Employee1",
            "email": "emp1@gmail.com",
            "password": "a",
            "phone": "56358456",
            "address": "Sfax",
            "imageUrl": "/assets/img/users/Grant_Gustin.jpg",
            "roleName": "employee",
            "isSuperAdmin": false,

        },
        {
            "id": 5,
            "fullname": "Employee2",
            "email": "emp2@gmail.com",
            "password": "a",
            "phone": "56358455",
            "address": "Tunis",
            "imageUrl": "/assets/img/users/grimm.jpg",
            "roleName": "employee",
            "isSuperAdmin": false,

        },
        {
            "id": 6,
            "fullname": "Driver1",
            "email": "driver1@gmail.com",
            "password": "a",
            "phone": "56358454",
            "address": "Medenine",
            "imageUrl": "/assets/img/users/driver1.png",
            "roleName": "driver",
            "isSuperAdmin": false,

        },
        {
            "id": 8,
            "fullname": "Driver2",
            "email": "driver2@gmail.com",
            "password": "a",
            "phone": "56358453",
            "address": "Moknine",
            "imageUrl": "/assets/img/users/driver2.png",
            "roleName": "driver",
            "isSuperAdmin": false,

        }
    ];


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
(window as any).allMarker = function() {
    return allMarker
};


