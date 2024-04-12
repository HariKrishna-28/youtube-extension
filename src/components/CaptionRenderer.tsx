import React from 'react'
import type { CaptionType } from '~types/CaptionType'
import CaptionCard from './CaptionCard'

interface Props {
    captions: CaptionType[]
}

const CaptionRenderer: React.FC<Props> = ({ captions }) => {
    return (
        <div style={{
            width: '380px',
            height: '550px',
            overflowY: 'auto',
            overflowX: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            padding: '0 4px',
        }}>
            {captions ?
                captions.map((element: CaptionType, index: number) => {
                    return (
                        <CaptionCard
                            key={index}
                            data={element}
                        />
                    )
                })
                :
                <div>
                    null
                </div>
            }

        </div>
    )
}

export default CaptionRenderer
