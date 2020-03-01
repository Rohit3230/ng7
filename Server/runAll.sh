#!/bin/sh
#NODE_ENVIRONMENT='PROD'
#export NODE_ENVIRONMENT
echo $NODE_ENVIRONMENT

# Dont dare putting space
DIR="$PWD"
sqldir="$DIR""/sqlIns"
mongodir="$DIR""/mongoIns"
# maindir="$DIR""/mainInstance/maininstance"
# neodir="$DIR""/neoInstance/neoinstance"

# echo $DIR
# echo $sqldir


#DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
#echo "$DIR"

#gnome-terminal --working-directory="$DIR" --window-with-profile=NoClose

if [ "$1" = "-s" ] 
then
pm2 stop main neo sql mongo
else
killall node
fi


if [ "$1" = "-s" ] 
then
echo "Trying to run instances ..."
# cd "$maindir"
# echo $PWD
# #NODE_ENVIRONMENT=PROD pm2 start "./bin/www" --update-env --name 'main'  
# pm2 start "./bin/www" --name 'main'  
# echo "Main instance running"
cd "$sqldir"
#NODE_ENVIRONMENT=PROD pm2 start "./bin/www" --update-env --name 'sql'
pm2 start "./bin/www" --name 'sql'
echo "Sql instance running"
# cd "$neodir" 
# #NODE_ENVIRONMENT=PROD pm2 start "./bin/www" --update-env --name 'neo'
# pm2 start "./bin/www" --name 'neo'
# echo "Neo instance running"
cd "$mongodir"
#NODE_ENVIRONMENT=PROD pm2 start "./bin/www" --update-env --name 'mongo'
pm2 start "./bin/www" --name 'mongo'
echo "Mongo instance running"
else
gnome-terminal --tab "uesless" --tab "sql" --working-directory="$sqldir" -e "node ./bin/www" --tab "mongo" --working-directory="$mongodir" -e "node ./bin/www"
# gnome-terminal --tab "uesless" --tab "main" --working-directory="$maindir" -e "node ./bin/www" --tab "sql" --working-directory="$sqldir" -e "node ./bin/www" --tab --working-directory="$neodir" -e "node ./bin/www" --tab "mongo" --working-directory="$mongodir" -e "node ./bin/www"
# gnome-terminal --working-directory="$sqldir" --title="SQL INSTANCE" --window-with-profile=NoClose -e "node ./bin/www"
# gnome-terminal --working-directory="$mongodir" --title="MONGO INSTANCE" --window-with-profile=NoClose -e "node ./bin/www"
fi

#gnome-terminal --window-with-profile=NoClose --working-directory="$sqldir" --title="SQL INSTANCE" -e "node ./bin/www"  --tab --working-directory="$mongodir" --title="MONGO INSTANCE" -e "node ./bin/www"

# gnome-terminal --working-directory="$sqldir" --title="SQL INSTANCE" --window-with-profile=NoClose -e "node ./bin/www"
# gnome-terminal --working-directory="$mongodir" --title="MONGO INSTANCE" --window-with-profile=NoClose -e "node ./bin/www"
#gnome-terminal  --working-directory="$neodir" --title="NEO INSTANCE" --window-with-profile=NoClose -e "node ./bin/www"
#gnome-terminal  --working-directory="$maindir" --title="MAIN INSTANCE" --window-with-profile=NoClose -e "node ./bin/www"

