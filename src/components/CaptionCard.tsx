import React from 'react'
import type { CaptionType } from '~types/CaptionType'

interface Props {
    data: CaptionType
}

const CaptionCard: React.FC<Props> = ({ data }) => {

    const handleClick = () => {
        console.log("hi")
    }


    return (
        <div
            onClick={handleClick}
            style={{
                display: 'flex',
                flexDirection: 'row',
                alignContent: 'center',
                justifyContent: 'space-between',
                width: '95%',
                backgroundColor: 'grey',
                borderRadius: '5px',
                padding: '5px',
                color: 'black',
                cursor: 'pointer',
                fontSize: '16px',
            }}
        >
            <div>
                {data.text}
            </div>
            <div>
                {data.start}
            </div>
        </div>
    )
}

export default CaptionCard