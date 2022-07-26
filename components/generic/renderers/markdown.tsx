import { Fragment, memo } from "react"
import { default as ReactMarkdown } from "react-markdown"
import { ReactMarkdownOptions } from "react-markdown/lib/react-markdown"

type FestaMarkdownRendererProps = Omit<ReactMarkdownOptions, "children"> & {
    code: string,
}

/**
 * Component rendering Markdown source with {@link ReactMarkdown}, using some custom settings to better handle user input.
 * 
 * Currently, it converts `h1` and `h2` into `h3`, and disables the rendering of `img` elements.
 */
export const FestaMarkdownRenderer = memo(({ code, ...props }: FestaMarkdownRendererProps) => {
    return (
        <ReactMarkdown
            {...props}
            components={{
                h1: "h2",  // h1 is reserved for the page name
                h2: "h3",
                h3: "h4",
                h4: "h5",
                h5: "h6",
                img: ({ }) => (<></>), // images reveal the IP of the user to third parties!
                ...props.components,
            }}
        >
            {code}
        </ReactMarkdown>
    )
})
FestaMarkdownRenderer.displayName = "FestaMarkdownRenderer"
