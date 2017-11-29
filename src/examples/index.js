import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

import Overrides from './overrides';

const Examples = () => (
    <Router>
        <div>
            <h1>Modal Madness</h1>
            <nav>
                <ul>
                    <li><Link to="/overrides">Modals with overrides</Link></li>
                </ul>
            </nav>
            <main>
                <Route path="/overrides" component={Overrides} />
            </main>
        </div>
    </Router>
);

export default Examples
