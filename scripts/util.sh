function failOnCommandError {
    if [ $1 -eq 0 ];then
        echo "$2 success!"
    else
        echo "$2 failed!"
        RECEIVER="xierenhong"
        CONTENT="自动构建失败：$BUILD_TAG，阶段：$2，构建详情：$BUILD_URL"
        sendNotify $RECEIVER $CONTENT
        exit 1
    fi
}

function sendNotify {
    RECEIVER=$(python -c "import urllib, sys; print urllib.quote(sys.argv[1])" "$1")
    CONTENT=$(python -c "import urllib, sys; print urllib.quote(sys.argv[1])" "$2")
    curl -S -m 5 -H "X-TOKEN: cc584d1f411c2821eb9a459d29dfa237" "http://notify.shanyishanmei.com/api/dingtalk/message/send?receiver=$RECEIVER&content=$CONTENT"
}
