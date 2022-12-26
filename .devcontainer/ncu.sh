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

cd /workspaces/aws-github-boilerplate/functions/authorizers

setup

cd /workspaces/aws-github-boilerplate/functions/logic

setup