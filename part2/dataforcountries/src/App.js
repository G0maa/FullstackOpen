import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {

    const [country, setCountry] = useState('')
    const [countriesData, setCountriesData] = useState([])

    console.log("Rerender...")
    const onCountryChange = (event) => {
        // I don't think this is correct.
        // Also I believe that's too many requests, 
        // maybe wait 250ms after each keystroke or something.
        axios
            .get(`https://restcountries.com/v3.1/name/${event.target.value}`)
            .then((response) => {
                // console.log(response.data)
                console.log("Setting countries data")
                setCountriesData(response.data)
                // countriesData.forEach(element => {
                //     console.log(element.name.common)
                // });
            })
        console.log("Setting country")
        setCountry(event.target.value)
    }

    return (
        <>
            <p>Find Counries: </p>
            <input
                value={country}
                onChange={onCountryChange}
            />
            <Countries countriesData={countriesData} />
        </>
    )
}


const Countries = ({countriesData}) => {
    console.log("Inside Countries component:", countriesData)

    if(countriesData.length == 1) {
        const countryData = countriesData[0]
        return(
            <>
                <ShowCountry countryData={countryData} />
            </>
        )
    }
    else if(countriesData.length > 1 && countriesData.length <= 10)
        return(
            <>
                {countriesData.map((element, idx) => <li key={idx}>{element.name.common}</li>)}
            </>
        )
    else
        return(
            <>
                {/* Or no counries, but who's counting :)*/}
                <p>Too many countries, modify search query.</p>
            </>
        )
}

const ShowCountry = ({countryData}) => {
    console.log(countryData)
    const countryName = countryData.name.official
    const countryCapital = countryData.capital
    const countryArea = countryData.area

    const countryLanguages = []
    console.log(countryData.languages)
    for (let element in countryData.languages)
        countryLanguages.push(countryData.languages[element])
    
    const counrtyImageURL = countryData.flags.svg
    console.log(counrtyImageURL)
    
    return(
        <>
            <h1>{countryName}</h1>
            <p>Capital: {countryCapital}</p>
            <p>Area: {countryArea}</p>
            <p><strong>Languages: </strong></p>
            {countryLanguages.map((element, idx) => <li key={idx}>{element}</li>)}
            <img src={counrtyImageURL} alt="country flag" width={250}/>
        </>
    )
}
export default App