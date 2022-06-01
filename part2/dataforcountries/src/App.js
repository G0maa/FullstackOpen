import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [allCountriesData, setAllCountriesData] = useState([])
    const [countriesData, setCountriesData] = useState([])
    

    useEffect(() => {
        axios
        .get(`https://restcountries.com/v3.1/all`)
        .then((response) => {
            setAllCountriesData(response.data)
        })
    }, [])


    useEffect(() => {
        console.log("Search query: ", searchQuery)
        const newCountriesData = allCountriesData.filter((country) => {
            const rule = country.name.common.toLowerCase()
            return(rule.match(searchQuery.toLowerCase()) !== null)
        })
        setCountriesData(newCountriesData)
    
        // I'm not really sure about this solution either, how costly is it to add a dependency?
    }, [searchQuery, allCountriesData])


    console.log("Rerender...")
    const onSearchChange = (event) => {
        // There was... some mistake in older commits here, noticed before submitting tho :)
        setSearchQuery(event.target.value)

        // I am not sure if this should be placed here.
        // It seems counter-intuitive to change `countriesData` 
        // based on a state of `searchQuery` which isn't really reflected yet.
        // console.log("Search query: ", event.target.value)
        // const newCountriesData = allCountriesData.filter((country) => {
        //     const rule = country.name.common.toLowerCase()
        //     return(rule.match(event.target.value.toLowerCase()) !== null)
        // })
        // setCountriesData(newCountriesData)
    }


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

    const countryName = countryData.name.common
    const countryCapital = countryData.capital
    const countryArea = countryData.area

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
export default App