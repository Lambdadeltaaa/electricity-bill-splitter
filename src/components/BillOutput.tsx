import { useState } from "react";
import type { BillResult, Bill } from "../types/bill";
import splitBill from "../logic/splitBill";

interface BillOutputProps {
    bill: Bill,
}

export default function BillOutput({bill}: BillOutputProps) {
    const [billResult, setBillResult] = useState<BillResult | null>(null);

    const onSplitBill = () => {
        setBillResult(splitBill(bill));
    };

    return (
        <div className="mx-auto mt-4 mb-12 max-w-7xl px-4">
            <button
                onClick={onSplitBill}
                className="bg-blue-600 hover:bg-blue-500 font-semibold rounded-lg px-4 py-2"
            >
                Split Bill
            </button>

            {billResult !== null && 
                <div className="mt-16">
                    <h3 className="text-3xl sm:text-4xl font-semibold mb-6">
                        Results:
                    </h3>

                    <table className="w-full text-sm sm:text-base">
                        <thead>
                            <tr className="text-neutral-300 border-b-2 border-zinc-500">
                                <th className="py-2.5 px-1.5 text-left">Room Name</th>
                                <th className="py-2.5 px-1.5 text-left">Room kWh</th>
                                <th className="py-2.5 px-1.5 text-left">Common Area kWh</th>
                                <th className="py-2.5 px-1.5 text-left">Total kWh</th>
                                <th className="py-2.5 px-1.5 text-right font-semibold text-emerald-400">Price</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-zinc-700">
                            {billResult.roomResults.map((room, index) => (
                                <tr key={index}>
                                    <td className="py-2.5 px-1.5 text-left">{room.name === "" ? "Room " + (index + 1): room.name}</td>
                                    <td className="py-2.5 px-1.5 text-left">{isNaN(room.roomKwhUsed) ? "N/A" : Number(room.roomKwhUsed).toFixed(2)}</td>
                                    <td className="py-2.5 px-1.5 text-left">{isNaN(room.commonKwhUsed) ? "N/A" : Number(room.commonKwhUsed).toFixed(2)}</td>
                                    <td className="py-2.5 px-1.5 text-left">{isNaN(room.totalKwhUsed) ? "N/A" : Number(room.totalKwhUsed).toFixed(2)}</td>
                                    <td className="py-2.5 px-1.5 text-right font-semibold text-emerald-400">{isNaN(room.price) ? "N/A" : Number(room.price).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>

                        <tfoot>
                            {(() => {
                                const totalRoomKwh = billResult.roomResults.reduce((sum, curr) => sum + (Number(curr.roomKwhUsed) || 0), 0);
                                const totalCommonKwh = billResult.roomResults.reduce((sum, curr) => sum + (Number(curr.commonKwhUsed) || 0), 0);
                                const totalKwh = billResult.roomResults.reduce((sum, curr) => sum + (Number(curr.totalKwhUsed) || 0), 0);
                                const totalPrice = billResult.roomResults.reduce((sum, curr) => sum + (Number(curr.price) || 0), 0);

                                return (
                                    <tr className="font-semibold border-t-2 border-zinc-500">
                                        <th className="py-2.5 px-1.5 text-left" scope="row">Total</th>
                                        <td className="py-2.5 px-1.5 text-left">{totalRoomKwh.toFixed(2)}</td>
                                        <td className="py-2.5 px-1.5 text-left">{totalCommonKwh.toFixed(2)}</td>
                                        <td className="py-2.5 px-1.5 text-left">{totalKwh.toFixed(2)}</td>
                                        <td className="py-2.5 px-1.5 text-right font-bold text-emerald-300">{totalPrice.toFixed(2)}</td>
                                    </tr>
                                );
                            })()}
                        </tfoot>
                    </table>
                </div>
            }
        </div>
    )
}