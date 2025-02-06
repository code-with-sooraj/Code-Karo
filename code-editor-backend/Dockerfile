FROM ubuntu:latest

# Install dependencies
RUN apt-get update && apt-get install -y \
    python3 python3-pip \
    openjdk-17-jdk \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Default command
CMD ["/bin/bash"]
