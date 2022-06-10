import { faCalendar, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useDefinedContext } from "../../utils/definedContext";
import { FestaIcon } from "../extensions/FestaIcon";
import { FormFromTo } from "../form/FormFromTo";
import { EditableDateTimeLocal, EditableDateTimeLocalProps } from "./EditableDateTimeLocal";
import { EditingContext } from "./EditingContext";


type EditableEventDurationProps = {
    startProps: EditableDateTimeLocalProps,
    endProps: EditableDateTimeLocalProps,
}


export function EditableEventDuration({ startProps, endProps }: EditableEventDurationProps) {
    const [editing,] = useDefinedContext(EditingContext)

    return (
        <FormFromTo
            preview={!editing}
            icon={
                <FestaIcon icon={faCalendar} />
            }
            start={
                <EditableDateTimeLocal
                    max={endProps.value ?? undefined}
                    {...startProps}
                />
            }
            connector={
                <FestaIcon
                    icon={faChevronRight}
                />
            }
            end={
                <EditableDateTimeLocal
                    min={startProps.value ?? undefined}
                    {...endProps}
                />
            }
        />
    )
}