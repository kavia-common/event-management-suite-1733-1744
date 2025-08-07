#!/bin/bash
cd /home/kavia/workspace/code-generation/event-management-suite-1733-1744/event_management_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

