# Use an official Python runtime as a parent image
FROM ubuntu:20.04

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Install system dependencies
RUN apt update && DEBIAN_FRONTEND=noninteractive apt install -y python3.9 python3-pip curl

# Install Node Version Manager (nvm)
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

# Source nvm to make it available in the current shell
SHELL ["/bin/bash", "--login", "-c"]
RUN source ~/.nvm/nvm.sh \
    && source ~/.bashrc \
    && nvm install 16 \
    && nvm alias default 16 \
    && npm install -g npm@8.19.4 \
    && node --version

# Install Playwright
RUN npm install -g playwright \
    && playwright install \
    && playwright install-deps

# Create and set the working directory
WORKDIR /app

# Copy the requirements file into the container at /app
COPY requirements.txt /app/

# Install Python dependencies
RUN pip install --upgrade pip \
    && pip install -r requirements.txt

# Copy the rest of the application files
COPY . /app/

# Install Node.js dependencies and build your project
RUN npm install \
    && npm run build

# Expose port 8080 to the outside world (if needed)
EXPOSE 8080

# Command to run on container start
CMD ["python3", "app.py"]
