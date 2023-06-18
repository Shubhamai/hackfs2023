FROM huggingface/transformers-pytorch-deepspeed-nightly-gpu

WORKDIR /

RUN apt-get update -y

RUN pip -q install git+https://github.com/huggingface/transformers

RUN pip -q install accelerate>=0.12.0 


WORKDIR /
