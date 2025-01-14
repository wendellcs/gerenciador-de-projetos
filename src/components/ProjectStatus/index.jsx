import '../../assets/sass/_icon.sass'

import {IoCheckmarkDoneCircleOutline, IoCodeWorkingSharp,  } from 'react-icons/io5';
import { MdCancel } from 'react-icons/md';
import { GiNightSleep } from 'react-icons/gi';

export default function ProjectStatus({status}){
    return (
        <>
            {status == 'not-started' && <MdCancel className='icon not-started'/>}
            {status == 'paused' && <GiNightSleep className='icon paused'/>}
            {status == 'in-progress' && <IoCodeWorkingSharp className='icon in-progress'/>}
            {status == 'completed' && <IoCheckmarkDoneCircleOutline className='icon completed'/>}
        </>
    )
}