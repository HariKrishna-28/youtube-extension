import gzip


def compress_string(input_string):
    return gzip.compress(input_string.encode())


def decompress_string(compressed_data):
    return gzip.decompress(compressed_data).decode()
