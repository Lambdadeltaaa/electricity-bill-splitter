export default function Header() {
    return (
        <div className="mx-auto mt-12 max-w-7xl px-4">
            <h1 className="text-3xl sm:text-4xl font-semibold mb-4">Electricity Bill Splitter</h1>
            <p className="text-lg mb-8"><b>Disclaimer</b>: Built mainly for personal use in Malaysia. If you happen to use it, please double-check important splits yourself.</p>

            <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
                <p className="font-semibold mb-3">Calculation Steps and Assumptions:</p>

                <ul className="space-y-1.5 list-disc pl-4">
                    <li>Each room's own usage is calculated from its meter readings.</li>
                    <li>Common area usage is then found by subtracting all room usage from total bill.</li>
                    <li>Common area kWh is then split among rooms opted into the split by number of people.</li>
                    <li>Each room's total kWh (own + common) is used to calculate its price by the formula = (Room's Total kWh / Bill's Total kWh) * Total Price.</li>
                    <li>In Malaysia, this proportional splitting formula is not accurate if total bill usage is above 1000kWh, and shouldn't be relied on if so.</li>
                </ul>      
            </div>
        </div>
    )
}