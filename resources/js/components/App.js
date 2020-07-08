import React, {Component} from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { Home } from '../pages';
import Header from './Header';
import Footer from './Footer';

class App extends Component {
    render() {
        return (
            <div>
                <Header />

                <main className="main">
                    <BrowserRouter>
                       <Route exact path="/" component={Home}/>
                    </BrowserRouter>
                </main>

                <Footer />
            </div>
        );
    }
}

export default App;
