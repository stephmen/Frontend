oc set volume deployment/frontend --add --name=testconfig --mount-path=/opt/app-root/src/config --type=configmap --configmap-name=test-env-configmap