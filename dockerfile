# Use an official Python runtime as a parent image
FROM python:3.10

# Set the working directory to /app
WORKDIR /app_1

# Copy the current directory contents into the container at /app
COPY . /app

# Install Playwright dependencies
RUN apt-get update && apt-get install -y \
    libnss3 \
    libgbm-dev

# Copy the virtual environment into the container
COPY .venv /app/.venv

# Set the virtual environment as the default Python environment
ENV VIRTUAL_ENV /app/.venv
ENV PATH /app/.venv/bin:$PATH

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Make port 8080 available to the world outside this container
EXPOSE 8080

# Define environment variable
ENV NAME World

# Run app.py when the container launches
CMD ["python3", "appp.py", "--host", "0.0.0.0", "--port", "8080"]
