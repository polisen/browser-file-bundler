import React from 'react'
import {useSelector} from 'react-redux';


export default function Files() {
    const fileList = useSelector((state: any) => state.fileProcessing);
    return (
        <div>
            {Object.entries(fileList).map(([key, {objectType, cumulativeSize, conversionProgress, files}]) => {
                return (
                    
                )
            })}
        </div>
    )
}
