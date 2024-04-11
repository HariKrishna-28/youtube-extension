from fastapi import Depends, FastAPI, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from redis import Redis
import json
import logging
from utils.youtube_client import get_transcript
from utils.string_utils import compress_string, decompress_string

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


def get_redis():
    return redis_client


@app.get("/{video_id}")
async def root(video_id: str, redis: Redis = Depends(get_redis)):
    try:
        value = redis.get(video_id)
        if value is None:
            transcript_data = get_transcript(video_id=video_id)
            encoded_transcript = compress_string(json.dumps(transcript_data))
            redis.set(video_id, encoded_transcript)
            # return JSONResponse(status_code=200, content=transcript_data)
        decoded_transcript = decompress_string(value)
        return JSONResponse(status_code=200, content=json.loads(decoded_transcript))

    except Exception as e:
        raise HTTPException(status_code=500, detail={"message": str(e)})
