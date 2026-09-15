import type { Bill, Room } from "../types/bill"

interface BillInputProps {
    bill: Bill,
    onBillChange: (bill: Bill) => void; 
}

export default function BillInput({bill, onBillChange}: BillInputProps) {
    const addRoom = () => {
        const newRoom: Room = {
            name: "",
            peopleCount: 0,
            includeCommonAreaSplit: true,
            previousKwh: 0,
            currentKwh: 0,
        };
        onBillChange({ ...bill, rooms: [...bill.rooms, newRoom] });
    };
    
    const deleteRoom = (index: number) => {
        onBillChange({ ...bill, rooms: bill.rooms.filter((_, i) => i !== index) });
    }

    const updateRoom = <K extends keyof Room>(index: number, field: K, value: Room[K]) => {
        const updatedRooms = bill.rooms.map((room, i) => 
            i === index ? { ...room, [field]: value } : room
        );
        onBillChange({ ...bill, rooms: updatedRooms })
    }

    return (
        <div className="mx-auto mt-16 max-w-7xl px-4">
            <h2 className="text-3xl sm:text-4xl font-semibold mb-4">
                Enter Bill Details:
            </h2>

            {/* Input total kwh and price */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-12 mb-12 bg-zinc-800 border border-zinc-700 rounded-lg p-4">
                <div className="flex-1">
                    <label htmlFor="total-kwh" className="block text-neutral-300 mb-1.5">
                        Total kWh used this month:
                    </label>
                    <input
                        id="total-kwh" 
                        type="number" 
                        value={bill.totalKwhUsage === 0 ? "" : bill.totalKwhUsage}
                        onChange={(e) => onBillChange({ ...bill, totalKwhUsage: Number(e.target.value)})}
                        className="w-full bg-zinc-900 border border-zinc-700 focus:border-zinc-500 outline-none rounded px-3 py-2"
                    />
                </div>

                <div className="flex-1">
                    <label htmlFor="total-price" className="block text-neutral-300 mb-1.5">
                        Total price this month:
                    </label>
                    <input
                        id="total-price" 
                        type="number" 
                        value={bill.totalPrice === 0 ? "" : bill.totalPrice}
                        onChange={(e) => onBillChange({ ...bill, totalPrice: Number(e.target.value)})}
                        className="w-full bg-zinc-900 border border-zinc-700 focus:border-zinc-500 outline-none rounded px-3 py-2"
                    />
                </div>
            </div>

            {/* Input each room's particulars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                {bill.rooms.map((room, index) => (
                    <div key={index} className="bg-zinc-800 border border-zinc-700 rounded-lg p-4 space-y-6">
                        <div className="flex gap-6">
                            <div className="flex-1">
                                <label className="block text-neutral-300 mb-1.5">
                                    Room Name:
                                </label>
                                <input 
                                    type="text"
                                    value={room.name}
                                    placeholder={"Room " + (index + 1)}
                                    onChange={(e) => updateRoom(index, "name", e.target.value)}
                                    className="w-full bg-zinc-900 border border-zinc-700 focus:border-zinc-500 outline-none rounded px-2.5 py-1.5 placeholder-neutral-600"
                                />
                            </div>

                            <div className="w-28">
                                <label className="block text-neutral-300 mb-1.5">
                                    No. of People:
                                </label>
                                <input 
                                    type="number"
                                    value={room.peopleCount === 0 ? "" : room.peopleCount}
                                    onChange={(e) => updateRoom(index, "peopleCount", Number(e.target.value))}
                                    className="w-full bg-zinc-900 border border-zinc-700 focus:border-zinc-500 outline-none rounded px-2.5 py-1.5"
                                />
                            </div>
                        </div>

                        <div className="flex gap-6">
                            <div className="flex-1">
                                <label className="block text-neutral-300 mb-1.5">
                                    Prev. kWh:
                                </label>
                                <input
                                    type="number"
                                    value={room.previousKwh === 0 ? "" : room.previousKwh}
                                    onChange={(e) => updateRoom(index, "previousKwh", Number(e.target.value))}
                                    className="w-full bg-zinc-900 border border-zinc-700 focus:border-zinc-500 outline-none rounded px-2.5 py-1.5"
                                />
                            </div>

                            <div className="flex-1">
                                <label className="block text-neutral-300 mb-1.5">
                                    Curr. kWh:
                                </label>
                                <input
                                    type="number"
                                    value={room.currentKwh === 0 ? "" : room.currentKwh}
                                    onChange={(e) => updateRoom(index, "currentKwh", Number(e.target.value))}
                                    className="w-full bg-zinc-900 border border-zinc-700 focus:border-zinc-500 outline-none rounded px-2.5 py-1.5"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 text-neutral-300">
                                <input
                                    type="checkbox"
                                    checked={room.includeCommonAreaSplit}
                                    onChange={(e) => updateRoom(index, "includeCommonAreaSplit", e.target.checked)}
                                    className="w-4 h-4 accent-emerald-600 cursor-pointer"
                                />
                                Add Common Area kWh?
                            </label>

                            <button
                                onClick={() => deleteRoom(index)}
                                className="text-red-400 hover:text-red-300"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="text-right">
                <button
                    onClick={addRoom}
                    className="bg-emerald-600 hover:bg-emerald-500 font-semibold rounded-lg px-4 py-2"
                >
                    Add Room
                </button>
            </div>
        </div>
    )
}