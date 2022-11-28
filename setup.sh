# Enable executing of husky scripts
sudo chown -R $USER /usr/local/lib/node_modules
chmod ug+x .husky/*
chmod +x ./gradlew

npm i
cd ./frontend
npm i