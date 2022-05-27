import * as React from "react"

export interface InputSlug extends React.HTMLProps<HTMLInputElement> {
    onSlugChange?: (val: string) => void,
}

export function InputSlug(props: InputSlug) {
    const [text, setText] = React.useState("")

    const handleChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
            props.onChange?.(event)

            let slug = event.target.value.toLowerCase().replaceAll(/[^a-z0-9]/g, "-")
            props.onSlugChange?.(slug)
            setText(slug)
        },
        []
    )

    return (
        <input
            type="text"
            value={text}
            onChange={handleChange}
            {...props}
        />
    )
}