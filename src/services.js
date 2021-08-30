const URL = `http://localhost:3001/api/`;

export default {
  // Authentication
  LOGIN: URL + `signIn`,
  // REGISTER: URL + `SignUp`,
  ALLUSERS: URL + `all_accounts`,
  ALLUSERSBYID: URL + `accounts`,
  // VERIFYTOKEN: URL + `verifyToken`,

  // Brands
  ADDBRAND: URL + `add_brand`,
  ALLBRANDS: URL + `all_brands`,
  UPDATEBRAND: URL + `update_brand`,

  // Categories
  ADDCATEGORY: URL + `categories`,
  ALLCATEGORIES: URL + `all_categories`,
  UPDATECATEGORY: URL + `update_category`,
  DELETECATEGORY: URL + `delete_category`,

  // Profile
  ADDPROFILE: URL + `add_profile`,
  ALLPROFILES: URL + `all_profiles`,
  UPDATEPROFILE: URL + `update_profile`,
  DELETEPROFILE: URL + `delete_profile`,

  // Vehicle
  ADDVEHICLE: URL + `add_vehicle`,
  ALLVEHICLES: URL + `all_vehicles`,
  UPDATEVEHICLE: URL + `update_vehicle`,
  DELETEVEHICLE: URL + `delete_vehicle`,

  // Products
  ADDPRODUCT: URL + `add_product`,
  ALLPRODUCTBYID: URL + `products`,
  ALLPRODUCT: URL + `all_products`,
  UPDATEPRODUCT: URL + `update_product`,

  // Expense
  ADDEXPENSE: URL + `add_expense`,
  ALLEXPENSEBYID: URL + `expenses`,
  ALLEXPENSES: URL + `all_expenses`,
  UPDATEEXPENSE: URL + `update_expense`,
  DELETEEXPENSE: URL + `delete_expense`,

  // Transfers
  ADDTRANSFER: URL + `add_transfer`,
  ALLTRANSFERBYID: URL + `transfer`,
  ALLTRANSFER: URL + `all_transfers`

  // // Business
  // ADDBUSINESS: URL + `AddBusiness`,
  // ALLBUSINESS: URL + `AllBusinesses`,
  // UPDATEBUSINESS: URL + `UpdateBusiness`,
  // DELETEBUSINESS: URL + `DeleteBusiness`,

  // // Tax
  // ALLTAX: URL + `AllTax`,
  // ADDTAX: URL + `AddTax`,
  // ALLCLIENTS: URL + `AllClients`,

  // // file download
  // FILEDOWNLOAD: URL + `download`
};
