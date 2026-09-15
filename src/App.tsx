import { useState } from "react";
import type { Bill } from "./types/bill";

import Header from "./components/Header";
import BillInput from "./components/BillInput";
import BillOutput from "./components/BillOutput";

export default function App() {
    const [bill, setBill] = useState<Bill>({
        totalKwhUsage: 0,
        totalPrice: 0,
        rooms: [
            {name: "", peopleCount: 0, includeCommonAreaSplit: true, previousKwh: 0, currentKwh: 0},
            {name: "", peopleCount: 0, includeCommonAreaSplit: true, previousKwh: 0, currentKwh: 0},
        ]
    });

    return (
        <>
            <Header />
            <BillInput bill={bill} onBillChange={setBill} />
            <BillOutput bill={bill} />
        </>
    )
}