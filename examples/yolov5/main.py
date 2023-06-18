# {"input" : "audio", "output" : "text"}


import argparse
import numpy as np
import whisper


# Install `pip install ffmpeg-python`
def main(prompt_string, model_version):
    model = whisper.load_model("base")
    result = model.transcribe("example.mp3")
    print(result["text"])


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--prompt",
        type=str,
        # required=True,
    )
    parser.add_argument(
        "--model_version",
        type=str,
        default="./databricks/dolly-v2-12b",
    )
    args = parser.parse_args()
    main(args.prompt, args.model_version)
