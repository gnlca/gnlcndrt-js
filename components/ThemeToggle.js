import React, { useState, useEffect } from "react";

export default function ThemeToggle() {
    const [theme, setTheme] = useState(); //non posso prelevare il valore dal localstorage da qui perchè non viene eseguito nel browser ma serverside (in next.js)

    //Riferimento
    //true = light theme
    //false = dark theme

    //Quando il componente viene renderizzato sul real dom e quindi posso accedere al localstorage del browser
    useEffect(() => {
        if (localStorage.getItem("theme") != undefined) {
            console.log("TEMA", localStorage.getItem("theme"));
            setTheme(JSON.parse(localStorage.getItem("theme")))
        } else {
            setTheme(false)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("theme", theme);
        console.log("cambiato", theme);
        theme ?
            document.documentElement.style.setProperty("--luminosity", "0") :
            document.documentElement.style.setProperty("--luminosity", "255");
    }, [theme])

    return (
        <div className="ThemeToggle">
            <button type="button" onClick={() => setTheme(!theme)}>
                <a>{theme ? "dark" : "light"}</a>
            </button>
        </div>
    )

}