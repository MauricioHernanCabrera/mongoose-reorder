const merge = require("lodash/merge");

const defaultOptions = {
  key: "index",
};

async function reorder(ids, options) {
  options = merge(defaultOptions, reorder.options, options);

  const uniquesIds = [...new Set(ids)];

  const [docs, _] = await Promise.all([
    Promise.all(uniquesIds.map((_id) => this.findOne({ _id }))),
    this.updateMany({}, { [options.key]: 99999 }),
  ]);

  await Promise.all(
    docs.map((doc, index) => {
      if (doc) {
        doc[options.key] = index;
        return doc.save();
      }

      return null;
    })
  );
}

module.exports = (schema) => {
  schema.statics.reorder = reorder;
};

module.exports.reorder = reorder;
