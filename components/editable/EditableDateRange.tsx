import { faClock } from "@fortawesome/free-solid-svg-icons"
import { FestaIcon } from "../extensions/FestaIcon"
import { FormDateRange } from "../FormDateRange"


export function EditableDateRange() {
    // TODO

    return (
        <FormDateRange
            icon={
                <FestaIcon icon={faClock}/>
            }
            start={<>
            
            </>}
            connector={<>
                &nbsp;→&nbsp;
            </>}
            end={<>
            
            </>}
        />
    )
}