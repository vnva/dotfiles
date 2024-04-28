#!/usr/bin/env bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
TEMP_FILE=$SCRIPT_DIR/last_system_notification_id


send_system_notification() {
  # Create empty file if it doesn't exist
  if [ ! -f "$TEMP_FILE" ]; then
    touch $TEMP_FILE
    echo "0" > $TEMP_FILE
  fi

  notify-send -a system -r $(head -n 1 $TEMP_FILE) -p "$1" "$2" > $TEMP_FILE || rm $TEMP_FILE
}
