#!/bin/sh
# Check that a running documentation site serves every page from the docs sources.
#
# Usage: smoke-test.sh <base-url> [docs-dir]
#   e.g. smoke-test.sh https://docs.db.ripe.net docs

BASE_URL=${1:?usage: smoke-test.sh <base-url> [docs-dir]}
DOCS_DIR=${2:-docs}
FAILED=0

fail() {
    echo "FAIL: $*"
    FAILED=1
}

# expect <status> <path>
expect() {
    code=$(curl -s -o /dev/null -w '%{http_code}' "$BASE_URL$2")
    [ "$code" = "$1" ] || fail "$2 returned $code, expected $1"
}

# title <path>: the page <title>, empty unless the response is a 200
title() {
    curl -fs "$BASE_URL$1" | grep -o '<title>[^<]*</title>'
}

# Wait up to 30s for the server to start
for i in $(seq 30); do
    curl -fs -o /dev/null "$BASE_URL/" && break
    sleep 1
done

expect 200 /robots-prod.txt              # used by monitoring
expect 404 /page-that-does-not-exist

HOME_TITLE=$(title /)
case "$HOME_TITLE" in
    *"RIPE Database docs</title>") ;;
    *) fail "/ is not the documentation home page (title: '$HOME_TITLE')"; exit 1 ;;
esac

# Every page is a docs page with its own title, not an error page or a fallback to the home page.
# docs/04.RPSL-Object-Types/01.Descriptions-of-Primary-Objects.md -> /RPSL-Object-Types/Descriptions-of-Primary-Objects
for page in $(find "$DOCS_DIR" -name '*.md' | sed -E "s#^$DOCS_DIR##; s#/[0-9]+\.#/#g; s#\.md\$##; s#/index\$##"); do
    page_title=$(title "$page")
    case "$page_title" in
        "$HOME_TITLE") [ -z "$page" ] || fail "$page shows the home page" ;;
        "<title>404 |"*) fail "$page shows the 404 page" ;;
        *"RIPE Database docs</title>") ;;
        *) fail "$page is not a documentation page (title: '$page_title')" ;;
    esac
done

[ $FAILED = 0 ] && echo "Smoke test passed" || exit 1
