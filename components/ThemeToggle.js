import React, { useState, useEffect } from "react";

export default function ThemeToggle() {
    const [theme, setTheme] = useState();


    useEffect(() => {
        console.log("TEMA", localStorage.getItem("theme"));
        if (localStorage.getItem("theme") != undefined) {
            setTheme(localStorage.getItem("theme"))
        } else {
            setTheme("dark")
        }
    }, [])

    useEffect(() => {

        localStorage.setItem("theme", theme);
        console.log("cambiato", theme);
        theme == "light" ? document.documentElement.style.setProperty("--luminosity", "0") : document.documentElement.style.setProperty("--luminosity", "255");
    }, [theme])


    return (
        <div className="ThemeToggle">
            <button type="button" onClick={() => setTheme(theme == "light" ? "dark" : "light")}>
                toggle mode
            </button>
        </div>
    )



}