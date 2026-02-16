export default function InfoHeader() {
    return (
        <header className="info-header container mt-5 mb-5">
            <h1 className="display-5 mb-2">Electricity Bill Calculator (Malaysia)</h1>
            <p className="lead mb-4"><b>Disclaimer:</b> Built mainly for personal use. If you happen to use it, do so at your own risk.</p>
            
            <ul className="list-group list-group-flush">
                <li className="list-group-item">This calculator uses proportional splitting to determine how much each person should pay.</li>
                <li className="list-group-item">Formula = (kWh used by a person / Total kWh used) * Total Price</li>
                <li className="list-group-item">Not accurate for very high usage (over 1000kWh). Do not rely on it in those cases.</li>
            </ul>
        </header>
    );
}