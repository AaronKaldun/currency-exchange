import React, { useState, useEffect } from "react";
import Dropdown from "./Dropdown";
import currencyApi from "../api/currencyApi";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";

const ConversionDisplay = ({ type }) => {
    const options = [
        {
            label: "Euro",
            value: "EUR",
            symbol: "€",
        },
        {
            label: "US-Dollar",
            value: "USD",
            symbol: "$",
        },
        {
            label: "Britische Pfund",
            value: "GBP",
            symbol: "£",
        },
    ];

    const [originCurrency, setOriginCurrency] = useState(options[0]);
    const [targetCurrency, setTargetCurrency] = useState(options[1]);
    const [rate, setRate] = useState(1);
    const [amount, setAmount] = useState(1);
    const [day, setDay] = useState(null);

    useEffect(() => {
        const getCurrencyDate = (url) => {
            currencyApi
                .get(url, {
                    params: {
                        base: originCurrency.value,
                        symbols: targetCurrency.value,
                    },
                })
                .then(({ data }) => {
                    setRate(data.rates[Object.keys(data.rates)[0]] * amount);
                });
        };

        if (type === "latest") getCurrencyDate("/latest");

        if (day && type === "past") getCurrencyDate("/" + day);
    }, [originCurrency, targetCurrency, amount, type, day]);

    return (
        <div className="ui container">
            <Dropdown
                options={options}
                selected={originCurrency}
                onSelectedChange={setOriginCurrency}
                label="Währung auswählen"
            />
            <Dropdown
                options={options}
                selected={targetCurrency}
                onSelectedChange={setTargetCurrency}
                label="Zielwährung wählen"
            />

            <div className="ui form">
                <div className="field">
                    <label className="label">Betrag eingeben:</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>
            </div>

            {type === "past" ? (
                <div>
                    <DayPicker
                        onDayClick={(day) =>
                            setDay(day.toISOString().split("T")[0])
                        }
                    />
                </div>
            ) : (
                ""
            )}

            <h2 className="ui header">{`${rate.toFixed(2)} ${
                targetCurrency.symbol
            }`}</h2>
        </div>
    );
};

export default ConversionDisplay;
