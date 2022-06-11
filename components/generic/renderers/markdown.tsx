import { memo } from "react"
import { default as ReactMarkdown } from "react-markdown"

type FestaMarkdownRendererProps = {
    code: string,
}

/**
 * Component rendering Markdown source with {@link ReactMarkdown}, using some custom settings to better handle user input.
 * 
 * Currently, it converts `h1` and `h2` into `h3`, and disables the rendering of `img` elements.
 */
export const FestaMarkdownRenderer = memo(({ code }: FestaMarkdownRendererProps) => {
    return (
        <ReactMarkdown
            components={{
                h1: "h3",  // h1 is reserved for the site name
                h2: "h3",  // h2 is reserved for the page name
                img: undefined, // images reveal the IP of the user to third parties!
            }}
        >
            {code}
        </ReactMarkdown>
    )
})
