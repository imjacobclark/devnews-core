[![Build Status](https://travis-ci.org/imjacobclark/devnews-core.svg)](https://travis-ci.org/imjacobclark/devnews-core)

# devnews-core
Developer news aggregation engine and API endpoints

### Deploying

**Docker** 

```
git clone https://github.com/imjacobclark/devnews-core.git && cd devnews-core
docker build -t devnews-core .
docker run -d -p 3000:3000 --name devnews-core devnews-core
```

The API will now be exposed at `http://localhost:3000`
