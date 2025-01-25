import './datePicker.sass'

import { verifyDate } from '../../services/dateFunctions'


// Fazer as verificações relacionadas à data considerando o padrão americano
export function DatePicker(){
    return (
        <input type="date" className="date-input"/>
    )
}