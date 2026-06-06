import { Product, Service } from "@/lib/types/GlobalTypes";

// for products cards photo part //
import dainikSaving from "@/assets/products/dainik-saving.jpg";
import personalDeposit from "@/assets/products/personal-deposit.jpg";
import groupSaving from "@/assets/products/group-saving.jpg";
import fixedDeposit from "@/assets/products/fixed-deposit.jpg";
import livestockLoan from "@/assets/products/livestock-loan.jpg";
import clientsaving from "@/assets/products/client-security.png";

//sercice card image part
import Saving from "@/assets/services/saving-img.jpg";
import Loan from "@/assets/services/loan-img.jpg";
import Share from "@/assets/services/share-capital.jpg";
import Insurance from "@/assets/services/insurance.jpg";
//import MobileBanking from "@/assets/services/mobile-banking.png";



// Products array
export const products: Product[] = [
   {
      title: "Daily Saving",
      url: "/products/saving/daily-saving",
      image: dainikSaving,
      type: "saving"
   },

   {
      title: "Personal Saving",
      url: "/products/saving/personal-saving",
      image: personalDeposit,
      type: "saving"
   },

   {
      title: "Group Saving",
      url: "/products/saving/group-saving",
      image: groupSaving,
      type: "saving"
   },

   {
      title: "Client Security Saving",
      url: "/products/saving/client-saving",
      image: clientsaving,
      type: "saving"
   },

   {
      title: "Monthly Saving",
      url: "/products/saving/monthly-saving",
      image: fixedDeposit,
      type: "saving"
   },

   {
      title: "Livestock Loan",
      url: "/products/loan/livestock-loan",
      image: livestockLoan,
      type: "loan"
   },
];


export const services: Service[] = [
   {
      title: "Saving",
      url: "/services/saving",
      image: Saving,
      type: "saving"
   },

   {
      title: "Loan",
      url: "/services/loan",
      image: Loan,
      type: "loan"
   },

   {
      title: "Share",
      url: "/products/saving/group-saving",
      image: Share,
      type: "share"
   },

   {
      title: "Insurance",
      url: "/products/saving/client-saving",
      image: Insurance,
      type: "insurance"
   },

];