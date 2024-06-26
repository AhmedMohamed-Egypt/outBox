variable "HCLOUD_TOKEN" {
  sensitive = true
}

# Specifies region location that will be used for all recources
variable "REGION" {
  description = "region of the resources"
}

# Project id where all resources will be created 
variable "PROJECT_ID" {
  description = "project id for the resources"
}

# Artifact Registry repository name  
variable "REPO_NAME" {
  description = "artifact registry name"
}

# Name of the docker image to pull
variable "IMAGE_NAME" {
  description = "name of the webapp image"
}

data "local_sensitive_file" "service_account_creds" {
  filename = "${path.module}/../../key/service_account.json"
}
