import { useState } from "react";

export default function BillInput({numPeople, setBillData}) {
    const [inputValue, setInputValue] = useState({
        totalKwh: "",
        totalPrice: "",
        kwhPeople: [],
    });

    const handleNumPeopleChange = () => {
        const newKwhPeople = Array.from({length: numPeople || 0}, () => ({
            name: '',
            prvKwh: '',
            currKwh: '',
        }));

        setInputValue(prev => ({
            ...prev,
            kwhPeople: newKwhPeople,
        }));
    };

    const handleClick = () => {
        setBillData(inputValue);
    };



    if (!numPeople) return null;

    if (inputValue.kwhPeople.length !== numPeople) {
        handleNumPeopleChange();
        setBillData({}); // also clear the table bill result if the num people change 
    } 

    return (
        <section className="bill-input container mb-5">
            <div className="mb-4">
                <hr style={{ border: 'none', height: '1px', backgroundColor: '#CBD5E1', opacity: 1}} />
                <h2 className="display-5">Enter Bill Details</h2>
            </div>

            <div className="col-12 col-md-4 mb-5">
                <label htmlFor="total-kwh" className="form-label">Total kWh used this month:</label>
                <input 
                    type="number" 
                    className="form-control mb-3" 
                    id="total-kwh" 
                    value={inputValue.totalKwh}
                    onChange={(e) => {setInputValue((prev) => ({...prev, totalKwh: e.target.value}))}}
                />
    
                <label htmlFor="total-price" className="form-label">Total price this month:</label> 
                <input 
                    type="number" 
                    className="form-control" 
                    id="total-price" 
                    value={inputValue.totalPrice}
                    onChange={(e) => {setInputValue((prev) => ({...prev, totalPrice: e.target.value}))}}
                />
            </div>

            <table className="table mb-4">
                <thead>
                    <tr>
                        <th>Room Number / Name</th>
                        <th>Room Previous kWh</th>
                        <th>Room Current kWh</th>
                    </tr>
                </thead>

                <tbody>
                    {inputValue.kwhPeople.map((_, i) => (
                        <tr key={i}>
                            <td>
                                <input
                                    type="text"
                                    className="form-control w-75"
                                    placeholder={`Person ${i + 1}`}
                                    value={inputValue.kwhPeople[i].name}
                                    onChange={(e) => {setInputValue((prev) => {
                                        const newKwhPeople = [...prev.kwhPeople];
                                        newKwhPeople[i] = {...newKwhPeople[i], name: e.target.value}
                                        return {...prev, kwhPeople: newKwhPeople}
                                    })}}
                                />
                            </td>

                            <td>
                                <input
                                    type="number"
                                    className="form-control w-75"
                                    value={inputValue.kwhPeople[i].prvKwh}
                                    onChange={(e) => {setInputValue((prev) => {
                                        const newKwhPeople = [...prev.kwhPeople];
                                        newKwhPeople[i] = {...newKwhPeople[i], prvKwh: e.target.value}
                                        return {...prev, kwhPeople: newKwhPeople}
                                    })}}
                                />
                            </td>

                            <td>
                                <input
                                    type="number"
                                    className="form-control w-75"
                                    value={inputValue.kwhPeople[i].currKwh}
                                    onChange={(e) => {setInputValue((prev) => {
                                        const newKwhPeople = [...prev.kwhPeople];
                                        newKwhPeople[i] = {...newKwhPeople[i], currKwh: e.target.value}
                                        return {...prev, kwhPeople: newKwhPeople}
                                    })}}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            <button className="btn btn-primary" onClick={handleClick}>Calculate</button>
        </section>
    );
}