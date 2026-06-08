// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from "./databases.js";

const dbs = {
  db1: db1,
  db2: db2,
  db3: db3
};

function getUserData(id) {
  return central(id)
    .then((dbName) => {
      return Promise.all([dbs[dbName](id), vault(id)]);
    })
    .then(([dbData, vaultData]) => {
      return {
        id,
        name: vaultData.name,
        username: dbData.username,
        email: vaultData.email,
        address: vaultData.address,
        phone: vaultData.phone,
        website: dbData.website,
        company: dbData.company,
      };
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

export default getUserData;

// test
getUserData(1)
  .then((data) => {
    console.log("SUCCESS:", data);

    document.getElementById("app").innerText =
      JSON.stringify(data, null, 2);
  })
  .catch((err) => {
    console.log("ERROR:", err);

    document.getElementById("app").innerText =
      "ERROR: " + err.message;
  });