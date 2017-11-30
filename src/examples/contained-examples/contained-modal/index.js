import React, { Component } from "react";

import Modal from "../../../modal";

import "./index.css";

class ContainedModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fields: this.props.fields
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps({ fields }) {
        this.setState({ fields });
    }

    handleChange({ target }) {
        const { value, name } = target;

        const fields = Object.assign({}, this.state.fields, {
            [name]: value
        });

        this.setState({ fields });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.props.onConfirm(this.state.fields);
    }

    render() {
        return (
            <Modal
                visible={this.props.visible}
                onDismiss={this.props.onDismiss}
            >
                <form onSubmit={this.handleSubmit}>
                    {Object.keys(this.state.fields).map(key => (
                        <label className="contained-modal__row" key={key}>
                            <span>{key}</span>
                            <input name={key} value={this.state.fields[key]} onChange={this.handleChange} />
                        </label>
                    ))}
                    <div className="contained-modal__row">
                        <button type="submit">
                            Ok
                        </button>
                        <button type="button" onClick={() => this.props.onApply(this.state.fields)}>
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
