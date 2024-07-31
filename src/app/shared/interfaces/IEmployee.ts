export interface IEmployee {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone?: number | null;
    deleted?: boolean | null;
}