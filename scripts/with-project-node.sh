#!/bin/sh

set -eu

if [ "$#" -eq 0 ]; then
  echo "[with-project-node] No command provided." >&2
  exit 1
fi

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
PROJECT_ROOT=$(CDPATH= cd -- "$SCRIPT_DIR/.." && pwd)
NVMRC_PATH="$PROJECT_ROOT/.nvmrc"

if [ ! -f "$NVMRC_PATH" ]; then
  echo "[with-project-node] Missing .nvmrc at $NVMRC_PATH." >&2
  exit 1
fi

REQUIRED_NODE_VERSION=$(tr -d '[:space:]' < "$NVMRC_PATH")
REQUIRED_NODE_MAJOR=${REQUIRED_NODE_VERSION%%.*}

version_gte() {
  version_a=$1
  version_b=$2

  IFS=. read -r a_major a_minor a_patch <<EOF
$version_a
EOF
  IFS=. read -r b_major b_minor b_patch <<EOF
$version_b
EOF

  a_minor=${a_minor:-0}
  a_patch=${a_patch:-0}
  b_minor=${b_minor:-0}
  b_patch=${b_patch:-0}

  if [ "$a_major" -gt "$b_major" ]; then
    return 0
  fi

  if [ "$a_major" -lt "$b_major" ]; then
    return 1
  fi

  if [ "$a_minor" -gt "$b_minor" ]; then
    return 0
  fi

  if [ "$a_minor" -lt "$b_minor" ]; then
    return 1
  fi

  [ "$a_patch" -ge "$b_patch" ]
}

exec_project_command() {
  command_name=$1

  if command -v "$command_name" >/dev/null 2>&1; then
    exec "$@"
  fi

  case "$command_name" in
    */*)
      ;;
    *)
      local_bin="$PROJECT_ROOT/node_modules/.bin/$command_name"

      if [ -x "$local_bin" ]; then
        shift
        exec "$local_bin" "$@"
      fi
      ;;
  esac

  exec "$@"
}

CURRENT_NODE_VERSION=""

if command -v node >/dev/null 2>&1; then
  CURRENT_NODE_VERSION=$(node -p "process.versions.node" 2>/dev/null || printf "")
fi

if [ -n "$CURRENT_NODE_VERSION" ] && version_gte "$CURRENT_NODE_VERSION" "$REQUIRED_NODE_VERSION"; then
  exec_project_command "$@"
fi

NVM_SH=""

if [ -n "${NVM_DIR:-}" ] && [ -s "$NVM_DIR/nvm.sh" ]; then
  NVM_SH="$NVM_DIR/nvm.sh"
elif [ -s "$HOME/.nvm/nvm.sh" ]; then
  NVM_SH="$HOME/.nvm/nvm.sh"
elif command -v brew >/dev/null 2>&1; then
  BREW_PREFIX=$(brew --prefix nvm 2>/dev/null || printf "")

  if [ -n "$BREW_PREFIX" ] && [ -s "$BREW_PREFIX/nvm.sh" ]; then
    NVM_SH="$BREW_PREFIX/nvm.sh"
  fi
fi

if [ -z "$NVM_SH" ]; then
  echo "[with-project-node] Node $REQUIRED_NODE_VERSION is required but nvm was not found." >&2
  echo "[with-project-node] Install nvm or launch the command from a shell already using Node $REQUIRED_NODE_VERSION+." >&2
  exit 1
fi

# shellcheck source=/dev/null
. "$NVM_SH"

if nvm use --silent "$REQUIRED_NODE_VERSION" >/dev/null 2>&1 || nvm use --silent "$REQUIRED_NODE_MAJOR" >/dev/null 2>&1; then
  exec_project_command "$@"
fi

echo "[with-project-node] Unable to activate Node $REQUIRED_NODE_VERSION via nvm." >&2
echo "[with-project-node] Run 'nvm install $REQUIRED_NODE_VERSION' and retry." >&2
exit 1