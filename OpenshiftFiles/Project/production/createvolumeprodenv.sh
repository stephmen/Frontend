oc set volume dc/frontend --add --name=prodconfig --mount-path=/opt/app-root/src/config --type=configmap --configmap-name=prod-env-configmap