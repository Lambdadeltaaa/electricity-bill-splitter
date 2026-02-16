import { useState } from "react";

export default function NumPeopleInput({setNumPeople}) {
    const [inputValue, setInputValue] =  useState("");

    const handleClick = () => {
        const numPeople = Number(inputValue.trim());

        if (isNaN(numPeople) || !Number.isInteger(numPeople) || numPeople <= 0) return;
        setNumPeople(numPeople);
    };

    return (
        <section className="num-people-input container mb-5">
            <div className="col-12 col-md-4">
                <label htmlFor="num-people" className="form-label">Enter number of people:</label>
                <input 
                    type="number" 
                    className="form-control mb-3" 
                    id="num-people"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />

                <button className="btn btn-primary" onClick={handleClick}>Enter</button>
            </div>
        </section>
    );
}