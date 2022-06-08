import { HTMLProps } from "react";
import { HumanDate } from "../HumanDate";
import { Editable } from "./Editable";

export function EditableDateTimeLocal(props: HTMLProps<HTMLInputElement> & { value: Date }) {
    return (
        <Editable
            editing={
                <input type="datetime-local" {...props} value={props.value.toISOString()} />
            }
            preview={
                <HumanDate date={props.value} />
            }
        />
    )
}