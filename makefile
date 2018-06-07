chrome.json:
	wget https://raw.githubusercontent.com/jfrazelle/dotfiles/master/etc/docker/seccomp/chrome.json -O chrome.json

run: chrome.json
	docker-compose up
