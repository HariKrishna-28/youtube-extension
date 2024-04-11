import zlib


def compress_string(response):
    try:
        compressed_string = zlib.compress(response.encode())
        return compressed_string.hex()
    except Exception:
        print(Exception)


def decompress_string(response):
    try:
        return zlib.decompress(bytes.fromhex(response))
    except Exception:
        print(Exception)
