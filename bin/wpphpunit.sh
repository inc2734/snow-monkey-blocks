#!/usr/bin/env bash

set -e;

themedir=$(pwd)

cd ${themedir}

if [ -e ${themedir}/bin/install-wp-tests.sh ]; then
  echo 'DROP DATABASE IF EXISTS wordpress_test;' | mysql -u root

  if [ -e /tmp/wordpress ]; then
    rm -fr /tmp/wordpress
  fi

  if [ -e /tmp/wordpress-tests-lib ]; then
    rm -fr /tmp/wordpress-tests-lib
  fi

  bash "${themedir}/bin/install-wp-tests.sh" wordpress_test root '' localhost latest;
  vendor/bin/phpunit
else
  echo "${themedir}/bin/install-wp-tests.sh not found."
fi;
