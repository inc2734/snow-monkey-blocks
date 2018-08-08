#!/usr/bin/env bash

if [ -e /tmp/wordpress-tests-lib ]; then

  themedir=$(pwd)

  cd ${themedir};
  vendor/bin/phpunit
  exit 0
fi

dir=$(cd $(dirname $0) && pwd)
bash "${dir}/wpphpunit.sh"
