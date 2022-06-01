import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [allCountriesData, setAllCountriesData] = useState([])

    useEffect(() => {
        axios
        .get(`https://restcountries.com/v3.1/all`)
        .then((response) => {
            console.log("restcountrie API request")
            setAllCountriesData(response.data)
        })
    }, [])

    console.log("Rerender...")
    const onSearchChange = (event) => {
        console.log("Search query", searchQuery)
        setSearchQuery(event.target.value)
    }

    const countriesData = allCountriesData.filter((country) => {
        const rule = country.name.common.toLowerCase()
        return(rule.match(searchQuery.toLowerCase()) !== null)
    })

    return (
        <>
            <p>
                Find Counries
                <input
                    value={searchQuery}
                    onChange={onSearchChange}
                />
            </p>
            <Countries countriesData={countriesData} />
        </>
    )
}


const Countries = ({countriesData}) => {
    if(countriesData.length >= 1 && countriesData.length <= 10) {
        return(
            <>
            {countriesData.map((element, idx) => <ShowCountry countryData={element} key={idx} />)}
            </>
        )
    }
    else
        return(
            <>
                {/* Or no counries, but who's counting :)*/}
                <p>Too many countries, modify search query.</p>
            </>
        )
}

const ShowCountry = ({countryData}) => {
    const [isShow, setIsShow] = useState(0)
   
    const [countryName, countryCapital, countryArea] = [countryData.name.common, countryData.capital, countryData.area]

    const countryLanguages = []
    for (let element in countryData.languages)
        countryLanguages.push(countryData.languages[element])
    
    const counrtyImageURL = countryData.flags.svg

    if(isShow)
        return(
            <>
                <div>
                    <h1>{countryName}</h1>
                    <p>Capital: {countryCapital}</p>
                    <p>Area: {countryArea}</p>
                    <p><strong>Languages: </strong></p>
                    {countryLanguages.map((element, idx) => <li key={idx}>{element}</li>)}
                    <img src={counrtyImageURL} alt="country flag" width={250}/>
                </div>
                <ShowWeather latlonObj={countryData.capitalInfo.latlng} countryCapital={countryCapital}/>
                <button onClick={() => setIsShow(!isShow)}>Hide</button>
            </>
        )
    else
        return(
            <p>
                {countryName}
                <button onClick={() => setIsShow(!isShow)}>Show</button>
            </p>
        )
}


const ShowWeather = ({latlonObj, countryCapital}) => {
    const [capitalWeather, setCapitalWeather] = useState({})

    const [capitalLat, capitalLong] = latlonObj
    const apiKey = process.env.REACT_APP_API_KEY
    
    useEffect(() => {
        axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${capitalLat}&lon=${capitalLong}&appid=${apiKey}&units=metric`)
        .then((response) => {
            console.log("OpenWeather API request")
            const newCapitalWeather = { }
            newCapitalWeather['temp'] = response.data.main.temp
            newCapitalWeather['wind'] = response.data.wind.speed
            newCapitalWeather['iconURL'] = `http://openweathermap.org/img/wn/${response.data.weather["0"].icon}.png`
            setCapitalWeather(newCapitalWeather)
        })
        // Because we have different return in `ShowCountry` this works,
        // if we didn't we'd have one single request unless having antoher solution.
    }, [ ])
    
    return(
        <div>
            <h1>Weather in {countryCapital}</h1>
            <p>Temperature {capitalWeather.temp} Celsius</p>
            <img src={capitalWeather.iconURL} alt="weather icon"/>
            <p>Wind {capitalWeather.wind} m/s</p>
        </div>
    )
}
export default App