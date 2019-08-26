import { Role } from "../core/auth";

export class User
{
    id: number;
    nom: string;
    prenom: string;
    username: string;
    email: string;
    password: string;
    role: Role;
}
