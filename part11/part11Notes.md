- full-stack-open-pokedex [link](https://github.com/OoMiDOoO/full-stack-open-pokedex)
- Project [link](https://github.com/OoMiDOoO/bloglist-app)\

---

- During this part, you will build a robust deployment pipeline to a ready made example project.
- Unlike the other parts of this course, you do not write many lines of code in this part, it is much more about configuration. Debugging code might be hard but debugging configurations is way harder, so in this part, you need lots of patience and discipline!

### `Part 11: (A)` Introduction to CI/CD

- It is not uncommon that a code works just fine in one developer's machine but another developer can not even get it started. This is often called the `"works on my machine"` problem.
- About no-branching:
  - This is fine if there's only one developer for a project and that developer only works on one feature at a time.
- In general when we talk about `building` we mean preparing software to run on the platform where it's intended to run.
  - e.g. Node.js being a `runtime environment`.
- `Deployment` refers to putting the software where it needs to be for the end-user to use it.
- What is `CI`:
  - The strict [definition](https://www.martinfowler.com/articles/continuousIntegration.html) of CI (Continuous Integration) and the way the term is used in the industry are quite different.
  - Strictly speaking, CI refers to merging developer changes to the main branch often, Wikipedia even helpfully suggests: "several times a day". This is usually true but when we refer to CI in industry, we're usually talking about what happens after the actual merge happens.
  - Some `CI` steps: Lint, Build, Test, Package, Deploy.
- Packaging and especially deployment may not be `CI`, But they're the most likely point of failure.
- About type of `CI` setup:
  - Self-hosted e.g. Jenkins, you pay for the `VM`, then do whatever on it.
  - Cloud-based e.g. GitHub Actions.

### `Part 11: (B)` Getting started with GitHub Actions

- GitHub Actions work on a basis of `workflows`. A workflow is a `series of jobs` that are run when a certain `triggering event` happens. The jobs that are run then themselves contain `instructions` for what GitHub Actions should do.
- YAML is a recursive acronym for `"YAML Ain't Markup Language"`. As the name might hint its goal is to be human-readable and it is commonly used for configuration files.
- `Actions` are useable pieces of code, they can be defined in your repo or publicly e.g. [Github Actions](https://github.com/actions/).
  - You can give parameters to actions with keyword `with`.

### `Part 11: (C)` Deployment

- Murphy's Law holds that: "Anything that can go wrong will go wrong."
- Our deployment system should never leave our software in a broken state.
- "Silent failures are very bad!"
- There are some stuff about `What does a good deployment system do?`.
  - Never leave software in a broken state.
  - Notify when a failure happens.
  - Easy roll back to previous versions.
  - Handle cases when user makes a request before/during a deplyoment.
  - No downtime during deployment.

### `Part 11: (D)` Keeping green

- Your main branch of the code should always remain green. Being green means that all the steps of your build pipeline should complete successfully.
- Don't push to main, instead:
  - commit your code on a branch based on the freshest possible version of the main branch. Once you think the branch is ready to be merged into the main you create a GitHub Pull Request (also referred to as PR).
- The workflow [context](https://docs.github.com/en/free-pro-team@latest/actions/reference/context-and-expression-syntax-for-github-actions#contexts) gives various kinds of information about the code the workflow is run.
- Could have just made two separate pipelines, one for `PR` one for `Push/Merge` to main.
- About `Versioning`:
  - Semantic versioning, where a version is in the form `{major}.{minor}.{patch}`, e.g. `v1.2.3`
  - Hash versioning...e.g. SHA of commits.
  - tl;dr, use Semantic for presentable situations, use hash for the opposite.
    - e.g. Semantic for releases, Hash for PRs.
    - Added points: CI system automatically updates semantic versioning based on commit name.
- From the comparison above, it would seem that the semantic versioning makes sense for releasing software while hash-based versioning (or artifact naming) makes more sense during development.
- Developing workflows is not easy, and quite often the only option is trial and error. It might actually be advisable to have a separate repository for getting the configuration right, and when it is done, to copy the right configurations to the actual repository.
  - Or use a tool like [act](https://github.com/nektos/act).
- About third party actions:
  - Git tag can be moved, you mas use hash `@hash` for better security.

### `Part 11: (E)` Expanding Further

- In the real world, there are more fingers in the pie than just developers and users.
- There's a need to notify of build, deployments.
- In next stages, monitoring build times could be important, one of the stuff mentioned `Datadog`.
- Words of advice to consider: If your budget allows it, it's almost always better to use a tool that already does the job than to roll your own solution. If security isn't the industry you're aiming for, for example, use `Dependabot` to check for security vulnerabilities instead of making your own tool.
  - e.g. CodeQL
- GitHub Actions provides a scheduled trigger that can be used to execute a task at a particular time.

---

- If `actions/checkout@v3` gets only the last commit, how can it push/merge?
- It's important to remember that CI/CD is not the goal. The goal is better, faster software development with fewer preventable bugs and better team cooperation.
- `CD`: Continuous Delivery and Continuous Deployment. Two different things.
  - Main branch kept deployable Vs. Automatically deployed, I guess?
- But once one developer has merged their changes into the main branch, what happens to the other developers' branches? They are now diverging from an older copy of the main branch. How will the developer on the later branch know if their changes are compatible with the current state of the main branch? That is one of the fundamental questions we will be trying to answer in this part.
  - Testing, Testing, and Testing?
- _Time Elapsed:_ `~34H00M`
- _Stopped at:_ `P11E - Finished`
- (A) Section has lots of things to read.
