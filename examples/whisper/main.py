# {"input" : "text", "output" : "image"}

import argparse


def main(prompt_string, model_version):
    print(f"Heelo {prompt_string} and VERSION {model_version}")

    return f"Heelo {prompt_string} and VERSION {model_version}"


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--prompt",
        type=str,
        required=True,
    )
    parser.add_argument(
        "--model_version",
        type=str,
        default="./databricks/dolly-v2-12b",
    )
    args = parser.parse_args()
    main(args.prompt, args.model_version)
