import { ReactNode } from "react";
import { useDefinedContext } from "../../utils/definedContext";
import { EditingContext } from "./EditingContext";

type EditableProps = {
    editing: JSX.Element,
    preview: JSX.Element,
}


export function BaseEditable({ editing, preview }: EditableProps) {
    const [isEditing,] = useDefinedContext(EditingContext)

    return isEditing ? editing : preview
}
