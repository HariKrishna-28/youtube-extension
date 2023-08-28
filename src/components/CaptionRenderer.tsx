import React from 'react'
import type { CaptionType } from '~types/CaptionType'
import CaptionCard from './CaptionCard'

interface Props {
    captions: CaptionType[]
}

const CaptionRenderer: React.FC<Props> = ({ captions }) => {
    return (
        <div className='root_caption'>
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