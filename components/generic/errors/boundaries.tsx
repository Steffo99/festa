import { Component, ErrorInfo, ReactNode } from "react";
import { ViewNotice } from "../views/notice";
import { ErrorBlock, ErrorInline, ErrorMain, ErrorView } from "./renderers";


export type ErrorBoundaryProps = {
    text: string,
    children: ReactNode,
}


export type ErrorBoundaryState = {
    error?: Error,
    errorInfo?: ErrorInfo,
}


/**
 * Error boundary component which displays a {@link ViewNotice} with an {@link ErrorBlock} containing the occurred error inside.
 * 
 * To be used in `pages/_app`.
 */
export class ErrorBoundaryView extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props)
        this.state = { error: undefined, errorInfo: undefined }
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        this.setState(state => {
            return { ...state, error, errorInfo }
        })
    }

    render() {
        if (this.state.error) {
            return (
                <ErrorView text={this.props.text} error={this.state.error} />
            )
        }
        else {
            return this.props.children
        }
    }
}


/**
 * Error boundary component which displays an {@link ErrorBlock} containing the occurred error inside.
 * 
 * To be used in other components.
 */
export class ErrorBoundaryBlock extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props)
        this.state = { error: undefined, errorInfo: undefined }
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        this.setState(state => {
            return { ...state, error, errorInfo }
        })
    }

    render() {
        if (this.state.error) {
            return (
                <ErrorBlock text={this.props.text} error={this.state.error} />
            )
        }
        else {
            return this.props.children
        }
    }
}


/**
 * Error boundary component which displays an {@link ErrorInline} containing the occurred error inside.
 * 
 * To be used in other components.
 */
export class ErrorBoundaryInline extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props)
        this.state = { error: undefined, errorInfo: undefined }
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        this.setState(state => {
            return { ...state, error, errorInfo }
        })
    }

    render() {
        if (this.state.error) {
            return (
                <ErrorInline text={this.props.text} error={this.state.error} />
            )
        }
        else {
            return this.props.children
        }
    }
}