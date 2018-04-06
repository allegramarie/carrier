cd client
yarn run build
cd ..
rm -rf client/node_modules
scp -i hrnyc13-targaryan.pem -r `ls -1a | grep -E -v '(node_modules|\.git|^\.|^\.\.)'` ec2-user@ec2-54-227-125-175.compute-1.amazonaws.com:app/
cd client
yarn install
