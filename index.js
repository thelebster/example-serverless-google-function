'use strict';

const sendgrid = require('@sendgrid/mail');
const cors = require('cors')();

sendgrid.setApiKey('SENDGRID_API_KEY');

exports.http = (request, response) => {

  cors(request, response, () => {

    let name = request.body.name;
    let email = request.body.email;

    if (typeof email === 'und' || !email) {
      response.status(400).json({ error: 'Email required.' });
    };

    if (typeof name === 'und' || !name) {
      response.status(400).json({ error: 'Name required.' });
    };

    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email)) {
      response.status(400).json({ error: 'Valid email required.' });
    }

    const msg = {
      to: request.body.email,
      from: 'username@example.com',
      templateId: 'SENDGRID_TEMPLATE_ID',
      substitutionWrappers: ['{{', '}}'],
      substitutions: {
        name: name
      },
    };

    sendgrid
    .send(msg)
    .then(() => {
      response.status(200).json({ success: 'Email sent.' });
    })
    .catch(error => {
      response.status(500).json({ error: error.toString() });
    });
  })
};
