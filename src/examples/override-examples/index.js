import React, { Component } from 'react';

import Modal from '../../modal';

import './index.css';

class OverrideExamples extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false
        };

        this.handleOpen = this.handleOpen.bind(this);
        this.handleDismiss = this.handleDismiss.bind(this);
    }

    handleOpen(type) {
        this.setState({ [`${type}Visible`]: true });
    }

    handleDismiss(type) {
        this.setState({ [`${type}Visible`]: false });
    }

    render() {
        return (
            <div>
                <section>
                    <button type="button" onClick={() => this.handleOpen('default')}>
                        Open Default Modal
                    </button>
                    <Modal
                        onDismiss={() => this.handleDismiss('default')}
                        visible={this.state.defaultVisible}
                    >
                        <p>I am default modal.</p>
                        <p>Click the background mask or hit the <kbd>Escape</kbd> key to close me.</p>
                    </Modal>
                </section>
                <section>
                    <button type="button" onClick={() => this.handleOpen('noTransition')}>
                        Open Modal Without Transition
                    </button>
                    <Modal
                        onDismiss={() => this.handleDismiss('noTransition')}
                        visible={this.state.noTransitionVisible}
                        transitionsEnabled={false}
                    >
                        <p>I am a modal with <code>transitionsEnabled</code> set to <code>false</code>.</p>
                        <p>This prevents the modal from waiting for CSS transitions.</p>
                    </Modal>
                </section>
                <section>
                    <button type="button" onClick={() => this.handleOpen('customCss')}>
                        Open Modal With Custom CSS
                    </button>
                    <Modal
                        onDismiss={() => this.handleDismiss('customCss')}
                        visible={this.state.customCssVisible}
                        classNames={
                            Object.assign(
                                {},
                                Modal.defaultProps.classNames,
                                {
                                    container: 'custom-modal',
                                    enter: 'custom-modal--enter',
                                    enterActive: 'custom-modal--enter-active'
                                }
                            )
                        }
                    >
                        <p>I am a modal with custom CSS classes.</p>
                    </Modal>
                </section>
                <section>
                    <button type="button" onClick={() => this.handleOpen('customParent')}>
                        Open Modal In a Custom Parent Node
                    </button>
                    <div id="override-parent-node"></div>
                    <Modal
                        onDismiss={() => this.handleDismiss('customParent')}
                        visible={this.state.customParentVisible}
                        parentNode={document.getElementById('override-parent-node')}
                    >
                        <p>I am a modal that gets appended to a custom parent node.</p>
                    </Modal>
                </section>
            </div>
        );
    }
}

export default OverrideExamples;
