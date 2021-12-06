import {ConnectedRouter} from "connected-react-router";
import {history} from "./main/store/"
import Header from "./libs/components/header";
import Routes from "./main/routes";
import Footer from "./libs/components/footer";
import './resources/styles/App.css';

function App() {
    return (
        <ConnectedRouter history={history}>
            <div className="App">
                <Header/>
                <div className={"content-container"}>
                    <Routes/>
                </div>
                <Footer/>
            </div>
        </ConnectedRouter>
    );
}

export default App;
