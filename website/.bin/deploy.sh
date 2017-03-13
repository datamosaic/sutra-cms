#!/bin/bash

# documentation
rm -rf ../docs/documentation
cp -rf documentation ../docs/documentation


# website
cp -rf favicon.ico ../docs/favicon.ico
cp -rf ../README.md ../docs/README.md

# git
# git add -A
# git commit -m 'update documentation'
# git push 