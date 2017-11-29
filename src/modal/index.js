import PropTypes from "prop-types";
import React, { Component } from "react";
import { createPortal } from "react-dom";

import "./index.css";

class Modal extends Component {
    constructor(props) {
        super(props);

        this.container = document.createElement("div");
        this.container.className = props.classNames.container;

        this.container.addEventListener(
            "click",
            this.handleBackgroundClick.bind(this)
        );

        this.container.addEventListener(
            "transitionend",
            this.handleTranstionend.bind(this)
        );

        this.handleKeydown = this.handleKeydown.bind(this);

        if (props.visible) {
            this.enter();
        }
    }

    componentWillUpdate({classNames: newClassNames}) {
        if (this.props.classNames.container !== newClassNames.container) {
            this.container.classList.remove(this.props.classNames.container);
            this.container.classList.add(newClassNames.container);
        }
    }

    componentDidUpdate({visible: prevVisible}) {
        if (prevVisible !== this.props.visible && this.props.visible) {
            this.enter();
        }

        if (prevVisible !== this.props.visible && !this.props.visible) {
            this.leave();
        }
    }

    handleTranstionend() {
        if (!this.props.transitionsEnabled) {
            return;
        }

        const {enter, enterActive, leave, leaveActive} = this.props.classNames;

        if (this.container.classList.contains(enter)) {
            this.container.classList.remove(enter, enterActive);
        }

        if (this.container.classList.contains(leave)) {
            this.removeContainer();
            this.container.classList.remove(leave, leaveActive);
        }
    }

    handleKeydown({ key }) {
        if (key === "Escape" && this.props.onDismiss) {
            this.props.onDismiss();
        }
    }

    handleBackgroundClick({ target }) {
        if (target === this.container && this.props.onDismiss) {
            this.props.onDismiss();
        }
    }

    appendContainer() {
        this.props.parentNode.appendChild(this.container);
        document.addEventListener("keydown", this.handleKeydown);
    }

    removeContainer() {
        this.props.parentNode.removeChild(this.container);
        document.removeEventListener("keydown", this.handleKeydown);
    }

    enter() {
        this.appendContainer();

        if (!this.props.transitionsEnabled) {
            return;
        }

        const {enter, enterActive} = this.props.classNames;

        this.container.classList.add(enter);

        setTimeout(() => this.container.classList.add(enterActive));
    }

    leave() {
        if (!this.props.transitionsEnabled) {
            this.removeContainer();
            return;
        }

        const {leave, leaveActive} = this.props.classNames;

        this.container.classList.add(leave);

        setTimeout(() => this.container.classList.add(leaveActive));
    }

    render() {
        return createPortal(
            <div className={this.props.classNames.content}>{this.props.children}</div>,
            this.container
        );
    }
}

Modal.propTypes = {
    parentNode: PropTypes.instanceOf(Node),
    onDismiss: PropTypes.func,
    transitionsEnabled: PropTypes.bool,
    classNames: PropTypes.shape({
        container: PropTypes.string,
        content: PropTypes.string,
        enter: PropTypes.string,
        enterActive: PropTypes.string,
        leave: PropTypes.string,
        leaveActive: PropTypes.string
    })
};

Modal.defaultProps = {
    parentNode: document.body,
    transitionsEnabled: true,
    classNames: {
        container: "modal",
        content: "modal__content",
        enter: "modal--enter",
        enterActive: "modal--enter-active",
        leave: "modal--leave",
        leaveActive: "modal--leave-active"
    }
}

export default Modal;
