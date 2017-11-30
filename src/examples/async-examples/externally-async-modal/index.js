import React, { Component } from "react";

import Modal from "../../../modal";

import "./index.css";

const ExternallyAsyncModal = props => (
    <Modal
        onDismiss={props.pending ? null : props.onDismiss}
        visible={props.visible}
    >
        <div className="externally-async-modal">
            <p>This modal relies on its parent to dismiss it asynchronously.</p>
            <button type="button" onClick={props.onAsyncAction}>
                Dismiss Asynchronously
            </button>
            {props.pending && (
                <div className="externally-async-modal__pending">Pending...</div>
            )}
        </div>
    </Modal>
);

export default ExternallyAsyncModal;
