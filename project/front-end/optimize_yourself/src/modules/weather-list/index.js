import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchWeather} from "./actions";
import WeatherItem from "./components/weather-item";
import "./weather.scss"

function WeatherList() {
    const weather = useSelector((state) => state['weatherReducer'].weather)
    const error = useSelector(state => state['weatherReducer'].error)
    const dispatch = useDispatch();
    let date = 0;
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (position) {
            dispatch(fetchWeather(position.coords.longitude, position.coords.latitude))
        });
    }, [dispatch]);


    return (
        <div className={'weather'}>
            <div className={"container"}>
                <h1>Погода</h1>
                {weather.length === 0
                    ?<p>Будь ласка, надайте доступ до своїх геоданних</p>
                    :<></>

                }
                {!error
                    ? weather.map((weatherItem, index) =>
                        (new Date(weatherItem.dt * 1000).toDateString() === date)
                            ? (<WeatherItem item={weatherItem} key={weatherItem.dt}/>)
                            : (<React.Fragment key={weatherItem.dt}>
                                <p className={"weather__date"}>
                                    {
                                        date = new Date(weatherItem.dt * 1000).toDateString()
                                    }
                                </p>
                                <WeatherItem item={weatherItem}/>
                            </React.Fragment>))
                    : <p>Проблеми з отриманням даних</p>
                }
            </div>
        </div>
    )

}

export default WeatherList