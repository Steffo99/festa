import { ReactNode, Suspense } from "react"
import { LoadingMain } from "./renderers"


export type LoadingBoundaryProps = {
    text?: string,
    children: ReactNode,
}


export function LoadingBoundaryPage({ text, children }: LoadingBoundaryProps) {
    return (
        <Suspense fallback={<LoadingMain text={text} />}>
            {children}
        </Suspense>
    )
}