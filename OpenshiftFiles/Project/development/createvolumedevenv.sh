oc set volume deployment/frontend --add --name=devconfig --mount-path=/opt/app-root/src/config --type=configmap --configmap-name=dev-env-configmap
oc set volume deployment/frontend --add --name=test-config --mount-path=/opt/app-root/src/config --type=configmap --configmap-name=app-config
