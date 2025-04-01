variable "aws_region" {
  description = "The AWS region to deploy resources"
  type        = string
  default     = "us-west-2"
}

variable "environment" {
  description = "The environment (dev, staging, prod)"
  type        = string
  default     = "dev"
}

variable "vpc_cidr" {
  description = "CIDR block for the VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "availability_zones" {
  description = "List of availability zones"
  type        = list(string)
  default     = ["us-west-2a", "us-west-2b", "us-west-2c"]
}

variable "public_subnets" {
  description = "List of public subnet CIDR blocks"
  type        = list(string)
  default     = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
}

variable "private_subnets" {
  description = "List of private subnet CIDR blocks"
  type        = list(string)
  default     = ["10.0.4.0/24", "10.0.5.0/24", "10.0.6.0/24"]
}

variable "database_subnets" {
  description = "List of database subnet CIDR blocks"
  type        = list(string)
  default     = ["10.0.7.0/24", "10.0.8.0/24", "10.0.9.0/24"]
}

variable "frontend_image" {
  description = "Docker image for frontend"
  type        = string
  default     = "frontend:latest"
}

variable "backend_image" {
  description = "Docker image for backend"
  type        = string
  default     = "backend:latest"
}

variable "frontend_cpu" {
  description = "CPU units for frontend container"
  type        = number
  default     = 256
}

variable "frontend_memory" {
  description = "Memory for frontend container"
  type        = number
  default     = 512
}

variable "backend_cpu" {
  description = "CPU units for backend container"
  type        = number
  default     = 512
}

variable "backend_memory" {
  description = "Memory for backend container"
  type        = number
  default     = 1024
}

variable "frontend_port" {
  description = "Port exposed by frontend container"
  type        = number
  default     = 3000
}

variable "backend_port" {
  description = "Port exposed by backend container"
  type        = number
  default     = 3001
}

variable "desired_count" {
  description = "Desired count of container instances"
  type        = number
  default     = 2
}

variable "health_check_path" {
  description = "Path for health check"
  type        = string
  default     = "/api/health"
}

variable "db_instance_class" {
  description = "RDS instance class"
  type        = string
  default     = "db.t3.small"
}

variable "db_name" {
  description = "Database name"
  type        = string
  default     = "enterprise_db"
}

variable "db_username" {
  description = "Database master username"
  type        = string
  default     = "admin"
  sensitive   = true
}

variable "db_password" {
  description = "Database master password"
  type        = string
  sensitive   = true
}

variable "db_port" {
  description = "Database port"
  type        = number
  default     = 27017
}
