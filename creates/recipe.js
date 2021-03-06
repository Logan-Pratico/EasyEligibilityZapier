// We recommend writing your creates separate like this and rolling them
// into the App definition at the end.
module.exports = {
  key: 'recipe',

  // You'll want to provide some helpful display labels and descriptions
  // for users. Zapier will put them into the UX.
  noun: 'EasyEligibility',
  display: {
    label: 'Generates EasyEligibility Call',
    description: 'EasyEligibility Call for Eligibility Verification.'
  },

  // `operation` is where the business logic goes.
  operation: {
    inputFields: [
      {key: 'User', required: true, type: 'string'},
      {key: 'Password', required: true, type: 'string'},
      {key: 'payerCode', required: true, type: 'string'},
      {key: 'provider_lastname', required: true, type: 'string'},
      {key: 'provider_npi', required: true, type: 'string'},
      {key: 'memberID', required: true, type: 'string'},
      {key: 'patient_DOB', required: true, type: 'string'},
      {key: 'date_Of_Service', required: true, type: 'string'},
      {key: 'serviceCodes', required: true, type: 'string'},
    ],
    perform: (z, bundle) => {
      const promise = z.request({
        url: 'https://api.pverify.com/api/EasyEligibility',
        method: 'POST',
        body: JSON.stringify({
          payerCode: bundle.inputData.payerCode,
          provider_lastname: bundle.inputData.provider_lastname,
          provider_npi: bundle.inputData.provider_npi,
          memberID: bundle.inputData.memberID,
          patient_DOB: bundle.inputData.patient_DOB,
          date_Of_Service: bundle.inputData.date_Of_Service,
          serviceCodes: bundle.inputData.serviceCodes,
        }),
        headers: {
          'content-type': 'application/json',
	  'Client-User-Name': bundle.inputData.User,
	  'Client-Password': bundle.inputData.Password,
          // This is NOT how you normally do authentication. This is just to demo how to write a create here.
          // Refer to this doc to set up authentication:
          // https://zapier.github.io/zapier-platform-cli/#authentication
          'X-API-Key': 'secret'
        }
      });

      return promise.then((response) => JSON.parse(response.content));
    },
}
};
