# Opens 3 terminal tabs to run mongo, gnats, and each service
start:
	lerna run start --parallel

mongo:
	kubectl port-forward svc/matchstik-mongodb 27017:27017
	# mongod --dbpath=db