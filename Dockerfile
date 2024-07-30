# Use the official nginx image as the base
FROM nginx

# Set the working directory inside the container
WORKDIR /usr/share/nginx/html

# Copy the built files from your local machine to the container
COPY dist/ .

# Expose the port you mentioned in your vite.config file (e.g., 5173)
EXPOSE 5173

# Start nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]
