oc set volume deployment/myeccom-tekton --add --name=devconfig --mount-path=/opt/app-root/src/config --type=configmap --configmap-name=dev-env-configmap
oc set volume deployment/myeccom-tekton --add --name=test-config --mount-path=/opt/app-root/src/config --type=configmap --configmap-name=test-env-configmap
