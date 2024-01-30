from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from youtube_transcript_api import YouTubeTranscriptApi

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def root():
    print("Server up")


@app.get("/{video_id}")
async def root(video_id: str):
    try:
        transcript_data = YouTubeTranscriptApi.get_transcript(
            video_id=video_id)
        return JSONResponse(status_code=200, content=transcript_data)
    except Exception as e:
        raise HTTPException(status_code=404, detail={"message": str(e)})
