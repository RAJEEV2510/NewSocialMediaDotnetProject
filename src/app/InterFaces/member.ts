import { Photo } from "./photo";

export interface Member {
    id: number;
    userName: string;
    knownAs: string;
    photoUrl: string;
    dateOfBirth: Date;
    created: Date;
    age: number;
    lastActive: Date;
    gender: string;
    introduction: string;
    lookingFor: string;
    country: string;
    interest: string;
    city: string;
    photos: Photo[];
}