oc project testing
# oc create dc frontend --image=image-registry.openshift-image-registry.svc:5000/development/frontend:frontendQA
oc create deployment frontend --image=image-registry.openshift-image-registry.svc:5000/development/frontend:latest
oc patch svc frontend -p '{"spec": {"portsvbgt": [{"name": "7777-tcp","port": 7777,"protocol": "TCP", "targetPort": 7777}]}}'
oc patch deployment/frontend -p '{"spec":{"template":{"spec":{"containers":[{"name":"default-container","imagePullPolicy":"Always"}]}}}}'
oc set env deployment/frontend PRODENDPOINT=http://apollo-backend-testing.apps-crc.testing
oc set env deployment/frontend endpoint=http://apollo-backend-testing.apps-crc.testing
oc expose deployment frontend --port=7777
oc expose service frontend --name=frontend
./createvolumetestenv.sh
oc apply -f config-map-test.yaml