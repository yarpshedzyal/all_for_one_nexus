# Use an official Python runtime as a parent image
FROM ubuntu:20.04

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Install system dependencies
RUN apt update && DEBIAN_FRONTEND=noninteractive apt install -y python3.9 python3-pip nodejs npm curl

# Create and set the working directory
WORKDIR /app

# Copy the requirements file into the container at /app
COPY requirements.txt /app/

# Install Python dependencies
RUN pip install --upgrade pip \
    && pip install -r requirements.txt

# Copy package.json and package-lock.json files
COPY package.json package-lock.json /app/

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application files
COPY . /app/

# Install Playwright
RUN npm install -g playwright \
    && playwright install \
    && playwright install-deps

# Install Node.js dependencies and build your project
RUN npm run build

# Expose port 8080 to the outside world (if needed)
EXPOSE 8080

# Command to run on container start
CMD ["python3", "app.py"]
