oc project development
oc new-app --name=frontend openshift/nodejs:latest~https://github.com/stephmen/Frontend --port=7777
oc patch svc frontend -p '{"spec": {"ports": [{"name": "7777-tcp","port": 7777,"protocol": "TCP", "targetPort": 7777}]}}'
oc set env deployment/frontend PRODENDPOINT=http://apollo-backend-development.apps-crc.testing
oc set env deployment/frontend endpoint=http://apollo-backend-development.apps-crc.testing
oc expose service frontend --port=7777
./createvolumedevenv.sh
oc apply -f example-configmap.yaml