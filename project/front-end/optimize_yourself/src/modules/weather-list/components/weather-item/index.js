import React from "react";
import "./weather-item.scss"

const WeatherItem = ({item}) => {
    const {dt_txt, main, weather, wind, clouds} = item;
    return (
        <div className={'weather__item'}>
            <div className="weather__general-info">
                <div className="weather__time">{dt_txt.substr(-8, 5)}</div>
                <div className="weather__icon">
                    <img src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`} alt="weather-icon"/>
                </div>
            </div>
            <div className="weather__additional-info">
                <div className="weather__row">
                    <div
                        className="weather__info-elem weather__temperature">Температура: {main.temp}&deg;С,
                    </div>
                    <div
                        className="weather__info-elem weather__description"> Стан погоди: {weather[0].description},
                    </div>
                </div>
                <div className="weather__row">
                    <div className="weather__info-elem weather__wind">Вітер: {wind.speed} m/s,
                    </div>
                    <div className="weather__info-elem weather__clouds">Хмарність: {clouds.all}%,
                    </div>
                    <div
                        className="weather__info-elem weather__pressure">Тиск: {main.pressure} hpa
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeatherItem;