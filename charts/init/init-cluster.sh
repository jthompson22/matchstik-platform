#!/usr/bin/env bash

kubectl create clusterrolebinding user-admin-binding --clusterrole=cluster-admin --user=$(gcloud config get-value account)
kubectl create serviceaccount tiller --namespace kube-system
kubectl create clusterrolebinding tiller-admin-binding --clusterrole=cluster-admin --serviceaccount=kube-system:tiller
helm init --service-account=tiller

# Give Tiller pod a moment to spin up
echo Sleeping for 30 seconds to allow Tiller pod readiness...
sleep 30s

# Install cert-manager CRD
kubectl apply -f ./k8s-yaml/cert-manager-crd.yaml

# Install cert-manager
helm repo add jetstack https://charts.jetstack.io
helm repo update
helm install --name cert-manager --version v0.9.0 --namespace cert-manager jetstack/cert-manager


# Build Helm with cluster credentials so cloudbuild can push to the cluster
########################################
# IMPORTANT
########################################
# You must grant the cloudbuild.gserviceaccount.com 
# service account the Kubernetes Engine Admin role 
# in order for deployments to work
# https://github.com/GoogleCloudPlatform/cloud-builders/tree/master/kubectl#using-this-builder-with-google-kubernetes-engine

export CLOUDSDK_COMPUTE_ZONE=us-central1-c
export CLOUDSDK_CONTAINER_CLUSTER=matchstik-dev
gcloud builds submit ./helm-builder --config=./helm-builder/helm-build.yaml
