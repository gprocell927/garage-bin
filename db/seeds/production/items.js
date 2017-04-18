exports.seed = function(knex, Promise) {
  return knex('items').del()
  .then(() => {
    return Promise.all([
      knex('items').insert({
        name: 'Rubber Chicken',
        reason: 'It is fun',
        cleanliness: 'Dusty',
        created_at: new Date
      }),
      knex('items').insert({
        name: 'Old shoe',
        reason: 'Sentimental value',
        cleanliness: 'Rancid',
        created_at: new Date
      }),
      knex('items').insert({
        name: 'Marshmallow Peeps',
        reason: '1995 Special Edition',
        cleanliness: 'Sparkling',
        created_at: new Date
      })
    ]);
  });
};
