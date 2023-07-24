import hashlib
def sha256_decode(input_bytes):
  """Decodes a SHA-256 hash to a string.
  Args:
    input_bytes: The SHA-256 hash as a byte string.
  Returns:
    The decoded string.
  """
  hash_digest = hashlib.sha256(input_bytes).hexdigest()
  return hash_digest

print(sha256_decode(b"minh tam"))