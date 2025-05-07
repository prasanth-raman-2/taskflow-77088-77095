#!/bin/bash
cd /home/kavia/workspace/code-generation/taskflow-77088-77095/core_component_for_taskflow
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

