#!/bin/bash

npm link

echo "[success] init tool"

sudo rm -rf /usr/share/code/resources/app/extensions/desc

sudo cp -r ./desc /usr/share/code/resources/app/extensions/

echo "[success] init extensions"
