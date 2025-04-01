terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }

  backend "s3" {
    # These values would typically be passed from the command line or from environment variables
    # bucket         = "enterprise-monorepo-terraform-state"
    # key            = "terraform.tfstate"
    # region         = "us-west-2"
    # dynamodb_table = "enterprise-monorepo-terraform-locks"
    # encrypt        = true
  }
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project     = "enterprise-monorepo"
      Environment = var.environment
      Terraform   = "true"
    }
  }
}

# Import VPC module
module "vpc" {
  source = "./modules/vpc"

  environment         = var.environment
  vpc_cidr            = var.vpc_cidr
  availability_zones  = var.availability_zones
  public_subnets      = var.public_subnets
  private_subnets     = var.private_subnets
  database_subnets    = var.database_subnets
}

# Import ECS module for containers
module "ecs" {
  source = "./modules/ecs"

  environment       = var.environment
  vpc_id            = module.vpc.vpc_id
  public_subnets    = module.vpc.public_subnet_ids
  private_subnets   = module.vpc.private_subnet_ids
  frontend_image    = var.frontend_image
  backend_image     = var.backend_image
  frontend_cpu      = var.frontend_cpu
  frontend_memory   = var.frontend_memory
  backend_cpu       = var.backend_cpu
  backend_memory    = var.backend_memory
  frontend_port     = var.frontend_port
  backend_port      = var.backend_port
  desired_count     = var.desired_count
  health_check_path = var.health_check_path
}

# Import RDS module for database
module "rds" {
  source = "./modules/rds"

  environment       = var.environment
  vpc_id            = module.vpc.vpc_id
  database_subnets  = module.vpc.database_subnet_ids
  db_instance_class = var.db_instance_class
  db_name           = var.db_name
  db_username       = var.db_username
  db_password       = var.db_password
  db_port           = var.db_port
}

# Import monitoring module
module "monitoring" {
  source = "./modules/monitoring"

  environment   = var.environment
  vpc_id        = module.vpc.vpc_id
  private_subnets = module.vpc.private_subnet_ids
  ecs_cluster_name = module.ecs.cluster_name
  frontend_service_name = module.ecs.frontend_service_name
  backend_service_name = module.ecs.backend_service_name
}

# Output important information
output "vpc_id" {
  value = module.vpc.vpc_id
}

output "frontend_url" {
  value = module.ecs.frontend_url
}

output "backend_url" {
  value = module.ecs.backend_url
}

output "database_endpoint" {
  value = module.rds.db_endpoint
  sensitive = true
}

output "monitoring_dashboard_url" {
  value = module.monitoring.dashboard_url
}
