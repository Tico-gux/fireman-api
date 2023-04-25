#!/bin/bash
while [[ "$#" -gt 0 ]]
do
case $1 in
  -d|--deploy)
    deploy="$2"
    ;;
  -s|--send)
    send="send=$2"
    ;;
esac
shift
done
ip=18.230.23.154
keyPair=hunitro.pem
dirFrontStaging="/home/ubuntu/api-staging"
dirFrontProd="/home/ubuntu/api-production"
connection="ssh -i $keyPair ubuntu@$ip"


f-deploy-staging () {
	
	rm dist.zip
   cp -v package.json ./dist/package.json
   cp -v process.json ./dist/process.staging.json
   cp -v -r node_modules ./dist/node_modules
	
	zip -r dist.zip dist/*
	scp -i ~/.ssh/${keyPair} dist.zip ubuntu@${ip}:/home/ubuntu/
	ssht=" unzip dist.zip"
	ssht+=" && sudo rm -Rf ${dirFrontStaging}/*"
	ssht+=" && sudo mv dist api-staging"
	ssht+=" && sudo mv ${dirFrontStaging}/dist/* ${dirFrontStaging}"
	ssht+=" && rm dist.zip"
	ssht+=" && sudo rm -Rf dist"
	ssht+=" && cd ${dirFrontStaging}"
	#ssht+=" && yarn"
	
}

f-deploy-production () {
	rm dist.zip
   cp -v package.json ./dist/package.json
	cp -v process.json ./dist/process.json
   cp -v -r node_modules ./dist/node_modules
	zip -r dist.zip dist/*
	scp -i ~/.ssh/${keyPair} dist.zip ubuntu@${ip}:/home/ubuntu/
	ssht=" unzip dist.zip"
   ssht+=" && sudo rm -Rf ${dirFrontProd}/*"
	ssht+=" && sudo mv dist api-production"
	ssht+=" && sudo mv ${dirFrontProd}/dist/* ${dirFrontProd}"
	ssht+=" && rm dist.zip"
	ssht+=" && sudo rm -Rf dist"
	ssht+=" && cd ${dirFrontProd}"
	#ssht+=" && yarn"
}
case "$deploy" in

	"staging")
		f-deploy-staging
	;;
esac

case "$deploy" in

	"production")
		f-deploy-production
	;;
esac
if [ "$deploy" == "production" ] || [ "$deploy" == "staging" ] ; then 
	ssh -t -i ~/.ssh/${keyPair} ubuntu@${ip} "$ssht"
fi 