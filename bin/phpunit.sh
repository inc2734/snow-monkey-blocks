#!/usr/bin/env bash

TMPDIR=${TMPDIR-/tmp}
TMPDIR=$(echo $TMPDIR | sed -e "s/\/$//")
WP_TESTS_DIR=${WP_TESTS_DIR-$TMPDIR/wordpress-tests-lib}

if [ -e ${WP_TESTS_DIR} ] && [ -e ${WP_TESTS_DIR}/includes/functions.php ]; then

  themedir=$(pwd)

  cd ${themedir};
  vendor/bin/phpunit --configuration=${themedir}/.phpunit.xml.dist
  exit 0
fi

dir=$(cd $(dirname $0) && pwd)
bash "${dir}/wpphpunit.sh"
