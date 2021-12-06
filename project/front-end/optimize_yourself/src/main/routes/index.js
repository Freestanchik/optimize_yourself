import {Route, Switch} from "react-router-dom";
import WeatherList from "../../modules/weather-list";
import TodosList from "../../modules/todos-list";
import {AuthorizationForm} from "../../modules/authorization"
import {RegistrationForm} from "../../modules/registration"
import UserProfile from "../../modules/user-profile";

export default function Routes() {
    return (
        <Switch>
            <Route exact path={"/"} component={WeatherList}/>
            <Route exact path={"/TodoList"} component={TodosList}/>
            <Route exact path={"/Authorization"} component={AuthorizationForm}/>
            <Route exact path={"/registration"} component={RegistrationForm}/>
            <Route exact path={"/profile/:login"} component={UserProfile}/>
        </Switch>
    )
}