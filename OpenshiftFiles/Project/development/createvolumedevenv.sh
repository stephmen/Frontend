oc set volume deploymentconfig/frontend --add --name=devconfig --mount-path=/opt/app-root/src/config --type=configmap --configmap-name=dev-env-configmap
oc set volume deploymentconfig/frontend --add --name=test-config --mount-path=/opt/app-root/src/config --type=configmap --configmap-name=app-config

MountVolume.SetUp failed for volume "app-config" : configmap "test-config