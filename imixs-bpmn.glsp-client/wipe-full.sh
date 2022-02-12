#!/usr/bin/env bash

# Wipe out all node.js packages
#
echo "***************************************"
echo "* Wipe out full mode.....            *"
echo "***************************************"

rm -R ./minimal-browser-app/lib
rm -R ./minimal-browser-app/node_modules
rm -R ./minimal-browser-app/src-gen
rm -R ./minimal-browser-app/gen-webpack*
rm -R ./minimal-browser-app/webpack*




rm -R ./bpmn-glsp/lib
rm -R ./bpmn-glsp/node_modules

rm -R ./minimal-theia/lib
rm -R ./minimal-theia/node_modules

rm -R node_modules

rm yarn.lock