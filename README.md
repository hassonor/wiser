<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
 </p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456

[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

GCP CI/CD Deployment with Kubernetes

*Note: anything like _var_ it means you have to fill this with appropriate value:

1- Enable Google Container Registry API & Artifact Registry:

    a. Create Repository for each service:

        i. Install gcloud cli

        ii. Initialize gcloud

        iii. Set project of gcloud to your project

        iv. gcloud authentication

    b. Build & push images (e.g. reservations):

    cd /apps/reservations/
    docker build -t reservations -f ./Dockerfile ../../
    docker tag reservations _reservations_repo_url_/production
    docker image push _reservations_repo_url_/production

2- Automated CI/CD with Google CloudBuild:

    a. Create cloudbuild.yaml file at your project’s root: each repository will have two steps:

        i. Build step

        ii. Push step

    b. Set up a build trigger that pulls from your github repo and builds images using the latest changes on code.

3- Setup Kubernetes (locally)

    a. Enable Kubernetes from Docker Desktop

    b. Install "helm" as dependency manager for Kubernetes cluster

    c. mkdir k8s directory, and: cd k8s/

    d. Create a new HELM chart (e.g. named wiser):

    helm create wiser

    e. Create Deployments (pods) for each one of the services:

        i. Install kubectl if not exists.

        ii. Create deployment:

        kubectl create deployment reservations --image=_gcloud_image_url_ --dry-run=client -o yaml > ./wiser/templates/reservations/deployment.yaml

        iii. Install helm chart named "wiser":

        helm install wiser ./k8s/

        iv. Double check created pod with command:

        kubectl get pods

4- Enable local Kubernetes cluster to access Artifact Registry images:

    a. Get API keys:

        i. Go to GCloud: "APIs & Services" -> credentials -> service account (Role: artifact registry reader)

        ii. Service account -> Keys -> Json -> create

    b. Tell Kubernetes to use the JSON key file when pulling from GCR:

        i. Create Kubernetes secret:

        kubectl create secret docker-registry gcr-json-key --docker-server=_first_part_of_service_url_ --docker-username=_json_key --docker-password="$(cat _path_to_json_key_file_)" --docker-email=blabla@blac.com

        ii. Tell the "default" service-account, in GCP, to use this secret:

        kubectl patch serviceaccount default -p '{"imagePullSecrets": [ { "name": "gcr-json-key" } ] }'

        iii. Double Check:

        kubectl get pods

5- Create Kubernetes cluster services:

    a. To create generic secrets for sensitive env vars to be used in services to use: (e.g. secret object "jwt" and variable "refreshToken" with value "blablabla")

        i. Create secret:

        kubectl create secret generic "jwt" --from-literal=refreshToken=blablabla

        ii. Update chart with command:

        helm upgrade wiser ./k8s/wiser

        iii. To update a current secret (e.g., google) for a service (e.g., notifications):

        kubectl edit secret google
        kubectl rollout restart deployment notifications
        kubectl get pods

    b. Generate a service for a microservice (e.g. auth, ports exposed 3002/tcp, and 3001/http):

        i. Create two services, one for tcp, and one for http:

        kubectl create service clusterip "auth-tcp" --tcp=3002 --dry-run=client -o yaml > k8s/wiser/templates/auth/service-tcp.yaml
        kubectl create service nodeport auth-http --tcp=3001 --dry-run=client -o yaml > k8s/wiser/templates/auth/service-http.yaml

        ii. Update chart:

        helm upgrade wiser k8s/wiser

        iii. Double check with:

        kubectl get svc

6- To connect local machine to the online Google Kubernetes Engine’s cluster:

    a. Get connect command from: GKE -> Clusters -> “Connect” Button , and then run it locally.

    b. List all contexts (clusters) to copy the name of the GKE one:

    kubectl config get-contexts

    c. Switch to online GKE cluster:

    kubectl config use-context _context_name_

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If
you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
