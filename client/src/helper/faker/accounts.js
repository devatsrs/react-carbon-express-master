const accounts_data = [];
const accounts_owners = [];
const countries = [];
const timezones = [];
const currencies = [];
const billing_classes = [];
const billing_account_type = [];
const billing_cycle = [];
var faker = require("faker");

for (let i = 0; i < 100; i++) {
  accounts_data.push({
    id: (i + 1).toString(),
    account_number: faker.finance.mask(),
    account_name: faker.company.companyName(),
    email: faker.internet.email(),
    OS: faker.finance.amount(),
    UA: faker.finance.amount(),
    CL: faker.finance.amount(),
    AE: faker.finance.amount(),
  });
}
for (let i = 0; i < 100; i++) {
  countries.push({
    id: (i + 1).toString(),
    text: faker.address.country()
  });
}

for (let i = 0; i < 100; i++) {
  timezones.push({
    id: (i + 1).toString(),
    text: faker.address.timeZone()
  });
}


for (let i = 0; i < 10; i++) {
  accounts_owners.push({
    id: (i + 1).toString(),
    text: faker.name.findName(),
  });
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

currencies.push(
  { id: (1).toString(), text: "USD" },
  { id: (2).toString(), text: "GBP" },
  { id: (3).toString(), text: "INR" },
);
billing_classes.push(
  { id: (1).toString(), text: "Net Class 15" },
  { id: (2).toString(), text: "Net Class 20" },
  { id: (3).toString(), text: "Net Class 30" },
);
billing_account_type.push(
  { id: (1).toString(), text: "Prepaid" },
  { id: (2).toString(), text: "Postpaid" },
);

billing_cycle.push(
  { id: (1).toString(), text: "Weekly" },
  { id: (1).toString(), text: "Monthly" },
  { id: (2).toString(), text: "Quaterly" },
  { id: (2).toString(), text: "Yearly" },
);

export { accounts_data as default, accounts_owners, countries, timezones, currencies, billing_classes, billing_account_type, billing_cycle };
