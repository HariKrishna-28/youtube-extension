import React from 'react'
import type { CaptionType } from '~types/CaptionType'

interface Props {
    captions: CaptionType[]
}

const CaptionRenderer: React.FC<Props> = ({ captions }) => {
    return (
        <div className='root_caption'>
            {captions ?
                captions.map((element: CaptionType, index: number) => {
                    return (
                        <div>
                            {element.start}
                            {element.duration}
                        </div>
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