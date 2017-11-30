import React, { Component } from 'react';

import ContainedModal from './contained-modal';

import "./index.css";

class ContainedExamples extends Component {
    constructor(props) {
        super(props);

        this.state = {
            aVisible: false,
            aFields: {
                one: '1',
                two: '2',
                three: '3'
            },
            bVisible: false,
            bFields: {
                one: 'Do',
                two: 'Re',
                three: 'Mi'
            }
        };

        this.createChangeHandler = this.createChangeHandler.bind(this);
        this.createOpenHandler = this.createOpenHandler.bind(this);
        this.createDismissHandler = this.createDismissHandler.bind(this);
        this.createConfirmHandler = this.createConfirmHandler.bind(this);
        this.createApplyHandler = this.createApplyHandler.bind(this);
    }

    createChangeHandler(type) {
        return ({ target }) => {
            const { value, name } = target;

            const fields = Object.assign({}, this.state[`${type}Fields`], {
                [name]: value
            });

            this.setState({ [`${type}Fields`]: fields });
        }
    }

    createOpenHandler(type) {
        return () => this.setState({ [`${type}Visible`]: true });
    }

    createDismissHandler(type) {
        return () => this.setState({ [`${type}Visible`]: false });
    }

    createConfirmHandler(type) {
        const handleDismiss = this.createDismissHandler(type);

        return fields => {
            this.setState({ [`${type}Fields`]: fields });
            handleDismiss();
        }
    }

    createApplyHandler(type) {
        return fields => {
            this.setState({ [`${type}Fields`]: fields });
        }
    }

    render() {
        return (
            <div>
                <p>These forms interact with different instances of the same <code>ContainedModal</code> component.</p>
                <form className="contained__form">
                    {Object.keys(this.state.aFields).map(key => (
                        <label className="contained__row" key={key}>
                            <span>{key}</span>
                            <input name={key} value={this.state.aFields[key]} onChange={this.createChangeHandler('a')} />
                        </label>
                    ))}
                    <div className="contained__row">
                        <button type="button" onClick={this.createOpenHandler('a')}>
                            Open ContainedModal A
                        </button>
                    </div>
                    <ContainedModal
                        visible={this.state.aVisible}
                        fields={this.state.aFields}
                        onApply={this.createApplyHandler('a')}
                        onConfirm={this.createConfirmHandler('a')}
                        onDismiss={this.createDismissHandler('a')}
                    />
                </form>
                <form className="contained__form">
                    {Object.keys(this.state.bFields).map(key => (
                        <label className="contained__row" key={key}>
                            <span>{key}</span>
                            <input name={key} value={this.state.bFields[key]} onChange={this.createChangeHandler('b')} />
                        </label>
                    ))}
                    <div className="contained__row">
                        <button type="button" onClick={this.createOpenHandler('b')}>
                            Open ContainedModal B
                        </button>
                    </div>
                    <ContainedModal
                        visible={this.state.bVisible}
                        fields={this.state.bFields}
                        onApply={this.createApplyHandler('b')}
                        onConfirm={this.createConfirmHandler('b')}
                        onDismiss={this.createDismissHandler('b')}
                    />
                </form>
            </div>
        );
    }
}

export default ContainedExamples;
