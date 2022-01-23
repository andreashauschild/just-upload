# just-upload
Just Upload is an angular library (without external dependencies) that provides all necessary features to make file upload simple as possible.
This repository also elements that are used for further development of this library, like a api backend for file uploads and some UI examples.

You can find the documentation for the just-upload library here: [just-upload](https://github.com/andreashauschild/just-upload/blob/main/core/projects/just-upload/README.md)


# Development
This section holds information for the developers of this library. This section can be ignored if you only want to use it.

## Startup Development Workspace
The workspace is divided in frontend and backend part. The `backend` is in `java` based on `quarkus` [(https://quarkus.io/)](https://quarkus.io/) microservice. 
The `frontend` contains of the `just-upload` library and the `example-app`

1. Start backend 
    - Navigate to: `just-upload/dev/servers/quarkus`
    - Execute: `mvn compile quarkus:dev`    

2. Start frontend
   - Navigate to: `just-upload/core`
   - Execute library `ng build just-upload --watch=true`
   - Execute example `ng serve example-app`
