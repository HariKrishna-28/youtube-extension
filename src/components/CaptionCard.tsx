import React from 'react'
import type { CaptionType } from '~types/CaptionType'

interface Props {
    data: CaptionType
}

const CaptionCard: React.FC<Props> = ({ data }) => {

    const seekVideo = () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, { action: 'seekToTimestamp', timestamp: data.start });
        });
    }

    const handleClick = () => {
        console.log(data)
        seekVideo()
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
                backgroundColor: '#191e24',
                borderRadius: '5px',
                padding: '5px',
                color: '#a6adbb',
                cursor: 'pointer',
                fontSize: '16px',
                // border: '1px solid #424952'

            }}
        >
            <div style={{ fontWeight: 'bold' }}>
                {data.text}
            </div>
            <div>
                {data.start}
            </div>
        </div>
    )
}

export default CaptionCard