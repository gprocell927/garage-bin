exports.seed = function(knex, Promise) {
  return knex('items').del()
  .then(() => {
    return Promise.all([
      knex('items').insert({
        name: 'rubber chicken',
        reason: 'It is fun',
        cleanliness: 'Dusty'
      }),
      knex('items').insert({
        name: 'old shoe',
        reason: 'Sentimental value',
        cleanliness: 'Rancid'
      }),
      knex('items').insert({
        name: 'marshmallow peeps',
        reason: '1995 Special Edition',
        cleanliness: 'Sparkling'
      })
    ]);
  });
};
