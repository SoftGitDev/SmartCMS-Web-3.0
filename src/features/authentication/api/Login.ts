// Purpose: Authentication API methods.
// Created By: Harish
// Created Date: 05-06-2026

import { FormikHelpers } from "formik";
import { LoginFormValues } from "../types/Login";

export const userLogin = async (  values: LoginFormValues,  actions: FormikHelpers<LoginFormValues>) => {
  try {
    console.log("Login values:", values);

    // API Call Here
  } catch (error) {
    console.error("Login failed:", error);
  } finally {
    actions.setSubmitting(false);
  }
};