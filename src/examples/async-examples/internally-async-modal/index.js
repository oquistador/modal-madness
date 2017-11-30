import React, { Component } from "react";

import Modal from "../../../modal";

import "./index.css";

class InternallyAsyncModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pending: false
        };

        this.handleAsyncClick = this.handleAsyncClick.bind(this);
    }

    handleAsyncClick() {
        this.setState({ pending: true });

        this.performAsyncAction()
            .then(() => {
                this.setState({ pending: false });
                this.props.onDismiss && this.props.onDismiss();
            });
    }

    performAsyncAction() {
        return new Promise(resolve => setTimeout(resolve, 1000));
    }

    render() {
        return (
            <Modal
                onDismiss={this.state.pending ? null : this.props.onDismiss}
                visible={this.props.visible}
            >
                <div className="internally-async-modal">
                    <p>This modal calls <code>onDismiss</code> asynchronously.</p>
                    <button type="button" onClick={this.handleAsyncClick}>
                        Dismiss Asynchronously
                    </button>
                    {this.state.pending && (
                        <div className="internally-async-modal__pending">Pending...</div>
                    )}
                </div>
            </Modal>
        );
    }
}

export default InternallyAsyncModal;
