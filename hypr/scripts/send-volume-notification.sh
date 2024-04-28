#!/usr/bin/env bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

source "$SCRIPT_DIR"/send-system-notification.sh

main() {
  local action=$1
  local message=""

  if [ "$action" = "up" ]; then
    wpctl set-volume -l 1 @DEFAULT_AUDIO_SINK@ 5%+
 
    local volume=$(wpctl get-volume @DEFAULT_AUDIO_SINK@ | cut -d ' ' -f 2)
    local percent=$(printf "%.0f%%" $(echo "$volume * 100" | bc))

    message="    $percent"
  elif [ "$action" = "down" ]; then
    wpctl set-volume -l 0 @DEFAULT_AUDIO_SINK@ 5%-

    local volume=$(wpctl get-volume @DEFAULT_AUDIO_SINK@ | cut -d ' ' -f 2)
    local percent=$(printf "%.0f%%" $(echo "$volume * 100" | bc))

    message="   $percent"
  elif [ "$action" = "mute" ]; then
    local muted=$(wpctl get-volume @DEFAULT_AUDIO_SINK@ | cut -d ' ' -f 3)

    wpctl set-mute @DEFAULT_AUDIO_SINK@ toggle

    if [ "$muted" = "[MUTED]" ]; then
      message="    Unmuted"
    else
      message="    Muted"
    fi
  fi

  send_system_notification "$message"
}

main "$1"
