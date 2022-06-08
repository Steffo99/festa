import { useReducer } from "react";


type FileState = {
    value: string,
    file: File,
    url: URL,
}

type FileActionClear = { type: "clear" }
type FileActionSet = { type: "set", value: string, file: File }

type FileAction = FileActionClear | FileActionSet


function fileReducer(state, action) {
    switch (action.type) {
        case "clear":

        case "set":

    }
}


export function useFileState() {
    const [value, dispatch] = useReducer(
    )

    /*
    const [value, setValue] = useState<string>("")
    const [file, setFile] = useState<File | null>(null)

    const onChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value)
            const file = e.target.files![0]
            setFile(file ?? null)
        },
        []
    )

    const doClear = useCallback(
        () => {
            setValue("")
            setFile(null)
        },
        []
    )

    return {
        value,
        file,
        onChange,
        doClear,
    }
    */
}