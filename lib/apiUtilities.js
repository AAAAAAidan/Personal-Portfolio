import { verifyCredentials, mongooseConnect } from "./cloudUtilities"
import { formatResult, formatResults, formatError } from "./jsonUtilities"
import Head from 'next/head'

/**
 * Handle requests made to an API entity index
 *
 * @param {Object} req The URL request object
 * @param {Object} res The URL response object
 * @param {Function} Entity The model entity to be used
 */
async function handleIndexRequests(req, res, Entity) {
  await mongooseConnect()
  const method = (req.body.method || req.method).toUpperCase()

  switch (method) {
    case "GET":
      try {
        const entities = await Entity.find().lean()
        res.status(200).json(formatResults(entities, req))
      } catch (e) {
        console.error(e.stack)
      }
      break

    case "POST":
      try {
        if (verifyCredentials(req.body.username, req.body.password)) {
          const entity = await Entity.create(req.body)
          res.status(201).json(formatResult(entity))
        } else {
          res.status(403).json(formatError(403))
        }
      } catch (e) {
        console.error(e.stack)
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
  const method = (req.body.method || req.method).toUpperCase()

  switch (method) {
    case "GET":
      try {
        const entity = await Entity.findById(req.query.id).lean()
        if (entity) {
          res.status(200).json(formatResult(entity))
        }
      } catch (e) {
        console.error(e.stack)
      }
      break

    case "PUT":
    case "POST":
      try {
        if (verifyCredentials(req.body.username, req.body.password)) {
          const entity = await Entity.findByIdAndUpdate(req.query.id, req.body, { new: true, runValidators: true }).lean()
          if (entity) {
            res.status(200).json(formatResult(entity))
          }
        } else {
          res.status(403).json(formatError(403))
        }
      } catch (e) {
        console.error(e.stack)
      }
      break

    case "DELETE":
      try {
        if (verifyCredentials(req.body.username, req.body.password)) {
          const entity = await Entity.deleteOne({ _id: req.query.id }).lean()
          if (entity) {
            res.status(200).json(formatResult(entity))
          }
        } else {
          res.status(403).json(formatError(403))
        }
      } catch (e) {
        console.error(e.stack)
      }
      break
  }

  if (!res.headersSent) {
    res.status(400).json(formatError(400))
  }
}

/**
 * Get HTML for an API data listing page
 *
 * @param {String} dataPath The API path
 * @param {Array[Object]} dataList An array of API objects
 * @returns {HTML} Returns the HTML
 */
function getApiList(dataPath, dataList) {
  const pageTitle = dataPath.charAt(1).toUpperCase() + dataPath.slice(2)

  return (
    <div>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <h1>{pageTitle}</h1>
      {dataList && dataList.map((data) => (
        <h3 key={data._id}>
          <a href={dataPath + "/" + data._id}>{data.title} ({data._id})</a>
        </h3>
      ))}
    </div>
  )
}

/**
 * Get HTML for an API data object form page
 *
 * @param {String} action The API path
 * @param {String} method The method to use for the form submission
 * @param {Object} data An API object
 * @returns {HTML} Returns the HTML
 */
function getApiForm(action, method, data) {
  const pageTitle = action.replace("/api/", "").charAt(0).toUpperCase() + action.replace("/api/", "").replace(/\/.*/g, "").slice(1, -1)

  const addSelectOption = function(name) {
    const newValue = prompt("Enter a value:")

    if (newValue) {
      const selectElement = document.getElementsByName(name)[0]
      const newOption = document.createElement("option")
      newOption.value = newValue
      newOption.innerText = newValue
      newOption.selected = true
      selectElement.appendChild(newOption)
    }
  }

  const setFormMethodToDelete = function() {
    document.getElementsByName("method")[0].value = "delete"
  }

  return (
    <div>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <form action={action} method="post">
        <input type="hidden" value={method} name="method" />

        <h1>Credentials</h1>
        <h3>Username</h3>
        <input type="text" name="username" />
        <h3>Password</h3>
        <input type="password" name="password" />

        <h1>{pageTitle} Data</h1>
        {data && Object.entries(data).map(([key, value]) => (
          <div key={key}>
            <h3>{key.charAt(0).toUpperCase() + key.slice(1)}</h3>
            {Array.isArray(value) &&
              <div>
                <select name={key} multiple defaultValue={value}>
                {value && value.map((individualValue) => (
                  <option key={individualValue} value={individualValue}>{individualValue}</option>
                ))}
                </select>
                <button type="button" onClick={() => addSelectOption(key)}>+</button>
              </div>
            }
            {!Array.isArray(value) &&
              <input type="text" name={key} defaultValue={value} />
            }
          </div>
        ))}

        <h1>Save</h1>
        <input type="submit" value="Save" />

        {method.toLowerCase() === "put" &&
          <div>
            <h1>Delete</h1>
            <input type="submit" value="Delete" onClick={setFormMethodToDelete} />
          </div>
        }
      </form>
    </div>
  )
}

/**
 * Get a list of static paths from the API
 *
 * @param {Function} Entity The model entity to be used
 * @returns {Array[Object]} Returns a list of path objects
 */
async function getStaticApiPaths(Entity) {
  await mongooseConnect()
  const entities = await Entity.find().lean()
  const data = JSON.parse(JSON.stringify(entities))
  return data.map(entity => {
    return {
      params: { id: entity._id }
    }
  })
}

/**
 * Get static properties from the API
 *
 * @param {Function} Entity The model entity to be used
 * @param {String} [id] An optional entity ID
 * @returns {Object} Returns an object from the API
 */
async function getStaticApiProps(Entity, id) {
  await mongooseConnect()
  let entities

  if (id) {
    entities = await Entity.findById(id).lean()
  } else {
    entities = await Entity.find().lean()
  }

  return JSON.parse(JSON.stringify(entities))
}

export {
  handleIndexRequests,
  handleIdRequests,
  getApiList,
  getApiForm,
  getStaticApiPaths,
  getStaticApiProps
}
