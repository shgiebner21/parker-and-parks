const PouchDB = require('pouchdb-http')
PouchDB.plugin(require('pouchdb-mapreduce'))
const couch_base_uri = 'http://127.0.0.1:5984/'
const couch_dbname = 'cpc'
const db = new PouchDB(couch_base_uri + couch_dbname)

const {map} = require('ramda')


/////////////////////////////////////////////
//   family
/////////////////////////////////////////////
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

function getFamilies(starkey, limit, cb) {
  console.log('inside getFamilies')
  db.query('families', {include_docs: true}, function(err, families) {
    if (err) return cb(err)
    cb(null, map(returnDoc, families.rows))
  })
}

function getFamily(id, cb) {
  db.get(id, function(err, family) {
    if (err) return cb(err)
    cb(null, family)
  })
}

/////////////////////////////////////////////
//   children
/////////////////////////////////////////////
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

function listChildren(startkey, limit, cb) {
  db.query('children', {include_docs: true}, function(err, list) {
    if (err) return cb(err)
    cb(null, map(returnDoc, list.rows))
  })
}

function getChild(id, cb) {
  db.get(id, function(err, child) {
    if (err) return cb(err)
    cb(null, child)
  })
}

function updateChild(child, cb) {
  db.put(child, function(err, resp) {
    if (err) return cb(err)
    cb(null, resp)
  })
}


function getActivity(id, cb) {
  db.get(id, function(err, activity) {
    if (err) return cb(err)
    cb(null, activity)
  })
}


/////////////////////////////////////////////
//   badges
/////////////////////////////////////////////
function listBadges(startkey, limit, cb) {
  db.query('badges', {include_docs: true}, function(err, list) {
    if (err) return cb(err)
    cb(null, map(returnDoc, list.rows))
  })
}

/////////////////////////////////////////////
//   park
/////////////////////////////////////////////
function getParks(startkey, limit, cb) {
  db.query('parks', {include_docs: true},  function(err, parks) {
      if (err) return cb(err)
      cb(null, map(returnDoc, parks.rows))
    })
}

function getPark(id, cb) {
  db.get(id, function(err, park) {
    if (err) return cb(err)
    cb(null, park)
  })
}


/////////////////////////////////////////////
// helper functions
/////////////////////////////////////////////

const returnDoc = row => row.doc








const dal = {
  postFamily: postFamily,
  getFamilies: getFamilies,
  getFamily: getFamily,
  postChildren: postChildren,
  updateChild: updateChild,
  listChildren: listChildren,
  getChild: getChild,
  listBadges: listBadges,
  getParks: getParks,
  getPark: getPark,
  getActivity: getActivity
}

module.exports = dal
