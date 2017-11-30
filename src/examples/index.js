import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

import OverrideExamples from './override-examples';
import ContainedExamples from './contained-examples';
import AsyncExamples from './async-examples';

const Examples = () => (
    <Router>
        <div>
            <h1>Modal Madness</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/override-examples">Basic modals with overrides</Link>
                    </li>
                    <li>
                        <Link to="/contained-examples">Contained modals</Link>
                    </li>
                    <li>
                        <Link to="/async-examples">Async modals</Link>
                    </li>
                </ul>
            </nav>
            <hr />
            <main>
                <Route path="/override-examples" component={OverrideExamples} />
                <Route path="/contained-examples" component={ContainedExamples} />
                <Route path="/async-examples" component={AsyncExamples} />
            </main>
        </div>
    </Router>
);

export default Examples
