import { ChangeEvent, useCallback, useState } from "react";


type FileState = {
    value: string,
    file: File | null,
}


export function useFilePickerState() {
    const [state, setState] = useState<FileState>({ value: "", file: null })

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setState({
            value: e.target.value,
            file: e.target.files![0],
        })
    }

    return { state, onChange }
}