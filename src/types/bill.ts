// Input
export interface Room {
    name: string;
    peopleCount: number,
    includeCommonAreaSplit: boolean,
    previousKwh: number,
    currentKwh: number,
}

export interface Bill {
    totalKwhUsage: number,
    totalPrice: number,
    rooms: Room[],
}


// Output
export interface RoomResult {
    name: string,
    roomKwhUsed: number,
    commonKwhUsed: number,
    totalKwhUsed: number,
    price: number,
}

export interface BillResult {
    roomResults: RoomResult[],
}
