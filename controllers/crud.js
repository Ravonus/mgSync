module.exports = {

  readCreate: (model) => {
    return (where, _cb) => {
      eval(model).findAll({
        where: where
      }).then(account => {
        if (account.length > 0) return _cb(null, account);
        return _cb({ err: 'could not find' });
      }).catch(err => {
        _cb(err);
      });

    }

  },

  updateCreate: (model) => {
    return (id, body, _cb) => {
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