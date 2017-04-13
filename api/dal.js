const PouchDB = require('pouchdb-http')
PouchDB.plugin(require('pouchdb-mapreduce'))
const couch_base_uri = 'http://127.0.0.1:5984/'
const couch_dbname = 'cpc'
const db = new PouchDB(couch_base_uri + couch_dbname)



///////////////////////
//   family
//////////////////////
function postFamily(family, cb) {
  family.type = 'family'
  let newId = 'family_' + family.parentLast.toLowerCase()
  + '_' + family.eMail.toLowerCase() + '_' + family.cellPhone
  family._id = newId

  db.put(family, function(err, resp) {
    if (err) return cb(err)
    cb(null, resp)
  })
}

function postChildren(child, cb) {
  child.type = 'children'
  let newId = 'children_' + child.childName.toLowerCase()
  + '_' + child.familyId.toLowerCase()
  child._id = newId

  db.put(child, function(err, resp) {
    if (err) return cb(err)
    cb(null, resp)
  })
}





///////////////////////
//   park
//////////////////////
function getHamptonPark(cb) {
  db.get('park_hampton_park',  function(err, parks) {
      if (err) return cb(err)
      cb(null, parks)
    })
}




///////////////////////
// helper functions
///////////////////////


const dal = {
  postFamily: postFamily,
  postChildren: postChildren
}

module.exports = dal
