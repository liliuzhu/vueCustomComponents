# color codes
COLOR_RED='\033[0;31m'
COLOR_GREEN='\033[0;32m'
COLOR_BLUE='\033[0;34m'
COLOR_RESET='\033[0m'
LINE_BREAK="
"

# decide which repo to deploy
if [ "$1" == "" ]; then
    echo -e "${COLOR_RED}Error: repo name not specified and is required ${COLOR_RESET}"
    exit 1
else
    REPO_NAME="$1"
fi
echo -e "${LINE_BREAK}${COLOR_GREEN}Prepare: set deploy repo to ${REPO_NAME} ${COLOR_RESET}"

# decide which version to deploy
if [ "$2" == "" ]; then
    echo -e "${COLOR_RED}Error: deploy version not specified and is required ${COLOR_RESET}"
    exit 1
else
    VERSION="$2"
fi
echo -e "${LINE_BREAK}${COLOR_GREEN}Prepare: set deploy version to ${VERSION} ${COLOR_RESET}"

# deploy related
REPO_URL="http://gitlab.renrenche.com/fe/$REPO_NAME.git"
DEPLOY_DIR="/home/work/fe"
DEPLOY_FOLDER="$REPO_NAME"

# prepare basedir
if [ -d "$DEPLOY_DIR" ]; then
    echo -e "${LINE_BREAK}${COLOR_GREEN}Prepare: deploy base directory ${DEPLOY_DIR} already exists ${COLOR_RESET}"
else
    echo -e "${LINE_BREAK}${COLOR_BLUE}Prepare: deploy base directory ${DEPLOY_DIR} created ${COLOR_RESET}"
    mkdir -p $DEPLOY_DIR
fi

# prepare git repo. TODO check .git folder
if [ -d "$DEPLOY_DIR/$DEPLOY_FOLDER" ]; then
    echo -e "${LINE_BREAK}${COLOR_GREEN}Prepare: git repo ${REPO_URL} already cloned ${COLOR_RESET}"
else
    cd $DEPLOY_DIR
    echo -e "${LINE_BREAK}${COLOR_BLUE}Prepare: clone repo ${REPO_URL} ${COLOR_RESET}"
    git clone $REPO_URL $DEPLOY_FOLDER
fi

# checkout
cd $DEPLOY_DIR/$DEPLOY_FOLDER
git fetch origin
git fetch origin  --tags
git checkout master
git pull
git checkout $VERSION

# link static files
# ln -snf $DEPLOY_DIR/$DEPLOY_FOLDER/public/index.html /home/work/www/c2b_cc_mis/public/

exit 0
