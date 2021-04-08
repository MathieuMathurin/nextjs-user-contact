export interface Contact {
    id: string;

    userId: string;
    
    name: string;

    jobTitle: string;

    address: string;

    phoneNumbers: string[];

    email: string;

    picture?: string;
}
