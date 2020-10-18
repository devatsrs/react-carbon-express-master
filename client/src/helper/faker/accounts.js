const accounts_data = [];
const accounts_owners = [];
var faker = require( "faker" );
for( let i = 0; i < 100; i++ )
{
  accounts_data.push( {
    id: ( i + 1 ).toString(),
    account_number: faker.finance.mask(),
    account_name: faker.company.companyName(),
    email: faker.internet.email(),
    OS: faker.finance.amount(),
    UA: faker.finance.amount(),
    CL: faker.finance.amount(),
    AE: faker.finance.amount(),
  } );
}
for( let i = 0; i < 10; i++ )
{
  accounts_owners.push( {
    id: ( i + 1 ).toString(),
    text: faker.name.findName(),
  } );
}
/**
 * 
 * 
 * [
    {
      id: 1,
      account_number: "100",
      account_name: "Xays Company",
      email: "info@xays.com",
      OS: 100.44,
      UA: 10.4,
      CL: 0,
      AE: 211.44,
    },
]
 */


export { accounts_data as default, accounts_owners };
