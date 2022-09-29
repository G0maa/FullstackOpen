- We will utilize containers to create immutable execution environments for our Node.js and React projects. Containers also make it easy to include multiple services with our projects.
- In this part we are interested in the configuration of the environment in which the software is executed.
- Best use case for `contaieners` are in production.

### `Part 12: (A)` Introduction to Containers

- VMs are used to run multiple operating systems on a single physical machine. They have to run the whole operating system, whereas a container runs the software using the host operating system.

  - More accurately, containers are OS-level virtualization.

- About containers:
  - Lightweight, compared to VMs.
  - Quick to scale.
  - Isolate the software running inside; run the software identically anywhere; perfect for cloud environment.
- Scenarios:

  - Need to run two different versions of e.g. Nodejs at the same time on the same machine.
  - Need to run the application on different machine in the same erm.. excution manner? i.e. same environment.

- A container is a runtime instance of an image.
- Docker is a set of products that help us to manage images and containers.

  - Docker compose: "orchestrate" control multiple containers at the same time.
  - Docker daemon: background service that makes sure the containers are running
  - Docker client: Used to interact with the daemon.

- `it` makes sure we can interact with the container.
- There are lots of commands that I need to write here 😬

- `docker build -t fs-hello-world .`
- `docker run -it <image-name>`
- `docker start -i <container-name>`

### `Part 12: (B)` Building and configuring environments

- `Dockerfile` is a simple text file that contains all of the instructions for creating an image.
- `CMD` instruction tells what happens when **`docker run`** is used
- `CMD` is the default command that can then be overwritten with the parameter given after the image name.
- `docker run -p host-port:application-port`, port from host to port from container.
- This is a critical thing to keep in mind when we build our images. It's best to do most things, such as to run `npm install` **during the build process** inside the container rather than doing those prior to building.
  - The easy rule of thumb is to only copy files that you would push to GitHub.
- About `ci` vs `install`:
  - `ci` sticks to `package-lock.json`,
  - also will delete `node_modules` before each instal.
  - `ci` creates reliable builds, while `install` is the one to use when you want to install new dependencies.
  - There's also `npm ci --only=production`
- About `Dockerfile` best practices:
  - Try to create as secure of an image as possible.
  - Try to create as small of an image as possible.
  - [Here.](https://snyk.io/blog/10-best-practices-to-containerize-nodejs-web-applications-with-docker/)
- The Seven things in `Dockerfile`
  - `FROM`, `WORKDIR`, `COPY`, `RUN`, `ENV`, `USER`, `CMD`.
- `Bind mount` is the act of binding a file on the host machine to a file in the container.
- start the MongoDB with `docker-compose -f docker-compose.dev.yml up -d`. With `-d` it will run it in the background. You can view the output logs with `docker-compose -f docker-compose.dev.yml logs -f`. There the `-f` will ensure we follow the logs.
- By default, **containers are not going to preserve our data**, to store the data:
  - Declaring a location in your filesystem (called bind mount)
  - Letting Docker decide where to store the data (volume)
- About the `MongoDB` parts:
  - First, there's the `mongo` image i.e. runtime of a MongoDB.
  - Second, we have the `app`, which is kind of not really attached to `MongoDB`.
  - The app is NOT containeraized, whilst the DB is.
  - DB needs `root` user details, defined in the `docker-compose.dev.yml`.
  - Also needs info about the user details that's going to try to connect it.
    - which is in `mongo-init.js`
  - Finally `app` needs to connect with `MongoDB` through `port` specified in `docker-compose.dev.yml`.
  - FinallyII => volumes are used to:
    - Share ``mongo-init.js`
    - Share output data of the `DB`
- `docker exec` Run a command (or a command line) in a running container
- `docker cp ./some_file CONTAINER:/work`

### `Part 12: (C)` Basics of Orchestration

- There are actually three different forms for the CMD out of which the exec form is preferred. Read the [documentation](https://docs.docker.com/engine/reference/builder/#cmd) for more info.
- [Multi-stage builds](https://docs.docker.com/develop/develop-images/multistage-build/) are designed for splitting the build process into many separate stages, where it is possible to limit what parts of the image files are moved between the stages. That opens possibilities for limiting the size of the image since not all by-products of the build are necessary for the resulting image. Smaller images are faster to upload and download and they help reduce the number of vulnerabilities your software may have.
- Note that it may not be the best idea to move all testing to be done during the building of an image, but there may be some containerization-related tests when this might be a good idea.
- Why `Development in containers`?
  - To keep the environment similar between development and production..
  - To avoid differences between developers and their personal environments..
  - To help new team members hop in by having them install container runtime..
- The docker-compose tool sets up a network between the containers and includes a DNS to easily connect two containers.
- `Busybox` is a small executable with multiple tools you may need. It is called "The Swiss Army Knife of Embedded Linux", and we definitely can use it to our advantage.
- The port does not need to be published for other services in the same network to be able to connect to it. The "ports" in the docker-compose file are only for external access.
- Note that `depends_on` does not guarantee that the service in the depended container is ready for action. If a service needs to wait another service to become ready before the startup, [other solutions](https://docs.docker.com/compose/startup-order/) should be used.

### Some commands:

- Summary of `docker-compose` commands:
  - Starting `docker-compose`
    - `docker-compose -f <.yml file name> up -d`, `-d` for running it in the background.
  - In case of runnig it in the background and need logs:
    - `docker-compose -f docker-compose.dev.yml logs -f`, `-f` for following logs.
  - Rebuild images of `docker-compose`
    - `docker-compose up --build`
  - Turn-off `docker-compose`, volumes included.
    - `docker-compose -f docker-compose.dev.yml down --volumes`
  - Run specific service inside a `.yml`
    - `docker-compose run <service-name> <?bash?>`

---

- There's an internal docker netowrk of docker containers, through which they can communicate with each other.
  - By definition, localhost refers to the current computer used to access it. With containers localhost is unique for each container, leading to the container itself.
  - The containers are each given two names: the service name and the container name.
  - This works if they're in the same docker network only... thorugh e.g. a single `docker-compose` file.
- About `Redis`:
  - A simple `key-value` database.
  - Works in memory by default.
  - Excellent use is as a cache.
  - Has "auotmatically expiring" keys.
  - Can implement `PubSub`
- Remember that all of the changes are lost when the container is deleted. To preserve the changes, you must use `commit`.
- `docker-compose -f docker-compose.dev.yml down --volumes`
- `docker-compose -f docker-compose.dev.yml up`
- _Time Elapsed:_ `~015H30M`
- _Stopped at:_ `P12C - Communications between containers in a more ambitious environment`
