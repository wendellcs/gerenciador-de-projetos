import { useEffect, useState } from 'react'
import './header.sass'
export default function Header(page){
    const [_class, _setClass] = useState(null)
    useEffect(( ) => {
        if(page){
            _setClass(page.page)
        }
    }, [page])

    return (
        <div className={`container-header ` + _class}>
            Header
        </div>
    )
}