#!/usr/bin/env bash

function setup {
    for d in */ ; do
        [ -L "${d%/}" ] && continue
        echo "Processing $d"
        cd "$d"
        yarn 
        cd ..
    done
}

cd /workspaces/alert-notifier/functions/authorizers

setup
