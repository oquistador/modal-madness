import React, { Component } from "react";

import Modal from "../modal";

import "./index.css";

class AsyncModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false
        };

        this.handleAsyncClick = this.handleAsyncClick.bind(this);
    }

    handleAsyncClick() {
        this.setState({ loading: true });

        this.handleDismiss = null;

        setTimeout(() => {
            this.setState({ loading: false });

            this.props.onDismiss && this.props.onDismiss();
        }, 3000);
    }

    render() {
        return (
            <Modal
                onDismiss={this.state.loading ? null : this.props.onDismiss}
                visible={this.props.visible}
            >
                <div className="async-modal">
                    <p>This modal dismisses asynchronously.</p>
                    <button type="button" onClick={this.handleAsyncClick}>
                        Dismiss Asynchronously
                    </button>
                    {this.state.loading && (
                        <div className="async-modal__loading">Dismissing...</div>
                    )}
                </div>
            </Modal>
        );
    }
}

export default AsyncModal;
