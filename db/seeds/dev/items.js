exports.seed = function(knex, Promise) {
  return knex('items').del()
  .then(() => {
    return Promise.all([
      knex('items').insert({
        name: 'rubber chicken',
        reason: 'It is fun',
        cleanliness: 'Dusty',
        created_at: new Date
      }),
      knex('items').insert({
        name: 'old shoe',
        reason: 'Sentimental value',
        cleanliness: 'Rancid',
        created_at: new Date
      })
    ]);
  });
};
