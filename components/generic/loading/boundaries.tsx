import { ReactNode, Suspense } from "react"
import { LoadingInline, LoadingMain } from "./renderers"


export type LoadingBoundaryProps = {
    text?: string,
    children: ReactNode,
}


export function LoadingBoundaryMain({ text, children }: LoadingBoundaryProps) {
    return (
        <Suspense fallback={<LoadingMain text={text} />}>
            {children}
        </Suspense>
    )
}

export function LoadingBoundaryInline({ text, children }: LoadingBoundaryProps) {
    return (
        <Suspense fallback={<LoadingInline text={text} />}>
            {children}
        </Suspense>
    )
}
