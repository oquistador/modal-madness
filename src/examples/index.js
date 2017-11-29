import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

import Overrides from './overrides';
import Contained from './contained';

const Examples = () => (
    <Router>
        <div>
            <h1>Modal Madness</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/overrides">Basic modals with overrides</Link>
                    </li>
                    <li>
                        <Link to="/contained">Contained modals</Link>
                    </li>
                </ul>
            </nav>
            <hr />
            <main>
                <Route path="/overrides" component={Overrides} />
                <Route path="/contained" component={Contained} />
            </main>
        </div>
    </Router>
);

export default Examples
