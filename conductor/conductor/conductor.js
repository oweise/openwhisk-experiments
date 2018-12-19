function main(args) {

    if (args.error) {
      return {
        statusCode: 500,
        body: args.error
      }
    }

    var state = args.$state || "new";

    switch (state) {
      case "new":
        return findStep(args);

      case "afterUserRetrieval":
        return storeStep(args);

      case "afterUserStorage":
        return webAnswer(args);

      default:
        return {
          statusCode: 500,
          body: "Unknown step"
        };
    }
}

function findStep(params) {
  if (params.first && params.last) {
    return {
      action: "web-action-conductor/find-people-by-name",
      params: params,
      state: {$state: "afterUserRetrieval"}
    }
  }
  else if (params.email) {
    return {
      action: "web-action-conductor/find-people-by-mail",
      params: params,
      state: {$state: "afterUserRetrieval"}
    }
  }
  else {
    return {
      statusCode: 400,
      body: {error: "Did not find valid search params"}
    }
  }
}

function storeStep(params) {
  if (params.doc) {
    return {
      action: "web-action-conductor/store-people",
      params: params.doc,
      state: {$state: "afterUserStorage"}
    }
  }
  else {
    return {
      statusCode: 404,
      body: {error: "User not found"}
    }
  }
}

function webAnswer(params) {
  return {
    body: {
      msg: "Document found and stored",
      docId: params.doc._id,
      name: params.doc.name
    }
  }
}

exports.main = main
