export interface KeyValuePair {
    id: number;
    name: string;
}

export interface Contact {
    name: string;
    email?: any;
    phone: string;
}

export interface Vehicle {
    id: number;
    model: KeyValuePair;
    make: KeyValuePair;
    isRegistered: boolean;
    contact: Contact;
    lastUpdate: Date;
    features: KeyValuePair[];
}


export interface SaveVehicle {
    id: number;
    modelId: number;
    makeId: number;
    isRegistered: boolean;
    contact: Contact;
    features: number[];
}


