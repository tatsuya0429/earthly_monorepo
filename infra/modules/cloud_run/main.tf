resource "google_cloud_run_v2_service" "discord_server" {
  name     = "discord-server"
  location = "us-central1"
  template {
    scaling {
      max_instance_count = 2
    }
  }
}