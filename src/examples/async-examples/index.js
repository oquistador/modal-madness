import React, { Component } from 'react';

import InternallyAsyncModal from './internally-async-modal';
import ExternallyAsyncModal from './externally-async-modal';

class AsyncExamples extends Component {
    constructor(props) {
        super(props);

        this.state = {
            internallyAsyncModalVisible: false,
            externallyAsyncModalVisible: false,
            extenallyAsyncModalPending: false
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleDismissModal = this.handleDismissModal.bind(this);
        this.handleAsyncAction = this.handleAsyncAction.bind(this);
    }

    handleOpenModal(type) {
        this.setState({ [`${type}AsyncModalVisible`]: true });
    }

    handleDismissModal(type) {
        this.setState({ [`${type}AsyncModalVisible`]: false });
    }

    handleAsyncAction() {
        this.setState({ extenallyAsyncModalPending: true });

        this.performAsyncAction()
            .then(() => {
                this.setState({ extenallyAsyncModalPending: false });
                this.handleDismissModal('externally');
            });
    }

    performAsyncAction() {
        return new Promise(resolve => setTimeout(resolve, 1000));
    }

    render() {
        return (
            <div>
                <section>
                    <button
                        type="button"
                        onClick={() => this.handleOpenModal('internally')}
                    >
                        Open Modal that Asynchronously Dismisses Itself
                    </button>
                    <InternallyAsyncModal
                        visible={this.state.internallyAsyncModalVisible}
                        onDismiss={() => this.handleDismissModal('internally')}
                    />
                </section>
                <section>
                    <button
                        type="button"
                        onClick={() => this.handleOpenModal('externally')}
                    >
                        Open Modal that has its Parent Asynchronously Dimiss it
                    </button>
                    <ExternallyAsyncModal
                        visible={this.state.externallyAsyncModalVisible}
                        pending={this.state.extenallyAsyncModalPending}
                        onDismiss={() => this.handleDismissModal('externally')}
                        onAsyncAction={this.handleAsyncAction}
                    />
                </section>
            </div>
        );
    }
}

export default AsyncExamples;
