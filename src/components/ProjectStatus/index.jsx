import '../../assets/sass/_icon.sass'
import { useState } from 'react';
import {IoCheckmarkDoneCircleOutline, IoCodeWorkingSharp,  } from 'react-icons/io5';
import { MdCancel } from 'react-icons/md';
import { GiNightSleep } from 'react-icons/gi';

import './projectStatus.sass'

export default function ProjectStatus({simple, status, checkStatus}){
    const [checkNotStarted, setCheckNotStarted] = useState(true)
    const [checkPaused, setCheckPaused] = useState(false)
    const [checkInProgress, setCheckInProgress] = useState(false)
    const [checkCompleted, setCheckCompleted] = useState(false)

    const statusIcons = {
        'not-started': <MdCancel className="icon not-started" />,
        'paused': <GiNightSleep className="icon paused" />,
        'in-progress': <IoCodeWorkingSharp className="icon in-progress" />,
        'completed': <IoCheckmarkDoneCircleOutline className="icon completed" />,
    };
    
    function check(stt){
        switch(stt){
            case 'not-started':
                setCheckNotStarted(true)
                setCheckPaused(false)
                setCheckInProgress(false)
                setCheckCompleted(false)
    
                checkStatus(stt)
                break
            case 'paused':
                setCheckNotStarted(false)
                setCheckPaused(true)
                setCheckInProgress(false)
                setCheckCompleted(false)
    
                checkStatus(stt)
                break
            case 'in-progress':
                setCheckNotStarted(false)
                setCheckPaused(false)
                setCheckInProgress(true)
                setCheckCompleted(false)
    
                checkStatus(stt)
                break
            case 'completed':
                setCheckNotStarted(false)
                setCheckPaused(false)
                setCheckInProgress(false)
                setCheckCompleted(true)
    
                checkStatus(stt)
                break
        }
    }
    return (
        <>
            {simple ? (statusIcons[status]):
            (
                <div className='project-status'>
                    <div className={checkNotStarted ? 'status not-started checked' : 'status not-started'}  onClick={() => {check('not-started')}}>
                        {statusIcons['not-started']}
                    </div>

                    <div className={ checkPaused ? "status paused checked" : "status paused"} onClick={() => {check('paused')}}> 
                        {statusIcons['paused']}
                    </div>
            
                    <div className={ checkInProgress ? "status in-progress checked" : "status in-progress"} onClick={() => {check('in-progress')}}>
                        {statusIcons['in-progress']}
                    </div>

                    <div className={ checkCompleted ? "status completed checked" : "status completed"} onClick={() => {check('completed')}}>
                        {statusIcons['completed']}
                    </div>
                </div>
            )}
        </>
    )
}