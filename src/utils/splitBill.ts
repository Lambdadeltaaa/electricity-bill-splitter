import type { Bill, RoomResult, BillResult} from "../types/bill";

export default function splitBill(bill: Bill): BillResult {
    // find kwh used by each rooms (not including common area) and sum them up
    const roomUsages = bill.rooms.map(room => (room.currentKwh - room.previousKwh));
    const totalRoomUsages = roomUsages.reduce((accu, curr) => (accu + curr), 0);


    // find common area kwh, then its splitted amount based on number of people included
    const commonAreaKwh = bill.totalKwhUsage - totalRoomUsages;
    const commonSplitPeopleCount = bill.rooms
        .filter(room => room.includeCommonAreaSplit)
        .reduce((accu, curr) => (accu + curr.peopleCount), 0);

    const commonKwhPerPerson = commonAreaKwh / commonSplitPeopleCount;


    // builds the return object
    const roomResults: RoomResult[] = bill.rooms.map(room => {
        const roomKwhUsed = room.currentKwh - room.previousKwh;
        const commonKwhUsed = room.includeCommonAreaSplit ? room.peopleCount * commonKwhPerPerson : 0;
        
        const totalKwhUsed = roomKwhUsed + commonKwhUsed;
        const price = (totalKwhUsed / bill.totalKwhUsage) * bill.totalPrice;

        return {
            name: room.name,
            roomKwhUsed,
            commonKwhUsed,
            totalKwhUsed,
            price
        };
    });

    return { roomResults };
}