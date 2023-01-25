import React from 'react'
import { useState, useEffect } from 'react'
import WheatherForm from '../components/WheatherForm'
import WheaterMainInfo from '../components/WeatherMainInfo'
//import 'dotenv/config'
import styles from './weatherApp.module.css'
import Loading from '../components/Loading'

function Clima() {
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        loadInfo()
    }, [])

    useEffect(() => {
        document.title = `Weather | ${weather?.location.name ?? ''}`

    }, [weather])


    async function loadInfo(city = 'london') {
        try {
            const request = await fetch(`http://api.weatherapi.com/v1/current.json?aqi=no&key=4506edd465114abb85c191629232301&q=${city}`)
            const json = await request.json()

            setTimeout(() => {
                setWeather(json)
            }, 2000)


        } catch (error) {
            console.log(error)
        }
    }


    function handleChangeCity(city) {
        console.log(city);

        setWeather(null)
        loadInfo(city);

    }

    return (
        <div className={styles.weatherContainer}>
            <WheatherForm onChangeCity={handleChangeCity} />
            {weather ? <WheaterMainInfo weather={weather} /> : <Loading />}
        </div>
    )
}

export default Clima
