module.exports = {

  readCreate: (model) => {
    return (where, _cb) => {
      if (!_cb) {
        return new Promise((resolve, reject) => {
          eval(model).findAll({
            where: where
          }).then(account => {
            if (account.length > 0) return resolve(account);
            return reject({ err: 'could not find' });
          }).catch(err => {
            return reject(err);
          });
        })
      } else {

        eval(model).findAll({
          where: where
        }).then(account => {
          if (account.length > 0) return _cb(null, account);
          return _cb({ err: 'could not find' });
        }).catch(err => {
          _cb(err);
        });
      }
    }
  },

  createCreate: (model) => {
    return (obj, _cb, type) => {
      if (!_cb || typeof _cb === 'string') {
        if(!_cb) _cb = 'create';
        return new Promise((resolve, reject) => {
          eval(model)[_cb](
            obj
          ).then(account => {
            return resolve(account);
          }).catch(err => {
            return reject(err);
          });
        })
      } else {
        if(!type) type = 'create';
        eval(model)[type]({
          obj
        }).then(account => {
          if (account.length > 0) return _cb(null, account);
          return _cb({ err: 'could not find' });
        }).catch(err => {
          _cb(err);
        });
      }
    }
  },

  updateCreate: (model) => {
    return (id, body, _cb) => {
      if (!_cb) {
        return new Promise((resolve, reject) => {
          eval(model).update(
            body,
            {
              where: id
            }).then(data => {
              if (data.length > 0) return resolve(data);
              return reject({ err: 'Could not update' });
            }).catch(err => {
              reject(err);
            });
        })
      } else {

        eval(model).update(
          body,
          {
            where: id
          }).then(data => {
            if (data.length > 0) return _cb(null, data);
            return _cb({ err: 'Could not update' });
          }).catch(err => {
            _cb(err);
          });
      }

    }

  },

  deleteCreate: (model) => {
    return (id, _cb) => {
      eval(model).destroy(
        {
          where: id
        }).then(data => {

          if (data > 0) return _cb(null, data);
          return _cb({ err: 'Could not delete' });
        }).catch(err => {
          _cb(err);
        });

    }

  }

}