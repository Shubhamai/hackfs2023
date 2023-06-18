# {"input" : "text", "output" : "text", "outputtype" : "stdout", "bacalhau" : "bacalhau docker run --gpu 1 -w /inputs -i gitlfs://huggingface.co/google/flan-t5-small.git -i https://gist.githubusercontent.com/js-ts/d35e2caa98b1c9a8f176b0b877e0c892/raw/3f020a6e789ceef0274c28fc522ebf91059a09a9/inference.py jsacex/dolly_inference:latest -- python inference.py --prompt ${text} --download"}


import argparse
import torch
from transformers import pipeline


def main(prompt_string, model_version):
    # use dolly-v2-12b if you're using Colab Pro+, using pythia-2.8b for Free Colab
    generate_text = pipeline(
        model=model_version,
        torch_dtype=torch.bfloat16,
        trust_remote_code=True,
        device_map="auto",
    )

    print(generate_text(prompt_string))


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--prompt",
        type=str,
        required=True,
        help="The prompt to be used in the GPT model",
    )
    parser.add_argument(
        "--model_version",
        type=str,
        default="./google/flan-t5-small",
        help="The model version to be used",
    )
    args = parser.parse_args()
    main(args.prompt, args.model_version)
