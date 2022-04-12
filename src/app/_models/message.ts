export interface Message {

    id: number,
    senderId: number,
    senderUsername: string,
    senderPhotoUrl: string,
    recientUsername: string,
    recientPhotoUrl: string,
    content: string,
    dateRead?: Date,
    messageSent: Date,

}