export interface PrivilegeModal {

    id: number;

    userID: number;

    moduleName: string;

    canCreate: boolean;

    canRead: boolean;

    canUpdate: boolean;

    canDelete: boolean;
}

export interface PrivilegeCreate {

    userID: number;

    moduleName: string;

    canCreate: boolean;

    canRead: boolean;

    canUpdate: boolean;

    canDelete: boolean;
}

export interface PrivilegeRead {

    id: number;

    userID: number;

    moduleName: string;

    canCreate: boolean;

    canRead: boolean;

    canUpdate: boolean;

    canDelete: boolean;

}

export interface PrivilegeDetail {

    id: number;

    userID: number;

    moduleName: string;

    canCreate: boolean;

    canRead: boolean;

    canUpdate: boolean;

    canDelete: boolean;

}
export interface PrivilegeUpdate {

    id: number;

    userID: number;

    moduleName: string;

    canCreate: boolean;

    canRead: boolean;

    canUpdate: boolean;

    canDelete: boolean;
}
