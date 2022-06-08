import { default as ReactMarkdown } from "react-markdown"

type FestaMarkdownProps = {
    markdown: string,
}

export function FestaMarkdown({markdown}: FestaMarkdownProps) {
    return (
        <ReactMarkdown
            components={{
                h1: "h3",
                h2: "h3",
            }}
        >
            {markdown}
        </ReactMarkdown>
    )
}