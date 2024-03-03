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
COPY requirements.txt package.json ./

# Install Python and Node.js dependencies
RUN pip install --no-cache-dir -r requirements.txt
RUN npm install --force

# Install playwright for Python
RUN pip install playwright

# Install browsers for playwright
RUN playwright install
    apt-get install libnss3\                        
        libnspr4\                                   
        libatk1.0-0\                                
        libatk-bridge2.0-0\                          
         libcups2\                                   
         libxkbcommon0\                               
         libatspi2.0-0\                              
         libxdamage1\                                 
         libpango-1.0-0\                             
         libcairo2\                                  
         libasound2
# Expose port 8080
EXPOSE 8080

# Copy the application code
COPY . .

# Run the Flask application
CMD ["python", "app2.py"]
