terraform {
  backend "gcs" {
    bucket  = "terraform-xxxxxx"
    prefix  = "terraform/state"
    region  = "us-central1"
  }
}