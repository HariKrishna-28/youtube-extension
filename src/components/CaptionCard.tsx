import React from 'react'
import type { CaptionType } from '~types/CaptionType'

interface Props {
    data: CaptionType
}

const CaptionCard: React.FC<Props> = ({ data }) => {
    return (
        <div className='caption_card'>
            {data.text}
        </div>
    )
}

export default CaptionCard