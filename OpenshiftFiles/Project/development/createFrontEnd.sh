oc project development
oc new-app --name=frontend openshift/nodejs:latest~https://github.com/stephmen/Frontend
oc patch svc frontend -p '{"spec": {"portsvbgt": [{"name": "7777-tcp","port": 7777,"protocol": "TCP", "targetPort": 7777}]}}'
# oc patch deployment frontend --patch "$(cat execCommand.yaml)"
oc set env deployment/frontend PRODENDPOINT=http://apollo-backend-development.apps-crc.testing
oc set env deployment/frontend endpoint=http://apollo-backend-development.apps-crc.testing
oc expose service frontend --port=7777
./createvolumedevenv.sh
oc apply -f example-configmap.yaml


# spec:
#       volumes:
#         - name: devconfig
#           configMap:
#             name: dev-env-configmap
#             defaultMode: 420
#       containers:
#         - name: frontend
#           image: >-
#             image-registry.openshift-image-registry.svc:5000/development/frontend@sha256:cc2eef91165bea35a3aae8faf9bda00fb09fc906f1f1a7c277aa018731c68440
#           command:
#             - ./endpointscript.sh
#           ports:
#             - containerPort: 7777
#               protocol: TCP
#           resources: {}
#           volumeMounts:
#             - name: devconfig
#               mountPath: /opt/app-root/src/config
#           terminationMessagePath: /dev/termination-log
#           terminationMessagePolicy: File
#           imagePullPolicy: IfNotPresent
#       restartPolicy: Always
#       terminationGracePeriodSeconds: 30
#       dnsPolicy: ClusterFirst
#       securityContext: {}
#       schedulerName: default-scheduler
