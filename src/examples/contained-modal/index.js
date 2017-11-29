import React, { Component } from "react";

import Modal from "../modal";

import "./index.css";

class ContainedModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            formValues: props.formValues || {}
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleApply = this.handleApply.bind(this);
        this.handleOk = this.handleOk.bind(this);
    }

    handleChange({ target }) {
        const { value, name } = target;

        const formValues = Object.assign({}, this.state.formValues, {
            [name]: value
        });

        this.setState({ formValues });
    }

    handleApply() {
        this.props.onApply(this.state.formValues);
    }

    handleOk() {
        this.handleApply();
        this.props.onDismiss();
    }

    render() {
        return (
            <Modal
                visible={this.props.visible}
                onDismiss={this.props.onDismiss}
                classNames={
                    Object.assign({}, Modal.defaultProps.classNames, {content: 'contained-modal__content'})
                }
            >
                <form>
                    <div className="contained-modal__row">
                        <p>
                            I am a contained modal component that uses the Modal component.
                        </p>
                        <p>In this modal we have one of those OK/Apply/Cancel forms.</p>
                    </div>
                    <div className="contained-modal__row">
                        <input
                            name="A"
                            value={this.state.formValues.A}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="contained-modal__row">
                        <input
                            name="B"
                            value={this.state.formValues.B}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="contained-modal__row">
                        <input
                            name="C"
                            value={this.state.formValues.C}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="contained-modal__row">
                        <button type="button" onClick={this.handleOk}>
                            Ok
                        </button>
                        <button type="button" onClick={this.handleApply}>
                            Apply
                        </button>
                        <button type="button" onClick={this.props.onDismiss}>
                            Cancel
                        </button>
                    </div>
                </form>
            </Modal>
        );
    }
}

export default ContainedModal;
