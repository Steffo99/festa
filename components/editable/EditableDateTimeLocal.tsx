import { HTMLProps } from "react";
import { FestaMoment } from "../extensions/FestaMoment";
import { Editable } from "./Editable";

export function EditableDateTimeLocal(props: HTMLProps<HTMLInputElement> & { value: Date }) {
    return (
        <Editable
            editing={
                <input type="datetime-local" {...props} value={props.value.toISOString()} />
            }
            preview={
                <FestaMoment date={props.value} />
            }
        />
    )
}