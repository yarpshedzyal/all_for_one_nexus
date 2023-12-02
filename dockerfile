# Use an official Python runtime as a parent image
FROM ubuntu:20.04

# Set the working directory to /app
WORKDIR /app_1

# Use an official Python runtime as a base image
FROM ubuntu:20.04

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apt update 
RUN apt install -y python3.9
RUN apt install -y python3-pip
# Create and set the working directory
WORKDIR /app

# Copy the requirements file into the container at /app
COPY requirements.txt /app/

# Install any needed packages specified in requirements.txt
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
RUN playwright install
RUN playwright install-deps
# Copy the content of the local src directory to the working directory
COPY . /app/

# Expose port 8080 to the outside world
EXPOSE 8080

# Command to run on container start
CMD ["python3", "app.py"]
