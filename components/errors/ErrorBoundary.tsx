import { Component, ErrorInfo, ReactNode } from "react";
import { ViewNotice } from "../view/ViewNotice";
import { ErrorBlock } from "./ErrorBlock";

type ErrorBoundaryProps = {
    text: string,
    children: ReactNode,
}

type ErrorBoundaryState = {
    error?: Error,
    errorInfo?: ErrorInfo,
}


export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props)
        this.state = {error: undefined, errorInfo: undefined}
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        this.setState(state => {
            return {...state, error, errorInfo}
        })
    }

    render() {
        if(this.state.error) {
            return (
                <ViewNotice
                    notice={
                        <ErrorBlock text={this.props.text} error={this.state.error}/>
                    }
                />
            )
        }
        else {
            return this.props.children
        }
    }
}