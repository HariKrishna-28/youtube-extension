from fastapi import Depends, FastAPI, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from youtube_transcript_api import YouTubeTranscriptApi
from redis import Redis
import json
import logging

app = FastAPI()
logging.basicConfig(
    level=logging.DEBUG,
    format="%(asctime)s %(levelname)s %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


redis_client = Redis(host="localhost", port=6379)


# @app.on_event("startup")
# async def startup_event():
#     # app.state.redis = redis_client
#     logger.info("starting api")


# @app.on_event("shutdown")
# async def shutdown_event():
#     app.state.redis.close()


def get_redis():
    return redis_client


@app.get("/{video_id}")
async def root(video_id: str, redis: Redis = Depends(get_redis)):
    try:
        value = redis.get(video_id)
        if value is None:
            transcript_data = YouTubeTranscriptApi.get_transcript(video_id=video_id)
            redis.set(video_id, json.dumps(transcript_data))
            return JSONResponse(status_code=200, content=transcript_data)

        return JSONResponse(status_code=200, content=json.loads(value))

    except Exception as e:
        raise HTTPException(status_code=500, detail={"message": str(e)})
