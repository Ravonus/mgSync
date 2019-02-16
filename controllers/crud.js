module.exports = {

  readCreate: (model) => {
    return (where, _cb) => {
      eval(model).findAll({
        where: where
      }).then(account => {
        if (account.length > 0) return _cb(null, account);
        return _cb({ err: 'Cheeko user account not found' });
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

  }

}