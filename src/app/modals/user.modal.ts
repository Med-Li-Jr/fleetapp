import { PrivilegeCreate, PrivilegeRead, PrivilegeUpdate } from "./privilege.modal";

export interface UserModal {

    id: number;
    fullname: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    roleName: string;
    isSuperAdmin: boolean;
    imageUrl: any;
}

export interface UserCreate {
    fullname: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    imageUser: any;
    roleName: string;
    isSuperAdmin: boolean;
    allPrivileges: PrivilegeCreate[]
}

export interface UserRead {
    id: number,
    fullname: string;
    email: string;
    phone: string;
    roleName: string;
    isSuperAdmin: boolean;
    imageUrl: string;
}

export interface UserDetail {
    id: number,
    fullname: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    imageUrl: any;
    roleName: string;
    isSuperAdmin: boolean;
    allPrivileges: PrivilegeRead[]
}

export interface UserUpdate {
    id: number,
    fullname: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    imageUser: any;
    roleName: string;
    isSuperAdmin: boolean;
    allPrivileges: PrivilegeUpdate[]
}
