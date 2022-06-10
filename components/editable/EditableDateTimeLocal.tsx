import { HTMLProps } from "react";
import { toDatetimeLocal } from "../../utils/dateFields";
import { FestaMoment } from "../extensions/FestaMoment";
import { Editable } from "./Editable";


export type EditableDateTimeLocalProps = Omit<HTMLProps<HTMLInputElement>, "value" | "max" | "min"> & { value: Date | null, max?: Date, min?: Date }


export function EditableDateTimeLocal(props: EditableDateTimeLocalProps) {
    return (
        <Editable
            editing={
                <input
                    type="datetime-local"
                    {...props}
                    value={props.value ? toDatetimeLocal(props.value) : undefined}
                    min={props.min ? toDatetimeLocal(props.min) : undefined}
                    max={props.max ? toDatetimeLocal(props.max) : undefined}
                />
            }
            preview={
                <FestaMoment date={props.value} />
            }
        />
    )
}