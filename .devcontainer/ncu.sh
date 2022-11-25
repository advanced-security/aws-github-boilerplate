#!/usr/bin/env bash

function setup {
    for d in */ ; do
        [ -L "${d%/}" ] && continue
        echo "Upgrading Dependencies in: $d"
        cd "$d"
        ncu -u
        yarn install
        cd ..
    done
}

cd /workspaces/alert-notifier/functions/authorizers

setup