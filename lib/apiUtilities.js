import { verifyCredentials, mongooseConnect } from "./cloudUtilities"
import { formatResult, formatResults, formatError } from "./jsonUtilities"

/**
 * Handle requests made to an API entity index
 *
 * @param {Object} req The URL request object
 * @param {Object} res The URL response object
 * @param {Function} Entity The model entity to be used
 */
async function handleIndexRequests(req, res, Entity) {
  console.log(typeof Entity)
  await mongooseConnect()

  switch (req.method) {
    case "GET":
      try {
        const entities = await Entity.find({})
        res.status(200).json(formatResults(entities, req))
      } catch (e) {
        console.log(e)
      }
      break

    case "POST":
      try {
        if (!verifyCredentials(req.query.username, req.query.password)) {
          res.status(403).json(formatError(403))
          break
        }
        const entity = await Entity.create(req.body)
        res.status(201).json(formatResult(entity))
      } catch (e) {
        console.log(e)
      }
      break
  }

  if (!res.headersSent) {
    res.status(400).json(formatError(400))
  }
}

/**
 * Handle requests made to an API entity ID
 *
 * @param {Object} req The URL request object
 * @param {Object} res The URL response object
 * @param {Function} Entity The model entity to be used
 */
async function handleIdRequests(req, res, Entity) {
  await mongooseConnect()

  switch (req.method) {
    case "GET":
      try {
        const entity = await Entity.findById(req.query.id)
        if (entity) {
          res.status(200).json(formatResult(entity))
        }
      } catch (e) {
        console.log(e)
      }
      break

    case "PUT":
      try {
        if (!verifyCredentials(req.query.username, req.query.password)) {
          res.status(403).json(formatError(403))
          break
        }
        const entity = await Entity.findByIdAndUpdate(req.query.id, req.body, { new: true, runValidators: true })
        if (entity) {
          res.status(200).json(formatResult(entity))
        }
      } catch (e) {
        console.log(e)
      }
      break

    case "DELETE":
      try {
        if (!verifyCredentials(req.query.username, req.query.password)) {
          res.status(403).json(formatError(403))
          break
        }
        const entity = await Entity.deleteOne({ _id: req.query.id })
        if (entity) {
          res.status(200).json(formatResult(entity))
        }
      } catch (e) {
        console.log(e)
      }
      break
  }

  if (!res.headersSent) {
    res.status(400).json(formatError(400))
  }
}

export {
  handleIndexRequests,
  handleIdRequests
}
