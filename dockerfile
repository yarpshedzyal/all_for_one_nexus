# Use official Python image as base
FROM python:3.9-slim

# Install necessary system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    wget \
    gnupg \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js and npm
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get update && apt-get install -y nodejs npm

# Set working directory
WORKDIR /app

# Copy requirements.txt and package.json to the working directory
COPY requirements.txt ./

# Install Python and Node.js dependencies
RUN pip install --no-cache-dir -r requirements.txt
RUN npm install --force

# Install playwright for Python
RUN pip install playwright

# Expose port 8080
EXPOSE 8080

# Copy the application code
COPY . .

# Run the Flask application
CMD ["python", "app.py"]
