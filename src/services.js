const URL = `https://hidden-escarpment-87534.herokuapp.com/api/`;

export default {
  // Authentication
  LOGIN: URL + `signIn`,
  ADDACCOUNT: URL + `add_account`,
  ALLUSERS: URL + `all_accounts`,
  ALLUSERSBYID: URL + `accounts`,
  UPDATEACCOUNT: URL + `update_account`,
  BLOCKACCOUNT: URL + `block_account`,
  UNBLOCKACCOUNT: URL + `unblock_account`,
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
  TOTALPRODUCTSPERWAREHOUSE: URL + `products_total_per_warehouse`,
  TOTALPRODUCTS: URL + `products_total`,

  // Expense
  ADDEXPENSE: URL + `add_expense`,
  ALLEXPENSEBYID: URL + `expenses`,
  ALLEXPENSES: URL + `all_expenses`,
  UPDATEEXPENSE: URL + `update_expense`,
  DELETEEXPENSE: URL + `delete_expense`,

  // Transfers
  ADDTRANSFER: URL + `add_transfer`,
  ALLTRANSFERBYID: URL + `transfer`,
  ALLMADETRANSFERBYID: URL + `transfer_made`,
  ALLINCOMINGTRANSFER: URL + `in_transfers`,
  ALLOUTGOINGTRANSFER: URL + `out_transfers`,

  // Sales
  ADDSALES: URL + `add_sales`,
  ALLSALESBYID: URL + `sales`,
  ALLSALES: URL + `all_sales`,
  UPDATESALES: URL + `update_sales`,
  VALIDATESALES: URL + `validate`,
  MONTHLYREPORT: URL + `monthly_report`,
  WEEKLYREPORT: URL + `weekly_report`,
  DAILYREPORT: URL + `daily_report`,
  TOTALSALES: URL + `total_sales`,
  TOTALSALESPERWAREHOUSE: URL + `total_salesPerWarehouse`,

  // Payments
  ADDPAYMENT: URL + `add_payment`,
  ALLPAYMENTSBYID: URL + `payment`,
  ALLPAYMENTS: URL + `payments`

  // // Tax
  // ALLTAX: URL + `AllTax`,
  // ADDTAX: URL + `AddTax`,
  // ALLCLIENTS: URL + `AllClients`,

  // // file download
  // FILEDOWNLOAD: URL + `download`
};
