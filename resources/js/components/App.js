import React, {Component} from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { Home } from '@/pages';
import Header from '@/components/Header';
import '@sass/app.scss';

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
            </div>
        );
    }
}

export default App;
