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

cd /workspaces/aws-github-boilerplate/functions/authorizers

setup

cd /workspaces/aws-github-boilerplate/functions/logic

setup