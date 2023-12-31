FROM python:3.10

ENV PYTHONDONTWRITEBYTECODE=1

ENV PYTHONUNBUFFERED=1

WORKDIR /app/a_b

COPY ./requirements.txt ./requirements.txt

RUN pip3 install -r requirements.txt

COPY . ./