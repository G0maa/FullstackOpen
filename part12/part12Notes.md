- We will utilize containers to create immutable execution environments for our Node.js and React projects. Containers also make it easy to include multiple services with our projects.
- In this part we are interested in the configuration of the environment in which the software is executed.

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

---

- _Time Elapsed:_ `~05H00M`
- _Stopped at:_ `P12B - More meaningful image`